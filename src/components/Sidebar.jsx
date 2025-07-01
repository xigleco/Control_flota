

import { Link } from 'react-router-dom';
import Vehiculos from '../pages/Listado de Vehiculos';
import Repuestos from '../pages/Listado Repuestos'

const Sidebar = () => {
  return (
    <nav className="col-md-3 col-lg-2 d-md-block bg-dark sidebar text-white min-vh-100 p-3">
      <h4 className="text-white">Menú</h4>
      <ul className="list-unstyled ps-0">

        {/* Sección colapsable */}
        <li className="nav-item">
          <Link className="nav-link text-white pb-2" to="/">Inicio</Link>
        </li>
        <li className="nav-item">
          <button
            className="nav-link btn btn-toggle align-items-center rounded text-white pb-2"
            data-bs-toggle="collapse"
            data-bs-target="#Vehiculos-collapse"
            aria-expanded="false"
          >
            Vehiculos
          </button>
          <div className="collapse show" id="Vehiculos-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-2">
              <li><a href="Vehiculos" className="nav-link text-white pb-2 ps-3">Listado de Vehiculos</a></li>
              <li><a href="#" className="nav-link text-white pb-2 ps-3">Carga de Kilometros</a></li>
              <li><a href="#" className="nav-link text-white pb-2 ps-3">Combustible</a></li>
            </ul>
          </div>
        </li>
        <li className="nav-item">
          <button
            className="nav-link btn btn-toggle align-items-center rounded text-white pb-2"
            data-bs-toggle="collapse"
            data-bs-target="#mantenimiento-collapse"
            aria-expanded="false"
          >
            Mantenimiento
          </button>
          <div className="collapse show" id="mantenimiento-collapse">
            <ul className="btn-toggle-nav list-unstyled fw-normal pb-2">
              <li><a href="#" className="nav-link text-white pb-2 ps-3">Preventivos</a></li>
              <li><a href="#" className="nav-link text-white pb-2 ps-3">Rotacion de cubiertas</a></li>
              <li><a href="Repuestos" className="nav-link text-white pb-2 ps-3">Repuestos</a></li>
            </ul>
          </div>
        </li>
      </ul>
    </nav>
  );
};


export default Sidebar;
