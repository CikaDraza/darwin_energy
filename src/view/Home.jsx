import { Col, Container, Row } from "react-bootstrap"
import SectionFourColumn from "../components/SectionFourColumn/SectionFourColumn"
import '../layouts/DarwinLayouts.scss'

function Home() {

  return (
    <div>
      <section className="hero">
        <div className="custom-container">
        <Container fluid>
          <Row>
            <Col xs={12} md={6} xxl={7}>
              <span className="hero-caption">We build products of the future</span>
              <h1 className="hero-heading">
                Explore Our Diverse Range of Renewable Energy Innovation
              </h1>
            </Col>
            <Col xs={12} md={6} xxl={5}>
              <img src="/images/solar_panel_image.png" alt="solar panel" />
            </Col>
          </Row>
        </Container>
          {/*<div className="hero__row">
            <div className="hero__column-left">
              <span className="hero-caption">We build products of the future</span>
              <h1 className="hero-heading">
                Explore Our Diverse Range of Renewable Energy Solutions
              </h1>
            </div>
            <div className="hero__column-right">
              <img src="/images/solar_panel_image.png" alt="solar panel" />
            </div>
  </div>*/}
        </div>
      </section>
      <section className="intro">
        <div className="custom-container">
          <div className="intro__row">
            <div className="intro__column heading">
              <h2 className="heading">
                WHY DARWIN?
              </h2>
            </div>
            <div className="intro__column">
              <p className="text">At Darwin Energy, we are dedicated to pioneering the future of renewable energy. Our diverse array of products caters to both individual and commercial needs, ensuring that sustainable energy solutions are accessible to all. From cutting-edge solar modules to intelligent energy monitoring systems, our portfolio is designed to meet the evolving demands of the renewable energy sector.</p>
            </div>
            <div className="intro__column text">
              <p className="text">In our collection, you'll find state-of-the-art ERP systems tailored for renewable energy companies, ensuring seamless operations and efficiency. Our high-tech solar modules lead the industry in performance and durability. For urban spaces, we've innovated renewable energy outdoor furniture - a blend of design and functionality. For electric vehicle owners, our high-quality EV charger stations offer fast, reliable charging solutions.</p>
            </div>
          </div>
          <div className="intro__row">
            <div className="intro__column">
              <h2 className="heading">
                WHAT DO WE GIVE YOU?
              </h2>
            </div>
            <div className="intro__column">
              <p className="text">At Darwin Energy, we are dedicated to pioneering the future of renewable energy. Our diverse array of products caters to both individual and commercial needs, ensuring that sustainable energy solutions are accessible to all. From cutting-edge solar modules to intelligent energy monitoring systems, our portfolio is designed to meet the evolving demands of the renewable energy sector.</p>
            </div>
            <div className="intro__column">
              <p className="text">In our collection, you'll find state-of-the-art ERP systems tailored for renewable energy companies, ensuring seamless operations and efficiency. Our high-tech solar modules lead the industry in performance and durability. For urban spaces, we've innovated renewable energy outdoor furniture - a blend of design and functionality. For electric vehicle owners, our high-quality EV charger stations offer fast, reliable charging solutions.</p>
            </div>
          </div>
        </div>
      </section>
      <section>
        <SectionFourColumn />
      </section>
    </div>
  )
}

export default Home
