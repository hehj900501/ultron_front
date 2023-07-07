import 'date-fns';
import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import myStyles from '../../../../css';
import { Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { Label } from '@material-ui/icons';
import ECTReactComponent from '../../../../components/ect/ect';
import { ButtonCustom } from '../../../../components/basic/ButtonCustom';

export const ExpedienteElectronicoContainer = (props) => {

  const {
    consultorio,
    colorBase,
    expedienteElectronico,
    onChange,
    onClickGuardar,
  } = props;

  const classes = myStyles(colorBase)();

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12} >
          <Paper className={classes.paper_item}>
            <Grid item xs={12} className={classes.textFieldFullWidth}>
              <TextField 
                id="fullWidth"
                name="motivo_consulta"
                value={expedienteElectronico.motivo_consulta}
                onChange={onChange}
                fullWidth
                multiline
                label="MOTIVO DE LA CONSULTA" />
            </Grid>
            <Grid item xs={12} className={classes.textFieldFullWidth}>
              <TextField 
                id="fullWidth"
                name="interrogatorio"
                value={expedienteElectronico.interrogatorio}
                onChange={onChange}
                fullWidth
                multiline
                label="INTERROGATORIO" />
            </Grid>
            <Grid item xs={12} className={classes.textFieldFullWidth}>
              <TextField 
                id="fullWidth"
                name="topologia"
                value={expedienteElectronico.topologia}
                onChange={onChange}
                fullWidth
                multiline
                label="TOPOGRAGÍA" />
            </Grid>
            <Grid item xs={12} className={classes.textFieldFullWidth}>
              <TextField 
                id="fullWidth"
                name="morfologia"
                value={expedienteElectronico.morfologia}
                onChange={onChange}
                fullWidth
                multiline
                label="MORFOLOGÍA" />
            </Grid>
            <Grid item xs={12} className={classes.textFieldFullWidth}>
              <TextField 
                id="fullWidth"
                name="diagnostico_cie"
                value={expedienteElectronico.diagnostico_cie}
                onChange={onChange}
                fullWidth
                multiline
                label="DIAGNOSTICO CIE-11" />
            </Grid>
            <Grid item xs={12} >
              <ECTReactComponent />
            </Grid>
            <Grid item xs={12} className={classes.textFieldFullWidth}>
              <TextField 
                id="fullWidth"
                name="notas_evolucion"
                value={expedienteElectronico.notas_evolucion}
                onChange={onChange}
                fullWidth
                multiline
                label="NOTAS DE EVOLUCIÓN" />
            </Grid>
            <Grid item xs={12} className={classes.textFieldFullWidth}>
              <ButtonCustom
                className={classes.button}
                type="submit"
                color="primary"
                variant="contained"
                onClick={onClickGuardar}
                text='GUARDAR' />
              </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
}
