import 'date-fns';
import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import myStyles from '../../../../css';
import { Checkbox, FormControlLabel, FormGroup, TextField } from '@mui/material';
import { ButtonCustom } from "../../../../components/basic/ButtonCustom";
import TableComponent from '../../../../components/table/TableComponent';


export const SignosVitalesContainer = (props) => {

  const {
    consultorio,
    colorBase,
    titulo,
    columns,
    signosVitales,
    options,
    onClickGuardar,
    onChange,
    onChangePeso,
    onChangeAltura,
    dataComplete,
  } = props;

  const classes = myStyles(colorBase)();

  return (
    <Fragment>
      <TableComponent
          titulo={titulo}
          columns={columns}
          data={signosVitales}
          options={options} />
    </Fragment>
  );
}
