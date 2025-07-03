import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
// import logoList from '/src/img/List.png'


const Repuestos = () => {
  const [repuestos, setRepuestos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [form, setForm] = useState({
    id: '',
    nombre: '',
    marca: '',
    modelo: '',
    codigo: '',
    categoria: '',
    precio: '',
    stock_minimo: '',
    observacion: '',

  });


  const [mostrarFormularioAdd, setMostrarFormularioAdd] = useState(false);
  const [stockForm, setStockForm] = useState({
    id: '',
    stock: '',
    precio: '',
  });


  const handleStockChange = (e) => {
    const { name, value } = e.target;
    setStockForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAgregarStock = (e) => {
    e.preventDefault();
    const { id, stock, precio } = stockForm;
    const cantidadNum = parseInt(stock, 10);
    const newPrecio = parseInt(precio, 10);

    if (!id || isNaN(cantidadNum)) return;

    const nuevosRepuestos = repuestos.map(rep => {
      if (rep.id === id) {
        const nuevoStock = (parseInt(rep.stock || 0, 10)) + cantidadNum;
        return { ...rep, stock: nuevoStock, precio: newPrecio };
      }
      return rep;
    });

    setRepuestos(nuevosRepuestos);
    setStockForm({ id: '', cantidad: '' });
    setMostrarFormularioAdd(false);
  };



  useEffect(() => {
    const datosGuardados = localStorage.getItem('repuestos');
    if (datosGuardados) {
      setRepuestos(JSON.parse(datosGuardados));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('repuestos', JSON.stringify(repuestos));
  }, [repuestos]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setForm(prev => ({ ...prev, imagen: URL.createObjectURL(file) }));
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRepuestos(prev => [...prev, form]);
    setForm({
      id: '',
      nombre: '',
      marca: '',
      modelo: '',
      codigo: '',
      categoria: '',
      precio: '',
      stock: '',
      stock_minimo: '',
      observacion: '',
    });
    setMostrarFormulario(false);
  };

  return (
    <div className="container-fluid">
      <div className="row">

        {/* Contenido principal */}
        <main className="col-md-9 px-md-4">

          <h2 class="titulo">Listado de Repuestos</h2>

          <div>

            <button className="btn btn-success mb-2 me-2" title="Ingreso de Stock"
              onClick={() => setMostrarFormularioAdd(true) & setMostrarFormulario(false)}
              
            >
              <FontAwesomeIcon icon={faShoppingCart} size='lg' />
            </button>

            <button className="btn btn-success mb-2" onClick={() => setMostrarFormularioAdd(false) & setMostrarFormulario(true)
            }>
              Agregar Repuesto
            </button>
          </div>


          <AnimatePresence>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 2 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
              layout>

              {mostrarFormularioAdd && (

                <form onSubmit={handleAgregarStock} className="mb-4">
                  <h5>Agregar Stock</h5>
                  <div className="row">
                    <div className="col-md-6">
                      <label>ID del Repuesto</label>
                      <select
                        className="form-control"
                        name="id"
                        value={stockForm.id}
                        onChange={handleStockChange}
                        required
                      >
                        <option value="">Seleccionar repuesto</option>
                        {repuestos.map(rep => (
                          <option key={rep.id} value={rep.id}>
                            {rep.id} - {rep.nombre || `${rep.marca} ${rep.modelo}`}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label>Cantidad a ingresar</label>
                      <input
                        type="number"
                        className="form-control"
                        name="stock"
                        value={stockForm.stock}
                        onChange={handleStockChange}
                        required
                      />
                      <div className="col-md-4">
                        <label>Precio</label>
                        <input
                          type="text"
                          className="form-control"
                          name="precio"
                          value={stockForm.precio}
                          onChange={handleStockChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <button type="submit" className="btn btn-success me-2">Agregar</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setMostrarFormularioAdd(false)}>Cancelar</button>
                  </div>
                </form>

              )}

              {mostrarFormulario && (

                <form id="formRepuestos" className="row g-3 py-4" onSubmit={handleSubmit}>
                  <h5>Agregar Nuevo Repuesto</h5>
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label htmlFor="id">ID</label>
                      <input type="text" className="form-control" name="id" value={form.id} onChange={handleChange} required />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label htmlFor="marca">Marca</label>
                      <input type="text" className="form-control" name="marca" value={form.marca} onChange={handleChange} required />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label htmlFor="modelo">Modelo</label>
                      <input type="text" className="form-control" name="modelo" value={form.modelo} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label htmlFor="codigo">Codigo</label>
                      <input type="text" className="form-control" name="codigo" value={form.codigo} onChange={handleChange} required />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label htmlFor="categoria">Categoria</label>
                      <select className="form-control" name="categoria" value={form.categoria} onChange={handleChange}>
                        <option value="">Categoria</option>
                        <option value="auto">Auto</option>
                        <option value="moto">Moto</option>
                        <option value="camion">Camión</option>
                        <option value="colectivo">Colectivo</option>
                      </select>
                    </div>
                    {/* <div className="col-md-4 mb-3">
                    <label htmlFor="color">Color</label>
                    <input type="text" className="form-control" name="color" value={form.color} onChange={handleChange} />
                  </div> */}
                  </div>
                  <div className="row">
                    <div className="col-md-4 mb-3">
                      <label htmlFor="observacion">Observacion</label>
                      <input type="text" className="form-control" name="observacion" value={form.observacion} onChange={handleChange} />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label htmlFor="precio">Precio</label>
                      <input type="text" className="form-control" name="precio" value={form.precio} onChange={handleChange} />
                    </div>
                    {/* <div className="col-md-4 mb-3">
                    <label htmlFor="imagen">Imagen</label>
                    <input type="file" className="form-control" onChange={handleImageChange} />
                  </div> */}
                  </div>
                  <div className="mb-1">
                    <button type="submit" className="btn btn-success me-2">Guardar Nuevo Repuestos</button>
                    <button type="button" className="btn btn-secondary" onClick={() => setMostrarFormulario(false)}>Cancelar</button>
                  </div>
                </form>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="display-wrapper" style={{ height: 400, width: '100%' }}>
            <div className="grid-wrapper">
              <AgGridReact
                rowData={repuestos}
                columnDefs={[
                  { headerName: 'ID', field: 'id' },
                  { headerName: 'Marca', field: 'marca' },
                  { headerName: 'Modelo', field: 'modelo' },
                  { headerName: 'Codigo', field: 'codigo' },
                  { headerName: 'Categoria', field: 'categoria' },
                  { headerName: 'Stock_Actual', field: 'stock' },
                  { headerName: 'Stock Minimo', field: 'stock_minimo' },
                  { headerName: 'Precio', field: 'precio' },
                  { headerName: 'Observacion', field: 'observacion' },
                ]}
                pagination={true}
                paginationPageSize={5}
              />
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default Repuestos;
