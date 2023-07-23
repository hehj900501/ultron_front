import React, { useState, useEffect, Fragment } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Backdrop, CircularProgress } from "@material-ui/core";
import { addZero, dateToString } from "../../../../../utils/utils";
import { ReportesHistoriaClinicaContainer } from "./reportes_historia_clinica";
import { findHistoriaClinicasByRangeDateAndSucursal } from "../../../../../services/u-sgcm-ficha-clinica/historia_clinica";

const useStyles = makeStyles(theme => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}));

const ReportesHistoriaClinica = (props) => {

	const classes = useStyles();

	const {
		empleado,
		sucursal,
		colorBase,
	} = props;

	const token = empleado.access_token;

	const [isLoading, setIsLoading] = useState(true);
	const [citas, setCitas] = useState([]);

	const date = new Date();
	const dia = addZero(date.getDate());
	const mes = addZero(date.getMonth() + 1);
	const anio = date.getFullYear();

	const [startDate, setStartDate] = useState({
		fecha_show: date,
		fecha: `${dia}/${mes}/${anio}`,
	});

	const [endDate, setEndDate] = useState({
		fecha_show: date,
		fecha: `${dia}/${mes}/${anio}`,
	});

	const columns = [
		{ title: 'FECHA', field: 'fecha' },
		{ title: 'PACIENTE', field: 'paciente_nombre' },
		{ title: 'DERMATÓLOGO (A)', field: 'dermatologo.nombre' },
		{ title: 'MOTIVO CONSULTA', field: 'motivo_consulta' },
		{ title: 'INTERROGATORIO', field: 'interrogatorio' },
		{ title: 'TOPOGRAFÍA', field: 'topologia' },
		{ title: 'MORFOLOGÍA', field: 'morfologia' },
		{ title: 'DIAGNÓSTICO', field: 'diagnostico_cie' },
		{ title: 'NOTAS EVOLUCIÓN', field: 'notas_evolucion' }
	];

	const options = {
		/*rowStyle: rowData => {
			return { 
				color: rowData.status.color,
				backgroundColor: rowData.pagado ? '#10CC88' : ''
			};
		},*/
		headerStyle: {
			backgroundColor: colorBase,
			color: '#FFF',
			fontWeight: 'bolder',
			fontSize: '18px'
		},
		exportAllData: true,
		exportButton: true,
		exportDelimiter: ';'
	}

	const handleChangeStartDate = async (date) => {
		setIsLoading(true);
		const dia = addZero(date.getDate());
		const mes = addZero(date.getMonth() + 1);
		const anio = date.getFullYear();
		setStartDate({
			fecha_show: date,
			fecha: `${dia}/${mes}/${anio}`
		});
		setIsLoading(false);
	};

	const handleChangeEndDate = async (date) => {
		setIsLoading(true);
		const dia = addZero(date.getDate());
		const mes = addZero(date.getMonth() + 1);
		const anio = date.getFullYear();
		setEndDate({
			fecha_show: date,
			fecha: `${dia}/${mes}/${anio}`
		});

		setIsLoading(false);
	};

	const handleReportes = async () => {
		await loadHistoriasClinicas(startDate.fecha_show, endDate.fecha_show);
	}

	const loadHistoriasClinicas = async (startDate, endDate) => {
		const response = await findHistoriaClinicasByRangeDateAndSucursal(startDate.getDate(), startDate.getMonth(), startDate.getFullYear(),
			endDate.getDate(), (endDate.getMonth() + 1), endDate.getFullYear(), sucursal, token);
		if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
			response.data.forEach(item => {
				item.fecha = dateToString(item.create_date)
				item.paciente_nombre = `${item.paciente.nombres} ${item.paciente.apellidos}`
				if (item.expediente_electronico) {
					item.motivo_consulta = item.expediente_electronico.motivo_consulta ? item.expediente_electronico.motivo_consulta.split("\n").join(" ") : item.expediente_electronico.motivo_consulta
					item.interrogatorio = item.expediente_electronico.interrogatorio ? item.expediente_electronico.interrogatorio.split("\n").join(" ") : item.expediente_electronico.interrogatorio
					item.topologia = item.expediente_electronico.topologia ? item.expediente_electronico.topologia.split("\n").join(" ") : item.expediente_electronico.topologia
					item.morfologia = item.expediente_electronico.morfologia ? item.expediente_electronico.morfologia.split("\n").join(" ") : item.expediente_electronico.morfologia
					item.diagnostico_cie = item.expediente_electronico.diagnostico_cie ? item.expediente_electronico.diagnostico_cie.split("\n").join(" ") : item.expediente_electronico.diagnostico_cie
					item.notas_evolucion = item.expediente_electronico.notas_evolucion ? item.expediente_electronico.notas_evolucion.split("\n").join(" ") : item.expediente_electronico.notas_evolucion
				}
			})
			setCitas(response.data);
		}
	}

	useEffect(() => {
		setIsLoading(true);
		loadHistoriasClinicas(startDate.fecha_show, endDate.fecha_show);
		setIsLoading(false);
	}, [startDate, endDate]);

	const actions = [
	];

	return (
		<Fragment>
			{
				!isLoading ?
					<ReportesHistoriaClinicaContainer
						onChangeStartDate={(e) => handleChangeStartDate(e)}
						onChangeEndDate={(e) => handleChangeEndDate(e)}
						startDate={startDate.fecha_show}
						endDate={endDate.fecha_show}
						titulo={`REPORTE DE EXPEDIENTES(${startDate.fecha} - ${endDate.fecha})`}
						columns={columns}
						options={options}
						citas={citas}
						actions={actions}
						colorBase={colorBase}
						loadCitas={loadHistoriasClinicas}
						onClickReportes={handleReportes}
						{...props} />
					: <Backdrop className={classes.backdrop} open={isLoading} >
						<CircularProgress color="inherit" />
					</Backdrop>
			}
		</Fragment>
	);
}

export default ReportesHistoriaClinica;