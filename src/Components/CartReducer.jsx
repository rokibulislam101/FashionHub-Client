export const totalItem = cart => {
  return cart.reduce((total, item) => total + item.quantity, 0);
};

export const totalPrice = cart => {
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.25; // 25% Tax
  return subtotal + tax;
};


const CartReducer = (state, action) => {
  switch (action.type) {
    case 'Add':
      const productIndex = state.findIndex(
        item => item.id === action.product.id
      );
      const quantityToAdd = action.product.quantity || 1;

      if (productIndex >= 0) {
        return state.map((item, index) =>
          index === productIndex
            ? {
                ...item,
                quantity: item.quantity + quantityToAdd,
                activeImage: action.product.activeImage, // update activeImage
                selectedColor: action.product.selectedColor, // update color
                selectedSize: action.product.selectedSize, // update size
              }
            : item
        );
      } else {
        return [
          ...state,
          {
            ...action.product,
            quantity: quantityToAdd,
          },
        ];
      }

    case 'Increase':
      return state.map(item =>
        item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item
      );

    case 'Decrease':
      return state.map(item =>
        item.id === action.id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );

    case 'Remove':
      return state.filter(item => item.id !== action.id);

    case 'CLEAR_CART':
      return [];

    default:
      return state;
  }
};

export default CartReducer;
