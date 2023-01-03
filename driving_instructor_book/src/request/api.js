import axios from './request';

//homepage data api
export const getHomeData=()=>axios.get('/mock/home.json');

//store data api
export const getStoreData=()=> axios.get('/mock/store.json');