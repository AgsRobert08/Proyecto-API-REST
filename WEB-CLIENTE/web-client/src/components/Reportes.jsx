import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styleReportes.css';

const Reportes = () => {
    const [listaReportes, setListaReportes] = useState([]);
    const [datosFormulario, setDatosFormulario] = useState({ matricula: '', ubicacion: '', nivel_llenado: '', temperatura: '' });
    const [reporteEnEdicion, setReporteEnEdicion] = useState(null);
    const [errorCarga, setErrorCarga] = useState(null);
    const [idBusqueda, setIdBusqueda] = useState('');
    const [reporteEncontrado, setReporteEncontrado] = useState(null);
    const [modalAbierto, setModalAbierto] = useState(false);

    useEffect(() => {
        obtenerReportes();
    }, []);

    const obtenerReportes = async () => {
        try {
            const response = await axios.get('http://localhost:5100/reportes');
            setListaReportes(response.data);
            console.log(response.data)
        } catch (err) {
            setErrorCarga(err);
        }
    };

    const manejarCambio = (e) => {
        const { name, value } = e.target;
        setDatosFormulario({ ...datosFormulario, [name]: value });
    };

    const manejarEnvio = async (e) => {
        e.preventDefault();
        try {
            if (reporteEnEdicion) {
                const { _id, ...datosActualizados } = datosFormulario;
                await axios.put(`http://localhost:5100/reportes/${_id}`, datosActualizados);
            } else {
                await axios.post('http://localhost:5100/reportes', datosFormulario);
            }
            setDatosFormulario({ matricula: '', ubicacion: '', nivel_llenado: '', temperatura: '' });
            setReporteEnEdicion(null);
            obtenerReportes();
            cerrarModal();
        } catch (err) {
            console.error("Error al guardar el reporte:", err);
        }
    };

    const manejarEdicion = (reporte) => {
        setDatosFormulario(reporte);
        setReporteEnEdicion(reporte);
        abrirModal();
    };

    const manejarEliminacion = async (id) => {
        try {
            await axios.delete(`http://localhost:5100/reportes/${id}`);
            obtenerReportes();
        } catch (err) {
            console.error("Error al eliminar el reporte:", err);
        }
    };

    const buscarReportePorId = async () => {
        if (!idBusqueda.trim()) {
            alert("Ingrese un ID para buscar");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:5100/reportes/${idBusqueda.trim()}`);
            setReporteEncontrado(response.data);
            console.log("Reporte encontrado:", response.data);
        } catch (err) {
            console.error("Error al buscar el reporte:", err);
            setReporteEncontrado(null);
            alert("Reporte no encontrado");
        }
    };

    const abrirModal = () => setModalAbierto(true);
    const cerrarModal = () => {
        setModalAbierto(false);
        setReporteEnEdicion(null);
        setDatosFormulario({ matricula: '', ubicacion: '', nivel_llenado: '', temperatura: '' });
    };

    return (
        <div className="contenedor">
            <h1>Gestión de Contenedores</h1>
            {errorCarga && <p>Error al cargar los reportes: {errorCarga.message}</p>}



            <div className="busqueda">
                <input
                    type="text"
                    placeholder="Buscar por ID"
                    value={idBusqueda}
                    onChange={(e) => setIdBusqueda(e.target.value)}
                />
                <button onClick={buscarReportePorId}>Buscar</button>
            </div>

            {reporteEncontrado && (
    <div className="reporte-encontrado">
        <h2>Reporte Encontrado</h2>
        <div className="card">
            <p><strong>ID:</strong> {reporteEncontrado._id}</p>
            <p><strong>Matrícula:</strong> {reporteEncontrado.matricula}</p>
            <p><strong>Ubicación:</strong> {reporteEncontrado.ubicacion}</p>
            <p><strong>Nivel de llenado:</strong> {reporteEncontrado.nivel_llenado}%</p>
            <p><strong>Temperatura:</strong> {reporteEncontrado.temperatura}°C</p>
            <div className="acciones">
                <button onClick={() => setReporteEncontrado(null)} className="cerrar">Cerrar</button>
            </div>
        </div>
    </div>
)}



            <button onClick={abrirModal} className="boton-agregar">Agregar Reporte</button>

            {modalAbierto && (
                <div className="modal">
                    <div className="modal-contenido">
                        <h2>{reporteEnEdicion ? 'Editar Reporte' : 'Agregar Reporte'}</h2>
                        <form onSubmit={manejarEnvio}>
                            <input type="number" name="matricula" placeholder="Matrícula" value={datosFormulario.matricula} onChange={manejarCambio} required />
                            <input type="text" name="ubicacion" placeholder="Ubicación" value={datosFormulario.ubicacion} onChange={manejarCambio} required />
                            <input type="number" name="nivel_llenado" placeholder="Nivel de llenado (1-100)" value={datosFormulario.nivel_llenado} onChange={manejarCambio} min="1" max="100" required />
                            <input type="number" name="temperatura" placeholder="Temperatura (0-100)" value={datosFormulario.temperatura} onChange={manejarCambio} min="0" max="100" required />
                            <button type="submit">{reporteEnEdicion ? 'Actualizar' : 'Agregar'}</button>
                            <button type="button" onClick={cerrarModal}>Cancelar</button>
                        </form>
                    </div>
                </div>
            )}

            <table>
                <thead>
                    <tr>
                        <th>Id Contenedor</th>
                        <th>Matrícula</th>
                        <th>Ubicación</th>
                        <th>Nivel de llenado</th>
                        <th>Temperatura</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {listaReportes.map((reporte) => (
                        <tr key={reporte._id}>
                            <td>{reporte._id}</td>
                            <td>{reporte.matricula}</td>
                            <td>{reporte.ubicacion}</td>
                            <td>{reporte.nivel_llenado}</td>
                            <td>{reporte.temperatura}</td>
                            <td>
                                <button onClick={() => manejarEdicion(reporte)}>Editar</button>
                                <button onClick={() => manejarEliminacion(reporte._id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Reportes;