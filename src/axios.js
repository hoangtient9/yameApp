import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://chatbot-2bd64.firebaseio.com/'
})

export default instance;