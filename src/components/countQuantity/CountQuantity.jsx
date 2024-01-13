import * as React from 'react';
import axios from 'axios';
import { Button, Form } from 'react-bootstrap';

export default function CountQuantity({size, maxItem, quantityItem, item}) {
  const min = 1;
  const max = maxItem;

  const handleChange = async (item, quantity) => {
    console.log(quantity < 1 ? Math.max(quantity, min) : Math.min(quantity, max));
    console.log(Number(quantity), min, max);
    // const { data } = await axios.get(`/products/${item._id}`)
    if(max <= 0) {
      return;
    }    
  };

  async function incrementItem(item) {
    console.log(item);
    // const { data } = await axios.get(`/products/${item._id}`)
    if(max <= 0) {
      return;
    }
  }

  async function decrementItem(item) {
    console.log(item);

    // const { data } = await axios.get(`/products/${item._id}`)
    if(max <= 0) {
      return;
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <Button
        size="sm"
        style={{ width: '4ch', backgroundColor: 'transparent', color: 'black' }}
        aria-label="reduce"
        onClick={() => {
          decrementItem(item)
        }}
      >
        -
      </Button>
      <div style={{ width: '7ch' }}>
      <Form.Control
        type="number"
        id="qty"
        value={quantityItem}
        onChange={(e) => handleChange(item, e.target.value)}
        style={{height: size ? '1.75em' : '2em', border: 'none', backgroundColor: 'transparent'}}
      />
      </div>
      <Button
        style={{ width: '4ch', backgroundColor: 'transparent', color: 'black' }}
        size="sm"
        aria-label="increase"
        onClick={() => {
          incrementItem(item)
        }}
      >
        +
      </Button>
    </div>
  );
}