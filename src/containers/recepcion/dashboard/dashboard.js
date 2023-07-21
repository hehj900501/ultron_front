import React from "react";
import {
  makeStyles,
  Paper,
  Grid,
} from "@material-ui/core";

import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import { ButtonCustom } from "../../../components/basic/ButtonCustom";
import { Fragment } from "react";
import myStyles from "../../../css";
import { toFormatterCurrency } from "../../../utils/utils";
import { CheckCustom } from "../../../components/basic/CheckCustom";


export const DashboardContainer = (props) => {

  const {
    sucursales,
    colorBase,
  } = props;
  // console.table(props);
  /*
  const change = (name, e) => {
    e.persist();
    handleChange(e);
    setFieldTouched(name, true, false);
  };*/

  const classes = myStyles(colorBase)();

  return (
    <Fragment>
      <Paper>
        <Grid container spacing={3} justify="center">
          <Grid item xs={12} sm={3} className={classes.grid_center}>
            <ButtonCustom
              className={classes.button}
              variant="contained"
              color="primary"
              text="REFRESCAR" />
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Grid container spacing={2}>
           
          </Grid>
        </Grid>


      </Grid>


    </Fragment>
  );
};
