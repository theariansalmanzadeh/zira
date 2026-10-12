import axios from 'axios'
import { getApiBaseUrl } from '@/src/api/config'

export const http = axios.create({
    baseURL: getApiBaseUrl(),
    headers: {
        'Content-Type': 'application/json',
    },
})
