import React, { useState, Fragment, useEffect } from "react"
import { MenuHistoricaClinicaContainer } from "./menu"
import { findHistoriaClinicaByPacienteId } from "../../../services/u-sgcm-ficha-clinica/historia_clinica"
import { Backdrop, CircularProgress } from "@material-ui/core"

const MenuHistoricaClinica = (props) => {

    const [value, setValue] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [historiaClinica, setHistoriaClinica] = useState({})
    const {
        sucursal,
        empleado,
        paciente,
        open,
        onClose,
        colorBase,
    } = props

    const classes = props

    const handleChangeTab = (event, newValue) => {
        setValue(newValue)
    }

    const loadHistoriaClinica = async () => {
        setIsLoading(true)
        const response = await findHistoriaClinicaByPacienteId(paciente._id)
        if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
            setHistoriaClinica(response.data)
        }
        setIsLoading(false)
      }

    useEffect(() => {
        loadHistoriaClinica()
    }, [])

    return (
        <Fragment>
            {
            !isLoading ?
            <MenuHistoricaClinicaContainer
                onChangeTab={handleChangeTab}
                empleado={empleado}
                sucursal={sucursal}
                open={open}
                value={value}
                paciente={paciente}
                historiaClinica={historiaClinica}
                onClickCancel={onClose}
                colorBase={colorBase}/> :
            <Backdrop className={classes.backdrop} open={isLoading} >
                <CircularProgress color="inherit" />
            </Backdrop>
    }
        </Fragment>
        

    )
}

export default MenuHistoricaClinica