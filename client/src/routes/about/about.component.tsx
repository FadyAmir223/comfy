import React, { useState } from 'react';
import axios from 'axios';

const url = import.meta.env.VITE_SERVER_URL;
const username = 'fezza';

function About() {
  const [file, setFile] = useState<File | null>(null);

  const [filename, setFilename] = useState('');
  const [fileUrl, setFileUrl] = useState('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) setFile(event.target.files[0]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('file', username);
    try {
      const { data } = await axios.post(`${url}/api/file`, formData);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRetrieve = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (filename) {
      fetch(`${url}/api/file/${filename}`)
        .then((response) => response.blob())
        .then((blob) => {
          const fileUrl = URL.createObjectURL(blob);
          setFileUrl(fileUrl);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Upload</button>
      </form>
      <div>
        <form onSubmit={handleRetrieve}>
          <input
            type="text"
            value={filename}
            onChange={(e) => setFilename(e.target.value)}
          />
          <button type="submit">Retrieve</button>
        </form>
        {fileUrl && <img src={fileUrl} alt="File Preview" />}
      </div>
    </>
  );
}

export default About;
