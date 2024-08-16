import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { useContext, useEffect, useState } from 'react';
import arrayLeft from '../../../assets/Images/left.png';
import arrayRight from '../../../assets/Images/right.png';
import vector from '../../../assets/Images/star.png';
import review from '../../../assets/Images/dots.png';
import Check from '../../../assets/Images/CheckIcon.png';
import './Product.css';
import { CartContext } from '../../../Components/ContextProvider';

const Product = () => {
  const axiosPublic = useAxiosPublic();
  const [products, setProducts] = useState(null); // Initially null
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  const { dispatch } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosPublic.get('/product');
        if (response.data.length > 0) {
          setProducts(response.data);
          setActiveImage(response.data[0]?.images?.[0] || '');
          setSelectedSize(response.data[0]?.sizes?.[0] || '');
          setSelectedColor(response.data[0]?.colors?.[0] || '');
        }
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Unable to load products. Please try again later.');
      }
    };

    fetchProducts();
  }, [axiosPublic]);

  const rating = product => {
    if (
      !product ||
      typeof product.rating !== 'number' ||
      product.rating < 0 ||
      product.rating > 5
    ) {
      return 0;
    }

    const ratingPercentage = (product.rating / 5) * 100;
    return ratingPercentage.toFixed(1);
  };



  const handleImageClick = (img, index) => {
    setActiveImage(img);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (products?.[0]?.images?.length) {
      const newIndex = (currentIndex + 1) % products[0].images.length;
      setActiveImage(products[0].images[newIndex]);
      setCurrentIndex(newIndex);
    }
  };

  const handlePrev = () => {
    if (products?.[0]?.images?.length) {
      const newIndex =
        (currentIndex - 1 + products[0].images.length) %
        products[0].images.length;
      setActiveImage(products[0].images[newIndex]);
      setCurrentIndex(newIndex);
    }
  };

  const increaseQuantity = () => setQuantity(prevQuantity => prevQuantity + 1);
  const decreaseQuantity = () =>
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));

  const totalPrice = (product, quantity) => {
    if (!product) return 0;
    const subtotal = product.price * quantity;
    const tax = subtotal * 0.25; // 25% Tax
    return (subtotal + tax).toFixed(2);
  };

  const addToCart = () => {
    if (products && products[0]) {
      dispatch({
        type: 'Add',
        product: {
          ...products[0],
          activeImage,
          selectedColor,
          selectedSize,
          quantity,
        },
      });
    }
  };

  if (error) return <p>{error}</p>;
  if (!products) return <p>Loading...</p>; // Handle loading state

  const product = products[0]; // Assuming the first product is displayed
  const { Description } = product || {};

  return (
    <div>
      <div className="flex justify-center">
        <div className="w-full sm:flex xl:px-24 space-y-7 gap-10 lg:gap-20">
          <div className="w-full sm:w-1/2">
            {/* Large Active Image */}
            <div className="relative">
              <img
                src={activeImage}
                alt="Selected Product"
                className="w-full h-[500px] object-cover rounded-lg"
              />
            </div>

            {/* Thumbnails with Carousel Controls */}
            <div className="flex justify-center items-center mt-4 gap-3 relative">
              <button
                onClick={handlePrev}
                className="absolute left-0 bg-gray-100 p-2 rounded-full"
              >
                <img src={arrayLeft} alt="Previous" />
              </button>

              <div className="flex space-x-2">
                {product?.images?.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageClick(img, index)}
                    className={`rounded-md border ${
                      activeImage === img
                        ? 'border-[#0D3356]'
                        : 'border-gray-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-fit h-[120px] object-cover rounded-md"
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={handleNext}
                className="absolute right-0 bg-gray-100 p-2 rounded-full"
              >
                <img src={arrayRight} alt="Next" />
              </button>
            </div>
          </div>

          {/* Product Details */}
          <div>
            <h1 className="text-3xl font-bold">
              {product?.name || 'No Name Available'}
            </h1>
            <h2 className="text-md text-[#B9BBBF] my-2">
              {product?.subtitle || ''}
            </h2>
            <hr className="my-5" />

            <div className="flex items-center space-x-14">
              <span className="text-4xl font-bold text-[#0D3356]">
                ${product?.price || 0}
              </span>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="bg-[#FBF3EA] px-2 py-1 rounded-full flex items-center space-x-1">
                    <img src={vector} alt="star" className="w-4 h-4" />
                    <span className="text-yellow-600 font-semibold">
                      {product?.rating || 0}
                    </span>
                  </div>
                  <div className="bg-[#EDF0F8] px-2 py-1 rounded-full flex items-center space-x-1">
                    <img src={review} alt="review" className="w-4 h-4" />
                    <span className="text-[#0D3356] font-semibold">
                      67 Reviews
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-green-600 text-sm font-medium">
                    {rating(product)}%
                  </span>
                  <span className="text-[#B9BBBF] text-sm">
                    of buyers have recommended this.
                  </span>
                </div>
              </div>
            </div>
            <hr className="my-5" />

            {/* Color Selection */}
            <div className="space-y-3">
              <p className="text-md text-[#B9BBBF]">Choose a Color</p>
              <div className="flex space-x-3">
                {product?.colors?.map((color, index) => (
                  <div
                    key={index}
                    className={`h-8 w-8 rounded-full border cursor-pointer relative ${
                      selectedColor === color
                        ? 'border-gray-300'
                        : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  >
                    {selectedColor === color && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          className="w-5 h-5 text-white"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <hr className="my-5" />

            {/* Size Selection */}
            <div className="space-y-2">
              <p className="text-md text-[#B9BBBF]">Choose a Size</p>
              <div className="flex flex-wrap gap-2">
                {product?.sizes?.map((size, index) => (
                  <div
                    key={index}
                    className={`flex items-center p-2 rounded cursor-pointer ${
                      selectedSize === size
                        ? 'bg-[#E0E7F1] text-[#3A4980]'
                        : 'bg-[#F3F3F3] text-[#3A4980]'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    <input
                      type="radio"
                      id={`size-${index}`}
                      name="size-option"
                      checked={selectedSize === size}
                      onChange={() => setSelectedSize(size)}
                      className="mr-2"
                      style={{
                        accentColor:
                          selectedSize === size ? '#3A4980' : '#B9BBBF',
                      }}
                    />
                    <label
                      htmlFor={`size-${index}`}
                      className="font-semibold text-sm"
                    >
                      {size}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <hr className="my-5" />

            {/* Quantity and Add to Cart */}
            <div className="flex space-x-4">
              <div className="flex w-fit font-semibold items-center bg-[#F3F3F3] space-x-1 px-1 rounded-full">
                <button
                  className="px-3 py-1 text-xl"
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button
                  className="px-3 py-1 text-xl"
                  onClick={increaseQuantity}
                >
                  +
                </button>
              </div>
              <button
                onClick={addToCart}
                className="bg-[#3A4980] text-white font-semibold py-2 px-7 rounded-full hover:bg-[#2C3771] transition duration-300"
              >
                ${totalPrice(product, quantity)} Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Description */}
      <div className="mt-10 sm:mx-10 xl:mx-20">
        <h3 className="text-[#0D3356] text-lg font-medium">Description</h3>
        <div className="relative mt-2">
          <hr className="border-gray-300 border-2" />
          <div
            className="absolute left-0 top-0 h-0.5 bg-[#0D3356]"
            style={{ width: '10%' }}
          ></div>
        </div>
      </div>
      <div className="m-5 sm:mx-16 xl:mx-28 sm:mr-20 xl:mr-80">
        <div className="description-container">
          <h3 className="text-lg font-bold">Product Description</h3>
          <p className="text-sm text-[#667085] mt-3">
            {Description?.['Product Description'] || 'No Description Available'}
          </p>
        </div>

        {/* Benefits Section */}
        <div className="benefits-container mt-5">
          <h3 className="text-lg font-bold">Benefits</h3>
          <ul className="text-sm space-y-3 text-[#667085] mt-3">
            {Description?.['Benefits']?.length > 0 ? (
              Description['Benefits'].map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <img src={Check} className="mr-2" alt="" />
                  {benefit}
                </li>
              ))
            ) : (
              <li className="flex items-start">
                <img src={Check} className="mr-2" alt="" />
                No Benefits Available
              </li>
            )}
          </ul>
        </div>

        {/* Additional Details Section */}
        <div className="details-container mt-5">
          <h3 className="text-lg font-bold">Details</h3>
          <ul className="text-sm space-y-3 text-[#667085] mt-3">
            {Description?.['Product Details']?.length > 0 ? (
              Description['Product Details'].map((detail, index) => (
                <li key={index} className="flex items-start">
                  <img src={Check} className="mr-2" alt="" />
                  {detail}
                </li>
              ))
            ) : (
              <li className="flex items-start">
                <img src={Check} className="mr-2" alt="" />
                No Details Available
              </li>
            )}
          </ul>
        </div>

        {/* More Details Section */}
        <div className="more-details-container mt-5">
          <h3 className="text-lg font-bold">More Details</h3>
          <ul className="text-sm space-y-3 text-[#667085] mt-3">
            {Description?.['More Details']?.length > 0 ? (
              Description['More Details'].map((moreDetail, index) => (
                <li key={index} className="flex items-start">
                  <img src={Check} className="mr-2" alt="" />
                  {moreDetail}
                </li>
              ))
            ) : (
              <li className="flex items-start">
                <img src={Check} className="mr-2" alt="" />
                No More Details Available
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Product;

