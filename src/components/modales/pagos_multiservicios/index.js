import React, { useState, useEffect, Fragment } from 'react'
import { addZero, toFormatterCurrency } from '../../../utils/utils'
import FormPagosMultiservicios from './FormPagosMultiservicios'
import EditIcon from '@material-ui/icons/Edit'
import { findEsquemaById } from '../../../services/esquemas'
import { Backdrop, CircularProgress } from '@material-ui/core'
import myStyles from '../../../css'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import { deleteEntrada } from '../../../services/entradas'
import { deletePago, findPagosByTipoServicioAndServicio } from '../../../services/pagos'

const PagosMultiservicios = (props) => {

  const {
    open,
    onClose,
    sucursal,
    handleClickGuardarPago,
    pagoAnticipado,
    empleado,
    onGuardarModalPagos,
    tipoServicioId,
    colorBase,
  } = props

  const classes = myStyles(colorBase)()

  const [isLoading, setIsLoading] = useState(true)
  const [pagos, setPagos] = useState([])
  const [pago, setPago] = useState({})
  const [openModalPago, setOpenModalPago] = useState(false)
  const [openModalFactura, setOpenModalFactura] = useState(false)
  const [restante, setRestante] = useState(0)
  const [datosImpresion, setDatosImpresion] = useState()
  const [values, setValues] = useState({
    cantidad: 0,
    porcentaje_descuento_clinica: 0,
    descuento_clinica: 0,
    total: pagoAnticipado.total,
    isFactura: false,
  })

  const handleEliminarPago = async (event, rowData) => {
    setIsLoading(true)
    await deleteEntrada(rowData.entrada)
    const response = await deletePago(rowData._id)
    if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
      await loadPagos()
    }
    setIsLoading(false)
  }

  const handleChangeFactura = () => {
    const isFactura = !values.isFactura

    pagoAnticipado.isFactura = isFactura    
    setValues({
      ...values,
      isFactura: isFactura,
    })
    setOpenModalFactura(isFactura)
  }

  const columns = [
    { title: 'FECHA', field: 'fecha' },
    { title: 'HORA', field: 'hora' },
    { title: 'FORMA PAGO', field: 'forma_pago.nombre' },
    { title: 'CANTIDAD', field: 'cantidad_moneda' },
    { title: 'TOTAL', field: 'total_moneda' },
    { title: 'BANCO', field: 'banco_nombre' },
    { title: 'TIPO TARJETA', field: 'tipo_tarjeta_nombre' },
    { title: 'DÍGITOS', field: 'digitos_show' },
    { title: 'OBSERVACIONES', field: 'observaciones' },
  ]

  const options = {
    headerStyle: {
      backgroundColor: colorBase,
      color: '#FFF',
      fontWeight: 'bolder',
      fontSize: '18px'
    }
  }

  const localization = {
    header: { actions: 'FACTURAR' }
  }

  const actions = [
    {
      icon: DeleteForeverIcon,
      tooltip: 'ELIMINAR PAGO',
      onClick: handleEliminarPago
    },
  ]

  const handleCloseBuscarRazonSocial = (val, datosFactura) => {
    pagoAnticipado.isFactura = val
    pagoAnticipado.factura = datosFactura
    setValues({
      ...values,
      isFactura: val,
    })
    // TODO: CREATE FACTURA
    setOpenModalFactura(false)
  }


  const handleClickNewPago = () => {
    setOpenModalPago(true)
  }

  const handleClickCancelPago = () => {
    setOpenModalPago(false)
  }

  const loadPagos = async () => {
    setIsLoading(true)
    const response = await findPagosByTipoServicioAndServicio(tipoServicioId, pagoAnticipado._id)
    if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
      let acomulado = 0
      response.data.forEach(item => {
        const fecha = new Date(item.fecha_pago)
        item.fecha = `${addZero(fecha.getDate())}/${addZero(fecha.getMonth() + 1)}/${addZero(fecha.getFullYear())}`
        item.hora = `${addZero(fecha.getHours())}:${addZero(fecha.getMinutes())}`
        item.cantidad_moneda = toFormatterCurrency(item.cantidad)
        item.comision_moneda = toFormatterCurrency(item.comision)
        item.total_moneda = toFormatterCurrency(item.total)
        item.banco_nombre = item.banco ? item.banco.nombre : '-'
        item.tipo_tarjeta_nombre = item.tipo_tarjeta ? item.tipo_tarjeta.nombre : '-'
        item.digitos_show = item.digitos ? item.digitos : '-'
        acomulado = Number(acomulado) + Number(item.cantidad)
      })
      setRestante(Number(values.total) - Number(acomulado))
      pagoAnticipado.pagos = response.data
      setPagos(response.data)
    }
    setIsLoading(false)
  }
  
  const handlePrint = async (event, rowData) => {
    setDatosImpresion(rowData)
  }

  const loadAll = async () => {
    setIsLoading(true)
    await loadPagos()
    setIsLoading(false)
  }

  useEffect(() => {
    loadAll()
  }, [])

  return (
    <Fragment>
      {
        !isLoading ?
          <FormPagosMultiservicios
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            titulo={`PAGO ANTICIPADO: ${pagoAnticipado.paciente.nombres} ${pagoAnticipado.paciente.apellidos}`}
            open={open}
            openModalPago={openModalPago}
            onClickCancel={onClose}
            onClickNewPago={handleClickNewPago}
            onClickCancelPago={handleClickCancelPago}
            onClickGuardar={handleClickGuardarPago}
            isLoading={isLoading}
            pagos={pagos}
            pago={pago}
            loadPagos={loadPagos}
            columns={columns}
            options={options}
            actions={actions}
            localization={localization}
            pagoAnticipado={pagoAnticipado}
            empleado={empleado}
            sucursal={sucursal}
            onGuardarModalPagos={onGuardarModalPagos}
            openModalFactura={openModalFactura}
            onChangeFactura={handleChangeFactura}
            onCloseBuscarRazonSocial={handleCloseBuscarRazonSocial}
            restante={restante}
            tipoServicioId={tipoServicioId}
            colorBase={colorBase}
            datosImpresion={datosImpresion}
            handlePrint={handlePrint}
            values={values} />

          : <Backdrop className={classes.backdrop} open={isLoading} >
            <CircularProgress color="inherit" />
          </Backdrop>
      }
    </Fragment>


  )
}

export default PagosMultiservicios