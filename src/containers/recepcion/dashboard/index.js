import React, { Fragment, useEffect, useState } from "react";
import { Formik } from "formik";
import io from 'socket.io-client';
import socketIOClient from "socket.io-client";
import { showAllOffices } from "../../../services";
import withStyles from "@material-ui/core/styles/withStyles";
import { DashboardContainer } from "./dashboard";
import * as Yup from "yup";
import { Snackbar, Grid, Backdrop, CircularProgress } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import bannerMePiel from './../../../bannerMePiel.PNG';
import { login } from "../../../services/empleados";
import { addZero } from "../../../utils/utils";
import { findEntradasByRangeDateAndSucursal } from "../../../services/pagos";
import { showActivesTipoEntradas } from "../../../services/tipo_entradas";
import { findPaysByRangeDateAndSucursal } from "../../../services/pagos";
import { getAllServices } from "../../../services/servicios";
import { findConsultsByDateAndSucursal } from "../../../services/consultas";
import { findSurgeryBySucursalIdWaitingList } from "../../../services/consultorios";
import { findTreatmentByServicio } from "../../../services/tratamientos";
import { findAparatologiaByDateAndSucursal } from "../../../services/aparatolgia";
import { findFacialByDateAndSucursal } from "../../../services/faciales";
import { findCuracionByDateAndSucursal } from "../../../services/curaciones";

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(5)}px ${theme.spacing(5)}px ${theme.spacing(5)}px`
  },
  container: {
    maxWidth: "200px"
  },
  title: {
    color: "#2BA6C6"
  }
});

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const DashboardForm = (props) => {

  const {
    empleado,
    colorBase,
  } = props;

  const classes = props;

  const token = empleado.access_token;

  const [sucursales, setSucursales] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDirecto, setIsDirecto] = useState(false);

  const [consultasOcci, setConsultasOcci] = useState([])
  const [consultasFede, setConsultasFede] = useState([])
  const [consultoriosOcci, setConsultoriosOcci] = useState([])
  const [consultoriosFede, setConsultoriosFede] = useState([])
  const [aparatologiasOcci, setAparatologiasOcci] = useState([])
  const [curacionesOcci, setCuracionesOcci] = useState([])
  const [facialesOcci, setFacialesOcci] = useState([])

  const [openAlert, setOpenAlert] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('success');

  const sucursalOcciId = process.env.REACT_APP_SUCURSAL_OCCI_ID
  const sucursalFedeId = process.env.REACT_APP_SUCURSAL_FEDE_ID

  const date = new Date()
  const dia = date.getDate()
  const mes = date.getMonth()
  const anio = date.getFullYear()

  const loadSucursales = async () => {
    const response = await showAllOffices();
    if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
      setIsLoading(false)
    }
  }

  const loadTipoServicios = async () => {
    const response = await getAllServices();
    if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
      await loadSucursales(response.data);
    }
  }

  const loadConsultasOcci = async () => {
		const response = await findConsultsByDateAndSucursal(dia, mes, anio, sucursalOcciId, token);
		if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
			setConsultasOcci(response.data);
		}
	}

  const loadConsultasFede = async () => {
		const response = await findConsultsByDateAndSucursal(dia, mes, anio, sucursalFedeId, token);
		if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
			setConsultasFede(response.data);
		}
	}

  const loadConsultoriosOcci = async () => {
		const response = await findSurgeryBySucursalIdWaitingList(sucursalOcciId, token);
		if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
			setConsultoriosOcci(response.data);
		}
	}

  const loadConsultoriosFede = async () => {
		const response = await findSurgeryBySucursalIdWaitingList(sucursalFedeId, token);
		if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
			setConsultoriosFede(response.data);
		}
	}

  const loadAparatologiaOcci = async () => {
		const response = await findAparatologiaByDateAndSucursal(dia, mes, anio, sucursalOcciId, token);
		if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
			setAparatologiasOcci(response.data);
		}
	}

  const loadCuracionesOcci = async () => {
		const response = await findCuracionByDateAndSucursal(dia, mes, anio, sucursalOcciId, token);
		if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
			setCuracionesOcci(response.data)
		}
	}

  const loadFacialesOcci = async () => {
    const response = await findFacialByDateAndSucursal(dia, mes, anio, sucursalOcciId, token);
    if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
      setFacialesOcci(response.data);
    }
  }

  const loadAll = async () => {
    setIsLoading(true)
    await loadConsultasOcci()
    await loadConsultasFede()
    await loadConsultoriosOcci()
    await loadConsultoriosFede()
    await loadAparatologiaOcci()
    await loadCuracionesOcci()
    await loadFacialesOcci()
    await loadTipoServicios()
  }

  useEffect(() => {
    loadAll()
  }, []);

  return (
    <Fragment>
      {
        !isLoading ?
          <DashboardContainer
            sucursales={sucursales}
            consultasOcci={consultasOcci}
            consultasFede={consultasFede}
            consultoriosOcci={consultoriosOcci}
            consultoriosFede={consultoriosFede}
            aparatologiasOcci={aparatologiasOcci}
            curacionesOcci={curacionesOcci}
            facialesOcci={facialesOcci}
            {...props} />
          : <Backdrop className={classes.backdrop} open={isLoading} >
            <CircularProgress color="inherit" />
          </Backdrop>
      }
    </Fragment>
  );
}

export default withStyles(styles)(DashboardForm);
