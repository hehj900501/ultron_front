import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { Modal, Grid, Paper, AppBar, Tabs, Tab } from '@material-ui/core'
import myStyles from '../../../css'
import { ButtonCustom } from '../../basic/ButtonCustom'
import AntecedentesPersonalesPatologicos from './antecedentes_personales_patologicos'
import AntecedentesPersonalesNoPatologicos from './antecedentes_personales_no_patologicos'
import AntecedentesHeredofamiliares from './antecedentes_heredofamiliares'
import SignosVitales from './signos_vitales'
import Alergias from './alergias'
import ExpedienteElectronico from './expediente_electronico'

function getModalStyle() {
	const top = 50
	const left = 50

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	}
}

function TabPanel(props) {
	const { children, value, index, ...other } = props

	return (
		<Typography
			component="div"
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && <Box p={3}>{children}</Box>}
		</Typography>
	)
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
}

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	}
}

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.paper,
	}
}))

export const MenuHistoricaClinicaContainer = props => {

	// getModalStyle is not a pure function, we roll the style only on the first render
	const [modalStyle] = React.useState(getModalStyle)

	const {
		onChangeTab,
		value,
		paciente,
		open,
		sucursal,
		onClickCancel,
		historiaClinica,
		colorBase,
	} = props

	const classes = myStyles(colorBase)()

	return (
		<div>
			<Modal
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				open={open} >
				<div style={modalStyle} className={classes.paper_95}>
					{
						historiaClinica ? 
						<Grid item xs={12}>
							<Paper>
								<AppBar
									className={classes.bar}
									position="sticky" >
									<Tabs
										value={value}
										onChange={onChangeTab}
										aria-label="simple tabs"
										variant="fullWidth"
										scrollButtons="on" >
											<Tab className={classes.tabs} label="ANTECEDENTES PERSONALES PATOLÓGICOS" wrapped {...a11yProps(0)} />
											<Tab className={classes.tabs} label="ANTECEDENTES PERSONALES NO PATOLÓGICOS" wrapped {...a11yProps(1)} />
											<Tab className={classes.tabs} label="ANTECEDENTES HEREDOFAMILIARES" wrapped {...a11yProps(2)} />
											<Tab className={classes.tabs} label="SIGNOS VITALES" wrapped {...a11yProps(3)} />
											<Tab className={classes.tabs} label="ALERGIAS" wrapped {...a11yProps(4)} />
											<Tab className={classes.tabs} label="EXPEDIENTE ELECTRONICO" wrapped {...a11yProps(5)} />
									</Tabs>
								</AppBar>
								<TabPanel value={value} index={0}>
									<AntecedentesPersonalesPatologicos
										colorBase={colorBase}
										historiaClinica={historiaClinica} />
								</TabPanel>
								<TabPanel value={value} index={1}>
									<AntecedentesPersonalesNoPatologicos
										colorBase={colorBase}
										historiaClinica={historiaClinica} />
								</TabPanel>
								<TabPanel value={value} index={2}>
									<AntecedentesHeredofamiliares
										colorBase={colorBase}
										historiaClinica={historiaClinica} />
								</TabPanel>
								<TabPanel value={value} index={3}>
									<SignosVitales
										colorBase={colorBase}
										historiaClinica={historiaClinica} />
								</TabPanel>
								<TabPanel value={value} index={4}>
									<Alergias
										colorBase={colorBase}
										historiaClinica={historiaClinica}/>
								</TabPanel>
								<TabPanel value={value} index={5}>
									<ExpedienteElectronico
										colorBase={colorBase}
										historiaClinica={historiaClinica} />
								</TabPanel>
							</Paper>
						</Grid> :
						<h1>EL PACIENTE NO TIENE HISTORIA CLÍNICA</h1> 
					}
					<Grid item xs={12} sm={12}>
						<ButtonCustom
							className={classes.buttonCancel}
							color="secondary"
							variant="contained"
							onClick={onClickCancel}
							text='SALIR' />
					</Grid>
					
				</div>
			</Modal>
		</div>
	)
}
