import perrito from '../../assets/perrito-portada.svg';
import perritos from '../../assets/dupla-perritos.svg';
import './adopta.css';
import { useNavigate } from 'react-router-dom';

export default function Adopta() {
  const navigate = useNavigate();

  const handleConoceCallejeritos = () => {
    navigate('/perritos');
  };
  return (
    <div className="adopta-container">  
        <div className="info">
            <h2>Adopta tu primer callejerito</h2>
            <h4>Conoce a los perritos que buscan una familia y un nuevo hogar</h4>
            <button className="btn-adoptar-ahora" onClick={handleConoceCallejeritos}>Conoce a los callejeritos</button>
        </div>

        <div className="perritos">
            <img src={perrito} alt="perrito feliz" />
            <img src={perritos} alt="dos perritos felices" />
        </div>
        
    </div>
  );
}