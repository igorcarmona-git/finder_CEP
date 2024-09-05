import axios from 'axios';

const CEPapi = axios.create({
    baseURL: `https://viacep.com.br/ws/`,
})

export default CEPapi;