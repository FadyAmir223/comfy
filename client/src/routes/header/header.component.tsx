import { Link, Outlet } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import { ReactComponent as Logo } from '../../../public/images/logo/logo-black.svg';

const Header = () => {
  return (
    <>
      <header className="">
        <div className="">
          <nav className="">
            {['home', 'products', 'about'].map((path) => (
              <Link key={path} to={path}>
                {path}
              </Link>
            ))}
          </nav>
          <Logo />
        </div>
        <FaShoppingCart />
      </header>
      <Outlet />
    </>
  );
};

export default Header;
