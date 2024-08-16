
import axios from 'axios';

const axiosPublic = axios.create({
  baseURL: 'https://fashion-hub-server-wvjw.vercel.app',
});

const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
