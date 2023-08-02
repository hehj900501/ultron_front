import { Grid, Paper } from '@material-ui/core'
import React from 'react'
import myStyles from '../../css'
import { findFacialByDateAndSucursal } from '../../services/faciales'
import { findCuracionByDateAndSucursal } from '../../services/curaciones'
import { findAparatologiaByDateAndSucursal } from '../../services/aparatolgia'
import { findSurgeryBySucursalIdWaitingList } from '../../services/consultorios'
import { findConsultsByDateAndSucursal } from '../../services/consultas'
import { useState, useEffect } from 'react'
import { frecuenciaPrimeraVezId, frecuenciaReconsultaId, statusAsistioId, statusAtendidoId, statusEnSalaDeCuracionId } from '../../utils/constants'

const DashboardComponent = props => {

    const {
        sucursal,
        token,
    } = props

    const [consultasEnEspera, setConsultasEnEspera] = useState([])
    const [consultasEnEsperaPV, setConsultasEnEsperaPV] = useState([])
    const [consultasEnEsperaR, setConsultasEnEsperaR] = useState([])

    const [consultasAtendidas, setConsultasAtendidas] = useState([])
    const [consultasAtendidasPV, setConsultasAtendidasPV] = useState([])
    const [consultasAtendidasR, setConsultasAtendidasR] = useState([])

    const [consultorios, setConsultorios] = useState([])

    const [curacionesTotales, setCuracionesTotales] = useState([])
    const [curacionesEnProceso, setCuracionesEnProceso] = useState([])
    const [curacionesEnEspera, setCuracionesEnEspera] = useState([])

    const [aparatologias, setAparatologias] = useState([])
    const [faciales, setFaciales] = useState([])

    const date = new Date()
    const dia = date.getDate()
    const mes = date.getMonth()
    const anio = date.getFullYear()

    const classes = myStyles(sucursal.color)()

    const loadConsultas = async () => {
        const response = await findConsultsByDateAndSucursal(dia, mes, anio, sucursal._id, token)
        if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
            const respConsultasEnEspera = response.data.filter(consulta => {
                return consulta.status._id === statusAsistioId
            })
            const respConsultasEnEsperaPV = respConsultasEnEspera.filter(consulta => {
                return consulta.frecuencia._id === frecuenciaPrimeraVezId
            })
            const respConsultasEnEsperaR = respConsultasEnEspera.filter(consulta => {
                return consulta.frecuencia._id === frecuenciaReconsultaId
            })

            setConsultasEnEspera(respConsultasEnEspera)
            setConsultasEnEsperaPV(respConsultasEnEsperaPV)
            setConsultasEnEsperaR(respConsultasEnEsperaR)

            const respConsultasAtendidas = response.data.filter(consulta => {
                return consulta.status._id === statusAtendidoId
            })
            const respConsultasAtendidasPV = respConsultasAtendidas.filter(consulta => {
                return consulta.frecuencia._id === frecuenciaPrimeraVezId
            })
            const respConsultasAtendidasR = respConsultasAtendidas.filter(consulta => {
                return consulta.frecuencia._id === frecuenciaReconsultaId
            })

            setConsultasAtendidas(respConsultasAtendidas)
            setConsultasAtendidasPV(respConsultasAtendidasPV)
            setConsultasAtendidasR(respConsultasAtendidasR)
        }
    }

    const loadConsultorios = async () => {
        const response = await findSurgeryBySucursalIdWaitingList(sucursal._id, token)
        if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
            setConsultorios(response.data)
        }
    }


    const loadAparatologia = async () => {
        const response = await findAparatologiaByDateAndSucursal(dia, mes, anio, sucursal._id, token)
        if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
            const respAparatologias = response.data.filter(aparatologia => {
                return aparatologia.status._id === statusAtendidoId
            })
            setAparatologias(respAparatologias)
        }
    }

    const loadCuraciones = async () => {
        const response = await findCuracionByDateAndSucursal(dia, mes, anio, sucursal._id, token)
        if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
            const respCuracionesTotales = response.data.filter(curacion => {
                return curacion.status._id === statusAtendidoId
            })
            const respCuracionesEnProceso = response.data.filter(curacion => {
                return curacion.status._id === statusEnSalaDeCuracionId
            })
            const respCuracionesEnEspera = response.data.filter(curacion => {
                return curacion.status._id === statusAsistioId
            })
            setCuracionesTotales(respCuracionesTotales)
            setCuracionesEnProceso(respCuracionesEnProceso)
            setCuracionesEnEspera(respCuracionesEnEspera)
        }
    }

    const loadFaciales = async () => {
        const response = await findFacialByDateAndSucursal(dia, mes, anio, sucursal._id, token)
        if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
            const respFaciales = response.data.filter(facial => {
                return facial.status._id === statusAtendidoId
            })
            setFaciales(respFaciales)
        }
    }

    const loadAll = async () => {
        await loadConsultas()
        await loadConsultorios()
        await loadAparatologia()
        await loadCuraciones()
        await loadFaciales()
      }
    
      useEffect(() => {
        loadAll()
      }, [])

    return (
        <Paper className={classes.paper_item}>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={12}>
                    <h1 className={classes.label_sucursal}>{`${sucursal.nombre} (CONSECUTIVO: ${consultasEnEspera.length + consultasAtendidas.length})`}</h1>
                </Grid>

                <Grid item xs={6} sm={6} className={consultasEnEspera.length < 6 ? classes.semaforo_verde : (consultasEnEspera.length < 10 ? classes.semaforo_amarillo : classes.semaforo_rojo)}>
                    <h2 className={classes.label_left}>CONSULTAS EN ESPERA:</h2>
                </Grid>
                <Grid item xs={6} sm={6} className={consultasEnEspera.length < 6 ? classes.semaforo_verde : (consultasEnEspera.length < 10 ? classes.semaforo_amarillo : classes.semaforo_rojo)}>
                    <h2 className={classes.label_right}>{`${consultasEnEspera.length}`}</h2>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <h3 className={classes.label_left}>{`PRIMERA VEZ: ${consultasEnEsperaPV.length}`}</h3>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <h3 className={classes.label_left}>{`RECONSULTAS: ${consultasEnEsperaR.length}`}</h3> <br></br>
                </Grid>

                <Grid item xs={6} sm={6}>
                    <h2 className={classes.label_left}>CONSULTAS TOTALES:</h2>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <h2 className={classes.label_right}>{`${consultasAtendidas.length}`}</h2>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <h3 className={classes.label_left}>{`PRIMERA VEZ: ${consultasAtendidasPV.length}`}</h3>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <h3 className={classes.label_left}>{`RECONSULTAS: ${consultasAtendidasR.length}`}</h3> <br></br>
                </Grid>

                <Grid item xs={6} sm={6} className={consultorios.length < 2 ? classes.semaforo_rojo : (consultorios.length < 4 ? classes.semaforo_amarillo : classes.semaforo_verde)}>
                    <h2 className={classes.label_left}>MÉDICOS DISPONIBLES:</h2>
                </Grid>
                <Grid item xs={6} sm={6} className={consultorios.length < 2 ? classes.semaforo_rojo : (consultorios.length < 4 ? classes.semaforo_amarillo : classes.semaforo_verde)}>
                    <h2 className={classes.label_right}>{`${consultorios.length === 0 ? "SIN MÉDICO" : consultorios.length}`}</h2>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <h2 className={classes.label_left}>PACIENTES POR MEDICO:</h2>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <h2 className={classes.label_right}>{`${consultorios.length === 0 ? "SIN MÉDICO" : Math.round(consultasEnEspera.length / consultorios.length)}`}</h2> <br></br>
                </Grid>

                <Grid item xs={7} sm={7}>
                    <h2 className={classes.label_left}>CURACIONES TOTALES:</h2>
                </Grid>
                <Grid item xs={5} sm={5}>
                    <h2 className={classes.label_right}>{`${curacionesTotales.length}`}</h2>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <h3 className={classes.label_left}>{`CURACIONES EN PROCESO: ${curacionesEnProceso.length}`}</h3>
                </Grid>
                <Grid item xs={6} sm={6} className={curacionesEnEspera.length < 2 ? classes.semaforo_verde : (curacionesEnEspera.length < 4 ? classes.semaforo_amarillo : classes.semaforo_rojo)}>
                    <h3 className={classes.label_left}>{`CURACIONES EN ESPERA: ${curacionesEnEspera.length}`}</h3> <br></br>
                </Grid>

                <Grid item xs={7} sm={7}>
                    <h2 className={classes.label_left}>FACIALES TOTALES:</h2>
                </Grid>
                <Grid item xs={5} sm={5}>
                    <h2 className={classes.label_right}>{`${faciales.length}`}</h2>
                </Grid>
                <Grid item xs={7} sm={7}>
                    <h2 className={classes.label_left}>APARATOLOGÍAS TOTALES:</h2>
                </Grid>
                <Grid item xs={5} sm={5}>
                    <h2 className={classes.label_right}>{`${aparatologias.length}`}</h2>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default DashboardComponent