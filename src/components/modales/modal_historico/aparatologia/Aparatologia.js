import React from 'react'

import TableComponent from '../../../table/TableComponent'

const Aparatologia = (props) => {
  
  const {
    historial,
    titulo,
    columns,
    options
  } = props

  return (
    <div>
      <TableComponent
        titulo={titulo}
        columns={columns}
        data={historial}
        options={options} />
    </div>
  )
}

export default Aparatologia