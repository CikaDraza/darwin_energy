import React, { useEffect, useState } from 'react'
import { Button, Col, Form, ListGroup, Row, Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Slider from "react-slick";
import './ProductDetails.scss'
import axios from 'axios';
import CountQuantity from '../../components/countQuantity/CountQuantity';
import Heart from '../../assets/icons/Heart';

export default function ProductDetails() {
  const { id } = useParams();
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://drawin-server-91eb37274805.herokuapp.com/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchProducts();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: '.slider-nav'
  };

  const settingsThumbs = {
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: false,
    asNavFor: '.slider-for',
    dots: false,
    arrows: false,
    focusOnSelect: true,
    infinite: false,
    speed: 500,
    centerMode: true
  };

  if(!product) {
    return (
      <section>
        <div className='custom-container'>
          <p>
            Product not found
          </p>
          <div>
            <Link href="/">
              <Button>
                back to shop
              </Button>
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section>
      <div className='custom-container'>
        <Row>
          <Col xs={12} md={5}>
            <Slider
            {...settings}
            asNavFor={nav2}
            ref={slider => setNav1(slider)}
            className="slider-for"
            >
              {
                product?.images?.map((img, idx) => (
                  <img
                    key={idx}
                    className="d-flex w-100"
                    src={img.image}
                    alt={`image-${idx}`}
                  />
                ))
              }
            </Slider>
            <Slider
              {...settingsThumbs}
              asNavFor={nav1}
              ref={slider => setNav2(slider)}
              className="slider-nav"
            >
              {
                product?.images?.map((img, idx) => (
                  <div key={idx}>
                    <img src={img.image} alt={`thumbnail-${idx}`} />
                  </div>
                ))
              }
            </Slider>
          </Col>
          <Col xs={12} md={7}>
            <div>
              <div className='d-flex justify-content-between'>
                <h1>{product?.title}</h1>
                <Button variant='outline' className='wishlist-btn'>
                  <Heart /> 
                  <span className='btn-text'>
                    add to wishlist
                  </span>
                </Button>
              </div>
              <p>Article Code: {product?.article?.code}{' '}{product.article?.nr}{' series '}{product?.article?.series}</p>
              <p>{product?.productInfo}</p>
            </div>
            <hr />
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Order Mode</th>
                  <th>Lead Time</th>
                  <th>Stock Available</th>
                  <th>MOQ</th>
                  <th>Package Size</th>
                  <th>Qty</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                  <Form.Check
                    disabled={!product?.stocks?.production ? true : false}
                    type='checkbox'
                    label={`Prodaction Order`}
                  />
                  </td>
                  <td>
                  20 days
                  </td>
                  <td>
                    {product?.stocks?.production}
                  </td>
                  <td>
                    {product?.moq?.production}
                  </td>
                  <td>
                    {
                      product?.packaging?.package_type === 'Production' &&
                      `${product?.packaging?.width}`
                    }
                  </td>
                  <td>
                    <CountQuantity maxItem={product?.stocks?.production} quantityItem={1} item={product} />
                  </td>
                  <td>
                    {
                      product?.packaging?.package_type === 'Production' &&
                      `${product?.packaging?.piecesPer20ft}${'/20ft'}`
                    }
                  </td>
                </tr>
                <tr>
                  <td>
                    <Form.Check
                    disabled={!product?.stocks?.factory ? true : false}
                    type='checkbox'
                    label={`Factory Stock`}
                    />
                  </td>
                  <td>20 days</td>
                  <td>{product?.stocks?.factory}</td>
                  <td>{product?.moq?.factory}</td>
                  <td>
                    {
                      product?.packaging?.package_type === 'Factory' &&
                      `${product?.packaging?.width}x${product?.packaging?.height}x${product?.packaging?.length}`
                    }
                  </td>
                  <td>
                    <CountQuantity maxItem={product?.stocks?.factory} quantityItem={1} item={product} />
                  </td>
                  <td>
                    {
                      product?.packaging?.package_type === 'Factory' &&
                      `${product?.packaging?.piecesPer20ft}${'/20ft'}`
                    }
                  </td>
                </tr>
                <tr>
                  <td>
                    <Form.Check
                      disabled={!product?.stocks?.floating ? true : false}
                      type='checkbox'
                      label={`Floating Stock`}
                    />
                  </td>
                  <td>20 days</td>
                  <td>{product?.stocks?.floating}</td>
                  <td>{product?.moq?.floating}</td>
                  <td>
                    {
                      product?.packaging?.package_type === 'Floating' &&
                      `${product?.packaging?.piecesPer20ft}${'/20ft'}`
                    }
                  </td>
                  <td>
                    <CountQuantity maxItem={product?.stocks?.floating} quantityItem={1} item={product} />
                  </td>
                  <td>{
                      product?.packaging?.package_type === 'Floating' &&
                      `${product?.packaging?.width}x${product?.packaging?.height}x${product?.packaging?.length}`
                    }</td>
                </tr>
                <tr>
                  <td>
                    <Form.Check
                      disabled={!product?.stocks?.eu ? true : false}
                      type='checkbox'
                      label={`EU Warehouse `}
                    />
                  </td>
                  <td>20 days</td>
                  <td>{product?.stocks?.eu}</td>
                  <td>{product?.moq?.eu}</td>
                  <td>
                    {
                      product?.packaging?.package_type === 'EU' &&
                      `${product?.packaging?.width}x${product?.packaging?.height}x${product?.packaging?.length}`
                    }
                  </td>
                  <td>
                    <CountQuantity maxItem={product?.stocks?.eu} quantityItem={1} item={product} />
                  </td>
                  <td>
                    {
                      product?.packaging?.package_type === 'EU' &&
                      `${product?.packaging?.piecesPer20ft}`
                    }
                  </td>
                </tr>
              </tbody>
            </Table>
            <div className='d-flex flex-column add-to-cart-text'>
              <span className='type'>Production Order</span>
              <span className='price'>
                {`EUR ${product?.price?.euro}`}
              </span>
            </div>
            <Button size='lg' className='add-to-cart-btn'>
              ADD TO CART
            </Button>
          </Col>
          <Col>
          </Col>
        </Row>
      </div>
    </section>
  )
}
