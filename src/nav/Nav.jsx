import NavItems from "./NavItem"
import "./nav.css"
import logo from "../assets/logo.svg"
export default function Nav() {
  return (
    <nav className="nav">
        <img src={logo} alt="logo" />
      <NavItems />
    </nav>
  )
}   