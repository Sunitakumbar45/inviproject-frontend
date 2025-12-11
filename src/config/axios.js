import axios from "axios";
const instance=axios.create({
    baseURL:'http://localhost:3054',
});
export default instance;