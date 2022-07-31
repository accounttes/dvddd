import axios from 'axios';
import { baseUrl } from '../constants/fakeData';

interface IUser {
  email: string;
  password: string;
}

const fetchData = async (path: string, data: IUser) => {
  const resp = await axios.post(`${baseUrl}${path}`, data);
  return resp;
};

export default fetchData;
