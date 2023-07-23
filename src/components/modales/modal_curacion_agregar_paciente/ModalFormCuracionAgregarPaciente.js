import React from 'react'
import Modal from '@material-ui/core/Modal'
import { Grid, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { ButtonCustom } from "../../basic/ButtonCustom"
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

const ModalFormCuracionAgregarPaciente = (props) => {
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle)

  const {
    values,
    errors,
    handleSubmit,
    onChangeSalaCuracion,
    isValid,
    onClickCancel,
    onClickGuardar,
    open,
    salaCuraciones,
    cambio,
    paciente,
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
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <h2 className={classes.label}>{cambio ? 'CAMBIAR DE ' : ' ASIGNAR A '}SALA DE CURACIÓN</h2>
              </Grid>
              <Grid item xs={12}>
                <h2 className={classes.label}>{`${paciente.nombres}`}</h2>
              </Grid>
              <Grid item xs={12}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="simple-select-outlined-asignar">SALA DE CURACIÓN DISPONIBLE</InputLabel>
                  <Select
                    labelId="simple-select-outlined-asignar"
                    id="simple-select-outlined-asignar"
                    value={values.salaCuracion}
                    error={Boolean(errors.salaCuracion)}
                    onChange={onChangeSalaCuracion}
                    label="SALA CURACIÓN DISPONIBLE" >
                    {salaCuraciones.sort().map((item, index) => <MenuItem key={index} value={item}>{item.nombre}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
              {!cambio
                ? <Grid item xs={12} sm={6}>
                  <ButtonCustom
                    className={classes.buttonCancel}
                    color="secondary"
                    variant="contained"
                    onClick={onClickCancel}
                    text="CANCELAR" />
                </Grid>
                : ''
              }
              <Grid item xs={12} sm={6}>
                <ButtonCustom
                  className={classes.button}
                  color="primary"
                  variant="contained"
                  onClick={(e) => onClickGuardar(e, values)}
                  disabled={!isValid}
                  text={cambio ? 'CAMBIO' : 'PASAR'} />
              </Grid>
            </Grid>

          </form>
        </div>
      </Modal>
    </div>
  )
}

export default ModalFormCuracionAgregarPaciente