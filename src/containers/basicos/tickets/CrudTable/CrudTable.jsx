import React from "react";
import TableComponent from "../../../../components/table/TableComponent";

const CrudTable = ( props ) => {

  const { 
    titulo,
    columns,
    actions,
    options,
    tickets
  } = props

  return (
    <div>
      <table>
        <tbody>
        
        </tbody>
      </table>
      <TableComponent
        titulo={titulo}
        columns={columns}
        data={tickets}
        actions={actions}
        options={options}
        // components={components} 
        />
    </div>
  );
};

export default CrudTable;
