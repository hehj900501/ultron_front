import 'date-fns';
import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import myStyles from '../../../../css';
import { FormGroup, TextField } from '@mui/material';
import { CheckCustom } from '../../../../components/basic/CheckCustom';

export const AntecedentesPersonalesPatologicosContainer = (props) => {

  const {
    consultorio,
    colorBase,
    antecedentesPersonalesPatologicos,
    app_generales,
    app_patologias_infectocontagiosas,
    app_patologias_cronico_degenerativas,
    app_patologias_exantematicas,
    onChangeCheckGenerales,
    onChangeCheckPatologiasInfectocontagiosas,
    onChangeCheckPatologiasCronicoDegenerativas,
    onChangeCheckPatologiasExantematicas,
    onChange,
    onClickGuardar,
  } = props;

  const classes = myStyles(colorBase)();

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper className={classes.paper_item}>
              <h3>GENERALES</h3>
              <FormGroup>
                <CheckCustom disabled={true} checked={app_generales.hospitalizaciones} name="hospitalizaciones" label="HOSPITALIZACIONES" />
                <CheckCustom disabled={true} checked={app_generales.quirurgicos} name="quirurgicos" label="QUIRÚRGICOS" />
                <CheckCustom disabled={true} checked={app_generales.traumaticos} name="traumaticos" label="TRAUMÁTICOS" />
                <CheckCustom disabled={true} checked={app_generales.transfusionales} name="transfusionales" label="TRANSFUSIONALES" />
              </FormGroup>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper_item}>
            <FormGroup>
              <h3>PATOLOGÍAS INFECTOCONTAGIOSAS</h3>
              <CheckCustom disabled={true} checked={app_patologias_infectocontagiosas.faringomigdalitis} name="faringomigdalitis" label="FARINGOMIGDALITIS" />
              <CheckCustom disabled={true} checked={app_patologias_infectocontagiosas.fiebre_reumatica} name="fiebre_reumatica" label="FIEBRE REUMÁTICA" />
              <CheckCustom disabled={true} checked={app_patologias_infectocontagiosas.hepatitis} name="hepatitis" label="HEPATITIS" />
              <CheckCustom disabled={true} checked={app_patologias_infectocontagiosas.parasitosis} name="parasitosis" label="PARASITOSIS" />
              <CheckCustom disabled={true} checked={app_patologias_infectocontagiosas.tifoidea} name="tifoidea" label="TIFOIDEA" />
              <CheckCustom disabled={true} checked={app_patologias_infectocontagiosas.transmision_sexual} name="transmision_sexual" label="TRANSMISIÓN SEXUAL" />
              <CheckCustom disabled={true} checked={app_patologias_infectocontagiosas.tuberculosis} name="tuberculosis" label="TUBERCULOSIS" />
            </FormGroup>   
          </Paper>
        </Grid>
        <Grid item xs={true}>
          <Paper className={classes.paper_item}>
            <FormGroup>
              <h3>PATOLOGÍAS CRÓNICO-DEGENETATIVAS</h3>
              <CheckCustom disabled={true} checked={app_patologias_cronico_degenerativas.diabetes_melitus} name="diabetes_melitus" label="DIABETES MELITUS" />
              <CheckCustom disabled={true} checked={app_patologias_cronico_degenerativas.hipertension_arterial_sistemica} name="hipertension_arterial_sistemica" label="HIPERTENSIÓN ARTERIAL SISTÉMICA" />
              <CheckCustom disabled={true} checked={app_patologias_cronico_degenerativas.dislipidemias} name="dislipidemias" label="DISLIPIDEMIAS" />
              <CheckCustom disabled={true} checked={app_patologias_cronico_degenerativas.obesidad} name="obesidad" label="OBESIDAD" />
              <CheckCustom disabled={true} checked={app_patologias_cronico_degenerativas.neoplasias} name="neoplasias" label="NEOPLÁSIAS" />
              <CheckCustom disabled={true} checked={app_patologias_cronico_degenerativas.enfermedades_reumatologicas} name="enfermedades_reumatologicas" label="ENFERMEDADES REUMATOLÓGICAS" />
            </FormGroup>   
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.paper_item}>
            <FormGroup>
              <h3>PATOLOGÍAS EXANTEMÁTICAS</h3>
              <CheckCustom disabled={true} checked={app_patologias_exantematicas.exantema_subito} name="exantema_subito" label="EXANTEMA SÚBITO" />
              <CheckCustom disabled={true} checked={app_patologias_exantematicas.roseola_escarlatina} name="roseola_escarlatina" label="ROSÉOLA ESCARLATINA" />
              <CheckCustom disabled={true} checked={app_patologias_exantematicas.rubeola} name="rubeola" label="RUBÉOLA" />
              <CheckCustom disabled={true} checked={app_patologias_exantematicas.sarampion} name="sarampion" label="SARAMPIÓN" />
              <CheckCustom disabled={true} checked={app_patologias_exantematicas.varicela} name="varicela" label="VARICELA" />
              <CheckCustom disabled={true} checked={app_patologias_exantematicas.otra_patologia_exantematica} name="otra_patologia_exantematica" label="OTRA PATOLOGÍA EXANTEMÁTICA" />
            </FormGroup>
          </Paper>
        </Grid>
        <Grid item xs={true}>
          <Paper className={classes.paper_item}>
            <h3>OTROS ANTECEDENTES</h3>
            <TextField 
              id="otros_antecedentes"
              name="otros_antecedentes"
              disabled={true}
              value={antecedentesPersonalesPatologicos.otros_antecedentes}
              fullWidth 
              multiline />
            <br/>
            
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
}
