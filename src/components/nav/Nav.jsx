import { useState } from "react"
import NavItems from "./NavItem"
import "./nav.css"
import logo from "../../assets/logo.svg"

export default function Nav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav className="nav">
        <img src={logo} alt="logo" />
        
        {/* Hamburger button */}
        <button className="hamburger" onClick={toggleMenu} aria-label="Toggle menu">
          <span className={isMenuOpen ? "open" : ""}></span>
          <span className={isMenuOpen ? "open" : ""}></span>
          <span className={isMenuOpen ? "open" : ""}></span>
        </button>
        
        {/* Nav items with conditional class */}
        <div className={`nav-items-wrapper ${isMenuOpen ? "open" : ""}`}>
          <NavItems />
        </div>
    </nav>
  )
}   