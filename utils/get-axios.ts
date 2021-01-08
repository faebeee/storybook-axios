import axios from 'axios';

const instance = axios.create();

export const getAxios = () => instance;
