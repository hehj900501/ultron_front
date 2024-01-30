import axios from 'axios';

export const baseUrl = process.env.REACT_APP_BASE_URL;

// TIPO BIOPSIAS

export const showAllTipoBiopsias = async () => {
    try {
        const response = await axios({
            url: `${baseUrl}/tipobiopsia`,
            method: 'GET'
        });
        return response;
    } catch (error) {
        console.log('showAllTipoBiopsias', error);
    }
}
