import img from '../assets/perrita-castracion.jpg'
import img2 from '../assets/castraciones-2.jpg'
import './castracion.css'
export default function Castraciones(){
   return (
        <div className="castraciones-container">

            {/* Sección 1 */}
            <div className="castracion-section">
                <div className="texto">
                    <h2>Jornadas de castraciones masivas</h2>
                    <h3>Cuidar su salud nunca fue tan fácil. Con tu ayuda podemos evitar más sufrimiento y reducir la sobrepoblación.</h3>
                    <h3>Si conocés alguna perra sin familia, escribinos para coordinar su lugar en la próxima jornada.</h3>
                    <h3>Además ofrecemos servicio de traslado para quienes no puedan llevarlas por sus propios medios, sujeto a disponibilidad.</h3>
                    <button
                    className="btn-whatsapp"
                    onClick={() =>
                        window.open("https://wa.me/5492314412280?text=Hola!%20Quiero%20hacer%20una%20consulta", "_blank")
                    }
                    >
                    <i className="fa-brands fa-whatsapp"></i>
                    Contactar por WhatsApp
                    </button>
                </div>

                <div className="imagen">
                    <img src={img} alt="perrita castración" />
                </div>
            </div>


        </div>
    );
}