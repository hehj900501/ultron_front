import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Pacientes from '../pacientes/index';
import AgendarFacial from '../agendar_facial';
import GeneralCitas from '../general_citas';
import AgendarAparatologia from '../agendar_aparatologia';
import myStyles from '../../../css';
import Calendario from '../calendario';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

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
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

export const MenuContainer = props => {

	const {
		pacienteAgendado,
		setPacienteAgendado,
		onChangeTab,
		value,
		onClickAgendarFaciales,
		onClickAgendarAparatologia,
		empleado,
		sucursal,
		colorBase,
	} = props;

	const useStyles = makeStyles(theme => ({
		root: {
			flexGrow: 1,
			backgroundColor: theme.palette.background.paper,
		}		
	}));

	const classes = myStyles(colorBase)();
	const classess = useStyles();
	
	return (
		<div className={classess.root}>
			<AppBar
				className={classes.bar}
				position="sticky" >
				<Tabs
					value={value}
					onChange={onChangeTab}
					aria-label="simple tabs"
					variant="scrollable"
					scrollButtons="on" >
					<Tab className={classes.tabs} label="PACIENTES" {...a11yProps(0)} />
					<Tab className={classes.tabs} label="FACIALES" {...a11yProps(1)} />
					<Tab className={classes.tabs} label="APARATOLOGÍA" {...a11yProps(2)} />
					<Tab className={classes.tabs} label="GENERAL" {...a11yProps(3)} />
					<Tab className={classes.tabs} label="CALENDARIO" {...a11yProps(4)} />
				</Tabs>
			</AppBar>
			<TabPanel value={value} index={0}>
				<Pacientes
					empleado={empleado}
					sucursal={sucursal}
					colorBase={colorBase}
					onChangeTab={onChangeTab} />
			</TabPanel>
			
			<TabPanel value={value} index={1}>
				<AgendarFacial
					info={pacienteAgendado}
					setPacienteAgendado={setPacienteAgendado}
					empleado={empleado}
					colorBase={colorBase}
					sucursal={sucursal._id} />
			</TabPanel>
			<TabPanel value={value} index={2}>
				<AgendarAparatologia
					info={pacienteAgendado}
					setPacienteAgendado={setPacienteAgendado}
					empleado={empleado}
					colorBase={colorBase}
					sucursal={sucursal._id} />
			</TabPanel>
			<TabPanel value={value} index={3}>
				<GeneralCitas
					empleado={empleado}
					colorBase={colorBase}
					sucursal={sucursal._id} />
			</TabPanel>
			<TabPanel value={value} index={4}>
				<Calendario
					empleado={empleado}
					colorBase={colorBase}
					sucursal={sucursal._id} />
			</TabPanel>
		</div>
	);
}
