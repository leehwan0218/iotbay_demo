import React, { useState } from 'react';
import { Link } from 'react-router-dom'

// import images here
import GPU from '../pages/Images/GPU.png';
import SSD from '../pages/Images/SSD.png';
import RAM from '../pages/Images/RAM.png';
import HDD from '../pages/Images/HDD.png';
import CPU from '../pages/Images/CPU.png';
import MOTHERBOARD from '../pages/Images/MBD.png';

export default function HardwareHome() {
    const [searchTerm, setSearchTerm] = useState('');
    const [showFiltered, setShowFiltered] = useState(false); 
  
    const allProducts = [
      { name: "Graphics Card", image: GPU, price: "$499.99" },
      { name: "SSD", image: SSD, price: "$92" },
      { name: "RAM", image: RAM, price: "$69" },
      { name: "Hard-Drive", image: HDD, price: "$50" },
      { name: "CPU", image: CPU, price: "$289.99" },
      { name: "Motherboard", image: MOTHERBOARD, price: "$99.99" },
    ];
  
    const handleSearch = () => {
      setShowFiltered(true);
    };
  
    const filteredProducts = showFiltered
      ? allProducts.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : allProducts;  

  return (
    <main>
      <body className='mainHomeCSS'>
          <p class="hometext">Hardware Home</p>
          <div class="search-bar">
        <input 
          type="text" 
          placeholder="Search..." 
          name="search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)} 
        />
        <button type="button" onClick={handleSearch}>Search</button> {/* Changed to type="button" */}
      </div>

      <div class="product-grid">
        {filteredProducts.map(product => (
          <div className="product" key={product.name}>
            <img src={product.image} alt="IoTBay" className="product-image"></img>
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </div> 
          </div>
        ))}
      </div>
      
        </body>
        <footer class="site-footer">
        <div class="footer-content">
            <p>&copy; 2024 ISD Vantablack</p> 
            <ul class="footer-links">
                <li><a href="/aboutus">About Us</a></li>
                <li><a href="#">Contact</a></li>
                <li><a href="#">Terms</a></li>
                <li><a href="/adminPage">Admin Login</a></li>
            </ul>
        </div>
    </footer>
        </main>

  )
}
