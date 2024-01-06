import Products from "../components/products/Products"
import ProductsExample from "../components/products/ProductsExample"

function Home() {

  return (
    <div>
      <section>
        <Products />
      </section>
      <section>
        <ProductsExample />
      </section>
    </div>
  )
}

export default Home
