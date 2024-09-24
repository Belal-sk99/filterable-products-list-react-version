import React, { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faTrash } from '@fortawesome/free-solid-svg-icons';

const products = [
  { name: 'Laptop', category: 'Electronics', price: 899 },
  { name: 'Smartphone', category: 'Electronics', price: 299 },
  { name: 'T-shirt', category: 'Clothing', price: 25 },
  { name: 'Mercedes', category: 'Cars', price: 52000 },
  { name: 'Jeans', category: 'Clothing', price: 60 },
  { name: 'Porsche', category: 'Cars', price: 99000 },
  { name: 'Book: JavaScript Basics', category: 'Books', price: 15 },
  { name: 'Headphones', category: 'Electronics', price: 99 },
  { name: 'Fiat', category: 'Cars', price: 22000 },
  { name: 'Sweater', category: 'Clothing', price: 40 },
  { name: 'Book: Learn Python', category: 'Books', price: 20 },
];

function App() {
  const [displayedProducts, setDisplayedProducts] = useState(products);
  const [isAscSort, setIsAscSort] = useState(true);
  const [sortMethod, setSortMethod] = useState('none');
  const [category, setCategory] = useState('All');

  const handleSort = (selection) => {
    let sortedList = [...displayedProducts];
    switch (selection) {
      case 'price':
        sortedList.sort((a, b) => isAscSort ? a.price - b.price : b.price - a.price);
        break;
      case 'category':
        sortedList.sort((a, b) => isAscSort ? a.category.localeCompare(b.category) : b.category.localeCompare(a.category));
        break;
      case 'name':
        sortedList.sort((a, b) => isAscSort ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
        break;
      default:
        break;
    }
    setDisplayedProducts(sortedList);
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);

    if (selectedCategory === 'All') {
      setDisplayedProducts(products);
    } else {
      const filteredProducts = products.filter(
        (product) => product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
      setDisplayedProducts(filteredProducts);
    }
  };

  const handleSortMethodChange = (e) => {
    const selectedSort = e.target.value;
    setSortMethod(selectedSort);
    handleSort(selectedSort);
  };

  const handleSortOrderToggle = () => {
    setIsAscSort(!isAscSort);
    setDisplayedProducts([...displayedProducts].reverse());
  };

  const handleCategoryClick = (e) => {
    handleCategoryChange(e);
  }

  const handleClearFiltersClick = () => {
    setCategory('All');
    setSortMethod('none')
    setDisplayedProducts(products);
  }

  return (
    <div className="home">
      <h1>Products List</h1>

      <div className="filter-container">
        <label>Filter by Category: </label>
        <select value={category} style={{outline:'none',color:`${category!='All'? '#3c00ff': 'black'}`}} onChange={handleCategoryChange}>
          <option value="All">All</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Books">Books</option>
          <option value="Cars">Cars</option>
        </select>
        
        <FontAwesomeIcon 
          title='Clear Filters and sorting'   
          icon={faTrash} 
          color='red'
          cursor='pointer' 
          className='clear-filters'
          style={{fontSize:'1.2rem', marginLeft:'10px'}}
          onClick={handleClearFiltersClick}
        />
      </div>

      <div className="sort-container">
        <label>Sort by: </label>
        <select value={sortMethod} style={{outline:'none',fontWeight:`${sortMethod!='none'? 'bold': 'normal'}`,color:`${sortMethod!='none'? '#3c00ff': 'black'}`}} onChange={handleSortMethodChange}>
          <option value="none">None</option>
          <option value="price">Price</option>
          <option value="category">Category</option>
          <option value="name">Name</option>
        </select>
        
        <button onClick={handleSortOrderToggle}>
          {isAscSort ? 'A-Z ↑' : 'Z-A ↓'}
        </button>
      </div>

      <div className="product-container">
        {displayedProducts.map((product, index) => (
          <div key={index} className="product-card">
            <h2 className="product-name">{product.name}</h2>
            <p className="product-price">${product.price}</p>
            <button value={product.category} className="product-category" onClick={handleCategoryClick}> {product.category} </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
