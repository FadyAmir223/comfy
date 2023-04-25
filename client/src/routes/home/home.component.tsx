import { useState, FC, ChangeEvent, MouseEvent } from 'react';
import axios from 'axios';

const url = import.meta.env.VITE_SERVER_URL;
const username = 'fezza';

const Home: FC<{}> = () => {
  const [image, setImage] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const [retImg, setRetImg] = useState<string | null>(null);

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setImage(selectedFile);
    if (selectedFile) setPreviewURL(URL.createObjectURL(selectedFile));
  };

  const handleUpload = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!image) return;
    const formData = new FormData();
    formData.append('image', image);
    formData.append('filename', username);

    try {
      await axios.post(`${url}/api/image`, formData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRetrieve = async () => {
    try {
      const filename = username;
      const { data } = await axios.get(`${url}/api/image/${filename}`, {
        responseType: 'blob',
      });
      const blob = new Blob([data], { type: 'image/jpeg' });
      setRetImg(URL.createObjectURL(blob));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        type="file"
        onChange={handleFileSelect}
      />
      <button
        className="mx-3 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={handleUpload}
      >
        Upload
      </button>
      <button
        className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={handleRetrieve}
      >
        retrive
      </button>
      {previewURL && (
        <img src={previewURL} alt="Preview" className="max-w-[300px] mt-3" />
      )}
      {retImg && (
        <img src={retImg} alt="retrieve" className="max-w-[300px] mt-3" />
      )}
    </div>
  );
};

export default Home;
