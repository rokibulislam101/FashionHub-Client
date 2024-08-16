import { Link } from 'react-router-dom';
import orderImg from '../../../assets/Images/hooray.jpg';

const Ordered = () => {
  return (
    <div className="m-10 pt-20">
      <div className="flex flex-col justify-center items-center">
        <img src={orderImg} className="w-60" alt="Hooray" />
        <h2 className="text-2xl sm:text-3xl text-center font-bold my-4 text-green-500">
          Order Placed Successfully!
        </h2>
        <p className="text-center font-semibold mb-7">
          Thank you for your order. You will receive a confirmation message or
          call shortly.
        </p>
        <Link to="/">
          <button className="w-fit text-[#0D3356] hover:text-white font-semibold px-8 py-1 border border-[#0D3356] hover:bg-[#0D3356] transition-all rounded-full">
            Return Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Ordered;
