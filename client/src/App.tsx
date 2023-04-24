import { Routes, Route } from 'react-router-dom';

import { lazy, Suspense } from 'react';

const Header = lazy(() => import('./routes/header/header.component'));
const Home = lazy(() => import('./routes/home/home.component'));
const About = lazy(() => import('./routes/about/about.component'));
const Products = lazy(() => import('./routes/products/products.component'));
const Product = lazy(() => import('./routes/product/product.component'));

const App = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />}></Route>
          <Route path="home" element={<Home />}></Route>
          <Route path="about" element={<About />}></Route>
          <Route path="products" element={<Products />}></Route>
          <Route path="products/:id" element={<Product />}></Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
