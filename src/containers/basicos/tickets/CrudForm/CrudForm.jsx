import React from "react";
import { ButtonCustom } from "../../../../components/basic/ButtonCustom";
import myStyles from "../../../../css";
import {
  TextField,
  FormControl,
} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Fragment } from "react";
import { AutoFixHigh, NoteAdd } from "@mui/icons-material";
import { ComboCustom } from './../../../../components/basic/ComboCustom';

const CrudForm = (props) => {
  const {
    colorBase,
    prioridades,
    status,
    ingeniero,
    onChangeStatus,
    onChangePrioridades,
    onChangeIngeniero,
    request,
    handleClickGuardar,
    handleClean,
    handleEdit,
    onChange,
    completeData,
    empleado,
  } = props;

  const classes = myStyles(colorBase)();

  return (
    <Fragment>
      <h3>{handleEdit ? "Editar" : "AGREGAR"}</h3>
      <Grid container spacing={3}>
        <Grid item xs={2} sm={2}>
          <form>
            <TextField
              className={classes.formControl}
              name="incidencia"
              //helperText={touched.observaciones ? errors.observaciones : ""}
              label="INCIDENCIA"
              value={request.incidencia}
              onChange={onChange}
              variant="outlined"
            />
          </form>
        </Grid>
        <Grid item xs={2}>
          <FormControl variant="outlined" className={classes.formControl}>
            <ComboCustom
              label='PRIORIDAD'
              value={request.prioridad}
              onChange={onChangePrioridades}
              options={prioridades} />
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl variant="outlined" className={classes.formControl}>
            <ComboCustom
              label='STATUS'
              value={request.status}
              onChange={onChangeStatus}
              options={status} />
          </FormControl>
        </Grid>
        <Grid item xs={2} sm={2}>
          <TextField
            className={classes.formControl}
            name="observaciones"
            label="OBSERVACIONES"
            value={request.observaciones}
            onChange={onChange}
            variant="outlined"
          />
        </Grid>
        <Grid item xs={2} sm={2}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <ButtonCustom
                className={classes.button}
                color="primary"
                variant="contained"
                startIcon={<NoteAdd />}
                disabled={completeData}
                onClick={handleClickGuardar}
                text="GUARDAR"
              />
            </Grid>
            <Grid item xs={12}>
              <ButtonCustom
                className={classes.button}
                color="primary"
                variant="contained"
                startIcon={<AutoFixHigh />}
                onClick={handleClean}
                text="LIMPIAR"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {
        empleado.rol._id === process.env.REACT_APP_BIOMEDICO_ROL_ID
        ? <Fragment>
          <Grid item xs={2}>
          <FormControl variant="outlined" className={classes.formControl}>
            <ComboCustom
              label='INGENIERO'
              value={request.asignado_a}
              onChange={onChangeIngeniero}
              options={ingeniero} 
            />
          </FormControl>
        </Grid>
          </Fragment>

        : 'TICKETS BIOMÉDICO'
      }
    </Fragment>
  );
};

export default CrudForm;
