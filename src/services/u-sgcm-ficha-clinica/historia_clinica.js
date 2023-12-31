import axios from 'axios';

export const baseUrl = process.env.REACT_APP_BASE_URL_U_SGCM_FICHA_CLINICA;

// HISTORIA CLINICA
export const findHistoriaClinicaByPacienteId = async (idPaciente) => {
    try {
        const response = await axios({
            url: `${baseUrl}/historiaclinica/paciente/${idPaciente}`,
            method: 'GET'
        })
        return response
    } catch (error) {
        console.log('findHistoriaClinicaByPacienteId', error)
    }
}

export const createHistoriaClinica = async (historiaClinica) => {
    try {
        const response = await axios({
            url: `${baseUrl}/historiaclinica`,
            method: 'POST',
            data: historiaClinica
        })
        return response
    } catch (error) {
        console.log('createHistoriaClinica', error)
    }
}

export const updateHistoriaClinica = async (idHistoriaClinica, historiaClinica) => {
    try {
        const response = await axios({
            url: `${baseUrl}/historiaclinica/${idHistoriaClinica}`,
            method: 'PUT',
            data: historiaClinica
        })
        return response
    } catch (error) {
        console.log('updateHistoriaClinica', error)
    }
}

export const findHistoriaClinicasByRangeDateAndSucursal = async (diai, mesi, anioi, diaf, mesf, aniof, sucursalId) => {
    try {
        const response = await axios({
            url: `${baseUrl}/historiaclinica/fecha_inicio/${diai}/${mesi}/${anioi}/fecha_fin/${diaf}/${mesf}/${aniof}/sucursal/${sucursalId}`,
            method: 'GET',
        });
        return response;
    } catch (error) {
        console.log('findHistoriaClinicasByRangeDateAndSucursal', error);
        return error;
    }
}