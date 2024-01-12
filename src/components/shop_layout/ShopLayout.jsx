import React from 'react'
import './ShopLayout.scss'
import Select from '../select/Select'
import ViewButtons from '../toggle_button/ViewButtons'
import Card from '../Card/Card'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function ShopLayout() {
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
        <p>filters</p>
      </aside>
      <div className="column_shop column_shop--right">
        <Container fluid>
          <Row>
            <Col lg={4} xl={3}>
              <Card />
            </Col>
            <Col lg={4} xl={3}>
              <Card />
            </Col>
            <Col lg={4} xl={3}>
              <Card />
            </Col>
            <Col lg={4} xl={3}>
              <Card />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}
