import formidable from 'formidable';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

export const config = {
  api: {
    bodyParser: false, // Disable built-in body parser to handle file uploads
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Create a temporary directory for uploads
  const uploadDir = path.join(os.tmpdir(), 'uploads');
  try {
    // Ensure the directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    const form = formidable({
      uploadDir, // Set the upload directory
      keepExtensions: true, // Preserve file extensions
      multiples: false, // Allow only a single file
    });

    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    console.log('Fields received:', fields);
    console.log('Files received:', files);

    const device = fields.device;
    const uploadedFile = files.file;

    if (!uploadedFile) {
      console.error('No file received.');
      return res.status(400).json({ error: 'No file received. Check field name.' });
    }
    if (!uploadedFile.filepath) {
      console.error('Filepath is missing.');
      return res.status(400).json({ error: 'Filepath is missing from uploaded file.' });
    }

    const filePath = uploadedFile.filepath;

    // Read and process the uploaded file
    const chatData = await fs.readFile(filePath, 'utf-8');
    const lines = chatData.split('\n');
    const regex = device === 'a' ? /-(.+?):/ : /\] (.+?):/;

    const userDictionary = {};

    lines.forEach((line) => {
      const match = line.match(regex);
      if (match) {
        const found = match[1].trim();
        userDictionary[found] = (userDictionary[found] || 0) + 1;
      }
    });

    // Delete the file after processing
    await fs.unlink(filePath);

    res.status(200).json(userDictionary);
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Error processing file' });
  }
};
