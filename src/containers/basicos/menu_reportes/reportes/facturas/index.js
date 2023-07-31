import React, { useState, useEffect, Fragment } from "react";
import { Backdrop, CircularProgress } from "@material-ui/core";
import { addZero, dateToString } from "../../../../../utils/utils";
import { ReportesFacturasContainer } from "./reportes_facturas";
import { findFacturasByRangeDateAndSucursal } from "../../../../../services/facturas";
import myStyles from "../../../../../css";

const ReportesFacturas = (props) => {

	const {
		empleado,
		sucursal,
		colorBase,
	} = props;

	const token = empleado.access_token;

	const classes = myStyles(colorBase)();

	const [isLoading, setIsLoading] = useState(true);
	const [facturas, setFacturas] = useState([]);

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
		{ title: 'PACIENTE', field: 'paciente.nombre_completo' },
		{ title: 'RAZÓN SOCIAL', field: 'razon_social.nombre_completo' },
		{ title: 'RFC', field: 'razon_social.rfc' },
		{ title: 'USO CFDI', field: 'uso_cfdi.nombre' },
		{ title: 'DOMICILIO', field: 'domicilio_completo' },
		{ title: 'ESTADO', field: 'razon_social.estado' },
		{ title: 'MUNICIPIO', field: 'razon_social.municipio' },
		{ title: 'CODIGÓ POSTAL', field: 'razon_social.codigo_postal' },
		{ title: 'COLONIA', field: 'razon_social.colonia' },
		{ title: 'TELEFÓNO', field: 'razon_social.telefono' },
		{ title: 'CORREO', field: 'razon_social.email' },
	];

	const options = {
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

	const actions = [
		/*{
			icon: PrintIcon,
			tooltip: 'IMPRIMIR',
			onClick: handlePrint
		},*/
	];

	const loadFacturas = async (startDate, endDate) => {
		const response = await findFacturasByRangeDateAndSucursal(startDate.getDate(), startDate.getMonth(), startDate.getFullYear(),
			endDate.getDate(), (endDate.getMonth() + 1), endDate.getFullYear(), sucursal, token);
		if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
			const resData = response.data;
			resData.forEach((factura) => {
				factura.fecha = dateToString(factura.fecha_hora);
				factura.paciente.nombre_completo = `${factura.paciente.nombres} ${factura.paciente.apellidos}`;
				factura.domicilio_completo = `${factura.razon_social.domicilio} #${factura.razon_social.numero_exterior} ${factura.razon_social.numero_interior ? '- ' + factura.razon_social.numero_interior : ''}`;
				factura.uso_cfdi.nombre = `${factura.uso_cfdi.clave}: ${factura.uso_cfdi.descripcion}`;
			});
			setFacturas(resData);
		}
	}

	const loadAll = async () => {
		setIsLoading(true);
		await loadFacturas(startDate.fecha_show, endDate.fecha_show);
		setIsLoading(false);
	}

	useEffect(() => {
		loadAll();
	}, [sucursal]);

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
		await loadFacturas(startDate.fecha_show, endDate.fecha_show);
	}

	return (
		<Fragment>
			{
				!isLoading ?
					<ReportesFacturasContainer
						onChangeStartDate={(e) => handleChangeStartDate(e)}
						onChangeEndDate={(e) => handleChangeEndDate(e)}
						startDate={startDate.fecha_show}
						endDate={endDate.fecha_show}
						titulo={`REPORTES FACTURAS(${startDate.fecha} - ${endDate.fecha})`}
						columns={columns}
						options={options}
						facturas={facturas}
						actions={actions}
						colorBase={colorBase}
						onClickReportes={handleReportes}
						{...props} />
					: <Backdrop className={classes.backdrop} open={isLoading} >
						<CircularProgress color="inherit" />
					</Backdrop>
			}
		</Fragment>
	);
}

export default ReportesFacturas;