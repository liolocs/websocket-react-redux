import axios from 'axios';
import config from '../config';

const axiosInstance = axios.create({
    baseURL: config.BASE_URL
})

export const getTeamById = (teamId: string) => {
    return axiosInstance.get(`/teams/${teamId}`)
}

export default {
    getTeamById
}