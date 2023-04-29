import { useEffect, useState } from 'react';

const url = import.meta.env.VITE_SERVER_URL;

const Products = () => {
  const [imgUrl, setImgUrl] = useState('');

  useEffect(() => {
    if (location.hash === '#_=_')
      history.pushState('', document.title, location.pathname);
  }, []);

  return (
    <>
      <div className="flex items-center justify-center space-x-4 mt-5">
        <a
          href={`${url}/api/auth/google`}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          google
        </a>
        <a
          href={`${url}/api/auth/facebook`}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          facebook
        </a>
        <a
          href={`${url}/api/auth/github`}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          github
        </a>
      </div>

      <div className="flex items-center justify-center space-x-4 mt-5">
        <a
          href={`${url}/api/auth/secret`}
          className="text-blue-500 hover:text-blue-700"
        >
          secret
        </a>
        <a
          href={`${url}/api/auth/logout`}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          logout
        </a>
      </div>
      {imgUrl && (
        <img
          src={imgUrl}
          alt="profile picture"
          className="w-16 h-16 rounded-full mx-auto mt-6"
        />
      )}
    </>
  );
};

export default Products;
