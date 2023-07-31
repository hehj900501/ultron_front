import React, { Fragment } from 'react';

import TableComponent from '../../../components/table/TableComponent';

export const DermatologosContainer = (props) => {

  const {
    tituloDermatologos,
    tituloPatologos,
    columnsDermatologos,
    dermatologos,
    patologos,
    actionsDermatologo,
    optionsDermatologos,
    columnsPatologos,
    actionsPatologos,
    optionsPatologos,
  } = props;

  return (
    <Fragment>
      <TableComponent
        titulo={tituloDermatologos}
        columns={columnsDermatologos}
        data={dermatologos}
        actions={actionsDermatologo}
        options={optionsDermatologos} />

      <TableComponent
        titulo={tituloPatologos}
        columns={columnsPatologos}
        data={patologos}
        actions={actionsPatologos}
        options={optionsPatologos} />

    </Fragment>
  );
}
