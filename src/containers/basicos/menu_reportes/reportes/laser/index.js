import React, { useState, useEffect, Fragment } from "react"
import { makeStyles } from '@material-ui/core/styles'
import { ReportesLaserContainer } from "./reportes_laser"
import { Backdrop, CircularProgress } from "@material-ui/core"
import { toFormatterCurrency, addZero, redondearDecimales, precioAreaBySucursal, comisionAreaBySucursalAndTipo } from "../../../../../utils/utils"
import { findAparatologiaByRangeDateAndSucursal } from "../../../../../services/aparatolgia"
import { servicioAparatologiaId, statusAtendidoId, tratamientoLuzpulzadaId, tratamientoRadiofrecuenciaId } from "../../../../../utils/constants"

const useStyles = makeStyles(theme => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}))

const ReportesLaser = (props) => {

	const classes = useStyles()

	const {
		empleado,
		sucursal,
		colorBase,
	} = props

	const token = empleado.access_token
	const iva = process.env.REACT_APP_IVA

	const [isLoading, setIsLoading] = useState(true)
	const [aparatologias, setAparatologias] = useState([])
	const [datos, setDatos] = useState([])

	const date = new Date()
	const dia = addZero(date.getDate())
	const mes = addZero(date.getMonth() + 1)
	const anio = date.getFullYear()

	const [startDate, setStartDate] = useState({
		fecha_show: date,
		fecha: `${dia}/${mes}/${anio}`,
	})

	const [endDate, setEndDate] = useState({
		fecha_show: date,
		fecha: `${dia}/${mes}/${anio}`,
	})

	const columns = [
		{ title: 'FECHA', field: 'fecha_show' },
		{ title: 'SUCURSAL', field: 'sucursal.nombre' },
		{ title: 'TURNO', field: 'turno' },
		{ title: 'FOLIO', field: 'consecutivo' },
		{ title: 'PACIENTE', field: 'paciente_nombre' },
		{ title: 'SERVICIO', field: 'servicio.nombre' },
		{ title: 'PRODUCTO', field: 'producto.nombre' },
		{ title: 'ZONA', field: 'area' },
		{ title: 'COSMETÓLOGA', field: 'cosmetologa_nombre' },
		{ title: 'OBSERVACIONES', field: 'observaciones' },
	]

	const options = {
		/*rowStyle: rowData => {
			return { 
				color: rowData.status.color,
				backgroundColor: rowData.pagado ? '#10CC88' : ''
			}
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

	const procesarAparatologia = (aparatologia, datos) => {
		aparatologia.tratamientos.forEach(tratamiento => {
			const producto = tratamiento
			producto.areasSeleccionadas.forEach(areaSeleccionada => {
				const dato = {
					...aparatologia,
					producto: producto,
					area: areaSeleccionada.nombre,
				}
				if (dato.status._id === statusAtendidoId) {
					datos.push(dato)
				}
			})
		})
	}

	const procesarDatos = async () => {
		
		const datosCompletos = [...aparatologias]

		const aparatologiasProcesadas = []

		datosCompletos.forEach(async (item) => {
			const fecha = new Date(item.fecha_hora)

			item.fecha_show = `${addZero(fecha.getDate())}/${addZero(fecha.getMonth() + 1)}/${fecha.getFullYear()}`
			item.hora = `${addZero(fecha.getHours())}:${addZero(fecha.getMinutes())}`
			item.precio_moneda = toFormatterCurrency(item.precio)
			item.paciente_nombre = `${item.paciente.nombres} ${item.paciente.apellidos}`
			item.promovendedor_nombre = item.promovendedor ? item.promovendedor.nombre : 'SIN ASIGNAR'
			item.cosmetologa_nombre = item.cosmetologa ? item.cosmetologa.nombre : 'SIN ASIGNAR'
			item.dermatologo_nombre = item.dermatologo ? item.dermatologo.nombre : 'DIRECTO'
			item.observaciones = item.observaciones ? item.observaciones : "*"

			switch (item.servicio._id) {
				case servicioAparatologiaId:
					procesarAparatologia(item, aparatologiasProcesadas)
					break
			}
		})
		
		const datos = [...aparatologiasProcesadas]
		datos.sort((a, b) => {
			if (a.consecutivo > b.consecutivo) return 1
			if (a.consecutivo < b.consecutivo) return -1
			return 0
		})
		setDatos(datos)
		setIsLoading(false)
	}

	const loadAparatologias = async (startDate, endDate) => {
		const response = await findAparatologiaByRangeDateAndSucursal(startDate.getDate(), startDate.getMonth(), startDate.getFullYear(),
			endDate.getDate(), endDate.getMonth(), endDate.getFullYear(), sucursal, token)
		if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
			setAparatologias(response.data)
			procesarDatos()
		}
	}

	const handleChangeStartDate = async (date) => {
		setIsLoading(true)
		const dia = addZero(date.getDate())
		const mes = addZero(date.getMonth() + 1)
		const anio = date.getFullYear()
		setStartDate({
			fecha_show: date,
			fecha: `${dia}/${mes}/${anio}`
		})
		setIsLoading(false)
	}

	const handleChangeEndDate = async (date) => {
		setIsLoading(true)
		const dia = addZero(date.getDate())
		const mes = addZero(date.getMonth() + 1)
		const anio = date.getFullYear()
		setEndDate({
			fecha_show: date,
			fecha: `${dia}/${mes}/${anio}`
		})

		setIsLoading(false)
	}

	const loadInfo = async (startDate, endDate) => {
		setIsLoading(true)
		await loadAparatologias(startDate, endDate)
		
	}

	const handleReportes = async () => {
		await loadInfo(startDate.fecha_show, endDate.fecha_show)
	}

	const actions = [
	]

	useEffect(() => {
		loadInfo(startDate.fecha_show, endDate.fecha_show)
	}, [startDate, endDate])

	return (
		<Fragment>
			{
				!isLoading ?
					<ReportesLaserContainer
						onChangeStartDate={(e) => handleChangeStartDate(e)}
						onChangeEndDate={(e) => handleChangeEndDate(e)}
						startDate={startDate.fecha_show}
						endDate={endDate.fecha_show}
						titulo={`REPORTES DE AREAS(${startDate.fecha} - ${endDate.fecha})`}
						columns={columns}
						options={options}
						datos={datos}
						actions={actions}
						onClickReportes={handleReportes}
						{...props} />
					: <Backdrop className={classes.backdrop} open={isLoading} >
						<CircularProgress color="inherit" />
					</Backdrop>
			}
		</Fragment>
	)
}

export default ReportesLaser