import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGasPump } from "@fortawesome/free-solid-svg-icons";
import { faGauge } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { supabase } from "../services/supabaseClient";
import { bucketBaseUrl } from "../config"; // ajustá el path según dónde estés
// import { faInstagram } from '@fortawesome/free-brands-svg-icons';
// import { faFacebook } from '@fortawesome/free-brands-svg-icons';
// import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const Vehiculos = () => {
  const [vehiculos, setVehiculos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [form, setForm] = useState({
    id: "",
    numero: "",
    marca: "",
    modelo: "",
    patente: "",
    tipo: "",
    color: "",
    anio: "",
    Kilometros: "",
    Combustible: "",
    imagen: "",
  });

  const fetchVehiculos = async () => {
    const { data, error } = await supabase
      .from("vehiculos")
      .select("*")
      .order("created_at", { ascending: false }); // o usá otra columna si no tenés `creado_en`

    if (error) {
      console.error("Error al obtener vehículos:", error);
    } else {
      setVehiculos(data);
    }
  };

  useEffect(() => {
    fetchVehiculos();
  }, []);
  // useEffect(() => {
  //   const datosGuardados = localStorage.getItem("vehiculos");
  //   if (datosGuardados) {
  //     setVehiculos(JSON.parse(datosGuardados));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("vehiculos", JSON.stringify(vehiculos));
  // }, [vehiculos]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm((prev) => ({ ...prev, imagen: URL.createObjectURL(file) }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setVehiculos((prev) => [...prev, form]);
    setForm({
      id: "",
      numero: "",
      marca: "",
      modelo: "",
      patente: "",
      tipo: "",
      color: "",
      anio: "",
      Kilometros: "",
      Combustible: "",
      imagen: "",
    });
    setMostrarFormulario(false);
  };

  const handleEliminarVehiculo = (id) => {
    const nuevosVehiculos = vehiculos.filter((v) => v.id !== id);
    setVehiculos(nuevosVehiculos);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Contenido principal */}
        <main className="col-md-9 px-md-4" style={{ width: "100%" }}>
          <h2 class="titulo">Listado de Vehículos</h2>
          {/*           
          <button className="btn btn-success mb-3" onClick={() => localStorage.removeItem('vehiculos')}>
            Limpiar Vehículos
          </button> */}
          <button
            className="btn btn-success mb-2 me-2"
            onClick={() => setMostrarFormulario(true)}
          >
            Gestion De Vehiculos
          </button>

          <button
            className="btn btn-success mb-2 me-2"
            title="Carga de Combustible"
          >
            <FontAwesomeIcon icon={faGasPump} size="lg" />
          </button>

          <button className="btn btn-success mb-2 me-2" title="Carga de Km">
            <FontAwesomeIcon icon={faGauge} size="lg" />
          </button>

          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              layout
            >
              {mostrarFormulario && (
                <form
                  id="formVehiculo"
                  className="row g-3 py-4"
                  onSubmit={handleSubmit}
                >
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label htmlFor="id">Numero</label>
                      <input
                        type="text"
                        className="form-control"
                        name="numero"
                        value={form.numero}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label htmlFor="marca">Marca</label>
                      <input
                        type="text"
                        className="form-control"
                        name="marca"
                        value={form.marca}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label htmlFor="modelo">Modelo</label>
                      <input
                        type="text"
                        className="form-control"
                        name="modelo"
                        value={form.modelo}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label htmlFor="patente">Patente</label>
                      <input
                        type="text"
                        className="form-control"
                        name="patente"
                        value={form.patente}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label htmlFor="tipo">Tipo</label>
                      <select
                        className="form-control"
                        name="tipo"
                        value={form.tipo}
                        onChange={handleChange}
                      >
                        <option value="">Tipo</option>
                        <option value="auto">Auto</option>
                        <option value="moto">Moto</option>
                        <option value="camion">Camión</option>
                        <option value="colectivo">Colectivo</option>
                      </select>
                    </div>
                    <div className="col-md-4 mb-3">
                      <label htmlFor="color">Color</label>
                      <input
                        type="text"
                        className="form-control"
                        name="color"
                        value={form.color}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label htmlFor="anio">Año</label>
                      <input
                        type="text"
                        className="form-control"
                        name="anio"
                        value={form.anio}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label htmlFor="Kilometros">Kilometros</label>
                      <input
                        type="text"
                        className="form-control"
                        name="Kilometros"
                        value={form.Kilometros}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label htmlFor="imagen">Imagen</label>
                      <input
                        type="file"
                        className="form-control"
                        onChange={handleImageChange}
                      />
                    </div>
                  </div>
                  <div className="mb-1">
                    <button type="submit" className="btn btn-success me-2">
                      Guardar Vehículo
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setMostrarFormulario(false)}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </AnimatePresence>

          <ul style={{ listStyle: "none", padding: 0 }}>
            {vehiculos.map((vehiculo) => {
              const imagenUrl = `${bucketBaseUrl}${vehiculo.imagen_url}`;

              return (
                <li
                  key={vehiculo.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "10px",
                    borderBottom: "1px solid #ccc",
                  }}
                >
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-sm" style={{ width: "25%" }}>
                        <div>
                          <strong>Numero:</strong> {vehiculo.numero}
                        </div>
                        <div>
                          <strong>Marca:</strong> {vehiculo.marca}
                        </div>
                        <div>
                          <strong>Modelo:</strong> {vehiculo.modelo}
                        </div>
                      </div>
                      <div className="col-sm" style={{ width: "25%" }}>
                        <div>
                          <strong>Kilómetros:</strong> {vehiculo.km_actuales}
                        </div>
                        <div>
                          <strong>Tipo:</strong> {vehiculo.tipo}
                        </div>
                        <div>
                          <strong>Consumo:</strong> {vehiculo.Combustible}
                        </div>
                      </div>
                      <div className="col-sm" style={{ width: "25%" }}>
                        <img
                          src={imagenUrl}
                          alt={`${vehiculo.marca} ${vehiculo.modelo}`}
                          style={{

                            height: "100px",
                            objectFit: "cover",
                            borderRadius: "5px",
                          }}
                        />
                      </div>
                      <div
                        className="d-flex justify-content-end align-items-center mt-auto"
                        style={{ width: "25%" }}
                      >
                        <button
                          className="btn btn-secondary"
                          title={`Eliminar Vehiculo N-${vehiculo.id}`}
                          onClick={() => {
                            const confirmar = window.confirm(
                              `¿Estás seguro de que querés eliminar el vehículo con ID ${vehiculo.id}?`
                            );
                            if (confirmar) {
                              handleEliminarVehiculo(vehiculo.id);
                            }
                          }}
                        >
                          <FontAwesomeIcon icon={faTrash} size="lg" />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </main>
      </div>
    </div>
  );
};

export default Vehiculos;
