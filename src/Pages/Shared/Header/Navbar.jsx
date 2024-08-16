import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import addToCart from '../../../assets/Images/shopping-bag.png';
import noBag from '../../../assets/Images/noShopping-bag.png';
import './Navbar.css';
import { CartContext } from '../../../Components/ContextProvider';
import { Link } from 'react-router-dom';
import { totalItem, totalPrice } from '../../../Components/CartReducer';
import CartModal from '../Cartmodal/CartModal';

const Navbar = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { cart } = useContext(CartContext);

  const handleOpenModal = () => {
    setModalIsOpen(true);
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <div className="Navbar flex p-10 py-5 sm:px-20 justify-between items-center shadow">
        <Link to="/">
          <h2 className="text-[#0D3356] text-3xl font-bold italic">
            FashionHub
          </h2>
        </Link>
        <div
          className="relative bg-[#F5F1EE] rounded-full p-3"
          style={{ width: '2.5rem' }}
          onClick={handleOpenModal}
        >
          <img
            src={addToCart}
            alt="Add to Cart"
            className="cursor-pointer"
            style={{ width: '100%' }}
          />
          <span className="badge-count font-semibold">{totalItem(cart)}</span>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel="Cart Modal"
        className="Modal"
        overlayClassName="Overlay"
      >
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-xl font-mono">Shopping Cart</h3>
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost text-xl"
            onClick={handleCloseModal}
          >
            ✕
          </button>
        </div>
        <hr style={{ marginTop: '2px' }} />
        <div>
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center mt-10">
              <div className="bg-slate-200 p-2 rounded-full overflow-hidden">
                <img className="w-12 translate-y-3" src={noBag} alt="" />
              </div>
              <p className="py-4 text-sm font-semibold text-center">
                No products in the Cart
              </p>
            </div>
          ) : (
            <div className="mt-4">
              {cart.map((product, index) => (
                <CartModal key={index} product={product} />
              ))}
              <div className="flex justify-center">
                <Link to="/Checkout">
                  <button
                    className="text-center w-fit px-16 h-11 rounded-full bg-[#3A4980] text-white font-semibold mt-2"
                    onClick={handleCloseModal}
                  >
                    ${totalPrice(cart)} Buy Now
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default Navbar;
