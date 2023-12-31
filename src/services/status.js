import axios from 'axios';

export const baseUrl = process.env.REACT_APP_BASE_URL;

// STATUS

export const showAllStatus = async () => {
    try {
        const response = await axios({
            url: `${baseUrl}/status`,
            method: 'GET'
        });
        return response;
    } catch (error) {
        console.log('showAllStatus', error);
    }
}

export const showAllStatusVisibles = async () => {
    try {
        const response = await axios({
            url: `${baseUrl}/status/visibles`,
            method: 'GET'
        });
        return response;
    } catch (error) {
        console.log('showAllStatusVisibles', error);
    }
}