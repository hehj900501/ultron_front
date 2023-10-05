import React, { useState, useEffect, Fragment } from "react"
import { makeStyles } from '@material-ui/core/styles'
import { findConsultsByDateAndSucursal, findConsultsByRangeDateAndSucursal } from "../../../../../services/consultas"
import { Backdrop, CircularProgress } from "@material-ui/core"
import { toFormatterCurrency, addZero, downloadExcel } from "../../../../../utils/utils"
import { findFacialByDateAndSucursal, findFacialByRangeDateAndSucursal } from "../../../../../services/faciales"
import { findAparatologiaByDateAndSucursal, findAparatologiaByRangeDateAndSucursal } from "../../../../../services/aparatolgia"
import { findEsteticasByRangeDateAndSucursal } from "../../../../../services/esteticas"
import { findCuracionesByRangeDateAndSucursal } from "../../../../../services/curaciones"
import { findDermapenByDateAndSucursal, findDermapenByRangeDateAndSucursal } from "../../../../../services/dermapens"

import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload'
import { ReportesVentaDiariaContainer } from "./venta_diaria"
import { frecuenciaPrimeraVezId, frecuenciaReconsultaId, laserTratamientoId, tipoEsteticaRellenoId, tipoEsteticaSculptra, tipoEsteticaToxinaId, tratamientoLuzpulzadaId, tratamientoRadiofrecuenciaId } from "../../../../../utils/constants"

const useStyles = makeStyles(theme => ({
	backdrop: {
		zIndex: theme.zIndex.drawer + 1,
		color: '#fff',
	},
}))

const ReporteVentaDiaria = (props) => {

	const classes = useStyles()

	const {
		empleado,
		sucursal,
		colorBase,
	} = props

	const [isLoading, setIsLoading] = useState(true)
	const [consultas, setConsultas] = useState([])
	const [faciales, setFaciales] = useState([])
	const [curaciones, setCuraciones] = useState([])
	const [dermapens, setDermapens] = useState([])
	const [aparatologias, setAparatologias] = useState([])
	const [esteticas, setEsteticas] = useState([])
	const [datos, setDatos] = useState([])

	const date = new Date()
	const dia = addZero(date.getDate())
	const mes = addZero(date.getMonth() + 1)
	const anio = date.getFullYear()

	const [startDate, setStartDate] = useState({
		fecha_show: date,
		fecha: `${dia}/${mes}/${anio}`,
	})

	const columns = [
		{ title: 'SERVICIO', field: 'nombre_servicio' },
		{ title: 'UNIDADES', field: 'unidades' },
		{ title: 'TOTAL', field: 'total' }
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
		paging: false,
		exportAllData: true,
		exportButton: true,
		exportDelimiter: ';'
	}

	const obterPagos = (datos) => {
		let pagosCompletos = 0
		datos.forEach(consultaPrimeraVez => {
			consultaPrimeraVez.pagos.forEach(pago => {
				pagosCompletos += Number(pago.cantidad)
			})
		})
		return pagosCompletos
	}

	const procesarDatos = async () => {
		//const datosCompletos = [...consultas, ...faciales, ...dermapens, ...curaciones, ...esteticas, ...aparatologias]
		const datosCompletos = []
		let totalUnidades = 0
		let totalValor = 0

		const consultasPrimeraVez = consultas.filter(consulta => {
			return consulta.frecuencia._id === frecuenciaPrimeraVezId && consulta.pagado
		})
		const reconsultas = consultas.filter(consulta => {
			return consulta.frecuencia._id === frecuenciaReconsultaId && consulta.pagado
		})

		const lasers = []
		const luzPulsadas = []
		const radiofrecuencias = []

		aparatologias.forEach(aparatologia => {
			if (aparatologia.pagado) {
				aparatologia.tratamientos.forEach(tratamiento => {
					switch(tratamiento._id) {
						case laserTratamientoId:
							lasers.push(aparatologia)
							break
						case tratamientoLuzpulzadaId:
							luzPulsadas.push(aparatologia)
							break
						case tratamientoRadiofrecuenciaId:
							radiofrecuencias.push(aparatologia)
							break
					}
				})
			}
		})

		const toxinas = []
		const rellenos = []
		const sculptras = []

		esteticas.forEach(estetica => {
			if (estetica.pagado) {
				estetica.toxinas_rellenos.forEach(toxina_relleno => {
					switch(toxina_relleno.tipo_estetica) {
						case tipoEsteticaRellenoId:
							toxinas.push(estetica)
							break
						case tipoEsteticaToxinaId:
							rellenos.push(estetica)
							break
						case tipoEsteticaSculptra:
							sculptras.push(estetica)
							break
					}
				})
			} 
		})

		const totalConsultaPrimeraVez = obterPagos(consultasPrimeraVez)
		const datoConsultaPrimeraVez = {
			nombre_servicio: "CONSULTAS PRIMERA VEZ",
			unidades: consultasPrimeraVez.length,
			total: toFormatterCurrency(totalConsultaPrimeraVez)
		}

		const totalReconsulta = obterPagos(reconsultas)
		const datoConsultaReconsulta = {
			nombre_servicio: "RECONSULTAS",
			unidades: reconsultas.length,
			total: toFormatterCurrency(totalReconsulta)
		}

		const totalCuracion = obterPagos(curaciones)
		const datoCuracion = {
			nombre_servicio: "CURACIONES",
			unidades: curaciones.length,
			total: toFormatterCurrency(totalCuracion)
		}

		const totalDermapens = obterPagos(dermapens)
		const datoDermapen = {
			nombre_servicio: "DERMAPENS",
			unidades: dermapens.length,
			total: toFormatterCurrency(totalDermapens)
		}

		const totalFaciales = obterPagos(faciales)
		const datoFacial = {
			nombre_servicio: "FACIALES",
			unidades: faciales.length,
			total: toFormatterCurrency(totalFaciales)
		}

		const totalLaser = obterPagos(lasers)
		const datoLasers = {
			nombre_servicio: "LASER",
			unidades: lasers.length,
			total: toFormatterCurrency(totalLaser)
		}

		const totalLuzPulsadas = obterPagos(luzPulsadas)
		const datoLuzPulsadas = {
			nombre_servicio: "LUZ PULSADA",
			unidades: luzPulsadas.length,
			total: toFormatterCurrency(totalLuzPulsadas)
		}

		const totalRadiofrecuencias = obterPagos(radiofrecuencias)
		const datoRadiofrecuencias = {
			nombre_servicio: "RADIOFRECUENCIAS",
			unidades: radiofrecuencias.length,
			total: toFormatterCurrency(totalRadiofrecuencias)
		}

		const totalToxinas = obterPagos(toxinas)
		const datoToxinas = {
			nombre_servicio: "TOXINAS",
			unidades: toxinas.length,
			total: toFormatterCurrency(totalToxinas)
		}

		const totalRellenos = obterPagos(rellenos)
		const datoRellenos = {
			nombre_servicio: "RELLENOS",
			unidades: rellenos.length,
			total: toFormatterCurrency(totalRellenos)
		}

		const totalSculptras = obterPagos(sculptras)
		const datoSculptras = {
			nombre_servicio: "SCULPTRAS",
			unidades: sculptras.length,
			total: toFormatterCurrency(totalSculptras)
		}

		totalUnidades = consultasPrimeraVez.length + reconsultas.length + curaciones.length + dermapens.length + faciales.length + lasers.length + luzPulsadas.length + radiofrecuencias.length + toxinas.length + rellenos.length + sculptras.length
		totalValor = totalConsultaPrimeraVez + totalReconsulta + totalCuracion + totalDermapens + totalFaciales + totalLaser + totalLuzPulsadas + totalRadiofrecuencias + totalToxinas + totalRellenos + totalSculptras

		const datosTotales = {
			nombre_servicio: "TOTALES",
			unidades: totalUnidades,
			total: toFormatterCurrency(totalValor)
		}

		datosCompletos.push(datoConsultaPrimeraVez)
		datosCompletos.push(datoConsultaReconsulta)
		datosCompletos.push(datoCuracion)
		datosCompletos.push(datoDermapen)
		datosCompletos.push(datoFacial)
		datosCompletos.push(datoLasers)
		datosCompletos.push(datoLuzPulsadas)
		datosCompletos.push(datoRadiofrecuencias)
		datosCompletos.push(datoToxinas)
		datosCompletos.push(datoRellenos)
		datosCompletos.push(datoSculptras)
		datosCompletos.push(datosTotales)

		setDatos(datosCompletos)
		setIsLoading(false)
	}

	const loadConsultas = async (startDate) => {
		const response = await findConsultsByDateAndSucursal(startDate.getDate(), startDate.getMonth(), startDate.getFullYear(), sucursal, empleado.access_token)
		if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
			setConsultas(response.data)
			procesarDatos()
		}
	}

	const loadFaciales = async (startDate) => {
		const response = await findFacialByDateAndSucursal(startDate.getDate(), startDate.getMonth(), startDate.getFullYear(), sucursal, empleado.access_token)
		if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
			setFaciales(response.data)
			await loadConsultas(startDate)
		}
	}

	const loadAparatologias = async (startDate) => {
		const response = await findAparatologiaByDateAndSucursal(startDate.getDate(), startDate.getMonth(), startDate.getFullYear(), sucursal, empleado.access_token)
		if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
			setAparatologias(response.data)
			await loadFaciales(startDate)
		}
	}

	const loadEsteticas = async (startDate) => {
		const response = await findEsteticasByRangeDateAndSucursal(startDate.getDate(), startDate.getMonth(), startDate.getFullYear(),
			startDate.getDate(), startDate.getMonth(), startDate.getFullYear(), sucursal, empleado.access_token)
		if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
			setEsteticas(response.data)
			await loadAparatologias(startDate)
		}
	}

	const loadCuraciones = async (startDate) => {
		const response = await findCuracionesByRangeDateAndSucursal(startDate.getDate(), startDate.getMonth(), startDate.getFullYear(),
			startDate.getDate(), startDate.getMonth(), startDate.getFullYear(), sucursal, empleado.access_token)
		if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
			setCuraciones(response.data)
			await loadEsteticas(startDate)
		}
	}

	const loadDermapens = async (startDate) => {
		const response = await findDermapenByDateAndSucursal(startDate.getDate(), startDate.getMonth(), startDate.getFullYear(), sucursal, empleado.access_token)
		if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {				
			setDermapens(response.data)
			await loadCuraciones(startDate)
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

	const loadInfo = async (startDate) => {
		setIsLoading(true)
		await loadDermapens(startDate)
	}

	const handleReportes = async () => {
		await loadInfo(startDate.fecha_show)
	}

	const exportData = () => {
		downloadExcel("REPORTES CITAS GENERAL", "REPORTE", datos)
	}

	const actions = [
		{
			icon: () => <SimCardDownloadIcon />,
			tooltip: "DESCARGAR EXCEL",
			isFreeAction: true,
			onClick: () => exportData()
		}
	]

	useEffect(() => {
		loadInfo(startDate.fecha_show)
	}, [startDate])

	return (
		<Fragment>
			{
				!isLoading ?
					<ReportesVentaDiariaContainer
						onChangeStartDate={(e) => handleChangeStartDate(e)}
						startDate={startDate.fecha_show}
						titulo={`REPORTES VENTA DIARIA(${startDate.fecha}`}
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

export default ReporteVentaDiaria