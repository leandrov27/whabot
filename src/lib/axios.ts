// packages
import axios from 'axios';

// ----------------------------------------------------------------------

const STAGE = process.env.NODE_ENV;

const PROD_URL= process.env.PROD_API_URL;
const LOCAL_URL= process.env.NEXT_PUBLIC_LOCAL_API_URL;

export const API_URL = (STAGE === "production") ? PROD_URL : LOCAL_URL;

// ----------------------------------------------------------------------

const ax = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})

export default ax;