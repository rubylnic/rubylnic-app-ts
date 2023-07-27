import axios from "axios"
import { ICar } from "../interfaces/car.interface";

//in next config
axios.defaults.baseURL = process.env.API_URL;

export const CarService = {
    async getAll() {
        const { data } = await axios.get<ICar[]>("/posts");
        return data
    },
    async getById(id: string) {
        const { data } = await axios.get<ICar[]>("posts/", { params: { id } });
        return data[0]
    }
}