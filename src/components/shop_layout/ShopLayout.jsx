import React, { useEffect, useState } from 'react'
import './ShopLayout.scss'
import Select from '../select/Select'
import ViewButtons from '../toggle_button/ViewButtons'
import Card from '../Card/Card'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import FilterBrand from '../filterBrand/FilterBrand'
import CloseButton from 'react-bootstrap/CloseButton';

export default function ShopLayout() {
  const [products, setProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://drawin-server-91eb37274805.herokuapp.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    fetchBrands();
  }, [])

  const fetchProductsByBrand = async (brand) => {
    try {
      const response = await axios.get(`https://drawin-server-91eb37274805.herokuapp.com/products?brand=${brand}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const handleBrandChange = async (selectedBrand) => {
    const filteredProducts = await fetchProductsByBrand(selectedBrand);
    setProducts(filteredProducts);
    setSelectedBrand(selectedBrand);
  };

  const fetchBrands = async () => {
    try {
      const { data } = await axios.get('https://drawin-server-91eb37274805.herokuapp.com/products/count_brands');
      setBrands(data);
    } catch (error) {
      console.error("Error fetching brands", error);
    }
  }
console.log(selectedBrand);
  return (
    <div className="row_shop">
      <header>
        <div className="row">
          <div className="column title">
            <h2>Shop Nendo</h2>
          </div>
          <div className="column sort">
            <Select />
          </div>
          <div className="column view">
            <ViewButtons />
          </div>
        </div>
      </header>
      <aside className="column_shop column_shop--left">
        {
          selectedBrand.length !== 0 &&
          <button onClick={() => handleBrandChange('')} className='chips'>
            {selectedBrand}
            <CloseButton color='primary' />
          </button>
        }
        
        <FilterBrand brands={brands} handleBrandChange={handleBrandChange} selectedBrand={selectedBrand} setSelectedBrand={setSelectedBrand} />
      </aside>
      <div className="column_shop column_shop--right">
        <Container fluid>
          <Row>
          {
          products.map(product => (
            <Col key={product._id} xs={12} md={6} lg={4} xxl={3}>
              <Card product={product} />
            </Col>
          ))
          }
          </Row>
        </Container>
      </div>
    </div>
  )
}
