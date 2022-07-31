import axios from 'axios';
import { baseUrl } from '../constants/fakeData';

const getUser = async ({ userId }: any) => {
  const resp = await axios.get(`https://jsonplaceholder.typicode.com/users?id=${userId}`);
  return resp;
};

export default getUser;
