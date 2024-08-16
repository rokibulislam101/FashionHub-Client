import bannerImg from '../../../assets/Images/banner01.jpg';

const Banner = () => {
  return (
    <div>
      <div
        className="relative w-full h-[600px] bg-cover bg-center"
        style={{
          backgroundImage: `url(${bannerImg})`,
        }}
      >
        <div className="bg-[#0D3356] bg-opacity-25 w-full h-full flex flex-col gap-10 items-center justify-center p-10">
          <h1 className="text-4xl md:text-5xl text-center text-white font-bold">
            Your one stop online shop!
          </h1>
          <button className="font-semibold text-white border border-white hover:bg-[#0D3356] transition-all p-3 px-6">
            Shop Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banner


