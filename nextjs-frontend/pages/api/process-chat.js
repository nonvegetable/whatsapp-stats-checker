import multer from 'multer';
import fs from 'fs/promises';
import path from 'path';

export const config = {
  api: {
    bodyParser: false, // Disable Next.js's built-in body parser
  },
};

// Configure multer for handling file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const tempDir = path.join(process.cwd(), 'temp-uploads');
      fs.mkdir(tempDir, { recursive: true })
        .then(() => cb(null, tempDir))
        .catch((err) => cb(err));
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Unique file name
    },
  }),
});

// Wrap multer in a Promise to work with Next.js API routes
const multerMiddleware = (req, res, next) => {
  const handler = upload.single('file'); // Expecting 'file' as the field name
  handler(req, res, (err) => {
    if (err) {
      console.error('Multer error:', err);
      res.status(400).json({ error: 'File upload failed' });
    } else {
      next();
    }
  });
};

// Custom handler for the file processing
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  await new Promise((resolve, reject) => {
    multerMiddleware(req, res, (err) => (err ? reject(err) : resolve()));
  });

  try {
    const device = req.body.device; // 'device' will come as part of the request body
    const uploadedFile = req.file;

    if (!uploadedFile) {
      console.error('No file received.');
      return res.status(400).json({ error: 'No file received' });
    }

    const filePath = uploadedFile.path;

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

    // Delete the uploaded file after processing
    await fs.unlink(filePath);

    res.status(200).json(userDictionary);
  } catch (error) {
    console.error('Error processing file:', error);
    res.status(500).json({ error: 'Error processing file' });
  }
}
