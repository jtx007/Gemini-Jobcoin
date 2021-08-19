import axios from 'axios';

export const jobcoinAPI = axios.create({
  baseURL: 'http://jobcoin.gemini.com/tiring-armrest/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
