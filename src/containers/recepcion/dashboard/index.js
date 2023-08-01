import React, { Fragment, useEffect, useState } from "react";
import { showAllOffices } from "../../../services";
import withStyles from "@material-ui/core/styles/withStyles";
import { DashboardContainer } from "./dashboard";
import { Backdrop, CircularProgress } from "@material-ui/core";
import MuiAlert from '@material-ui/lab/Alert';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(5)}px ${theme.spacing(5)}px ${theme.spacing(5)}px`
  },
  container: {
    maxWidth: "200px"
  },
  title: {
    color: "#2BA6C6"
  }
});

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const DashboardForm = (props) => {

  const {
    empleado,
    colorBase,
  } = props;

  const classes = props;

  const token = empleado.access_token;

  const [sucursales, setSucursales] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDirecto, setIsDirecto] = useState(false);

  const [openAlert, setOpenAlert] = useState(false)
  const [message, setMessage] = useState('')
  const [severity, setSeverity] = useState('success')

  const loadSucursales = async () => {
    const response = await showAllOffices();
    if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
      setSucursales(response.data)
      setIsLoading(false)
    }
  }

  const loadAll = async () => {
    setIsLoading(true)
    await loadSucursales()
  }

  useEffect(() => {
    loadAll()
  }, []);

  return (
    <Fragment>
      {
        !isLoading ?
          <DashboardContainer
            sucursales={sucursales}
            token={token}
            colorBase={colorBase}
            {...props} />
          : <Backdrop className={classes.backdrop} open={isLoading} >
            <CircularProgress color="inherit" />
          </Backdrop>
      }
    </Fragment>
  );
}

export default withStyles(styles)(DashboardForm);
