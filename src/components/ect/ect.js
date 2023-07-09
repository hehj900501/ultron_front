import React, { Fragment } from "react";

// import the ECT package and style
import * as ECT from "@whoicd/icd11ect";
import "@whoicd/icd11ect/style.css";
import { Component } from "react";
import { Grid, TextField } from "@material-ui/core";
import { useEffect } from "react";
import myStyles from "../../css";

const ECTReactComponent = (props) => {

  const {
    colorBase,
    expedienteElectronico,
    setExpedienteElectronico,
  } = props

  const classes = myStyles(colorBase)();

  useEffect(() => {
    const settings = {
      // the API located at the URL below should be used only for software development and testing
      apiServerUrl: "https://icd11restapi-developer-test.azurewebsites.net",
      autoBind: false, // in React we recommend using the manual binding
      language: "es",
      sourceApp: "ULTRON"
    };
    const callbacks = {
      selectedEntityFunction: (selectedEntity) => {
        ECT.Handler.clear()

        // shows an alert with the code selected by the user and then clears the search results
        setExpedienteElectronico({
          ...expedienteElectronico,
          diagnostico_cie: `${selectedEntity.code} ${selectedEntity.title}`.toUpperCase()
        })
      }
    };
    ECT.Handler.configure(settings, callbacks);

    ECT.Handler.bind(1);


	}, [])
  
  return (
    <Fragment>
      {/* input element used for typing the search */}
      <Grid container>
        <Grid item xs={3} >
          <h3>
            BUSCAR DIAGNOSTICO CIE-11
          </h3>
        </Grid>
        <Grid item xs={9} className={classes.cie11}>
          <input
            type="text"
            className={`ctw-input ${classes.cie11}`}
            data-ctw-ino={1}
          />
        </Grid>
      </Grid>
      {/* div element used for showing the search results */}
      <div className="ctw-window" data-ctw-ino={1}></div>
    </Fragment>
  )
}

export default ECTReactComponent;
