import "./nav.css"
import { Link } from "react-router-dom";
export default function NavItems(){
    return (
            <ul className="navItems">
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/como-ayudar">Como Ayudar</Link></li>
            <li><Link to="/castraciones">castraciones</Link></li>
            <li className="no-underline">
                <Link to="/perritos">
                    <button className="btn-quiero-adoptar">¡Quiero Adoptar!</button>
                </Link>
            </li>
        </ul>

);
}

