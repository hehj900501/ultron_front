import React, { Fragment } from "react";
import { useState } from "react";
import CrudForm from "../CrudForm/CrudForm";
import CrudTable from "../CrudTable/CrudTable";
import { BorderColor, DeleteForever } from "@material-ui/icons";
import { Paper } from "@material-ui/core";
import tickets from "..";

const CrudApp = (props) => {
  const {
    colorBase,
    prioridades,
    status,
    ingeniero,
    onChangePrioridades,
    onChangeStatus,
    onChangeIngeniero,
    request,
    handleClickGuardar,
    handleClickEliminar,
    handleClean,
    handleEdit,
    onChange,
    tickets,
    completeData,
    empleado,
  } = props;

  const columns = [
    { title: "INCIDENCIA", field: "incidencia" },
    { title: "PRIORIDAD", field: "prioridad.nombre" },
    { title: "FECHA DE APERTURA", field: "fecha_i" },
    { title: "CREADO", field: "creado" },
    { title: "SUCURSAL", field: "sucursal" },
    { title: "INGENIERO", field: "asignado_a" },
    { title: "FECHA DE RESOLUCION", field: "fecha_t" },
    { title: "STATUS", field: "status.nombre" },
    { title: "OBSERVACIONES", field: "observaciones" },
  ];

  const actions = [
    {
      icon: BorderColor,
      tooltip: "EDITAR",
      onClick: handleEdit,
    },
    {
      icon: DeleteForever,
      tooltip: "ELIMINAR",
      onClick: handleClickEliminar,
    },
  ];

  const options = {
    rowStyle: (rowData) => {
      return {
        color: rowData.status._id === process.env.REACT_APP_BIM_CERRADO_STATUS_ID ? '' : rowData.status.color,
        backgroundColor: rowData.status._id === process.env.REACT_APP_BIM_CERRADO_STATUS_ID ? rowData.status.color : ''
      };
    },
    headerStyle: {
      backgroundColor: colorBase,
      color: "#FFF",
      fontWeight: "bolder",
      fontSize: "18px",
    },
    cellStyle: {
      fontWeight: "bolder",
      fontSize: "16px",
      padding: "5px",
      textAlign: "center",
    },
    paging: false,
    exportAllData: true,
    exportButton: true,
    exportDelimiter: ";",
  };

  return (
    <Fragment>
      <CrudForm
        colorBase={colorBase}
        prioridades={prioridades}
        status={status}
        ingeniero={ingeniero}
        onChangePrioridades={onChangePrioridades}
        onChangeStatus={onChangeStatus}
        onChangeIngeniero={onChangeIngeniero}
        request={request}
        handleClickGuardar={handleClickGuardar}
        handleClean={handleClean}
        onChange={onChange}
        completeData={completeData}
        empleado={empleado}
      />
      <CrudTable
        titulo={"LISTADO DE TICKETS"}
        columns={columns}
        actions={
          empleado.rol._id === process.env.REACT_APP_BIOMEDICO_ROL_ID
            ? actions
            : []
        }
        options={options}
        tickets={tickets}
      />
    </Fragment>
  );
};

export default CrudApp;
