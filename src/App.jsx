import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/nav/Nav.jsx'
import Footer from './components/footer/Footer.jsx'
import ListaPerritos  from './pages/ListaPerritos.jsx'
import DetallePerrito from './pages/DetallePerrito.jsx' 
import  ComoAyudar  from './pages/ComoAyudar.jsx'
import Home from './pages/Home.jsx'
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Nav />
        
        <Routes>
          {/* Ruta principal - tu página actual */}
          <Route path="/" element={<Home />} />
          
          {/* Ruta para ver todos los perritos */}
          <Route path="/perritos" element={<ListaPerritos />} />
          
          {/* Ruta para ver el detalle de un perrito específico */}
          <Route path="/perrito/:id" element={<DetallePerrito  /> } />

           <Route path="/como-ayudar" element={<ComoAyudar />} />

        </Routes>
        
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
