import SectionFourColumn from "../components/SectionFourColumn/SectionFourColumn"
import Products from "../components/products/Products"
import ProductsExample from "../components/products/ProductsExample"
import ProductsExample2 from "../components/products/ProductsExample2"

function Home() {

  return (
    <div>
      <section>
        <Products />
      </section>
      <section>
        <ProductsExample />
      </section>
      <section>
        <ProductsExample2 />
      </section>
      <section>
        <SectionFourColumn />
      </section>
    </div>
  )
}

export default Home
