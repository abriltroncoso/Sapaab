import { useState , useEffect} from 'react';
import { createPerrito, updatePerrito } from '../services/api';
import './FormularioPerrito.css';

export default function FormularioPerrito({perritoEdit, onSuccess }) {
  const isEditMode  = !!perritoEdit;

  

  const [formData, setFormData] = useState({
    nombre: '',
    raza: '',
    edad: '',
    tamano: 'mediano',
    enAdopcion: 'no',
    descripcion: '',
  });
  
  const [fotosArchivos, setFotosArchivos] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (perritoEdit) {
      setFormData({
        nombre: perritoEdit.nombre,
        raza: perritoEdit.raza,
        edad: perritoEdit.edad,
        tamano: perritoEdit.tamano,
        enAdopcion: perritoEdit.adoptado,
        descripcion: perritoEdit.descripcion,
      });

      // Mostrar fotos existentes como previews
      if (perritoEdit.fotos && perritoEdit.fotos.length > 0) {
        setPreviews(perritoEdit.fotos);
      }
    }
  }, [perritoEdit]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Manejar selección de archivos
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    
    // Validar máximo 4 archivos
    if (files.length > 4) {
      setError('Máximo 4 fotos permitidas');
      return;
    }

    // Validar tamaño (máximo 5MB por archivo)
    const archivosGrandes = files.filter(file => file.size > 5 * 1024 * 1024);
    if (archivosGrandes.length > 0) {
      setError('Cada foto debe pesar máximo 5MB');
      return;
    }

    setFotosArchivos(files);
    setError('');
    
    // Crear previews
    const previewUrls = files.map(file => URL.createObjectURL(file));
    setPreviews(previewUrls);
  };

   const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje('');
    setError('');

    try {
      // MODO EDICIÓN
      if (isEditMode) {
        // Si hay nuevas fotos, enviar FormData
        if (fotosArchivos.length > 0) {
          const formDataToSend = new FormData();
          
          formDataToSend.append('nombre', formData.nombre);
          formDataToSend.append('raza', formData.raza);
          formDataToSend.append('edad', formData.edad);
          formDataToSend.append('tamano', formData.tamano);
          formDataToSend.append('adoptado', formData.enAdopcion)
          formDataToSend.append('descripcion', formData.descripcion);

          fotosArchivos.forEach((file) => {
            formDataToSend.append('fotos', file);
          });

          await updatePerrito(perritoEdit._id, formDataToSend);
        } 
        // Si no hay nuevas fotos, solo actualizar datos de texto
        else {
         await updatePerrito(perritoEdit._id, {
          nombre: formData.nombre,
          raza: formData.raza,
          edad: parseInt(formData.edad),
          tamano: formData.tamano,
          adoptado: formData.enAdopcion,   
          descripcion: formData.descripcion
});
        }

        setMensaje(' Perrito actualizado exitosamente!');
      } 
      // MODO CREAR
      else {
        if (fotosArchivos.length === 0) {
          setError('Debes seleccionar al menos una foto');
          setLoading(false);
          return;
        }

        const formDataToSend = new FormData();
        
        formDataToSend.append('nombre', formData.nombre);
        formDataToSend.append('raza', formData.raza);
        formDataToSend.append('edad', formData.edad);
        formDataToSend.append('tamano', formData.tamano);
        formDataToSend.append('adoptado',formData.enAdopcion);
        formDataToSend.append('descripcion', formData.descripcion);

        fotosArchivos.forEach((file) => {
          formDataToSend.append('fotos', file);
        });

        await createPerrito(formDataToSend);
        
        setMensaje(' Perrito agregado exitosamente!');
        
        // Limpiar formulario
        setFormData({
          nombre: '',
          raza: '',
          edad: '',
          tamano: 'mediano',
          enAdopcion: '',
          descripcion: '',
        });
        setFotosArchivos([]);
        setPreviews([]);
        
        const fileInput = document.getElementById('fotos');
        if (fileInput) fileInput.value = '';
      }

      if (onSuccess) {
        setTimeout(() => onSuccess(), 1500);
      }
    } catch (err) {
      setError(' Error: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-perrito">
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="nombre">Nombre *</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            placeholder="Ej: Firulais"
          />
        </div>

        <div className="form-group">
          <label htmlFor="raza">Raza *</label>
          <input
            type="text"
            id="raza"
            name="raza"
            value={formData.raza}
            onChange={handleChange}
            required
            placeholder="Ej: Mestizo"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="edad">Edad (años) *</label>
          <input
            type="number"
            id="edad"
            name="edad"
            value={formData.edad}
            onChange={handleChange}
            required
            placeholder="Ej: 2"
            min="0"
            max="20"
          />
        </div>

        <div className="form-group">
          <label htmlFor="tamaño">Tamaño *</label>
          <select
            id="tamano"
            name="tamano"
            value={formData.tamano}
            onChange={handleChange}
            required
          >
            <option value="pequeño">Pequeño</option>
            <option value="mediano">Mediano</option>
            <option value="grande">Grande</option>
          </select>
        </div>
      </div>
      
     <div className="form-group">
        <label htmlFor="enAdopcion">adoptado?  *</label>
        <select
          id="enAdopcion"
          name="enAdopcion"
          value={formData.enAdopcion}
          onChange={handleChange}
          required
        >
          <option value="si">Sí</option>
          <option value="no">No</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="descripcion">Descripción *</label>
        <textarea
          id="descripcion"
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          required
          placeholder="Describe al perrito: personalidad, comportamiento, necesidades..."
          rows="4"
        />
      </div>

      {/* Input de archivos */}
      <div className="form-group">
        <label htmlFor="fotos">
          Fotos del perrito * 
          <span className="label-info">(Mínimo 1, máximo 4 fotos - 5MB cada una)</span>
        </label>
        <input
          type="file"
          id="fotos"
          accept="image/jpeg, image/png, image/jpg, image/webp"
          multiple
          onChange={handleFileChange}
          className="file-input"
    
        />
        
        {fotosArchivos.length > 0 && (
          <div className="archivos-info">
            <p className="archivos-count">
              📸 {fotosArchivos.length} de 4 foto(s) seleccionada(s)
            </p>
            <ul className="archivos-lista">
              {fotosArchivos.map((file, index) => (
                <li key={index}>
                  <span className="archivo-nombre">{file.name}</span>
                  <span className="archivo-size">
                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Preview de fotos */}
      {previews.length > 0 && (
        <div className="preview-fotos">
          <h4>Vista previa:</h4>
          <div className="fotos-grid">
            {previews.map((preview, index) => (
              <div key={index} className="preview-item">
                <img 
                  src={preview} 
                  alt={`Preview ${index + 1}`}
                />
                <span className="preview-number">{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <button 
        type="submit" 
        className="btn-submit"
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="spinner"></span>
            Subiendo fotos y guardando...
          </>
        ) : ( isEditMode ? 'actualizar perrito': 'agregar perrito'
       
        )}
      </button>

      {mensaje && <p className="mensaje-exito">{mensaje}</p>}
      {error && <p className="mensaje-error">{error}</p>}
    </form>
  );
}