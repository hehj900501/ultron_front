import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Grid } from '@material-ui/core';
import bannerMePiel from './../../../bannerMePiel.PNG';
import bannerDermastetic from './../../../bannerDermastetic.jpeg';
import { addZero, toFormatterCurrency } from '../../../utils/utils';
import myStyles from '../../../css';
import { ButtonCustom } from '../../../components/basic/ButtonCustom';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const FormHistoriaClinica = (props) => {

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const {
    onClickImprimir,
    hadleClickBack,
    show,
    colorBase,
  } = props;

  const classes = myStyles(colorBase)();

  return (
    <Fragment
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description" >
     

        {
          show ?
            <Fragment>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <ButtonCustom
                    className={classes.buttonCancel}
                    color="secondary"
                    variant="contained"
                    onClick={hadleClickBack}
                    text='CERRAR' />
                </Grid>

                <Grid item xs={6}>
                  <ButtonCustom
                    className={classes.button}
                    color="primary"
                    variant="contained"
                    onClick={onClickImprimir}
                    text='IMPRIMIR' />
                </Grid>
              </Grid>
            </Fragment> : ''

        }
    </Fragment>
  );
}

export default FormHistoriaClinica;