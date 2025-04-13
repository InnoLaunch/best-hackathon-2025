import $api from "../http";
import axios from "axios";



export default class MapService {

    static async getLocations(disability: string, category: string, lat: number, lng: number, offset = 0, limit = 100) {
        return $api.get('/locations', {
            params: {
                disability,
                category,
                lat,
                lng,
                offset,
                limit
            }
        });
    }
}