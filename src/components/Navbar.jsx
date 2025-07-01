import { Link } from 'react-router-dom';
import logoFlotas from '/src/img/logo.png'

const Navbar = () => {
  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <Link className="navbar-brand d-flex align-items-center" to="/">
        <img
          src={logoFlotas}
          alt="Logo Control de Flota"
          style={{ height: '40px', marginRight: '10px' }}
        />
        <span>Control de Flota</span>
      </Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/"></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/vehiculos"></Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/mantenimientos"></Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

