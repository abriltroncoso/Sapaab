import './App.css'
import Nav from './nav/Nav.jsx'
import Adopta from './adopta-tu-primer-callejerito/Adopta.jsx'
import PorqueAdoptar from './porque-adoptar/PorqueAdoptar.jsx'
import EllosTeNecesitan from './ellos-te-necesitan/EllosTeNecesitan.jsx'
import Footer from './footer/Footer.jsx'
function App() {
  return (
    <div className="App">
      <Nav />
      <Adopta />
      <PorqueAdoptar />
      <EllosTeNecesitan />
      <Footer />
    </div>
  )
}

export default App
