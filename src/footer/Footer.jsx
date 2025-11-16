import gmailIcon from '../assets/gmail.svg';
import instaframIcon from '../assets/instagram.svg';
import facebookIcon from '../assets/facebook.svg';
import './footer.css';

export default function Footer(){
    return(
        <footer className="footer">
            <p>© 2024 Sapaab Refugio. Todos los derechos reservados.</p>
            <div className='icons'>
                <img src={gmailIcon} alt="gmail icon" />
                <img src={instaframIcon} alt="instagram icon" />
                <img src={facebookIcon} alt="facebook icon" />
            </div>        
        </footer>
    )
}