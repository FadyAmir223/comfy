// import { useParams } from 'react-router-dom';
// const { id } = useParams<string>();

import { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';

const Product = () => {
  const [tProduct, i18nProduct] = useTranslation('product');
  const [tProducts, i18nProducts] = useTranslation('products');

  const [count, setCount] = useState(0);
  const [name_, setName] = useState('fady');

  return (
    <div
      className={`${
        i18nProduct.language === 'ar' ? 'text-right' : 'text-left'
      }`}
    >
      <button
        className="rtl:bg-red-500 ltr:bg-blue-500"
        onClick={() =>
          i18nProduct.changeLanguage(
            i18nProduct.language === 'ar' ? 'en' : 'ar'
          )
        }
      >
        {i18nProduct.language === 'ar' ? 'en' : 'ar'}
      </button>
      <p className="">{tProduct('product')}</p>
      <p className="">{tProducts('products')}</p>
    </div>
  );
};

export default Product;
