import axios from 'axios';

export const baseUrl = process.env.REACT_APP_BASE_URL;

// SESIONES ANTICIPADAS

export const showAllSesionesAnticipadas = async (token) => {
    try {
        const response = await axios({
            url: `${baseUrl}/sesionanticipada`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log('showAllSesionesAnticipadas', error);
    }
}

export const showAllSesionesAnticipadasByPaciente = async (pacienteId, token) => {
    try {
        const response = await axios({
            url: `${baseUrl}/sesionanticipada/paciente/${pacienteId}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log('showAllSesionesAnticipadasByPaciente', error);
    }
}

export const showAllSesionesAnticipadasByPacienteToday = async (pacienteId, token) => {
    try {
        const response = await axios({
            url: `${baseUrl}/sesionanticipada/paciente/${pacienteId}/today`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log('showAllSesionesAnticipadasByPaciente', error);
    }
}

export const findSesionesAnticipadasByPayOfDoctorFechaPago = async (sucursalId, dermatologoId, hora_apertura, hora_cierre, token) => {
    try {
        const response = await axios({
            url: `${baseUrl}/sesionanticipada/sucursal/${sucursalId}/dermatologo/${dermatologoId}/apertura/${hora_apertura}/cierre/${hora_cierre}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log('findSesionesAnticipadasByPayOfDoctorFechaPago', error);
        return error;
    }
}

export const findSesionAnticipadaByRangeDateAndSucursal = async (diai, mesi, anioi, diaf, mesf, aniof, sucursalId, token) => {
    try {
        const response = await axios({
            url: `${baseUrl}/sesionanticipada/fecha_inicio/${diai}/${mesi}/${anioi}/fecha_fin/${diaf}/${mesf}/${aniof}/sucursal/${sucursalId}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log('findSesionAnticipadaByRangeDateAndSucursal', error);
        return error;
    }
}

export const createSesionAnticipada = async (sesionAnticipada, token) => {
    try {
        const response = await axios({
            url: `${baseUrl}/sesionanticipada`,
            method: 'POST',
            data: sesionAnticipada,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log('createSesionAnticipada', error);
        return error;
    }
}


export const updateSesionAnticipada = async (sesionAnticipadaId, sesionAnticipada, token) => {
    try {
        const response = await axios({
            url: `${baseUrl}/sesionanticipada/${sesionAnticipadaId}`,
            method: 'PUT',
            data: sesionAnticipada,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log('updateSesionAnticipada', error);
        return error;
    }
}

export const deleteSesionAnticipada = async (sesionAnticipadaId, token) => {
    try {
        const response = await axios({
            url: `${baseUrl}/sesionanticipada/${sesionAnticipadaId}`,
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log('deleteSesionAnticipada', error);
    }
}