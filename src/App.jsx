
// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Vehiculos from './pages/Listado de Vehiculos';
import Mantenimientos from './pages/Mantenimientos';
import Repuestos from './pages/Listado Repuestos';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="vehiculos" element={<Vehiculos />} />
        <Route path="mantenimientos" element={<Mantenimientos />} />
        <Route path="repuestos" element={<Repuestos />} />
      </Route>
    </Routes>
  );
}

export default App;
