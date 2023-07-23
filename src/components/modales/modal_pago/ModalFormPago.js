import React, { Fragment } from 'react'
import Modal from '@material-ui/core/Modal'
import { TextField, Grid, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { ButtonCustom } from "../../basic/ButtonCustom"
import { toFormatterCurrency } from '../../../utils/utils'
import myStyles from '../../../css'

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    overflow: 'scroll',
    height: '90%',
  }
}

const ModalFormPago = (props) => {

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle)

  const {
    values,
    bancos,
    isLoading,
    formasPago,
    tiposTarjeta,
    sesionesAnticipadas,
    onClickCancel,
    onClickGuardar,
    onChangePaymentMethod,
    onChangeBank,
    onChangeCardType,
    onChangeCantidad,
    onChangeObservaciones,
    onChangeDigitos,
    onChangeSesionAnticipada,
    open,
    colorBase,
  } = props

  const classes = myStyles(colorBase)()

  return (
    <div>
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open} >
        <div style={modalStyle} className={classes.paper}>
          <form>
            <Grid container spacing={3}>

              <Grid item xs={12}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="simple-select-outlined-payment">FORMA DE PAGO</InputLabel>
                  <Select
                    labelId="simple-select-outlined-payment"
                    id="simple-select-outlined-payment"
                    value={values.forma_pago}
                    onChange={onChangePaymentMethod}
                    disabled={isLoading}
                    label="FORMA DE PAGO" >
                    {formasPago.sort().map((item, index) => <MenuItem key={index} value={item._id}>{item.nombre}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
              {
                values.forma_pago === process.env.REACT_APP_FORMA_PAGO_SESION_ANTICIPADA ?
                  <Grid item xs={12}>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="simple-select-outlined-sesion-anticipada">SESION ANTICIPADA</InputLabel>
                      <Select
                        labelId="simple-select-outlined-banks"
                        id="simple-select-outlined-banks"
                        value={values.sesion_anticipada}
                        onChange={onChangeSesionAnticipada}
                        label="SESION ANTICIPADA" >
                        {sesionesAnticipadas.sort().map((item, index) => <MenuItem key={index} value={item._id}>{item.descripcion}</MenuItem>)}
                      </Select>
                    </FormControl>
                  </Grid>
                  : <Fragment>
                    {
                      values.forma_pago === process.env.REACT_APP_FORMA_PAGO_TARJETA ?
                        <Fragment>

                          <Grid item xs={12}>
                            <FormControl variant="outlined" className={classes.formControl}>
                              <InputLabel id="simple-select-outlined-banks">BANCOS</InputLabel>
                              <Select
                                labelId="simple-select-outlined-banks"
                                id="simple-select-outlined-banks"
                                value={values.banco}
                                onChange={onChangeBank}
                                label="BANCOS" >
                                {bancos.sort().map((item, index) => <MenuItem key={index} value={item._id}>{item.nombre}</MenuItem>)}
                              </Select>
                            </FormControl>
                          </Grid>

                          <Grid item xs={6}>
                            <FormControl variant="outlined" className={classes.formControl}>
                              <InputLabel id="simple-select-outlined-card-type">TIPO TARJETA</InputLabel>
                              <Select
                                labelId="simple-select-outlined-card-type"
                                id="simple-select-outlined-card-type"
                                value={values.tipoTarjeta}
                                onChange={onChangeCardType}
                                label="TIPO TARJETA" >
                                {tiposTarjeta.sort().map((item, index) => <MenuItem key={index} value={item._id}>{item.nombre}</MenuItem>)}
                              </Select>
                            </FormControl>
                          </Grid>

                          <Grid item xs={6}>
                            <TextField
                              className={classes.textField}
                              name="digitos"
                              //helperText={touched.numero_sesion ? errors.numero_sesion : ""}
                              label="DÍGITOS"
                              value={values.digitos}
                              onInput={(e) => {
                                e.target.value = (e.target.value).toString().slice(0, 4)
                              }}
                              onChange={onChangeDigitos}
                              variant="outlined" />
                          </Grid>
                        </Fragment> : ''
                    }

                    <Grid item xs={12}>
                      <TextField
                        className={classes.textField}
                        name="cantidad"
                        //helperText={touched.numero_sesion ? errors.numero_sesion : ""}
                        label="CANTIDAD A COBRAR"
                        value={values.cantidad}
                        onChange={onChangeCantidad}
                        type='Number'
                        onInput={(e) => {
                          e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 7)
                        }}
                        variant="outlined" />
                    </Grid>
                    <Grid item xs={12}>
                      <h2 className={classes.labelBig}>{`TOTAL: ${toFormatterCurrency(values.total)}`}</h2>
                    </Grid>


                  </Fragment>
              }



              <Grid item xs={12}>
                <TextField
                  className={classes.textField}
                  name="observaciones"
                  //helperText={touched.numero_sesion ? errors.numero_sesion : ""}
                  label="OBSERVACIONES"
                  value={values.observaciones}
                  onChange={onChangeObservaciones}
                  variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ButtonCustom
                  className={classes.buttonCancel}
                  color="secondary"
                  variant="contained"
                  onClick={onClickCancel}
                  text='CANCELAR' />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ButtonCustom
                  className={classes.button}
                  color="primary"
                  variant="contained"
                  onClick={(e) => onClickGuardar(e, values)}
                  disabled={isLoading}
                  text='GUARDAR' />
              </Grid>
            </Grid>

          </form>
        </div>
      </Modal>
    </div>
  )
}

export default ModalFormPago