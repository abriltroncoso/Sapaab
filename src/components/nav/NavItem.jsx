import "./nav.css"
import { Link } from "react-router-dom";
export default function NavItems(){
    return (
            <ul className="navItems">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/como-ayudar">Como Ayudar</Link></li>
            <li>El refugio</li>
            <button className="btn-donar">¡Dona ahora!</button>
            <li>
                <Link to="/perritos">
                    <button className="btn-quiero-adoptar">¡Quiero Adoptar!</button>
                </Link>
            </li>
        </ul>

);
}

