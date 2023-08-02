import React from "react";
import {
  Paper,
  Grid,
} from "@material-ui/core";

import { ButtonCustom } from "../../../components/basic/ButtonCustom";
import { Fragment } from "react";
import myStyles from "../../../css";
import DashboardComponent from "../../../components/dashboard/DashboardComponent";


export const DashboardContainer = (props) => {

  const {
    sucursales,
    colorBase,
    token,
    onClickActualizar,
    setIsLoading,
  } = props;

  const classes = myStyles(colorBase)();

  return (
    <Fragment>
      <Paper>
        <Grid container spacing={3} justify="center">
          <Grid item xs={12} sm={3} className={classes.grid_center}>
            <ButtonCustom
              className={classes.button}
              onClick={() => onClickActualizar()}
              variant="contained"
              color="primary"
              text="REFRESCAR" />
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        {
          sucursales.map(sucursal => {
            return <Grid item xs={5} sm={5}>
              <DashboardComponent 
                sucursal={sucursal}
                token={token}
                setIsLoading={setIsLoading} />
            </Grid>
          })
        }
      </Grid>


    </Fragment>
  );
};
