import { Grid, Paper } from '@material-ui/core'
import React from 'react'
import myStyles from '../../css'
import { findFacialByDateAndSucursal } from '../../services/faciales'
import { findCuracionByDateAndSucursal } from '../../services/curaciones'
import { findAparatologiaByDateAndSucursal } from '../../services/aparatolgia'
import { findSurgeryBySucursalIdWaitingList } from '../../services/consultorios'
import { findConsultsByDateAndSucursal } from '../../services/consultas'
import { useState, useEffect } from 'react'

const DashboardComponent = props => {

    const {
        sucursal,
        token
    } = props
    
    const [isLoading, setIsLoading] = useState(true)

    const [consultas, setConsultas] = useState([])
    const [consultorios, setConsultorios] = useState([])
    const [aparatologias, setAparatologias] = useState([])
    const [curaciones, setCuraciones] = useState([])
    const [faciales, setFaciales] = useState([])

    const date = new Date()
    const dia = date.getDate()
    const mes = date.getMonth()
    const anio = date.getFullYear()

    const classes = myStyles(sucursal.color)()

    const loadConsultas = async () => {
        const response = await findConsultsByDateAndSucursal(dia, mes, anio, sucursal._id, token)
        if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
            console.log("KAOZ", response.data)
            setConsultas(response.data)
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
            setAparatologias(response.data)
        }
    }

    const loadCuraciones = async () => {
        const response = await findCuracionByDateAndSucursal(dia, mes, anio, sucursal._id, token)
        if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
            setCuraciones(response.data)
        }
    }

    const loadFaciales = async () => {
        const response = await findFacialByDateAndSucursal(dia, mes, anio, sucursal._id, token)
        if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
            setFaciales(response.data)
        }
    }

    const loadAll = async () => {
        setIsLoading(true)
        await loadConsultas()
        await loadConsultorios()
        await loadAparatologia()
        await loadCuraciones()
        await loadFaciales()
        setIsLoading(false)
      }
    
      useEffect(() => {
        loadAll()
      }, [])

    return (
        <Paper className={classes.paper_item}>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={12}>
                    <h1 className={classes.label_sucursal}>{`${sucursal.nombre} (CONSECUTIVO: 25)`}</h1>
                </Grid>

                <Grid item xs={6} sm={6} >
                    <h2 className={classes.label_left}>CONSULTAS EN ESPERA:</h2>
                </Grid>
                <Grid item xs={6} sm={6} >
                    <h2 className={classes.label_right}>11</h2>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <h3 className={classes.label_left}>PRIMERA VEZ: 3</h3>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <h3 className={classes.label_left}>RECONSULTAS: 8</h3> <br></br>
                </Grid>

                <Grid item xs={6} sm={6}>
                    <h2 className={classes.label_left}>CONSULTAS TOTALES:</h2>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <h2 className={classes.label_right}>26</h2>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <h3 className={classes.label_left}>PRIMERA VEZ: 8</h3>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <h3 className={classes.label_left}>RECONSULTAS: 18</h3> <br></br>
                </Grid>

                <Grid item xs={6} sm={6}>
                    <h2 className={classes.label_left}>MÉDICOS DISPONIBLES:</h2>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <h2 className={classes.label_right}>3</h2>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <h2 className={classes.label_left}>PACIENTES POR MEDICO:</h2>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <h2 className={classes.label_right}>4</h2> <br></br>
                </Grid>

                <Grid item xs={7} sm={7}>
                    <h2 className={classes.label_left}>CURACIONES TOTALES:</h2>
                </Grid>
                <Grid item xs={5} sm={5}>
                    <h2 className={classes.label_right}>13</h2>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <h3 className={classes.label_left}>CURACIONES EN PROCESO: 3</h3>
                </Grid>
                <Grid item xs={6} sm={6}>
                    <h3 className={classes.label_left}>CURACIONES EN ESPERA: 4</h3> <br></br>
                </Grid>

                <Grid item xs={7} sm={7}>
                    <h2 className={classes.label_left}>FACIALES TOTALES:</h2>
                </Grid>
                <Grid item xs={5} sm={5}>
                    <h2 className={classes.label_right}>17</h2>
                </Grid>
                <Grid item xs={7} sm={7}>
                    <h2 className={classes.label_left}>APARATOLOGÍAS TOTALES:</h2>
                </Grid>
                <Grid item xs={5} sm={5}>
                    <h2 className={classes.label_right}> 6</h2>
                </Grid>
            </Grid>
        </Paper>
    )
}

export default DashboardComponent
