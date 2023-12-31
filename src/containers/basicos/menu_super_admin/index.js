import React, { useState, Fragment, useEffect } from "react";
import { MenuSuperAdminContainer } from "./menu_super_admin";
import { Backdrop, CircularProgress, Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import { showAllCatalogos } from "../../../services/catalogos";
import myStyles from "../../../css";
import { showAllLaboratorios } from "../../../services/laboratorios";
import { showAllProductoComercials } from "../../../services/productos_comerciales";
import { showAllOcupacions } from "../../../services/ocupacion";
import { showAllEspecialidades } from "../../../services/especialidades";
import { addZero, getToken } from "../../../utils/utils";
import { getAllServices } from "../../../services/servicios";
import { getAllTreatments } from "../../../services/tratamientos";
import { findEmployeesByRolIdAvailable } from "../../../services/empleados";
import { showAllEsquemas } from "../../../services/esquemas";

const Alert = (props) => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const MenuSuperAdmin = (props) => {

    const laboratoriosCatalogoId = process.env.REACT_APP_LABORATORIOS_CATALOGO_ID;
    const productoComercialCatalogoId = process.env.REACT_APP_PRODUCTO_COMERCIAL_CATALOGO_ID;
    const ocupacionCatalogoId = process.env.REACT_APP_OCUPACION_CATALOGO_ID;
    const especialidadCatalogoId = process.env.REACT_APP_ESPECIALIDAD_CATALOGO_ID;
    const dermatologosCatalogoId = process.env.REACT_APP_DERMATOLOGOS_CATALOGO_ID;
    const serviciosCatalogoId = process.env.REACT_APP_SERVICIOS_CATALOGO_ID;
    const tratamientosCatalogoId = process.env.REACT_APP_TRATAMIENTOS_CATALOGO_ID;
    const esquemassCatalogoId = process.env.REACT_APP_ESQUEMAS_CATALOGO_ID;

    const dermatologoRolId = process.env.REACT_APP_DERMATOLOGO_ROL_ID;

    const [catalogos, setCatalogos] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState();
    const [data, setData] = useState([]);
    const [catalogo, setCatalogo] = useState({});
    const [openAlert, setOpenAlert] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState('success');
    const [isLoading, setIsLoading] = useState(true);

    const {
        sucursal,
        empleado,
        colorBase,
    } = props;

    const token = getToken(empleado);
    const classes = myStyles(colorBase)();

    const loadLaboratorios = async () => {
        const response = await showAllLaboratorios();
        if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
            setData(response.data);
        }
    }

    const loadProductosComerciales = async () => {
        const response = await showAllProductoComercials();
        if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
            setData(response.data);
        }
    }

    const loadOcupaciones = async () => {
        const response = await showAllOcupacions();
        if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
            setData(response.data);
        }
    }

    const loadEspecialidades = async () => {
        const response = await showAllEspecialidades();
        if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
            setData(response.data);
        }
    }

    const loadDermatologos = async () => {
        const response = await findEmployeesByRolIdAvailable(dermatologoRolId, token);
        if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
            setData(response.data);
        }
    }

    const loadServicios = async () => {
        const response = await getAllServices();
        if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
            setData(response.data);
        }
    }

    const loadTratamientos = async () => {
        const response = await getAllTreatments();
        if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
            setData(response.data);
        }
    }

    const loadEsquemas = async () => {
        const response = await showAllEsquemas();
        if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
            setData(response.data);
        }
    }

    const searchData = async (catalogo) => {
        setIsLoading(true);
        switch (catalogo._id) {
            case laboratoriosCatalogoId:
                await loadLaboratorios();
                break;
            case productoComercialCatalogoId:
                await loadProductosComerciales();
                break;
            case ocupacionCatalogoId:
                await loadOcupaciones();
                break;
            case especialidadCatalogoId:
                await loadEspecialidades();
                break;
            case dermatologosCatalogoId:
                await loadDermatologos();
                break;
            case serviciosCatalogoId:
                await loadServicios();
                break;
            case tratamientosCatalogoId:
                await loadTratamientos();
                break;
            case esquemassCatalogoId:
                await loadEsquemas();
        }
        setIsLoading(false);
    }

    const handleClickCatalogo = (catalogoItem, index) => {
        setSelectedIndex(index);
        searchData(catalogoItem);
        setCatalogo(catalogoItem);
    }

    const handleCloseAlert = () => {
        setOpenAlert(false);
    };

    const loadCatalogos = async () => {
        const response = await showAllCatalogos();
        if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
            const resCatalogos = response.data;
            setCatalogos(resCatalogos);
            handleClickCatalogo(resCatalogos[0], 0);
        }
    }

    const loadAll = async () => {
        setIsLoading(true);
        await loadCatalogos();
        setIsLoading(false);
    }

    useEffect(() => {
        loadAll();
    }, []);

    return (
        <Fragment>
            {
                !isLoading ?
                    <MenuSuperAdminContainer
                        empleado={empleado}
                        sucursal={sucursal}
                        onClickCatalogo={handleClickCatalogo}
                        loadCatalogos={loadCatalogos}
                        selectedIndex={selectedIndex}
                        catalogos={catalogos}
                        catalogo={catalogo}
                        data={data}
                        colorBase={colorBase}
                        setMessage={setMessage}
                        setSeverity={setSeverity}
                        setOpenAlert={setOpenAlert} />
                    : <Backdrop className={classes.backdrop} open={isLoading} >
                        <CircularProgress color="inherit" />
                    </Backdrop>
            }
            <Snackbar open={openAlert} autoHideDuration={5000} onClose={handleCloseAlert}>
                <Alert onClose={handleCloseAlert} severity={severity}>
                    {message}
                </Alert>
            </Snackbar>

        </Fragment>
    );
}

export default MenuSuperAdmin;