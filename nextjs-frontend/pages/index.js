import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [device, setDevice] = useState("a");
  const [results, setResults] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!file) {
      console.error('No file selected!');
      alert('Please select a file before submitting.');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', file);
    formData.append('device', device);
  
    console.log('Sending file:', file);
    console.log('FormData entries:');
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
  
    try {
      const response = await fetch('/api/process-chat', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        setResults(data);
      } else {
        const errorText = await response.text();
        console.error('Error:', errorText);
        alert(`Error: ${errorText}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error. Please try again.');
    }
  };
  
  
  
  return (
    <div>
      <h1>WhatsApp Stats Checker</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <select onChange={(e) => setDevice(e.target.value)} value={device}>
          <option value="a">Android</option>
          <option value="i">iPhone</option>
        </select>
        <button type="submit">Submit</button>
      </form>

      {results && (
        <div>
          <h2>Results</h2>
          <ul>
            {Object.entries(results).map(([user, count]) => (
              <li key={user}>
                {user}: {count} messages
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
