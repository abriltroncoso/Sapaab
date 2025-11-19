import {  useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import FormularioPerrito from '../components/FormularioPerrito';
import ListaPerritosAdmin from '../components/ListaPerritosAdmin';
import './Admin.css';

export default function Admin() {
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div>
          <h1>Panel de Administración</h1>
        
        </div>
      </div>

      <div className="admin-content">
        <section className="admin-section">
          <h2>Agregar Nuevo Perrito</h2>
          <FormularioPerrito />
           <button onClick={logout} className="btn-logout">
          Cerrar Sesión
        </button>
        <ListaPerritosAdmin/>
        </section> 
      </div>
    </div>
  );
}