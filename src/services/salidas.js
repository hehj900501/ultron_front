import axios from 'axios';

export const baseUrl = process.env.REACT_APP_BASE_URL;

// SALIDA

export const findSalidaById = async (salidaId, token) => {
    try {
        const response = await axios({
            url: `${baseUrl}/salida/${salidaId}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log('findSalidaById', error);
    }
}

export const findSalidaByPagoDermatologoId = async (pagoDermatologoId) => {
    try {
        const response = await axios({
            url: `${baseUrl}/salida/pagodermatologo/${pagoDermatologoId}`,
            method: 'GET'
        });
        return response;
    } catch (error) {
        console.log('findSalidaByPagoDermatologoId', error);
    }
}

export const createSalida = async (salida) => {
    try {
        const response = await axios({
            url: `${baseUrl}/salida`,
            method: 'POST',
            data: salida
        });
        return response;
    } catch (error) {
        console.log('createSalida', error);
    }
}

export const showSalidasTodayBySucursalAndTurno = async (sucursalId, turno) => {
    try {
        const response = await axios({
            url: `${baseUrl}/salida/sucursal/${sucursalId}/today/turno/${turno}`,
            method: 'GET'
        });
        return response;
    } catch (error) {
        console.log('showSalidasTodayBySucursalAndTurno', error);
    }
}

export const showSalidasTodayBySucursalAndHoraAplicacion = async (sucursalId, hora_apertura, hora_cierre) => {
    try {
        const response = await axios({
            url: `${baseUrl}/salida/sucursal/${sucursalId}/apertura/${hora_apertura}/cierre/${hora_cierre}`,
            method: 'GET'
        });
        return response;
    } catch (error) {
        console.log('showSalidasTodayBySucursalAndHoraAplicacion', error);
    }
}

export const findSalidasByRangeDateAndSucursal = async (diai, mesi, anioi, diaf, mesf, aniof, sucursalId) => {
    try {
        const response = await axios({
            url: `${baseUrl}/salida/fecha_inicio/${diai}/${mesi}/${anioi}/fecha_fin/${diaf}/${mesf}/${aniof}/sucursal/${sucursalId}`,
            method: 'GET'
        });
        return response;
    } catch (error) {
        console.log('findSalidasByRangeDateAndSucursal', error);
    }
}

export const updateSalida = async (salidaId, salida, token) => {
    try {
        const response = await axios({
            url: `${baseUrl}/salida/${salidaId}`,
            method: 'PUT',
            data: salida,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log('updateSalida', error);
        return error;
    }
}

export const deleteSalida = async (salidaId, token) => {
    try {
        const response = await axios({
            url: `${baseUrl}/salida/${salidaId}`,
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log('deleteSalida', error);
        return error;
    }
}