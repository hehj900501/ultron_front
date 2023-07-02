import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { ExpedienteElectronicoContainer } from "./expediente_electronico";
import { Backdrop, CircularProgress, Snackbar } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import { useNavigate } from "react-router-dom";
import { createExpedienteElectronico, updateExpedienteElectronico } from "../../../../services/u-sgcm-ficha-clinica/expediente_electronico";

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles(theme => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
	pagago: {
		color: '#11A532',
	},
	no_pagago: {
		color: '#DC3132',
	},
}));

const ExpedienteElectronico = (props) => {

	const classes = useStyles()

	const navigate = useNavigate()

	const {
		consultorio,
		colorBase,
		historiaClinica,
		commitHistoriaClinica,
		findConsultorio,
	} = props

	const [openAlert, setOpenAlert] = useState(false)
	const [message, setMessage] = useState('')
	const [severity, setSeverity] = useState('success')
	const [isLoading, setIsLoading] = useState(true)
	const [expedienteElectronico, setExpedienteElectronico] = useState({})

	const handleCloseAlert = () => {
		setOpenAlert(false)
	};

	const handleChange = (event) => {
		setExpedienteElectronico({
			...expedienteElectronico,
			[event.target.name]: event.target.value.toUpperCase()
		})
	}

	const handleClickGuardar = async() => {
		setIsLoading(true)
		let responseExpedienteElectronico = {}
		if (!expedienteElectronico._id) {
			responseExpedienteElectronico = await createExpedienteElectronico(expedienteElectronico)
			if (`${responseExpedienteElectronico.status}` === process.env.REACT_APP_RESPONSE_CODE_CREATED) {
				historiaClinica.expediente_electronico = responseExpedienteElectronico.data._id
				await commitHistoriaClinica()
			}
		} else {
			responseExpedienteElectronico = await updateExpedienteElectronico(expedienteElectronico._id, expedienteElectronico)
			if (`${responseExpedienteElectronico.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
				findConsultorio()
			}
		}
		setIsLoading(false)
	}

	const loadAll = async () => {
		setIsLoading(true)
		setExpedienteElectronico(historiaClinica.expediente_electronico ? historiaClinica.expediente_electronico : {}) 
		setIsLoading(false)
	}

	useEffect(() => {
		loadAll();
	}, []);

	return (
		<Fragment>
			{
				!isLoading ?
					<ExpedienteElectronicoContainer
						consultorio={consultorio}
						colorBase={colorBase}
						expedienteElectronico={expedienteElectronico}
						onChange={handleChange}
						onClickGuardar={handleClickGuardar} /> :
					<Backdrop className={classes.backdrop} open={isLoading} >
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

export default ExpedienteElectronico;