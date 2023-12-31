import axios from 'axios';

export const baseUrl = process.env.REACT_APP_BASE_URL;

// EMPLEADOS

export const login = async (employeeNumber, password) => {
    try {
        const response = await axios({
            url: `${baseUrl}/empleado/auth/login`,
            method: 'POST',
            data: 
                {
                    username: employeeNumber,
                    password: password
                }
        });
        return response;
    } catch (error) {
        console.log('login', error);
        return error;
    }
}

export const findEmployeeByEmployeeNumber = async (employeeNumber) => {
    try {
        const response = await axios({
            url: `${baseUrl}/empleado/number/${employeeNumber}`,
            method: 'GET'
        });
        return response;
    } catch (error) {
        console.log('findEmployeeByEmployeeNumber', error);
    }
}

export const findEmployeeById = async (empleadoId, token) => {
    try {
        const response = await axios({
            url: `${baseUrl}/empleado/${empleadoId}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log('findEmployeeById', error);
    }
}

export const loginEmployee = async (employeeNumber, password) => {
    try {
        const response = await axios({
            url: `${baseUrl}/empleado/login/${employeeNumber}/${password}`,
            method: 'GET'
        });
        return response;
    } catch (error) {
        console.log('loginEmployee', error);
    }
}

export const findEmployeesByRolId = async (rolId) => {
    try {
        const response = await axios({
            url: `${baseUrl}/empleado/rol/${rolId}`,
            method: 'GET'
        });
        return response;
    } catch (error) {
        console.log('findEmployeesByRolId', error);
    }
}

export const findEmployeesByRolIdAvailable = async (rolId, token) => {
    try {
        const response = await axios({
            url: `${baseUrl}/empleado/rol/${rolId}/available`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log('findEmployeesByRolIdAvailable', error);
        return error;
    }
}

export const updateEmployee = async (employeeId, employee, token) => {
    try {
        const response = await axios({
            url: `${baseUrl}/empleado/${employeeId}`,
            method: 'PUT',
            data: employee,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log('updateEmployee', error);
    }
}

export const createEmployee = async (employee, token) => {
    try {
        const response = await axios({
            url: `${baseUrl}/empleado`,
            method: 'POST',
            data: employee,
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.log('createEmployee', error);
    }
}