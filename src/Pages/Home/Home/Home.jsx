import Banner from "../Banner/Banner"
import Product from "../Product/Product"

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <div className="m-10 mx-5">
        <Product></Product>
      </div>
    </div>
  );
}

export default Home
