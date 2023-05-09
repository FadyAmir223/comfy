// import { useParams } from 'react-router-dom';
// const { id } = useParams<string>();

import { useTranslation } from 'react-i18next';

const Product = () => {
  const [tProduct, i18nProduct] = useTranslation('product');
  const [tProducts] = useTranslation('products');

  const handleLanguageChange = () => {
    const language = i18nProduct.language === 'ar' ? 'en' : 'ar';
    i18nProduct.changeLanguage(language);
    localStorage.language = language;
  };

  return (
    <div dir={i18nProduct.language === 'ar' ? 'rtl' : 'ltr'}>
      <button
        className="rtl:bg-red-500 ltr:bg-blue-500"
        onClick={handleLanguageChange}
      >
        {i18nProduct.language === 'ar' ? 'en' : 'ar'}
      </button>

      <p>
        {`${tProducts('title')} 
        ${tProduct('title')} 
        ${tProduct('desc.name')} 
        ${tProduct('desc.price')} 
        ${tProduct('msg', { msgCtr: 2 })}`}
      </p>
    </div>
  );
};

export default Product;
