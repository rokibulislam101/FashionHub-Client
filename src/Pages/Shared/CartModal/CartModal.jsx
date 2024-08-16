import React, { useContext } from 'react';
import { CartContext } from '../../../Components/ContextProvider';

const CartModal = ({ product }) => {
  const { dispatch } = useContext(CartContext);

  const Increase = id => {
    dispatch({ type: 'Increase', id });
  };

  const Decrease = id => {
    dispatch({ type: 'Decrease', id });
  };

  const Remove = id => {
    dispatch({ type: 'Remove', id });
  };

  return (
    <div className="my-3">
      <div className="flex items-center justify-between gap-1">
        <div className="flex items-center gap-1">
          <span
            className="text-xl font-extrabold"
            onClick={() => Remove(product.id)}
          >
            ×
          </span>
          <img
            src={product.activeImage}
            alt="Selected Product"
            className="w-16 h-20 object-cover rounded-lg"
          />
        </div>
        <div>
          <h2 className="text-lg font-semibold">{product.name}</h2>
          <p className=" text-[#B9BBBF] mb-2">{product.subtitle}</p>
          <div className="flex items-center gap-3">
            <span
              className="inline-block w-8 h-8 rounded-full"
              style={{ backgroundColor: product.selectedColor }}
            ></span>
            <span className="text-[#726C6C] w-fit h-fit font-semibold bg-[#F3F3F3] rounded-md px-2 py-1">
              {product.selectedSize}
            </span>
          </div>
        </div>
        <div className="flex w-fit h-fit items-center bg-[#F3F3F3] px-2.5 py-2 rounded-full">
          <button
            className="font-bold text-xl text-[#726C6C]"
            onClick={() => Decrease(product.id)}
          >
            -
          </button>
          <input
            type="text"
            value={product.quantity}
            readOnly
            className="w-12 text-center text-[#3A4980] font-bold bg-[#F3F3F3]"
          />
          <button
            className="font-bold text-xl text-[#3A4980]"
            onClick={() => Increase(product.id)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartModal;
