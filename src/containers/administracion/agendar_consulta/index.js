import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { AgendarConsultaContainer } from "./agendar_consulta";
import {
	showAllTipoCitas,
	showAllMedios,
	showAllFrecuencias,
	createConsecutivo,
	findScheduleByDateAndSucursalAndService,
	showAllMetodoPago,
} from "../../../services";
import {
	createConsult,
	findConsultsByDateAndSucursal,
	updateConsult
} from "../../../services/consultas";
import {
	findCuracionByConsultaId,
} from "../../../services/curaciones";
import {
	findEsteticaByConsultaId,
} from "../../../services/esteticas";
import { Backdrop, CircularProgress, FormControl, InputLabel, MenuItem, Select, Snackbar, TablePagination } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';
import EditIcon from '@material-ui/icons/Edit';
import { toFormatterCurrency, addZero, generateFolio, dateToString } from "../../../utils/utils";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import PrintIcon from '@material-ui/icons/Print';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import FaceIcon from '@material-ui/icons/Face';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import { findProductoByServicio } from "../../../services/productos";
import { findEmployeesByRolIdAvailable } from "../../../services/empleados";

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

const AgendarConsulta = (props) => {

	const classes = useStyles();

	const {
		paciente,
		empleado,
		setPacienteAgendado,
		sucursal,
		onClickAgendarCuracion,
		onClickAgendarEstetica,
		onClickAgendarDermapen,
		onClickAgendarFaciales,
		onClickAgendarAparatologia,
		colorBase,
	} = props;

	const dermatologoRolId = process.env.REACT_APP_DERMATOLOGO_ROL_ID;
	const promovendedorRolId = process.env.REACT_APP_PROMOVENDEDOR_ROL_ID;
	const pendienteStatusId = process.env.REACT_APP_PENDIENTE_STATUS_ID;
	const asistioStatusId = process.env.REACT_APP_ASISTIO_STATUS_ID;
	const confirmadoStatusId = process.env.REACT_APP_CONFIRMADO_STATUS_ID;
	const enProcedimientoStatusId = process.env.REACT_APP_EN_PROCEDIMIENTO_STATUS_ID;
	const enConsultorioStatusId = process.env.REACT_APP_EN_CONSULTORIO_STATUS_ID;
	const enCabinaStatusId = process.env.REACT_APP_EN_CABINA_STATUS_ID;
	const atendidoStatusId = process.env.REACT_APP_ATENDIDO_STATUS_ID;
	const noAsistioStatusId = process.env.REACT_APP_NO_ASISTIO_STATUS_ID;
	const reagendoStatusId = process.env.REACT_APP_REAGENDO_STATUS_ID;
	const canceladoCPStatusId = process.env.REACT_APP_CANCELO_CP_STATUS_ID;
	const canceladoSPStatusId = process.env.REACT_APP_CANCELO_SP_STATUS_ID;
	const consultaServicioId = process.env.REACT_APP_CONSULTA_SERVICIO_ID;
	const sucursalManuelAcunaId = process.env.REACT_APP_SUCURSAL_MANUEL_ACUNA_ID;
	const sucursalRubenDarioId = process.env.REACT_APP_SUCURSAL_RUBEN_DARIO_ID;
	const dermatologoDirectoId = process.env.REACT_APP_DERMATOLOGO_DIRECTO_ID;
	const promovendedorSinPromovendedorId = process.env.REACT_APP_PROMOVENDEDOR_SIN_PROMOVENDEDOR_ID;
	const frecuenciaPrimeraVezId = process.env.REACT_APP_FRECUENCIA_PRIMERA_VEZ_ID;
	const frecuenciaReconsultaId = process.env.REACT_APP_FRECUENCIA_RECONSULTA_ID;
	const tipoCitaRevisionId = process.env.REACT_APP_TIPO_CITA_REVISADO_ID;
	const tipoCitaDerivadaId = process.env.REACT_APP_TIPO_CITA_DERIVADO_ID;
	const medioSinCitaId = process.env.REACT_APP_MEDIO_SIN_CITA_ID;
	const productoConsultaId = process.env.REACT_APP_PRODUCTO_CONSULTA_ID;
	const efectivoMetodoPagoId = process.env.REACT_APP_FORMA_PAGO_EFECTIVO;
	const fisicoMedioId = process.env.REACT_APP_MEDIO_FISICO_ID;

	const date = new Date();

	const [openAlert, setOpenAlert] = useState(false);
	const [message, setMessage] = useState('');
	const [severity, setSeverity] = useState('success');
	const [horarios, setHorarios] = useState([]);
	const [dermatologos, setDermatologos] = useState([]);
	const [frecuencias, setFrecuencias] = useState([]);
	const [productos, setProductos] = useState([]);
	const [tipoCitas, setTipoCitas] = useState([]);
	const [medios, setMedios] = useState([]);
	const [promovendedores, setPromovendedores] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [disableDate, setDisableDate] = useState(true);
	const [isHoliDay, setIsHoliDay] = useState(false);
	const [values, setValues] = useState({
		hora: '',
		fecha_hora: new Date(),
		producto: productoConsultaId,
		paciente: `${paciente._id}`,
		precio: isHoliDay ? sucursal.precio_festivo : // Dia Festivo
			date.getDay() === 6 ? (date.getHours() >= 13 ? sucursal.precio_sabado_vespertino : sucursal.precio_sabado_matutino) // SABADO
				: (date.getHours() >= 14 ? sucursal.precio_vespertino : sucursal.precio_matutino), // L-V
		porcentaje_descuento_clinica: 0,
		descuento_clinica: 0,
		descuento_dermatologo: 0,
		frecuencia: frecuenciaPrimeraVezId,
		forma_pago: efectivoMetodoPagoId,
		promovendedor: promovendedorSinPromovendedorId,
		dermatologo: dermatologoDirectoId,
		medio: fisicoMedioId,
	});

	const [consultas, setConsultas] = useState([]);
	const [formasPago, setFormasPago] = useState([]);
	const [openModal, setOpenModal] = useState(false);
	const [openModalProxima, setOpenModalProxima] = useState(false);
	const [openModalPagos, setOpenModalPagos] = useState(false);
	const [openModalCuraciones, setOpenModalCuraciones] = useState(false);
	const [openModalTraspaso, setOpenModalTraspaso] = useState(false);
	const [openModalEstetica, setOpenModalEstetica] = useState(false);
	const [consulta, setConsulta] = useState();
	const [openModalImprimirConsultas, setOpenModalImprimirConsultas] = useState(false);
	const [datosImpresion, setDatosImpresion] = useState();
	const [curacion, setCuracion] = useState({
		materiales: []
	});
	const [estetica, setEstetica] = useState({
		materiales: []
	});

	const dia = addZero(date.getDate());
	const mes = addZero(date.getMonth() + 1);
	const anio = date.getFullYear();

	const [filterDate, setFilterDate] = useState({
		fecha_show: date,
		fecha: `${dia}/${mes}/${anio}`,
	});

	const columns = [
		{ title: 'FOLIO', field: 'consecutivo' },
		{ title: 'HORA', field: 'hora' },
		{ title: 'PACIENTE', field: 'paciente_nombre' },
		{ title: 'TELÉFONO', field: 'paciente.telefono' },
		{ title: 'HORA LLEGADA', field: 'hora_llegada' },
		{ title: 'HORA ATENDIDO', field: 'hora_atencion' },
		{ title: 'HORA SALIDA', field: 'hora_salida' },
		{ title: 'PRODUCTO', field: 'show_tratamientos' },
		{ title: 'QUIÉN AGENDA', field: 'quien_agenda.nombre' },
		{ title: 'FRECUENCIA', field: 'frecuencia.nombre' },
		{ title: 'TIPO', field: 'tipo_cita.nombre' },
		{ title: 'DERMATÓLOGO (A)', field: 'dermatologo_nombre' },
		{ title: 'PROMOVENDEDOR (A)', field: 'promovendedor_nombre' },
		{ title: 'STATUS', field: 'status.nombre' },
		{ title: 'PRECIO', field: 'precio_moneda' },
		{ title: 'TOTAL', field: 'total_moneda' },
		{ title: 'FORMA DE PAGO', field: 'forma_pago.nombre' },
		{ title: 'OBSERVACIONES', field: 'observaciones' },
	];

	const dataComplete = !paciente.nombres || !values.precio || !values.dermatologo
		|| !values.promovendedor || (sucursal._id === sucursalManuelAcunaId ? (!values.fecha_hora || !values.medio) : false)
		|| (sucursal._id === sucursalRubenDarioId ? (!values.fecha_hora || !values.medio) : false);

	const options = {
		rowStyle: rowData => {
			return {
				color: rowData.status.color,
				backgroundColor: rowData.pagado ? process.env.REACT_APP_PAGADO_COLOR : ''
			};
		},
		headerStyle: {
			backgroundColor: colorBase,
			color: '#FFF',
			fontWeight: 'bolder',
			fontSize: '18px'
		},
		cellStyle: {
			fontWeight: 'bolder',
			fontSize: '16px',
			padding: '5px',
			textAlign: 'center',
		},
		paging: false,
	}

	const loadHorarios = async (date) => {
		const dia = date ? date.getDate() : values.fecha_show.getDate();
		const mes = Number(date ? date.getMonth() : values.fecha_show.getMonth());
		const anio = date ? date.getFullYear() : values.fecha_show.getFullYear();
		const response = await findScheduleByDateAndSucursalAndService(dia, mes, anio, sucursal._id, consultaServicioId);
		if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
			setHorarios(response.data);
		}
	}

	const handleChangeFecha = async (date) => {
		setIsLoading(true);
		await setValues({
			...values,
			fecha_hora: date,
		});
		await loadHorarios(date);
		setIsLoading(false);
	};

	const handleChangeHora = e => {
		setIsLoading(true);
		const hora = (e.target.value).split(':');
		const date = values.fecha_hora;
		date.setHours(Number(hora[0]));
		date.setMinutes(hora[1]);
		date.setSeconds(0);
		setValues({
			...values,
			hora: e.target.value,
			fecha_hora: date
		});
		setIsLoading(false);
	};

	const handleChangeFilterDate = async (date) => {
		setIsLoading(true);
		const dia = addZero(date.getDate());
		const mes = addZero(date.getMonth() + 1);
		const anio = date.getFullYear();
		setFilterDate({
			fecha_show: date,
			fecha: `${dia}/${mes}/${anio}`
		});
		await loadConsultas(date);
		setIsLoading(false);
	};

	const loadConsultas = async (filterDate) => {
		const response = await findConsultsByDateAndSucursal(filterDate.getDate(), filterDate.getMonth(), filterDate.getFullYear(), sucursal._id, empleado.access_token);
		if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
			response.data.forEach(item => {
				const fecha = new Date(item.fecha_hora);
				item.folio = generateFolio(item);
				item.hora = `${addZero(fecha.getHours())}:${addZero(fecha.getMinutes())}`;
				item.precio_moneda = toFormatterCurrency(item.precio);
				item.total_moneda = toFormatterCurrency(item.total);
				item.paciente_nombre = `${item.paciente.nombres} ${item.paciente.apellidos}`;
				item.promovendedor_nombre = item.promovendedor ? item.promovendedor.nombre : 'SIN ASIGNAR';
				item.dermatologo_nombre = item.dermatologo ? item.dermatologo.nombre : 'DIRECTO';
				item.show_tratamientos = item.producto.nombre;
			});
			setConsultas(response.data);
		}
	}

	const getTimeToTratamiento = (tratamientos) => {
		tratamientos.sort((a, b) => {
			if (a.tiempo < b.tiempo) return 1;
			if (a.tiempo > b.tiempo) return -1;
			return 0;
		});
		let tiempo = 0;
		tratamientos.forEach((item, index) => {
			tiempo += Number(index === 0 ? item.tiempo : (item.tiempo - (item.servicio !== 'APARATOLOGÍA' ? 20 : 0)));
		});
		return tiempo;
	}

	const handleChangeTipoCita = (e) => {
		setValues({ ...values, tipo_cita: e.target.value });
	}

	const handleChangeMedio = (e) => {
		setValues({ ...values, medio: e.target.value });
	}

	const handleChangeProductos = (e) => {
		setValues({ ...values, producto: e.target.value });
	}

	const handleClickAgendar = async (data) => {
		setIsLoading(true);
		data.quien_agenda = empleado._id;
		data.sucursal = sucursal._id;
		data.status = pendienteStatusId;
		data.hora_llegada = '--:--';
		data.hora_atencion = '--:--';
		data.hora_salida = '--:--';
		data.total = data.precio;
		data.servicio = consultaServicioId;
		data.tipo_cita = data.frecuencia === frecuenciaPrimeraVezId ? tipoCitaRevisionId : tipoCitaDerivadaId;
		if (sucursal._id !== sucursalManuelAcunaId && sucursal._id !== sucursalRubenDarioId) {
			const dateNow = new Date();
			data.hora_llegada = `${addZero(dateNow.getHours())}:${addZero(dateNow.getMinutes())}`;
			dateNow.setMinutes(0);
			dateNow.setSeconds(0);
			data.fecha_hora = dateNow;
			data.status = asistioStatusId;
			data.hora_aplicacion = new Date();
			// data.quien_confirma_asistencia = empleado._id;
		}

		const response = await createConsult(data, empleado.access_token);
		if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_CREATED) {
			setOpenAlert(true);
			setSeverity('success');
			setMessage('LA CONSULTA SE AGENDO CORRECTAMENTE');
			setValues({
				servicio: '',
				tratamiento: '',
				fecha_show: '',
				fecha: '',
				hora: '',
				paciente: {},
				precio: '',
				tipo_cita: '',
				citado: '',
				pagado: false,
			});
			setDisableDate(true);
			setPacienteAgendado({});
			loadConsultas(new Date());
		}
		setIsLoading(false);
	};

	const handleChangePrecio = (e) => {
		setValues({ ...values, precio: e.target.value });
	}

	const handleChangeTiempo = (e) => {
		setValues({ ...values, tiempo: e.target.value });
	}

	const handleChangeDermatologos = (e) => {
		setValues({ ...values, dermatologo: e.target.value });
	}

	const handleChangeHoliDay = (e) => {
		setValues({
			...values,
			precio: !isHoliDay ? sucursal.precio_festivo : // Dia Festivo
				date.getDay() === 6 ? (date.getHours() >= 13 ? sucursal.precio_sabado_vespertino : sucursal.precio_sabado_matutino) // SABADO
					: (date.getHours() >= 14 ? sucursal.precio_vespertino : sucursal.precio_matutino), // L-V
		})
		setIsHoliDay(!isHoliDay);
	}

	const handleChangeObservaciones = e => {
		setValues({ ...values, observaciones: e.target.value.toUpperCase() });
	}

	const handleChangePromovendedor = (e) => {
		setValues({ ...values, promovendedor: e.target.value });
	}

	const handleChangeFrecuencia = (e) => {
		const frecuencia = e.target.value;
		const dermatologo = dermatologos.find(item => {
			return item._id === dermatologoDirectoId;
		});
		const promovendedor = promovendedores.find(item => {
			return item._id === promovendedorSinPromovendedorId;
		});
		setValues({
			...values,
			frecuencia: frecuencia,
			dermatologo: frecuencia === frecuenciaPrimeraVezId ? dermatologo._id : dermatologoDirectoId,
			promovendedor: frecuencia === frecuenciaReconsultaId ? promovendedor : promovendedorSinPromovendedorId,
			producto: frecuencia === frecuenciaPrimeraVezId ? productoConsultaId : values.producto,
		});
	}

	const handleCloseAlert = () => {
		setOpenAlert(false);
	};

	const handleCloseModal = () => {
		setOpenModal(false);
		setOpenModalProxima(false);
		setOpenModalTraspaso(false);
	};

	const handleOnClickEditarConsulta = async (event, rowData) => {
		setIsLoading(true);
		setConsulta(rowData);
		await loadHorarios(new Date(rowData.fecha_hora));
		setOpenModal(true);
		setIsLoading(false);
	}

	const handleOnClickNuevaConsulta = async (event, rowData) => {
		setIsLoading(true);
		setConsulta(rowData);
		// await loadTratamientos(rowData.servicio);
		await loadHorarios(new Date(rowData.fecha_hora));
		setOpenModalProxima(true);
		setIsLoading(false);
	}

	const handleClickVerPagos = (event, rowData) => {
		setConsulta(rowData);
		setOpenModalPagos(true);
	}

	const handleClickTraspaso = (event, rowData) => {
		setConsulta(rowData);
		setOpenModalTraspaso(true);
	}

	const handleClickCuracion = async (event, rowData) => {
		const response = await findCuracionByConsultaId(rowData._id);
		if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
			if (response.data !== '') {
				setCuracion(response.data);
			}
		}
		setConsulta(rowData);
		setOpenModalCuraciones(true);
	}

	const handleClickEstetica = async (event, rowData) => {
		const response = await findEsteticaByConsultaId(rowData._id);
		if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
			if (response.data !== '') {
				setEstetica(response.data);
			}
		}
		setConsulta(rowData);
		setOpenModalEstetica(true);
	}

	const handleCloseVerPagos = () => {
		setOpenModalPagos(false);
	}

	const handleCloseCuracion = () => {
		setCuracion({
			materiales: [],
		});
		setOpenModalCuraciones(false);
	}

	const handleCloseEstetica = () => {
		setEstetica({
			materiales: [],
		});
		setOpenModalEstetica(false);
	}

	const handleCloseImprimirConsulta = () => {
		setOpenModalImprimirConsultas(false);
	}

	const handlePrint = async (event, rowData) => {
		setDatosImpresion(rowData);
		setOpenModalImprimirConsultas(true);
	}

	const handleGuardarModalPagos = async (servicio) => {
		servicio.pagado = servicio.pagos.length > 0;
		await updateConsult(servicio._id, servicio, empleado.access_token);
		await loadConsultas(new Date(servicio.fecha_hora));
		setOpenModalPagos(false);
	}

	const actions = [
		//new Date(anio, mes - 1, dia) < filterDate.fecha_show  ? 
		{
			icon: PrintIcon,
			tooltip: 'IMPRIMIR',
			onClick: handlePrint
		},
		{
			icon: EditIcon,
			tooltip: 'EDITAR',
			onClick: handleOnClickEditarConsulta
		},
		{
			icon: LocalHospitalIcon,
			tooltip: 'AGREGAR FACIAL',
			onClick: onClickAgendarFaciales
		},
		{
			icon: LocalHospitalIcon,
			tooltip: 'AGREGAR APARATOLOGÍA',
			onClick: onClickAgendarAparatologia
		},
		{
			icon: LocalHospitalIcon,
			tooltip: 'AGREGAR DERMAPEN',
			onClick: onClickAgendarDermapen
		},
		{
			icon: LocalHospitalIcon,
			tooltip: 'AGREGAR CURACIÓN',
			onClick: onClickAgendarCuracion
		},
		{
			icon: FaceIcon,
			tooltip: 'AGREGAR ESTÉTICA',
			onClick: onClickAgendarEstetica
		},
		{
			icon: EventAvailableIcon,
			tooltip: 'NUEVA CITA',
			onClick: handleOnClickNuevaConsulta
		},
		{

			icon: AttachMoneyIcon,
			tooltip: 'PAGOS',
			onClick: handleClickVerPagos

		},
		{
			icon: AttachMoneyIcon,
			tooltip: 'TRASPASO',
			onClick: handleClickTraspaso
		},
		//: ''
		/*rowData => {
			return (rowData.status._id === enProcedimientoStatusId || rowData.status._id === enConsultorioStatusId
				|| rowData.status._id === enCabinaStatusId || rowData.status._id === atendidoStatusId)
				? {
					icon: LocalHospitalIcon,
					tooltip: 'AGREGAR CURACIÓN',
					onClick: onClickAgendarCuracion
				} : ''
		},
		rowData => {
			return (rowData.status._id === enProcedimientoStatusId || rowData.status._id === enConsultorioStatusId
				|| rowData.status._id === enCabinaStatusId || rowData.status._id === atendidoStatusId)
				? {
					icon: FaceIcon,
					tooltip: 'AGREGAR ESTÉTICA',
					onClick: onClickAgendarEstetica
				} : ''
		},
		rowData => (
			rowData.status._id !== pendienteStatusId ? {
				icon: AttachMoneyIcon,
				tooltip: rowData.pagado ? 'VER PAGO' : 'PAGAR',
				onClick: handleClickVerPagos
			} : ''
		),
		rowData => (
			rowData.status._id === atendidoStatusId ? {
				icon: EventAvailableIcon,
				tooltip: 'NUEVA CITA',
				onClick: handleOnClickNuevaConsulta
			} : ''
		),*/
	];

	const onChangeActions = (e, rowData) => {
		const action = e.target.value;
		switch (action) {
			case 'IMPRIMIR':
				handlePrint(e, rowData);
				break;
			case 'EDITAR':
				handleOnClickEditarConsulta(e, rowData);
				break;
			case 'AGREGAR CURACIÓN':
				onClickAgendarCuracion(e, rowData);
				break;
			case 'AGREGAR ESTÉTICA':
				onClickAgendarEstetica(e, rowData);
				break;
			case 'AGREGAR DERMAPEN':
				onClickAgendarDermapen(e, rowData);
				break;
			case 'AGREGAR APARATOLOGÍA':
				onClickAgendarAparatologia(e, rowData);
				break;
			case 'AGREGAR FACIAL':
				onClickAgendarFaciales(e, rowData);
				break;
			case 'NUEVA CITA':
				handleOnClickNuevaConsulta(e, rowData);
				break;
			case 'PAGOS':
				handleClickVerPagos(e, rowData);
				break;
			case 'TRASPASO':
				handleClickTraspaso(e, rowData);
				break;
		}
	}

	const components = {
		Pagination: props => {
			return <TablePagination
				{...props}
				rowsPerPageOptions={[5, 10, 20, 30, consultas.length]}
			/>
		},
		Actions: props => {
			return props.actions.length > 0
				? <Fragment>
					<FormControl variant="outlined" className={classes.formControl}>
						<Select
							labelId="simple-select-outlined-actions"
							id="simple-select-outlined-actions"
							onChange={(e) => onChangeActions(e, props.data)}
							label="ACCIONES">
							{
								props.actions.map((item, index) => {
									let menuItem = <MenuItem
										key={index}
										value={item.tooltip}
									>{item.tooltip}</MenuItem>;
									switch (item.tooltip) {
										case 'EDITAR':
											menuItem = props.data.status._id !== canceladoCPStatusId && props.data.status._id !== canceladoSPStatusId
												?
												<MenuItem
													key={index}
													value={item.tooltip}
												>{item.tooltip}</MenuItem>
												: '';
											break;
										case 'PAGOS':
											menuItem = props.data.status._id !== pendienteStatusId && props.data.status._id !== confirmadoStatusId ?
												<MenuItem
													key={index}
													value={item.tooltip}
												>{item.tooltip}</MenuItem>
												: '';
											break;
										case 'TRASPASO':
											menuItem = props.data.status._id !== atendidoStatusId && props.data.status._id !== confirmadoStatusId ?
												<MenuItem
													key={index}
													value={item.tooltip}
												>{item.tooltip}</MenuItem>
												: '';
											break;
										case 'NUEVA CITA':
											menuItem = props.data.status._id === atendidoStatusId ?
												<MenuItem
													key={index}
													value={item.tooltip}
												>{item.tooltip}</MenuItem>
												: '';
									}
									if (menuItem !== '' && props.data.status._id !== reagendoStatusId && props.data.status._id !== noAsistioStatusId) {
										return menuItem;
									}
								})
							}
						</Select>
					</FormControl>
				</Fragment>
				: ''
		}
	}

	const handleChangePaymentMethod = (e) => {
		setValues({
			...values,
			forma_pago: e.target.value,
		});
	}

	const loadFormasPago = async () => {
		const response = await showAllMetodoPago();
		if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
			setFormasPago(response.data);
		}
	}

	const loadDermatologos = async () => {
		const response = await findEmployeesByRolIdAvailable(dermatologoRolId, empleado.access_token);
		if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
			setDermatologos(response.data);
		}
	}

	const loadPromovendedores = async () => {
		const response = await findEmployeesByRolIdAvailable(promovendedorRolId, empleado.access_token);
		if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
			setPromovendedores(response.data);
		}
	}

	const loadTipoCitas = async () => {
		const response = await showAllTipoCitas();
		if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
			setTipoCitas(response.data);
		}
	}

	const loadMedios = async () => {
		const response = await showAllMedios();
		if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
			setMedios(response.data);
		}
	}

	const loadFrecuencias = async () => {
		const response = await showAllFrecuencias();
		if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
			setFrecuencias(response.data);
		}
	}

	const loadProductos = async () => {
		const response = await findProductoByServicio(consultaServicioId);
		if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
			setProductos(response.data);
		}
	}

	const loadAll = async () => {
		setIsLoading(true);
		await loadConsultas(new Date());
		await loadProductos();
		await loadDermatologos();
		await loadPromovendedores();
		await loadTipoCitas();
		await loadFrecuencias();
		await loadMedios();
		await loadFormasPago();
		await loadHorarios(values.fecha_hora);
		setIsLoading(false);
	}

	useEffect(() => {
		loadAll();
	}, []);

	return (
		<Fragment>
			{
				!isLoading ?
					<AgendarConsultaContainer
						values={values}
						horarios={horarios}
						formasPago={formasPago}
						onChangeFecha={(e) => handleChangeFecha(e)}
						onChangeFilterDate={(e) => handleChangeFilterDate(e)}
						onChangeHora={(e) => handleChangeHora(e)}
						filterDate={filterDate.fecha_show}
						paciente={paciente}
						disableDate={disableDate}
						onClickAgendar={handleClickAgendar}
						onChangePrecio={(e) => handleChangePrecio(e)}
						onChangeTiempo={(e) => handleChangeTiempo(e)}
						onChangeObservaciones={(e) => handleChangeObservaciones(e)}
						onChangePaymentMethod={(e) => handleChangePaymentMethod(e)}
						titulo={`CONSULTAS (${dateToString(filterDate.fecha_show)})`}
						columns={columns}
						options={options}
						citas={consultas}
						actions={actions}
						components={components}
						consulta={consulta}
						openModal={openModal}
						empleado={empleado}
						sucursal={sucursal}
						isHoliDay={isHoliDay}
						colorBase={colorBase}
						onClickCancel={handleCloseModal}
						loadConsultas={loadConsultas}
						tipoCitas={tipoCitas}
						medios={medios}
						onChangeTipoCita={(e) => handleChangeTipoCita(e)}
						onChangeMedio={(e) => handleChangeMedio(e)}
						onChangeProductos={(e) => handleChangeProductos(e)}
						dermatologos={dermatologos}
						promovendedores={promovendedores}
						onChangeDermatologos={(e) => handleChangeDermatologos(e)}
						onChangePromovendedor={(e) => handleChangePromovendedor(e)}
						onChangeHoliDay={(e) => handleChangeHoliDay(e)}
						setOpenAlert={setOpenAlert}
						setMessage={setMessage}
						setSeverity={setSeverity}
						setFilterDate={setFilterDate}
						OnCloseVerPagos={handleCloseVerPagos}
						openModalPagos={openModalPagos}
						openModalCuraciones={openModalCuraciones}
						openModalEstetica={openModalEstetica}
						openModalProxima={openModalProxima}
						openModalTraspaso={openModalTraspaso}
						openModalImprimirConsultas={openModalImprimirConsultas}
						datosImpresion={datosImpresion}
						onCloseImprimirConsulta={handleCloseImprimirConsulta}
						frecuencias={frecuencias}
						productos={productos}
						onChangeFrecuencia={(e) => handleChangeFrecuencia(e)}
						dataComplete={dataComplete}
						onCloseCuracion={handleCloseCuracion}
						onCloseEstetica={handleCloseEstetica}
						curacion={curacion}
						estetica={estetica}
						tipoServicioId={consultaServicioId}
						frecuenciaPrimeraVezId={frecuenciaPrimeraVezId}
						frecuenciaReconsultaId={frecuenciaReconsultaId}
						onGuardarModalPagos={handleGuardarModalPagos} /> :
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

export default AgendarConsulta;