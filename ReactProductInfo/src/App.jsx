import React from 'react';
import './App.css'; // Optional: for separate CSS file

// Product component to display individual product information
const ProductInfo = ({ product, isAboveAvg, priceLabel, showPriceComparison = false }) => {
  const getStatusColor = () => product.status ? '#10b981' : '#ef4444';
  const getPriceComparisonColor = () => isAboveAvg ? '#dc2626' : '#059669';

  return (
    <div className="product-card">
      <div className="product-header">
        <h3 className="product-name">{product.name}</h3>
        <span 
          className="status-badge"
          style={{ backgroundColor: getStatusColor() }}
        >
          {product.status ? 'Available' : 'Out of Stock'}
        </span>
      </div>
      
      <div className="product-price">
        Rs {product.price.toLocaleString()}
      </div>

      {showPriceComparison && isAboveAvg !== undefined && (
        <div 
          className="price-comparison"
          style={{ color: getPriceComparisonColor() }}
        >
          {isAboveAvg ? '▲ Above Average' : '▼ Below Average'}
        </div>
      )}
      
      {priceLabel && (
        <div className="price-label">
          {priceLabel}
        </div>
      )}
    </div>
  );
};

// Section Header Component for better organization
const SectionHeader = ({ title, description, count }) => (
  <div className="section-header">
    <div className="section-title-container">
      <h2>{title}</h2>
      {count !== undefined && (
        <span className="count-badge">{count} items</span>
      )}
    </div>
    {description && <p className="section-description">{description}</p>}
  </div>
);

function App() {
  const products = [
    { id: 1, name: "Laptop", price: 80000, status: true },
    { id: 2, name: "Mobile", price: 50000, status: false },
    { id: 3, name: "AirPods", price: 15000, status: true },
    { id: 4, name: "Tablet", price: 45000, status: true },
    { id: 5, name: "Apple Watch", price: 35000, status: true },
    { id: 6, name: "Android Phone", price: 25000, status: false },
    { id: 7, name: "Amplifier", price: 60000, status: true },
  ];

  // Helper function to calculate average price
  const calculateAverage = (productsArray) => {
    const sum = productsArray.reduce((total, product) => total + product.price, 0);
    return sum / productsArray.length;
  };

  // Data transformations
  const averagePrice = calculateAverage(products);
  const sortedByPriceLowHigh = [...products].sort((a, b) => a.price - b.price);
  const expensiveProductsHighLow = products
    .filter(product => product.price > 45000)
    .sort((a, b) => b.price - a.price);
  const productsWithIncreasedPrice = products.map(product => ({
    ...product,
    price: Math.round(product.price * 1.1)
  }));
  const productsStartingWithA = products.filter(product => 
    product.name.toLowerCase().startsWith('a')
  );
  const top3MostExpensive = [...products]
    .sort((a, b) => b.price - a.price)
    .slice(0, 3);
  const productsWithAverageLabel = products.map(product => ({
    ...product,
    priceLabel: product.price > averagePrice ? 'Above Average' : 'Below Average'
  }));

  return (
    <div className="app">
      <header className="app-header">
        <h1>Product Management Dashboard</h1>
        <p className="app-subtitle">Comprehensive product analysis and filtering</p>
      </header>

      <main className="main-content">
        {/* Task 1 */}
        <section className="dashboard-section">
          <SectionHeader 
            title="All Products Sorted by Price (Low to High)"
            description="All available products organized from lowest to highest price"
            count={sortedByPriceLowHigh.length}
          />
          <div className="products-grid">
            {sortedByPriceLowHigh.map((product) => (
              <ProductInfo key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Task 2 */}
        <section className="dashboard-section">
          <SectionHeader 
            title="Premium Products (Price > ₹45,000)"
            description="High-end products sorted by price in descending order"
            count={expensiveProductsHighLow.length}
          />
          <div className="products-grid">
            {expensiveProductsHighLow.map((product) => (
              <ProductInfo key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Task 3 */}
        <section className="dashboard-section">
          <SectionHeader 
            title="Products with 10% Price Increase"
            description="Updated prices reflecting a 10% increase across all products"
            count={productsWithIncreasedPrice.length}
          />
          <div className="products-grid">
            {productsWithIncreasedPrice.map((product) => (
              <ProductInfo key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Task 4 */}
        <section className="dashboard-section">
          <SectionHeader 
            title="Products Starting with 'A'"
            description="Products filtered by names beginning with the letter A"
            count={productsStartingWithA.length}
          />
          <div className="products-grid">
            {productsStartingWithA.map((product) => (
              <ProductInfo key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Task 5 */}
        <section className="dashboard-section">
          <SectionHeader 
            title="Top 3 Most Expensive Products"
            description="The three highest-priced items in our catalog"
            count={top3MostExpensive.length}
          />
          <div className="products-grid">
            {top3MostExpensive.map((product) => (
              <ProductInfo key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Task 6 */}
        <section className="dashboard-section">
          <SectionHeader 
            title="Price Comparison Analysis"
            description={`Products categorized based on average price (₹${Math.round(averagePrice).toLocaleString()})`}
            count={productsWithAverageLabel.length}
          />
          <div className="products-grid">
            {productsWithAverageLabel.map((product) => (
              <ProductInfo 
                key={product.id} 
                product={product} 
                isAboveAvg={product.price > averagePrice}
                priceLabel={product.priceLabel}
                showPriceComparison={true}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
















// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
