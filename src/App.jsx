// import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from './components/Navigation'
import Signin from './components/Signin'
import Box from './components/Box';
import DraggableCard from './components/DraggableCard'
import Home from './components/Home'
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
        <Route path="/about" element={<Box />} />
        <Route path="/products" element={<DraggableCard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
