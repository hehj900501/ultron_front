import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { TextField, Button, Grid, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { ButtonCustom } from '../../basic/ButtonCustom';
import myStyles from '../../../css';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
    overflow: 'scroll',
    height: '90%',
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  textField: {
    width: '100%',
  },
  button: {
    width: '100%',
    color: '#FFFFFF',
  },
  formControl: {
    minWidth: 120,
    width: '100%',
  },
  label: {
    marginTop: '0px',
    marginBottom: '0px',
  },
}));

const ModalFormRazonSocial = (props) => {

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const {
    values,
    errors,
    touched,
    handleSubmit,
    onChange,
    isValid,
    onClickCancel,
    onClickGuardar,
    colorBase,
    estados,
    municipios,
    ciudades,
    colonias,
    open,
    onChangeEstado,
    onChangeMunicipio,
    onChangeColonia,
    onClickBuscar,
    onChangeCP,
    onChangeDomicilio,
    onChangeEmail,
    onChangeNombre,
    onChangeNumeroExterior,
    onChangeNumeroInterior,
    onChangeRfc,
    onChangeTelefono,
    onChangeCiudad,
  } = props;

  const classes = myStyles(colorBase)();

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
                <TextField
                  className={classes.textField}
                  name="rfc"
                  helperText={touched.rfc ? errors.rfc : ""}
                  error={Boolean(errors.rfc)}
                  label="RFC"
                  value={values.rfc}
                  onChange={onChange}
                  inputProps={{
                    maxLength: "13"
                  }}
                  variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.textField}
                  name="nombre_completo"
                  helperText={touched.nombre_completo ? errors.nombre_completo : ""}
                  error={Boolean(errors.nombre_completo)}
                  label="NOMBRE COMPLETO"
                  value={values.nombre_completo}
                  onChange={onChange}
                  variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.textField}
                  name="domicilio"
                  helperText={touched.domicilio ? errors.domicilio : ""}
                  error={Boolean(errors.domicilio)}
                  label="DOMICILIO"
                  value={values.domicilio}
                  onChange={onChange}
                  variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.textField}
                  name="numero_exterior"
                  helperText={touched.numero_exterior ? errors.numero_exterior : ""}
                  error={Boolean(errors.numero_exterior)}
                  label="NUMERO EXTERIOR"
                  value={values.numero_exterior}
                  onChange={onChange}
                  variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.textField}
                  name="numero_interior"
                  helperText={touched.numero_interior ? errors.numero_interior : ""}
                  error={Boolean(errors.numero_interior)}
                  label="NUMERO INTERIOR"
                  value={values.numero_interior}
                  onChange={onChange}
                  variant="outlined" />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  className={classes.textField}
                  name="estado"
                  helperText={touched.estado ? errors.estado : ""}
                  error={Boolean(errors.estado)}
                  label="ESTADO"
                  value={values.estado}
                  onChange={onChange}
                  variant="outlined" />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  className={classes.textField}
                  name="municipio"
                  helperText={touched.municipio ? errors.municipio : ""}
                  error={Boolean(errors.municipio)}
                  label="MUNICIPIO"
                  value={values.municipio}
                  onChange={onChange}
                  variant="outlined" />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  className={classes.textField}
                  name="ciudad"
                  helperText={touched.ciudad ? errors.ciudad : ""}
                  error={Boolean(errors.ciudad)}
                  label="CIUDAD"
                  value={values.ciudad}
                  onChange={onChange}
                  variant="outlined" />
              </Grid>

              <Grid item xs={12} sm={12} >
                <TextField
                  className={classes.textField}
                  name="codigo_postal"
                  helperText={touched.codigo_postal ? errors.codigo_postal : ""}
                  error={Boolean(errors.codigo_postal)}
                  label="CÓDIGO POSTAL"
                  value={values.codigo_postal}
                  onChange={onChangeCP}
                  variant="outlined" />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  className={classes.textField}
                  name="colonia"
                  helperText={touched.colonia ? errors.colonia : ""}
                  error={Boolean(errors.colonia)}
                  label="COLONIA"
                  value={values.colonia}
                  onChange={onChange}
                  variant="outlined" />
              </Grid>
              {/*
                values.codigo_postal ?
                  <Fragment>
                    <Grid item xs={12}>
                      <h3 className={classes.label}>ESTADO: {values.estado}</h3>
                    </Grid>
                    <Grid item xs={12}>
                      <h3 className={classes.label}>MUNICIPIO: {values.municipio}</h3>
                    </Grid>
                    <Grid item xs={12}>
                      <h3 className={classes.label}>CIUDAD : {values.ciudad}</h3>
                    </Grid>
                  </Fragment> :
                  <Fragment>
                    <Grid item xs={12}>
                      <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="simple-select-outlined-estados">ESTADOS</InputLabel>
                        <Select
                          labelId="simple-select-outlined-estados"
                          id="simple-select-outlined-estados"
                          value={values.estado}
                          error={Boolean(errors.estados)}
                          isSearchable={true}
                          onChange={onChangeEstado}
                          label="ESTADOS" >
                          {estados.sort().map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="simple-select-outlined-municipio">MUNICIPIO</InputLabel>
                        <Select
                          labelId="simple-select-outlined-municipio"
                          id="simple-select-outlined-municipio"
                          value={values.municipio}
                          error={Boolean(errors.municipio)}
                          onChange={onChangeMunicipio}
                          label="MUNICIPIO" >
                          {municipios.sort().map((item, index) => <MenuItem key={index} value={item}>{item}</MenuItem>)}
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        className={classes.textField}
                        name="ciudad"
                        helperText={touched.ciudad ? errors.ciudad : ""}
                        label="CIUDAD"
                        value={values.ciudad}
                        onChange={onChangeCiudad}
                        variant="outlined" />
                    </Grid>
                  </Fragment>
              }

              <Grid item xs={12}>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="simple-select-outlined-colonia">COLONIA</InputLabel>
                  <Select
                    labelId="simple-select-outlined-colonia"
                    id="simple-select-outlined-colonia"
                    value={values.colonia}
                    error={Boolean(errors.colonia)}
                    onChange={onChangeColonia}
                    label="COLONIA" >
                    {colonias.sort().map((item, index) => <MenuItem key={index} value={item}>{item.toUpperCase()}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
              */}

              <Grid item xs={12}>
                <TextField
                  className={classes.textField}
                  name="telefono"
                  helperText={touched.telefono ? errors.telefono : ""}
                  error={Boolean(errors.telefono)}
                  label="TELÉFONO"
                  value={values.telefono}
                  onChange={onChange}
                  inputProps={{
                    maxLength: "10",
                  }}
                  variant="outlined" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  className={classes.textField}
                  name="email"
                  helperText={touched.email ? errors.email : ""}
                  error={Boolean(errors.email)}
                  label="EMAIL"
                  value={values.email}
                  onChange={onChange}
                  variant="outlined" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ButtonCustom
                  className={classes.buttonCancel}
                  color="secondary"
                  variant="contained"
                  onClick={onClickCancel}
                  text="CANCELAR" />
              </Grid>
              <Grid item xs={12} sm={6}>
                <ButtonCustom
                  className={classes.button}
                  color="primary"
                  variant="contained"
                  onClick={(e) => onClickGuardar(e, values)}
                  disabled={!isValid}
                  text='GUARDAR' />
              </Grid>
            </Grid>
          </form>
        </div>
      </Modal>
    </div >
  );
}

export default ModalFormRazonSocial;