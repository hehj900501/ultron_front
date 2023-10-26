import 'date-fns';
import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import myStyles from '../../../../css';
import { FormGroup, TextField } from '@mui/material';
import { CheckCustom } from '../../../../components/basic/CheckCustom';

export const AlergiasContainer = (props) => {

  const {
    colorBase,
    alergias,
  } = props;

  const classes = myStyles(colorBase)();

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={6} >
          <Paper className={classes.paper_item}>
            <FormGroup>
              <h3>ALERGIAS MAS COMUNES</h3>
              <CheckCustom disabled={true} checked={alergias.alergias_negadas} name="alergias_negadas" label="ALERGIAS NEGADAS" />
              <CheckCustom disabled={true} checked={alergias.acaros} name="acaros" label="ACAROS" />
              <CheckCustom disabled={true} checked={alergias.alimentos} name="alimentos" label="ALIMENTOS" />
              <CheckCustom disabled={true} checked={alergias.chocolate} name="chocolate" label="CHOCOLATE" />
              <CheckCustom disabled={true} checked={alergias.frutos_secos} name="frutos_secos" label="FRUTOS SECOS" />
              <CheckCustom disabled={true} checked={alergias.hongos} name="hongos" label="HONGOS" />
              <CheckCustom disabled={true} checked={alergias.humedad} name="humedad" label="HUMEDAD" />
              <CheckCustom disabled={true} checked={alergias.latex} name="latex" label="LATEX" />
              <CheckCustom disabled={true} checked={alergias.mariscos} name="mariscos" label="MARISCOS" />
              <CheckCustom disabled={true} checked={alergias.mascotas} name="mascotas" label="MASCOTAS" />
              <CheckCustom disabled={true} checked={alergias.moho} name="moho" label="MOHO" />
              <CheckCustom disabled={true} checked={alergias.niquel} name="niquel" label="NIQUEL" />
              <CheckCustom disabled={true} checked={alergias.picadura_insectos} name="picadura_insectos" label="PICADURA INSECTOS" />
              <CheckCustom disabled={true} checked={alergias.polen} name="polen" label="POLEN" />
              <CheckCustom disabled={true} checked={alergias.polvo} name="polvo" label="POLVO" />
              <CheckCustom disabled={true} checked={alergias.sol} name="sol" label="SOL" />
            </FormGroup>
          </Paper>
        </Grid>
        <Grid item xs={6} >
          <Paper className={classes.paper_item}>
            <FormGroup>
              <h3>ALERGIAS A MEDICAMENTOS</h3>
              <TextField 
                id="alergias_a_medicamentos"
                name="alergias_a_medicamentos"
                disabled={true}
                value={alergias.alergias_a_medicamentos}
                fullWidth
                multiline />
            </FormGroup>   
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
}
