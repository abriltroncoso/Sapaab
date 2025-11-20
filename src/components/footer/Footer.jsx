import gmailIcon from '../../assets/gmail.svg';
import instaframIcon from '../../assets/instagram.svg';
import facebookIcon from '../../assets/facebook.svg';
import './footer.css';

export default function Footer(){
    return(
        <footer className="footer">
            <p>© 2024 Sapaab Refugio. Todos los derechos reservados.</p>
            <div className='icons'>
                <img src={gmailIcon} alt="gmail icon" onClick={() =>
    window.open(
      "https://mail.google.com/mail/?view=cm&to=sapaab.bolivar.2020@gmail.com.com&su=Consulta&body=Hola! Quería hacer una consulta...",
      "_blank"
    )
  }/>
                <img src={instaframIcon} alt="instagram icon"  onClick={() => window.open("https://www.instagram.com/direct/t/sapaab_bolivar/", "_blank")}/>
                <img src={facebookIcon} alt="facebook icon"  onClick={() => window.open("https://www.facebook.com/sapaabbolivar", "_blank")} />
            </div>        
        </footer>
    )
}