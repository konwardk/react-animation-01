// import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from './components/Navigation'
import Signin from './components/Signin'
import Home from './Pages/Home'
import Product from './Pages/Product';
import About from './Pages/About';
function App() {
function Contact() {
  return <h1>Contact Page</h1>;
}

  return (
    <>
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Product />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
