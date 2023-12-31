import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Button } from '@material-ui/core';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ModalPassword from '../../components/modales/modal_password';
import myStyles from '../../css';
import MenuCuraciones from './menu_curaciones';
import MenuBiopsias from './menu_biopsias';

const TabPanel = (props) => {
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
			{value === index && <Box>{children}</Box>}
		</Typography>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

export const MainEnfermeriaContainer = props => {

	const {
		onChangeTab,
		value,
		enfermera,
		sucursal,
		onClickLogout,
		onClickCambioPassword,
		openModalPassword,
		onClose,
		setMessage,
		setSeverity,
		setOpenAlert,
	} = props;

	const colorBase = sucursal.color;

	const classes = myStyles(colorBase)();
	const theme = useTheme();
	const [openDrawer, setOpenDrawer] = useState(false);

	const handleDrawerOpen = () => {
		setOpenDrawer(true);
	};

	const handleDrawerClose = () => {
		setOpenDrawer(false);
	};

	useEffect(() => {

	}, []);

	return (
		<div className={classes.root}>
			{
				openModalPassword ?
					<ModalPassword
						open={openModalPassword}
						onClose={onClose}
						empleado={enfermera}
						onClickLogout={onClickLogout}
						onClickCambioPassword={onClickCambioPassword}
						setMessage={setMessage}
						setSeverity={setSeverity}
						setOpenAlert={setOpenAlert} /> : ''
			}
			<CssBaseline />
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: openDrawer,
				})}
			>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, {
							[classes.hide]: openDrawer,
						})}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						{`SUCURSAL: ${sucursal.nombre} - ${enfermera.numero_empleado} : ${enfermera.nombre ? enfermera.nombre : ''} ( ${enfermera.rol ? enfermera.rol.nombre : ''} )`}
					</Typography>
					<Button
						color="default"
						variant="contained"
						onClick={onClickCambioPassword}>CAMBIAR CONTRASEÑA</Button>
					<Button
						color="secondary"
						variant="contained"
						onClick={onClickLogout}>CERRAR SESION</Button>
				</Toolbar>
			</AppBar>
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={openDrawer}
				classes={{
					paper: classes.drawerPaper,
				}}
			>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
					</IconButton>
				</div>
				<Divider />
				<List>
					<ListItem button key={'CURACIONES'} onClick={(e) => onChangeTab(e, 0, handleDrawerClose)}>
						<ListItemIcon> <LocalHospitalIcon /> </ListItemIcon>
						<ListItemText primary={'CURACIONES'} />
					</ListItem>
				</List>
				<List>
					<ListItem button key={'BIOPSIAS'} onClick={(e) => onChangeTab(e, 1, handleDrawerClose)}>
						<ListItemIcon> <PrivacyTipIcon /> </ListItemIcon>
						<ListItemText primary={'BIOPSIAS'} />
					</ListItem>
				</List>
			</Drawer>
			<main
				className={clsx(classes.content, {
					[classes.contentShift]: openDrawer,
				})}
			>
				<div className={classes.drawerHeader} />
				<Fragment className={classes.fragment}>
					<TabPanel value={value} index={0}>
						<MenuCuraciones
							enfermera={enfermera}
              colorBase={colorBase}
							sucursal={sucursal} />
					</TabPanel>
					<TabPanel value={value} index={1}>
						<MenuBiopsias
							enfermera={enfermera}
              colorBase={colorBase}
							sucursal={sucursal} />
					</TabPanel>
				</Fragment>

			</main>
		</div>
	);
}