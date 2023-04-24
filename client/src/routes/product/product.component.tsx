import { useParams } from 'react-router-dom';

const Product = () => {
  const { id } = useParams<string>();

  return (
    <div>
      <h1>product</h1>
      <p>{id}</p>
    </div>
  );
};

export default Product;
