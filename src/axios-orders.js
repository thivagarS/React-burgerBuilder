import axios from 'axios';

const axiosOrders = axios.create({
    baseURL: "https://burgerbuilder-6a369.firebaseio.com/"
});

export default axiosOrders;
