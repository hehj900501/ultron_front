import React, { useState, useEffect, Fragment } from "react";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { addZero, dateToString, generateFolio, toFormatterCurrency } from "../../../utils/utils";
import { GeneralCitasContainer } from "./general_citas";
import myStyles from "../../../css";
import { findConsultsByDateAndSucursal } from "../../../services/consultas";
import { findFacialByDateAndSucursal } from "../../../services/faciales";
import { findAparatologiaByDateAndSucursal } from "../../../services/aparatolgia";
import { findDermapenByDateAndSucursal } from "../../../services/dermapens";
import { findCuracionByDateAndSucursal } from "../../../services/curaciones";
import { findEsteticaByDateAndSucursal } from "../../../services/esteticas";

const GeneralCitas = (props) => {

	const {
		empleado,
		sucursal,
		colorBase,
	} = props;

	const classes = myStyles(colorBase)();

	const [consultas, setConsultas] = useState([]);
	const [faciales, setFaciales] = useState([]);
	const [aparatologias, setAparatologias] = useState([]);
	const [dermapens, setDermapens] = useState([]);
	const [curaciones, setCuraciones] = useState([]);
	const [esteticas, setEsteticas] = useState([]);

	const [isLoading, setIsLoading] = useState(true);

	const date = new Date();
	const dia = addZero(date.getDate());
	const mes = addZero(date.getMonth() + 1);
	const anio = date.getFullYear();

	const [filterDate, setFilterDate] = useState({
		fecha_show: date,
		fecha: `${dia}/${mes}/${anio}`
	});

	const columns = [
		{ title: 'FOLIO', field: 'consecutivo' },
		{ title: 'HORA', field: 'hora' },
		{ title: 'PACIENTE', field: 'paciente_nombre' },
		{ title: 'TELÉFONO', field: 'paciente.telefono' },
		{ title: 'SERVICIO', field: 'servicio.nombre' },
		{ title: 'PRODUCTO (ÁREAS)', field: 'show_tratamientos' },
		{ title: 'TIEMPO', field: 'tiempo' },
		{ title: 'OBSERVACIONES', field: 'observaciones' },
		{ title: 'QUIÉN AGENDA', field: 'quien_agenda.nombre' },
		{ title: 'FRECUENCIA', field: 'frecuencia.nombre' },
		{ title: 'TIPO', field: 'tipo_cita.nombre' },
		{ title: 'DERMATÓLOGO (A)', field: 'dermatologo_nombre' },
		{ title: 'COSMETÓLOGA', field: 'cosmetologa_nombre' },
		{ title: 'PROMOVENDEDOR (A)', field: 'promovendedor_nombre' },
		{ title: 'STATUS', field: 'status.nombre' },
		{ title: 'PRECIO', field: 'precio_moneda' },
		{ title: 'TOTAL', field: 'total_moneda' },
		{ title: 'FORMA DE PAGO', field: 'forma_pago.nombre' },
		{ title: 'HORA LLEGADA', field: 'hora_llegada' },
		{ title: 'HORA ATENDIDO', field: 'hora_atencion' },
		{ title: 'HORA SALIDA', field: 'hora_salida' },
	];

	const options = {
		rowStyle: rowData => {
			return {
				color: rowData.status.color,
				//backgroundColor: rowData.servicio.color,
			};
		},
		headerStyle: {
			backgroundColor: colorBase,
			color: '#FFF',
			fontWeight: 'bolder',
			fontSize: '18px'
		},
		paging: false,
		cellStyle: {
			fontWeight: 'bolder',
			fontSize: '16px',
			padding: '5px',
			textAlign: 'center',
		},
		exportAllData: true,
		exportButton: true,
		exportDelimiter: ';'
	}

	const actions = [];

	const loadConsultas = async (filterDate) => {
		const response = await findConsultsByDateAndSucursal(filterDate.getDate(), filterDate.getMonth(), filterDate.getFullYear(), sucursal, empleado.access_token);
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
				item.show_tratamientos = 'NO APLICA';
			});
			setConsultas(response.data);
		}
	}

	const loadFaciales = async (filterDate) => {
		const response = await findFacialByDateAndSucursal(filterDate.getDate(), filterDate.getMonth(), filterDate.getFullYear(), sucursal, empleado.access_token);
		if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
			response.data.forEach(item => {
				item.folio = generateFolio(item);
				const fecha = new Date(item.fecha_hora);
				item.hora = `${addZero(fecha.getHours())}:${addZero(fecha.getMinutes())}`;
				item.precio_moneda = toFormatterCurrency(item.precio);
				item.total_moneda = toFormatterCurrency(item.total);
				item.paciente_nombre = `${item.paciente.nombres} ${item.paciente.apellidos}`;
				item.promovendedor_nombre = item.promovendedor ? item.promovendedor.nombre : 'SIN ASIGNAR';
				item.cosmetologa_nombre = item.cosmetologa ? item.cosmetologa.nombre : 'SIN ASIGNAR';
				item.dermatologo_nombre = item.dermatologo ? item.dermatologo.nombre : 'DIRECTO';
				item.show_tratamientos = item.tratamientos ? item.tratamientos.map(tratamiento => {
					const show_areas = tratamiento.areasSeleccionadas ? tratamiento.areasSeleccionadas.map(area => {
						return `${area.nombre}`;
					}) : '';
					return `►${tratamiento.nombre}(${show_areas}) `;
				}) : 'NO APLICA';
			});
			setFaciales(response.data);
		}
	}

	const loadAparatologias = async (filterDate) => {
		const response = await findAparatologiaByDateAndSucursal(filterDate.getDate(), filterDate.getMonth(), filterDate.getFullYear(), sucursal, empleado.access_token);
		if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
			response.data.forEach(item => {
				item.folio = generateFolio(item);
				const fecha = new Date(item.fecha_hora);
				item.hora = `${addZero(fecha.getHours())}:${addZero(fecha.getMinutes())}`;
				item.precio_moneda = toFormatterCurrency(item.precio);
				item.total_moneda = toFormatterCurrency(item.total);
				item.paciente_nombre = `${item.paciente.nombres} ${item.paciente.apellidos}`;
				item.promovendedor_nombre = item.promovendedor ? item.promovendedor.nombre : 'SIN ASIGNAR';
				item.cosmetologa_nombre = item.cosmetologa ? item.cosmetologa.nombre : 'SIN ASIGNAR';
				item.dermatologo_nombre = item.dermatologo ? item.dermatologo.nombre : 'DIRECTO';
				item.show_tratamientos = item.tratamientos ? item.tratamientos.map(tratamiento => {
					const show_areas = tratamiento.areasSeleccionadas ? tratamiento.areasSeleccionadas.map(area => {
						return `${area.nombre}`;
					}) : '';
					return `►${tratamiento.nombre}(${show_areas}) `;
				}) : 'NO APLICA';
			});
			setAparatologias(response.data);
		}
	}

	const loadDermapens = async (filterDate) => {
		const response = await findDermapenByDateAndSucursal(filterDate.getDate(), filterDate.getMonth(), filterDate.getFullYear(), sucursal, empleado.access_token);
		if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
			response.data.forEach(item => {
				item.folio = generateFolio(item);
				const fecha = new Date(item.fecha_hora);
				item.hora = `${addZero(fecha.getHours())}:${addZero(fecha.getMinutes())}`;
				item.precio_moneda = toFormatterCurrency(item.precio);
				item.total_moneda = toFormatterCurrency(item.total);
				item.paciente_nombre = `${item.paciente.nombres} ${item.paciente.apellidos}`;
				item.promovendedor_nombre = item.promovendedor ? item.promovendedor.nombre : 'SIN ASIGNAR';
				item.dermatologo_nombre = item.dermatologo ? item.dermatologo.nombre : 'DIRECTO';
				item.show_tratamientos = `►${item.producto.nombre}`;
			});
			setDermapens(response.data);
		}
	}

	const loadCuraciones = async (filterDate) => {
		const response = await findCuracionByDateAndSucursal(filterDate.getDate(), filterDate.getMonth(), filterDate.getFullYear(), sucursal, empleado.access_token, empleado.access_token);
		if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
			response.data.forEach(item => {
				item.folio = generateFolio(item);
				const fecha = new Date(item.fecha_hora);
				item.hora = `${addZero(fecha.getHours())}:${addZero(fecha.getMinutes())}`;
				item.precio_moneda = toFormatterCurrency(item.precio);
				item.total_moneda = toFormatterCurrency(item.total);
				item.paciente_nombre = `${item.paciente.nombres} ${item.paciente.apellidos}`;
				item.promovendedor_nombre = item.promovendedor ? item.promovendedor.nombre : 'SIN ASIGNAR';
				item.cosmetologa_nombre = item.cosmetologa ? item.cosmetologa.nombre : 'SIN ASIGNAR';
				item.dermatologo_nombre = item.dermatologo ? item.dermatologo.nombre : 'DIRECTO';
				item.show_tratamientos = 'NO APLICA';
			});
			setCuraciones(response.data);
		}
	}

	const loadEsteticas = async (filterDate) => {
		const response = await findEsteticaByDateAndSucursal(filterDate.getDate(), filterDate.getMonth(), filterDate.getFullYear(), sucursal, empleado.access_token);
		if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
			response.data.forEach(item => {
				item.folio = generateFolio(item);
				const fecha = new Date(item.fecha_hora);
				item.hora = `${addZero(fecha.getHours())}:${addZero(fecha.getMinutes())}`;
				item.precio_moneda = toFormatterCurrency(item.precio);
				item.total_moneda = toFormatterCurrency(item.total);
				item.paciente_nombre = `${item.paciente.nombres} ${item.paciente.apellidos}`;
				item.dermatologo_nombre = item.dermatologo.nombre;
				item.promovendedor_nombre = item.promovendedor.nombre;
				item.show_tratamientos = item.producto.map(product => {
					const toxinasRellenos = item.toxinas_rellenos.filter(toxina_relleno => {
						return toxina_relleno.producto._id === product._id;
					});
					const show_toxinas = toxinasRellenos.map(toxinaRelleno => {
						return `${toxinaRelleno.nombre}`;
					});
					return `►${product.nombre}(${show_toxinas}) `;
				});
			});
			setEsteticas(response.data);
		}
	}

	const loadAll = async (date) => {
		setIsLoading(true);
		await loadConsultas(date);
		await loadFaciales(date);
		await loadAparatologias(date);
		await loadDermapens(date);
		await loadCuraciones(date);
		await loadEsteticas(date);
		setIsLoading(false);
	}

	const handleChangeFilterDate = async (date) => {
		setConsultas([]);
		setFaciales([]);
		setAparatologias([]);
		setDermapens([]);
		setCuraciones([]);
		setEsteticas([]);
		const dia = addZero(date.getDate());
		const mes = addZero(date.getMonth() + 1);
		const anio = date.getFullYear();
		setFilterDate({
			fecha_show: date,
			fecha: `${dia}/${mes}/${anio}`
		});
		loadAll(date);
	};

	useEffect(() => {
		loadAll(new Date());
	}, [sucursal]);

	return (
		<Fragment>
			{
				!isLoading ?
					<GeneralCitasContainer
						onChangeFilterDate={(e) => handleChangeFilterDate(e)}
						filterDate={filterDate.fecha_show}
						faciales={faciales}
						aparatologias={aparatologias}
						dermapens={dermapens}
						titulo={`LISTADO GENERAL DE CITAS (${dateToString(filterDate.fecha_show)})`}
						columns={columns}
						options={options}
						actions={actions}
						sucursal={sucursal} />
					:
					<Backdrop className={classes.backdrop} open={isLoading} >
						<CircularProgress color="inherit" />
					</Backdrop>
			}
		</Fragment>
	);
}

export default GeneralCitas;