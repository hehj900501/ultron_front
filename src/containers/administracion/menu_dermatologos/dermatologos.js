import React, { Fragment } from 'react';

import TableComponent from '../../../components/table/TableComponent';
import ModHistorico from '../../../components/modales/modal_historico';

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
    openHistoric,
    handleClose,
    colorBase,
  } = props;

  return (
    <Fragment>
      {
        openHistoric ?
          <ModHistorico
            open={openHistoric}
            colorBase={colorBase}
            onClose={handleClose} /> : ''
      }

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
