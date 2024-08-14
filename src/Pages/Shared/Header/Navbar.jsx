import addToCart from '../../../assets/Images/shopping-bag.png';
import './Navbar.css';

const Navbar = () => {
  return (
    <div>
      <div className="Navbar flex p-10 py-5 sm:px-20 justify-between items-center shadow">
        <h2 className="text-[#0D3356] text-3xl font-bold italic">
          FashionHub
        </h2>
        <div
          className="relative bg-[#F5F1EE] rounded-full p-3"
          style={{ width: '2.5rem' }}
          // onClick={handleOpenModal}
        >
          <img
            src={addToCart}
            alt="Add to Cart"
            className="cursor-pointer"
            style={{ width: '100%' }}
          />
          <span className="badge-count  font-semibold">0</span>
        </div>
      </div>
    </div>
  );
}

export default Navbar
