import React from "react";
import myStyles from "../../../css";
import CrudApp from "./CrudApp/CrudApp";


export const TicketsContainer = (props) => {

  const {
    sucursales,
    startDate,
    onChangeStartDate,
    endDate,
    onChangeEndDate,
    onClickReportes,
    colorBase,
    isDirecto,
    onChangeDirecto,
    //setFieldTouched
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
    <CrudApp/>
  );
};
