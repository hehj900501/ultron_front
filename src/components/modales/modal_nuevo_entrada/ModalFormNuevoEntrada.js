import React from 'react'
import Modal from '@material-ui/core/Modal'
import { Grid, InputLabel, FormControl, MenuItem, Select, TextField } from '@material-ui/core'
import { ButtonCustom } from '../../basic/ButtonCustom'
import myStyles from '../../../css'

function getModalStyle() {
  const top = 50
  const left = 50

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  }
}

const ModalFormNuevoEntrada = (props) => {

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle)

  const {
    values,
    onClickCancel,
    open,
    dataComplete,
    onChangeTipoEntrada,
    tipoEntradas,
    onChangeMetodoPago,
    formaPagos,
    onChange,
    onAgregarConceto,
    colorBase,
  } = props

  const classes = myStyles(colorBase)()

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open} >
      <div style={modalStyle} className={classes.paper}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h2>AGREGAR ENTRADA</h2>
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              name="concepto"
              label="CONCEPTO"
              value={values.concepto}
              onChange={onChange}
              variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              name="cantidad"
              label="CANTIDAD"
              value={values.cantidad}
              type='Number'
              onInput={(e) => {
                e.target.value = Math.max(0, parseFloat(e.target.value)).toString().slice(0, 7)
              }}
              onChange={onChange}
              variant="outlined" />
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="simple-select-outlined-hora">TIPO ENTRADA</InputLabel>
              <Select
                labelId="simple-select-outlined-tipo-entrada"
                id="simple-select-outlined-tipo-entrada"
                value={values.tipo_entrada}
                onChange={onChangeTipoEntrada}
                label="TIPO ENTRADA" >
                {tipoEntradas.sort().map((item, index) => <MenuItem key={index} value={item._id}>{item.nombre}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel id="simple-select-outlined-metodo-pago">METODO PAGO</InputLabel>
              <Select
                labelId="simple-select-outlined-metodo-pago"
                id="simple-select-outlined-metodo-pago"
                value={values.forma_pago}
                onChange={onChangeMetodoPago}
                label="METODO PAGO" >
                {formaPagos.sort().map((item, index) => <MenuItem key={index} value={item._id}>{item.nombre}</MenuItem>)}
              </Select>
            </FormControl>
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
              onClick={onAgregarConceto}
              disabled={dataComplete}
              text='AGREGAR' />
          </Grid>
        </Grid>
      </div>
    </Modal>

  )
}

export default ModalFormNuevoEntrada