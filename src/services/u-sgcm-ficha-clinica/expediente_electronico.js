import axios from 'axios';

export const baseUrl = process.env.REACT_APP_BASE_URL_U_SGCM_FICHA_CLINICA;

// EXPEDIENTE ELECTRONICO
export const createExpedienteElectronico = async (expedienteElectronico) => {
    try {
        const response = await axios({
            url: `${baseUrl}/expedienteElectronico`,
            method: 'POST',
            data: expedienteElectronico
        })
        return response
    } catch (error) {
        console.log('createExpedienteElectronico', error)
    }
}

export const updateExpedienteElectronico = async (idExpedienteElectronico, expedienteElectronico) => {
    try {
        const response = await axios({
            url: `${baseUrl}/expedienteElectronico/${idExpedienteElectronico}`,
            method: 'PUT',
            data: expedienteElectronico
        })
        return response
    } catch (error) {
        console.log('updateExpedienteElectronico', error)
    }
}
