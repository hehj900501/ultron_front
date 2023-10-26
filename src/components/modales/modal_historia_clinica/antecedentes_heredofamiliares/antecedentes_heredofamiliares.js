import 'date-fns';
import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import myStyles from '../../../../css';
import { CheckCustom } from '../../../../components/basic/CheckCustom';

export const AntecedentesHeredofamiliaresContainer = (props) => {

  const {
    colorBase,
    antecedentesHeredofamiliares,
  } = props;

  const classes = myStyles(colorBase)();

  return (
    <Fragment>
      <Grid container>
        <Grid item xs={12} className={classes.gridItemRight}>
          <Paper className={classes.paper_item}>
            <Grid container>
              <Grid item xs={4}>                
              </Grid>
              <Grid item xs={true}>
                <h3>PADRE</h3>
              </Grid>
              <Grid item xs={true}>
                <h3>MADRE</h3>
              </Grid>
              <Grid item xs={true}>
                <h3>ABUELOS PATERNOS</h3>
              </Grid>
              <Grid item xs={true}>
                <h3>ABUELOS MATERNOS</h3>
              </Grid>
              <Grid item xs={true}>
                <h3>HERMANOS</h3>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={4}>
                DIABETES MELLITUS
              </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.padre_diabetes_mellitus} name="padre_diabetes_mellitus" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.madre_diabetes_mellitus} name="madre_diabetes_mellitus" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.abuelos_p_diabetes_mellitus} name="abuelos_p_diabetes_mellitus" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.abuelos_m_diabetes_mellitus} name="abuelos_m_diabetes_mellitus" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.hermanos_diabetes_mellitus} name="hermanos_diabetes_mellitus" label="" />
                </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={4}>
                HIPERTENSIÓN ARTERIAL SISTÉMICA
              </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.padre_hipertension_arterial_sistemica} name="padre_hipertension_arterial_sistemica" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.madre_hipertension_arterial_sistemica} name="madre_hipertension_arterial_sistemica" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.abuelos_p_hipertension_arterial_sistemica} name="abuelos_p_hipertension_arterial_sistemica" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.abuelos_m_hipertension_arterial_sistemica} name="abuelos_m_hipertension_arterial_sistemica" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.hermanos_hipertension_arterial_sistemica} name="hermanos_hipertension_arterial_sistemica" label="" />
                </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={4}>
                DISLIPIDEMIAS
              </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.padre_dislipidemias} name="padre_dislipidemias" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.madre_dislipidemias} name="madre_dislipidemias" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.abuelos_p_dislipidemias} name="abuelos_p_dislipidemias" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.abuelos_m_dislipidemias} name="abuelos_m_dislipidemias" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.hermanos_dislipidemias} name="hermanos_dislipidemias" label="" />
                </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={4}>
                NEOPLÁSIAS
              </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.padre_neoplasias} name="padre_neoplasias" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.madre_neoplasias} name="madre_neoplasias" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.abuelos_p_neoplasias} name="abuelos_p_neoplasias" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.abuelos_m_neoplasias} name="abuelos_m_neoplasias" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.hermanos_neoplasias} name="hermanos_neoplasias" label="" />
                </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={4}>
                MALFORMAICONES HEREDITARIAS / CONGÉNITAS
              </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.padre_malformaicones_hereditarias} name="padre_malformaicones_hereditarias" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.madre_malformaicones_hereditarias} name="madre_malformaicones_hereditarias" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.abuelos_p_malformaicones_hereditarias} name="abuelos_p_malformaicones_hereditarias" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.abuelos_m_malformaicones_hereditarias} name="abuelos_m_malformaicones_hereditarias" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.hermanos_malformaicones_hereditarias} name="hermanos_malformaicones_hereditarias" label="" />
                </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={4}>
                ALERGIAS
              </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.padre_alergias} name="padre_alergias" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.madre_alergias} name="madre_alergias" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.abuelos_p_alergias} name="abuelos_p_alergias" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.abuelos_m_alergias} name="abuelos_m_alergias" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.hermanos_alergias} name="hermanos_alergias" label="" />
                </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={4}>
                ENFERMEDADES PSIQUIATRICAS
              </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.padre_enf_psiquiatricas} name="padre_enf_psiquiatricas" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.madre_enf_psiquiatricas} name="madre_enf_psiquiatricas" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.abuelos_p_enf_psiquiatricas} name="abuelos_p_enf_psiquiatricas" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.abuelos_m_enf_psiquiatricas} name="abuelos_m_enf_psiquiatricas" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.hermanos_enf_psiquiatricas} name="hermanos_enf_psiquiatricas" label="" />
                </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={4}>
                ENFERMEDADES NEUROLÓGICAS
              </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.padre_enf_neurologicas} name="padre_enf_neurologicas" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.madre_enf_neurologicas} name="madre_enf_neurologicas" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.abuelos_p_enf_neurologicas} name="abuelos_p_enf_neurologicas" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.abuelos_m_enf_neurologicas} name="abuelos_m_enf_neurologicas" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.hermanos_enf_neurologicas} name="hermanos_enf_neurologicas" label="" />
                </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={4}>
                ENFERMEDADES CARDIOVASCULARES
              </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.padre_enf_cardiovasculares} name="padre_enf_cardiovasculares" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.madre_enf_cardiovasculares} name="madre_enf_cardiovasculares" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.abuelos_p_enf_cardiovasculares} name="abuelos_p_enf_cardiovasculares" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.abuelos_m_enf_cardiovasculares} name="abuelos_m_enf_cardiovasculares" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.hermanos_enf_cardiovasculares} name="hermanos_enf_cardiovasculares" label="" />
                </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={4}>
                ENFERMEDADES BRONCOPULMONARES
              </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.padre_enf_broncopulmonares} name="padre_enf_broncopulmonares" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.madre_enf_broncopulmonares} name="madre_enf_broncopulmonares" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.abuelos_p_enf_broncopulmonares} name="abuelos_p_enf_broncopulmonares" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.abuelos_m_enf_broncopulmonares} name="abuelos_m_enf_broncopulmonares" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.hermanos_enf_broncopulmonares} name="hermanos_enf_broncopulmonares" label="" />
                </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={4}>
                ENFERMEDADES TIROIDEAS
              </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.padre_enf_tiroideas} name="padre_enf_tiroideas" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.madre_enf_tiroideas} name="madre_enf_tiroideas" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.abuelos_p_enf_tiroideas} name="abuelos_p_enf_tiroideas" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.abuelos_m_enf_tiroideas} name="abuelos_m_enf_tiroideas" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.hermanos_enf_tiroideas} name="hermanos_enf_tiroideas" label="" />
                </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={4}>
                ENFERMEDADES RENALES
              </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.padre_enf_renales} name="padre_enf_renales" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.madre_enf_renales} name="madre_enf_renales" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.abuelos_p_enf_renales} name="abuelos_p_enf_renales" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.abuelos_m_enf_renales} name="abuelos_m_enf_renales" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.hermanos_enf_renales} name="hermanos_enf_renales" label="" />
                </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={4}>
                ENFERMEDADES OSTEOARTICULARES
              </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.padre_enf_osteoarticulares} name="padre_enf_osteoarticulares" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.madre_enf_osteoarticulares} name="madre_enf_osteoarticulares" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.abuelos_p_enf_osteoarticulares} name="abuelos_p_enf_osteoarticulares" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.abuelos_m_enf_osteoarticulares} name="abuelos_m_enf_osteoarticulares" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.hermanos_enf_osteoarticulares} name="hermanos_enf_osteoarticulares" label="" />
                </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={4}>
                ENFERMEDADES INFECTOCONTAGIOSAS
              </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.padre_enf_infectocontagiosas} name="padre_enf_infectocontagiosas" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.madre_enf_infectocontagiosas} name="madre_enf_infectocontagiosas" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.abuelos_p_enf_infectocontagiosas} name="abuelos_p_enf_infectocontagiosas" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.abuelos_m_enf_infectocontagiosas} name="abuelos_m_enf_infectocontagiosas" label="" />
                </Grid>
                <Grid item xs={true}>
                  <CheckCustom disabled={true} checked={antecedentesHeredofamiliares.hermanos_enf_infectocontagiosas} name="hermanos_enf_infectocontagiosas" label="" />
                </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Fragment>
  );
}
