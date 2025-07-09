import React from 'react'
import { Routes, Route } from 'react-router-dom'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Product from './pages/Product.jsx'
import Home from './pages/Home.jsx'
import Header from './components/Header.jsx'

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
       <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </div>
  )
}

export default App
