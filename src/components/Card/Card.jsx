import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

function ProductCard() {
  return (
    <Card className='my-2' style={{ width: '100%' }}>
      <Card.Img variant="top" src="/images/solar_panel_image.png" />
      <Card.Body>
        <Card.Title className='mb-3'>Solar Panel Model Name 235</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Article Code: 2024587</Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted fs-2">325 - 350 EUR</Card.Subtitle>
        <ListGroup className='mb-2' variant="flush">
          <ListGroup.Item className='d-flex justify-content-between'><span>Now Available</span><span>152 pcs</span></ListGroup.Item>
          <ListGroup.Item className='d-flex justify-content-between'><span>As of 20.feb </span><span>152 pcs</span></ListGroup.Item>
          <ListGroup.Item className='d-flex justify-content-between'><span>As of 15.mar</span><span>252 pcs</span></ListGroup.Item>
        </ListGroup>
        <Button className='w-100' variant="primary">Add to cart</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;