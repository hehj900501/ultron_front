import React, { Fragment, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Grid } from '@material-ui/core';
import bannerMePiel from './../../../bannerMePiel.PNG';
import bannerDermastetic from './../../../bannerDermastetic.jpeg';
import { addZero, comisionAreaBySucursalAndTipo, dateToString, precioAreaBySucursal, toFormatterCurrency } from '../../../utils/utils';
import myStyles from '../../../css';
import { ButtonCustom } from '../../../components/basic/ButtonCustom';
import { esquemaNominalId, laserTratamientoId } from '../../../utils/constants';

function getModalStyle() {
  return {
    overflow: 'scroll',
    height: '100%',
  };
}

const FormImprimirPagoDermatologo = (props) => {

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const frecuenciaPrimeraVezId = process.env.REACT_APP_FRECUENCIA_PRIMERA_VEZ_ID;
  const tratamientoLuzpulzadaId = process.env.REACT_APP_LUZ_PULZADA_TRATAMIENTO_ID;

  const {
    sucursal,
    corte,
    consultasPrivada,
    consultasPrimeraVez,
    consultasReconsultas,
    curaciones,
    esteticas,
    faciales,
    dermapens,
    aparatologias,
    pagosAnticipados,
    dermatologo,
    onReturn,
    onClickImprimir,
    onClickPagar,
    onCambioTurno,
    onObtenerInformacion,
    findCorte,
    show,
    turno,
    empleado,
    colorBase,
  } = props;

  const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: 10
    },
    textField: {
      width: '100%',
    },
    formControl: {
      minWidth: 120,
      width: '100%',
    },
    button: {
      backgroundColor: colorBase,
      color: '#FFFFFF',
      width: '100%',
      fontSize: '18px',
      margin: 3,
    },
    buttonCancel: {
      width: '100%',
      color: '#FFFFFF',
      fontSize: '18px',
      backgroundColor: "#FF2233",
    },
    label: {
      marginTop: '0px',
      marginBottom: '0px',
    },
    label_left: {
      marginTop: '0px',
      marginBottom: '0px',
      marginLeft: '10px',
    },
    label_line: {
      marginTop: '40px',
      marginBottom: '0px',
      marginLeft: '10px',
      marginRight: '10px',
    },
    labelItemRight: {
      marginTop: '0px',
      marginBottom: '0px',
      textAlign: 'right',
    },
    label_title: {
      //backgroundColor: colorBase,
      color: '#000000',
      textAlign: 'center',
      padding: 10,
      margin: 0,
    },
    label_title_descripcion: {
      //backgroundColor: colorBase,
      color: '#000000',
      fontWeight: 'bold',
      textAlign: 'center',
      fontSize: '18px',
      margin: 0,
      padding: 3,
    },
    label_utilidad_perdida: {
      textAlign: 'center',
      marginTop: '0px',
      marginBottom: '0px',
      fontSize: '42px',
    },
    label_title_entradas: {
      //backgroundColor: colorBase,
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: '16px',
      paddingTop: 1,
      paddingBottom: 1,
      color: '#000000',
    },
    label_cells: {
      textAlign: 'center',
      fontSize: '13px',
      marginTop: '0px',
      marginBottom: '0px',
    },
    label_cells_concepto: {
      textAlign: 'left',
      fontSize: '13px',
      marginTop: '0px',
      marginBottom: '0px',
      marginLeft: 10
    },
    label_cells_total: {
      textAlign: 'center',
      fontSize: '13px',
      fontWeight: 'bold',
      marginTop: '0px',
      marginBottom: '0px',
    },
    label_cells_totales: {
      textAlign: 'center',
      fontSize: '15px',
      fontWeight: 'bold',
      marginTop: '0px',
      marginBottom: '0px',
    },
    grid_left: {
      marginTop: '10px',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
    },
    grid_right: {
      marginTop: '10px',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
    },
    container: {
      marginTop: 18,
      border: '2px solid #000',
    },
    container_buttom: {
      marginTop: 35,
    },
    hr: {
      borderTop: '1px solid #000',
    }
  }));

  const classes = useStyles();

  let pagoTotal = 0;

  const revisadoTipoCitaId = process.env.REACT_APP_TIPO_CITA_REVISADO_ID;
  const derivadoTipoCitaId = process.env.REACT_APP_TIPO_CITA_DERIVADO_ID;
  const realizadoTipoCitaId = process.env.REACT_APP_TIPO_CITA_REALIZADO_ID;
  const directoTipoCitaId = process.env.REACT_APP_TIPO_CITA_DIRECTO_ID;
  const noAplicaTipoCitaId = process.env.REACT_APP_TIPO_CITA_NO_APLICA_ID;
  const sucursalManuelAcunaId = process.env.REACT_APP_SUCURSAL_MANUEL_ACUNA_ID;
  const sucursalRubenDarioId = process.env.REACT_APP_SUCURSAL_RUBEN_DARIO_ID;
  const sucursalOcciId = process.env.REACT_APP_SUCURSAL_OCCI_ID;
  const sucursalFedeId = process.env.REACT_APP_SUCURSAL_FEDE_ID;
  const dermatologoDirectoId = process.env.REACT_APP_DERMATOLOGO_DIRECTO_ID;
  const servicioAparatologiaId = process.env.REACT_APP_APARATOLOGIA_SERVICIO_ID;
  const formaPagoSesionAnticipadaId = process.env.REACT_APP_FORMA_PAGO_SESION_ANTICIPADA;
  const tratamientoRadiofrecuencia = process.env.REACT_APP_RADIOFRECUENCIA_TRATAMIENTO_ID;
  const listaFaciales = [...faciales];
  const listaAparatologias = [...aparatologias];
  const sesionesAnticipadas = [];
  pagosAnticipados.forEach((pagoAnticipado) => {
    pagoAnticipado.sesiones_anticipadas.forEach((sesionAnticipada) => {
      sesionesAnticipadas.push(sesionAnticipada);
    });
  });

  let totalFaciales = 0;
  faciales.forEach(facial => {
    totalFaciales += facial.forma_pago._id === formaPagoSesionAnticipadaId ? 0 : facial.tratamientos.length;
  });

  let totalAparatologias = 0;
  aparatologias.forEach(aparatologia => {
    totalAparatologias += aparatologia.forma_pago._id === formaPagoSesionAnticipadaId ? 0 : 1;
  });

  return (
    <Fragment
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description" >
      <Grid container>
        <Grid item xs={3}>
          <img
            src={sucursal._id === sucursalManuelAcunaId || sucursal._id === sucursalRubenDarioId ? bannerDermastetic : bannerMePiel}
            alt='banner'
            width='100%'
            height='100%' />
        </Grid>
        <Grid container xs={9}>
          <Grid item xs={12}>
            <h2 className={classes.label_title}>CENTRO DERMATOLÓGICO M. E. PIEL S. C.</h2>
          </Grid>
          <Grid item xs={8}>
            <h3 className={classes.label_left}>DERMATÓLOGO: {dermatologo.nombre}</h3>
          </Grid>
          <Grid item xs={4} >
            <h3 className={classes.label}>FECHA: {dateToString(corte.create_date)} </h3>
          </Grid>
          <Grid item xs={8} >
            <h3 className={classes.label_left}>SUCURSAL: {corte.sucursal.nombre}</h3>
          </Grid>
          <Grid item xs={4} >
            <h3 className={classes.label}>TURNO: {turno === 'm' ? 'MATUTINO' : 'VESPERTINO'} </h3>
          </Grid>
        </Grid>
      </Grid>

      <Grid container>
        {
          show ?
            <Fragment>
              <Grid item xs={12}>
                <ButtonCustom
                  className={classes.button}
                  color="primary"
                  variant="contained"
                  onClick={onClickImprimir}
                  text='IMPRIMIR' />
              </Grid>
              <Grid item xs={12}>
                <ButtonCustom
                  className={classes.button}
                  color="primary"
                  variant="contained"
                  onClick={onClickPagar}
                  text='PAGAR' />
              </Grid>
              {
                corte.hora_cierre || corte.turno === 'v' ?
                  <Fragment>
                    <Grid item xs={12} sm={6}>
                      <ButtonCustom
                        className={classes.button}
                        color="primary"
                        variant="contained"
                        onClick={() => onCambioTurno()}
                        text='CAMBIO TURNO' />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <ButtonCustom
                        className={classes.button}
                        color="primary"
                        variant="contained"
                        onClick={() => findCorte(turno)}
                        text='TRAER INFORMACIÓN' />
                    </Grid>
                  </Fragment>
                  : ''
              }

              <br />
              <Grid item xs={12}>
                <Button
                  className={classes.buttonCancel}
                  color="secondary"
                  variant="contained"
                  onClick={onReturn} >
                  REGRESAR
                </Button>
              </Grid>
            </Fragment> : ''
        }

        {

          consultasPrivada.length > 0 ?
            <Grid container className={classes.container}>
              <Grid item xs={12}>
                <p className={classes.label_title_descripcion}> {`${consultasPrivada.length} CONSULTAS PRIVADAS`}</p>
              </Grid>
              <Grid item xs={true} className={classes.label}>
                <p className={classes.label_cells_totales}>PACIENTE</p>
              </Grid>
              <Grid item xs={true} className={classes.label}>
                <p className={classes.label_cells_totales}>CONSECUTIVO</p>
              </Grid>
              <Grid item xs={true} className={classes.label}>
                <p className={classes.label_cells_totales}>PRODUCTO</p>
              </Grid>
              <Grid item xs={true} className={classes.label}>
                <p className={classes.label_cells_totales}>FORMA DE PAGO</p>
              </Grid>
              <Grid item xs={true} className={classes.label}>
                <p className={classes.label_cells_totales}>SERVICIO</p>
              </Grid>
              <Grid item xs={true} className={classes.label}>
                <p className={classes.label_cells_totales}>DERMATOLÓGO</p>
              </Grid>
              <Grid item xs={2} className={classes.label}>
                <p className={classes.label_cells_totales}>OBSERVACIONES</p>
              </Grid>
              <Grid item xs={12} className={classes.label}>
                <hr className={classes.label} />
              </Grid>

              {
                consultasPrivada ?
                  consultasPrivada.map(consulta => {
                    let totalPagos = 0;
                    if (!consulta.has_descuento_dermatologo) {
                      consulta.pagos.map(pago => {
                        totalPagos += Number(pago.total);
                      });
                    }
                    const pagoDermatologo = Number(consulta.precio) * Number(dermatologo.esquema.porcentaje_consulta_privada) / 100;
                    pagoTotal += Number(pagoDermatologo);

                    return <Grid container>
                      <Grid item xs={true} className={classes.label}>
                        <p className={classes.label_cells}>{`${consulta.paciente.nombres} ${consulta.paciente.apellidos}`}</p>
                      </Grid>
                      <Grid item xs={true} className={classes.label}>
                        <p className={classes.label_cells}>{`${consulta.consecutivo}`}</p>
                      </Grid>
                      <Grid item xs={true} className={classes.label}>
                        <p className={classes.label_cells}>{`${consulta.producto.nombre}`}</p>
                      </Grid>
                      <Grid item xs={true} className={classes.label}>
                        <p className={classes.label_cells}>{`${consulta.factura ? '(FACTURA)' : ''}${consulta.forma_pago_nombre}`}</p>
                      </Grid>
                      <Grid item xs={true} className={classes.label}>
                        <p className={classes.label_cells_total}> {`${toFormatterCurrency(totalPagos)}`} </p>
                      </Grid>
                      <Grid item xs={true} className={classes.label}>
                        <p className={classes.label_cells_total}> {`${toFormatterCurrency(pagoDermatologo)}`} </p>
                      </Grid>
                      <Grid item xs={2} className={classes.label}>
                        <p className={classes.label_cells}>{`${consulta.observaciones ? consulta.observaciones : ''}`}</p>
                      </Grid>
                    </Grid>
                  })
                  : ''
              }
            </Grid>
            : ''
        }
        {

          consultasPrimeraVez.length > 0 ?
            <Grid container className={classes.container}>
              <Grid item xs={12}>
                <p className={classes.label_title_descripcion}> {`${consultasPrimeraVez.length} CONSULTAS DE PRIMERA VEZ`}</p>
              </Grid>
              <Grid item xs={true} className={classes.label}>
                <p className={classes.label_cells_totales}>PACIENTE</p>
              </Grid>
              <Grid item xs={true} className={classes.label}>
                <p className={classes.label_cells_totales}>CONSECUTIVO</p>
              </Grid>
              <Grid item xs={true} className={classes.label}>
                <p className={classes.label_cells_totales}>PRODUCTO</p>
              </Grid>
              <Grid item xs={true} className={classes.label}>
                <p className={classes.label_cells_totales}>FORMA DE PAGO</p>
              </Grid>
              <Grid item xs={true} className={classes.label}>
                <p className={classes.label_cells_totales}>SERVICIO</p>
              </Grid>
              <Grid item xs={true} className={classes.label}>
                <p className={classes.label_cells_totales}>DERMATOLÓGO</p>
              </Grid>
              <Grid item xs={2} className={classes.label}>
                <p className={classes.label_cells_totales}>OBSERVACIONES</p>
              </Grid>
              <Grid item xs={12} className={classes.label}>
                <hr className={classes.label} />
              </Grid>

              {
                consultasPrimeraVez ?
                  consultasPrimeraVez.map(consulta => {
                    let totalPagos = 0;
                    consulta.pagos.map(pago => {
                      totalPagos += Number(pago.total);
                    });
                    const pagoDermatologo = consulta.has_descuento_dermatologo ? 0 : (Number(consulta.precio) * Number(dermatologo.esquema.porcentaje_consulta) / 100);
                    pagoTotal += Number(pagoDermatologo);

                    return <Grid container>
                      <Grid item xs={true} className={classes.label}>
                        <p className={classes.label_cells}>{`${consulta.paciente.nombres} ${consulta.paciente.apellidos}`}</p>
                      </Grid>
                      <Grid item xs={true} className={classes.label}>
                        <p className={classes.label_cells}>{`${consulta.consecutivo}`}</p>
                      </Grid>
                      <Grid item xs={true} className={classes.label}>
                        <p className={classes.label_cells}>{`${consulta.producto.nombre}`}</p>
                      </Grid>
                      <Grid item xs={true} className={classes.label}>
                        <p className={classes.label_cells}>{`${consulta.factura ? '(FACTURA)' : ''}${consulta.forma_pago_nombre}`}</p>
                      </Grid>
                      <Grid item xs={true} className={classes.label}>
                        <p className={classes.label_cells_total}> {`${toFormatterCurrency(totalPagos)}`} </p>
                      </Grid>
                      <Grid item xs={true} className={classes.label}>
                        <p className={classes.label_cells_total}> {`${toFormatterCurrency(pagoDermatologo)}`} </p>
                      </Grid>
                      <Grid item xs={2} className={classes.label}>
                        <p className={classes.label_cells}> {`${consulta.observaciones ? consulta.observaciones : ''}`} </p>
                      </Grid>
                    </Grid>
                  })
                  : ''
              }
            </Grid>
            : ''
        }

        {
          consultasReconsultas.length > 0 ?
            <Grid container className={classes.container}>
              <Grid item xs={12}>
                <p className={classes.label_title_descripcion}> {`${consultasReconsultas.length} RECONSULTAS`}</p>
              </Grid>
              <Grid item xs={true} className={classes.label}>
                <p className={classes.label_cells_totales}>PACIENTE</p>
              </Grid>
              <Grid item xs={true} className={classes.label}>
                <p className={classes.label_cells_totales}>CONSECUTIVO</p>
              </Grid>
              <Grid item xs={true} className={classes.label}>
                <p className={classes.label_cells_totales}>PRODUCTO</p>
              </Grid>
              <Grid item xs={true} className={classes.label}>
                <p className={classes.label_cells_totales}>FORMA DE PAGO</p>
              </Grid>
              <Grid item xs={true} className={classes.label}>
                <p className={classes.label_cells_totales}>SERVICIO</p>
              </Grid>
              <Grid item xs={true} className={classes.label}>
                <p className={classes.label_cells_totales}>DERMATOLÓGO</p>
              </Grid>
              <Grid item xs={2} className={classes.label}>
                <p className={classes.label_cells_totales}>OBSERVACIONES</p>
              </Grid>
              <Grid item xs={12} className={classes.label}>
                <hr className={classes.label} />
              </Grid>
              {
                consultasReconsultas ?
                  consultasReconsultas.map(consulta => {
                    let totalPagos = 0;
                    consulta.pagos.map(pago => {
                      totalPagos += Number(pago.total);
                    });
                    const pagoDermatologo = consulta.has_descuento_dermatologo ? 0 : Number(consulta.precio) * Number(dermatologo.esquema.porcentaje_reconsulta) / 100;

                    pagoTotal += Number(pagoDermatologo);
                    return <Grid container>
                      <Grid item xs={true} className={classes.label}>
                        <p className={classes.label_cells}>{`${consulta.paciente.nombres} ${consulta.paciente.apellidos}`}</p>
                      </Grid>
                      <Grid item xs={true} className={classes.label}>
                        <p className={classes.label_cells}>{`${consulta.consecutivo}`}</p>
                      </Grid>
                      <Grid item xs={true} className={classes.label}>
                        <p className={classes.label_cells}>{`${consulta.producto.nombre}`}</p>
                      </Grid>
                      <Grid item xs={true} className={classes.label}>
                        <p className={classes.label_cells}>{`${consulta.factura ? '(FACTURA)' : ''}${consulta.forma_pago_nombre}`}</p>
                      </Grid>
                      <Grid item xs={true} className={classes.label}>
                        <p className={classes.label_cells_total}> {`${toFormatterCurrency(totalPagos)}`} </p>
                      </Grid>
                      <Grid item xs={true} className={classes.label}>
                        <p className={classes.label_cells_total}> {`${toFormatterCurrency(pagoDermatologo)}`} </p>
                      </Grid>
                      <Grid item xs={2} className={classes.label}>
                        <p className={classes.label_cells}>{`${consulta.observaciones ? consulta.observaciones : ''}`}</p>
                      </Grid>
                    </Grid>
                  })
                  : ''
              }
            </Grid>
            : ''
        }

        {
          curaciones.length > 0 ?
            <Fragment>
              <Grid container className={classes.container}>
                <Grid item xs={12}>
                  <p className={classes.label_title_descripcion}> {`${curaciones.length} CURACIÓN`}</p>
                </Grid>
                <Grid item xs={true} className={classes.label}>
                  <p className={classes.label_cells_totales}>PACIENTE</p>
                </Grid>
                <Grid item xs={true} className={classes.label}>
                  <p className={classes.label_cells_totales}>CONSECUTIVO</p>
                </Grid>
                <Grid item xs={true} className={classes.label}>
                  <p className={classes.label_cells_totales}>PRODUCTO</p>
                </Grid>
                <Grid item xs={true} className={classes.label}>
                  <p className={classes.label_cells_totales}>FORMA DE PAGO</p>
                </Grid>
                <Grid item xs={true} className={classes.label}>
                  <p className={classes.label_cells_totales}>SERVICIO</p>
                </Grid>
                <Grid item xs={true} className={classes.label}>
                  <p className={classes.label_cells_totales}>DERMATOLÓGO</p>
                </Grid>
                <Grid item xs={2} className={classes.label}>
                  <p className={classes.label_cells_totales}>OBSERVACIONES</p>
                </Grid>
                <Grid item xs={12} className={classes.label}>
                  <hr className={classes.label} />
                </Grid>
                {
                  curaciones ?
                    curaciones.map(curacion => {
                      const pagoDermatologo = curacion.has_descuento_dermatologo ? 0 : Number(curacion.total_aplicacion) * Number(dermatologo.esquema.porcentaje_curaciones) / 100;
                      pagoTotal += Number(pagoDermatologo);

                      const date = new Date(curacion.hora_aplicacion);
                      return <Grid container>
                        <Grid item xs={true} className={classes.label}>
                          <p className={classes.label_cells}>{`${curacion.paciente.nombres} ${curacion.paciente.apellidos}`}</p>
                        </Grid>
                        <Grid item xs={true} className={classes.label}>
                          <p className={classes.label_cells}>{`${curacion.consecutivo}`}</p>
                        </Grid>
                        <Grid item xs={true} className={classes.label}>
                          <p className={classes.label_cells}>{`${curacion.producto.nombre}`}</p>
                        </Grid>
                        <Grid item xs={true} className={classes.label}>
                          <p className={classes.label_cells}>{`${curacion.factura ? '(FACTURA)' : ''}${curacion.forma_pago_nombre}`}</p>
                        </Grid>
                        <Grid item xs={true} className={classes.label}>
                          <p className={classes.label_cells_total}> {`${toFormatterCurrency(curacion.total_aplicacion)}`} </p>
                        </Grid>
                        <Grid item xs={true} className={classes.label}>
                          <p className={classes.label_cells_total}> {`${toFormatterCurrency(pagoDermatologo)}`} </p>
                        </Grid>
                        <Grid item xs={2} className={classes.label}>
                          <p className={classes.label_cells}>{`${curacion.observaciones ? curacion.observaciones : ''}`}</p>
                        </Grid>
                      </Grid>
                    })
                    : ''
                }
              </Grid>
            </Fragment>
            : ''
        }

        {
          esteticas.length > 0 ?
            <Fragment>
              <Grid container className={classes.container}>
                <Grid item xs={12}>
                  <p className={classes.label_title_descripcion}> {`${esteticas.length} TOXINAS Y RELLENOS`}</p>
                </Grid>
                <Grid item xs={true} className={classes.label}>
                  <p className={classes.label_cells_totales}>PACIENTE</p>
                </Grid>
                <Grid item xs={true} className={classes.label}>
                  <p className={classes.label_cells_totales}>CONSECUTIVO</p>
                </Grid>
                <Grid item xs={true} className={classes.label}>
                  <p className={classes.label_cells_totales}>PRODUCTO</p>
                </Grid>
                <Grid item xs={true} className={classes.label}>
                  <p className={classes.label_cells_totales}>FORMA DE PAGO</p>
                </Grid>
                <Grid item xs={true} className={classes.label}>
                  <p className={classes.label_cells_totales}>SERVICIO</p>
                </Grid>
                {
                  dermatologo._id !== dermatologoDirectoId
                    ? <Grid item xs={true} className={classes.label}>
                      <p className={classes.label_cells_totales}>DERMATOLÓGO</p>
                    </Grid>
                    : ''
                }
                <Grid item xs={2} className={classes.label}>
                  <p className={classes.label_cells_totales}>OBSERVACIONES</p>
                </Grid>
                <Grid item xs={12} className={classes.label}>
                  <hr className={classes.label} />
                </Grid>
                {
                  esteticas ?
                    esteticas.map(estetica => {
                      const pagoDermatologo = estetica.has_descuento_dermatologo ? 0 : Number(estetica.total_aplicacion) * Number(dermatologo.esquema.porcentaje_dermocosmetica) / 100;
                      pagoTotal += Number(pagoDermatologo);
                      const date = new Date(estetica.hora_aplicacion);
                      return <Grid container>
                        <Grid item xs={true} className={classes.label}>
                          <p className={classes.label_cells}>{`${estetica.paciente.nombres} ${estetica.paciente.apellidos}`}</p>
                        </Grid>
                        <Grid item xs={true} className={classes.label}>
                          <p className={classes.label_cells}>{`${estetica.consecutivo}`}</p>
                        </Grid>
                        <Grid item xs={true} className={classes.label}>
                          <p className={classes.label_cells}>{`${estetica.producto_nombre}`}</p>
                        </Grid>
                        <Grid item xs={true} className={classes.label}>
                          <p className={classes.label_cells}>{`${estetica.factura ? '(FACTURA)' : ''}${estetica.forma_pago_nombre}`}</p>
                        </Grid>
                        <Grid item xs={true} className={classes.label}>
                          <p className={classes.label_cells_total}> {`${toFormatterCurrency(estetica.total_aplicacion)}`} </p>
                        </Grid>
                        {
                          dermatologo._id !== dermatologoDirectoId
                            ? <Grid item xs={true} className={classes.label}>
                              <p className={classes.label_cells_total}> {`${toFormatterCurrency(pagoDermatologo)}`} </p>
                            </Grid>
                            : ''
                        }
                        <Grid item xs={2} className={classes.label}>
                          <p className={classes.label_cells}>{`${estetica.observaciones ? estetica.observaciones : ''}`}</p>
                        </Grid>
                      </Grid>
                    })
                    : ''
                }
              </Grid>
            </Fragment>
            : ''
        }

        {
          faciales.length > 0 ?
            <Fragment>
              <Grid container className={classes.container}>
                <Grid item xs={12}>
                  <p className={classes.label_title_descripcion}> {`${totalFaciales} FACIALES`}</p>
                </Grid>
                <Grid item xs={true} className={classes.label}>
                  <p className={classes.label_cells_totales}>TIPO DE CITA</p>
                </Grid>
                <Grid item xs={true} className={classes.label}>
                  <p className={classes.label_cells_totales}>PACIENTE</p>
                </Grid>
                <Grid item xs={true} className={classes.label}>
                  <p className={classes.label_cells_totales}>CONSECUTIVO</p>
                </Grid>
                <Grid item xs={true} className={classes.label}>
                  <p className={classes.label_cells_totales}>PRODUCTO</p>
                </Grid>
                <Grid item xs={true} className={classes.label}>
                  <p className={classes.label_cells_totales}>FORMA DE PAGO</p>
                </Grid>
                <Grid item xs={true} className={classes.label}>
                  <p className={classes.label_cells_totales}>SERVICIO</p>
                </Grid>
                {
                  dermatologo._id !== dermatologoDirectoId
                    ? <Grid item xs={true} className={classes.label}>
                      <p className={classes.label_cells_totales}>DERMATOLÓGO</p>
                    </Grid>
                    : ''
                }
                <Grid item xs={2} className={classes.label}>
                  <p className={classes.label_cells_totales}>OBSERVACIONES</p>
                </Grid>
                <Grid item xs={12} className={classes.label}>
                  <hr className={classes.label} />
                </Grid>
                {
                  faciales ?
                    faciales.map(facial => {
                      let comisionDermatologo = 0;
                      let pagoDermatologo = 0;
                      if (!facial.has_descuento_dermatologo && facial.forma_pago._id !== formaPagoSesionAnticipadaId
                        && dermatologo.esquema._id !== esquemaNominalId) {
                        facial.tratamientos.map(tratamiento => {
                          tratamiento.areasSeleccionadas.map(areaSeleccionada => {
                            switch (facial.tipo_cita._id) {
                              case revisadoTipoCitaId:
                                comisionDermatologo += Number(
                                  sucursal._id === sucursalManuelAcunaId ? areaSeleccionada.comision_revisado_ma
                                    : (sucursal._id === sucursalRubenDarioId ? areaSeleccionada.comision_revisado_rd
                                      : areaSeleccionada.comision_revisado)
                                );
                                break;
                              case derivadoTipoCitaId:
                                comisionDermatologo += Number(
                                  sucursal._id === sucursalManuelAcunaId ? areaSeleccionada.comision_derivado_ma
                                    : (sucursal._id === sucursalRubenDarioId ? areaSeleccionada.comision_derivado_rd
                                      : areaSeleccionada.comision_derivado)
                                );
                                break;
                              case realizadoTipoCitaId:
                                comisionDermatologo += Number(
                                  sucursal._id === sucursalManuelAcunaId ? areaSeleccionada.comision_realizado_ma
                                    : (sucursal._id === sucursalRubenDarioId ? areaSeleccionada.comision_realizado_rd
                                      : areaSeleccionada.comision_realizado)
                                );
                                break;
                              case directoTipoCitaId: // TOMA EL 100%
                                comisionDermatologo += Number(
                                  sucursal._id === sucursalManuelAcunaId ? areaSeleccionada.precio_ma
                                    : (sucursal._id === sucursalRubenDarioId ? areaSeleccionada.precio_rd
                                      : areaSeleccionada.precio_fe)
                                );
                                break;
                              case noAplicaTipoCitaId:
                                comisionDermatologo += Number(0);
                                break;
                            }
                          });
                        });
                        pagoDermatologo = comisionDermatologo - ((comisionDermatologo * (facial.porcentaje_descuento_clinica ? facial.porcentaje_descuento_clinica : 0)) / 100);

                        pagoTotal += Number(pagoDermatologo);
                      }
                      return <Grid container>
                        <Grid item xs={true} className={classes.label}>
                          <p className={classes.label_cells}>{facial.tipo_cita.nombre}</p>
                        </Grid>
                        <Grid item xs={true} className={classes.label}>
                          <p className={classes.label_cells}>{`${facial.paciente.nombres} ${facial.paciente.apellidos}`}</p>
                        </Grid>
                        <Grid item xs={true} className={classes.label}>
                          <p className={classes.label_cells}>{`${facial.consecutivo}`}</p>
                        </Grid>
                        <Grid item xs={true} className={classes.label}>
                          <p className={classes.label_cells}>{`${facial.show_tratamientos}`}</p>
                        </Grid>
                        <Grid item xs={true} className={classes.label}>
                          <p className={classes.label_cells}>{`${facial.factura ? '(FACTURA)' : ''}${facial.forma_pago_nombre}`}</p>
                        </Grid>
                        <Grid item xs={true} className={classes.label}>
                          <p className={classes.label_cells_total}> {`${toFormatterCurrency(facial.total)}`} </p>
                        </Grid>
                        {
                          dermatologo._id !== dermatologoDirectoId
                            ? <Grid item xs={true} className={classes.label}>
                              <p className={classes.label_cells_total}> {`${toFormatterCurrency(pagoDermatologo)}`} </p>
                            </Grid>
                            : ''
                        }
                        <Grid item xs={2} className={classes.label}>
                          <p className={classes.label_cells}> {`${facial.observaciones ? facial.observaciones : ''}`} </p>
                        </Grid>
                      </Grid>
                    })
                    : ''
                }
              </Grid>
            </Fragment>
            : ''
        }

        {
          dermapens.length > 0 ?
            <Fragment>
              <Grid container className={classes.container}>
                <Grid item xs={12}>
                  <p className={classes.label_title_descripcion}> {`${dermapens.length} DERMAPENS`}</p>
                </Grid>
                <Grid item xs={true} className={classes.label}>
                  <p className={classes.label_cells_totales}>TIPO DE CITA</p>
                </Grid>
                <Grid item xs={true} className={classes.label}>
                  <p className={classes.label_cells_totales}>PACIENTE</p>
                </Grid>
                <Grid item xs={true} className={classes.label}>
                  <p className={classes.label_cells_totales}>CONSECUTIVO</p>
                </Grid>
                <Grid item xs={true} className={classes.label}>
                  <p className={classes.label_cells_totales}>PRODUCTO</p>
                </Grid>
                <Grid item xs={true} className={classes.label}>
                  <p className={classes.label_cells_totales}>FORMA DE PAGO</p>
                </Grid>
                <Grid item xs={true} className={classes.label}>
                  <p className={classes.label_cells_totales}>SERVICIO</p>
                </Grid>
                <Grid item xs={true} className={classes.label}>
                  <p className={classes.label_cells_totales}>DERMATOLÓGO</p>
                </Grid>
                <Grid item xs={2} className={classes.label}>
                  <p className={classes.label_cells_totales}>OBSERVACIONES</p>
                </Grid>
                <Grid item xs={12} className={classes.label}>
                  <hr className={classes.label} />
                </Grid>
                {
                  dermapens ?
                    dermapens.map(dermapen => {
                      const pagoDermatologo = dermapen.has_descuento_dermatologo ? 0 : Number(dermapen.total_aplicacion) * Number(dermatologo.esquema.porcentaje_dermocosmetica) / 100;
                      pagoTotal += Number(pagoDermatologo);
                      return <Grid container>
                        <Grid item xs={true} className={classes.label}>
                          <p className={classes.label_cells}>{dermapen.tipo_cita.nombre}</p>
                        </Grid>
                        <Grid item xs={true} className={classes.label}>
                          <p className={classes.label_cells}>{`${dermapen.paciente.nombres} ${dermapen.paciente.apellidos}`}</p>
                        </Grid>
                        <Grid item xs={true} className={classes.label}>
                          <p className={classes.label_cells}>{`${dermapen.consecutivo}`}</p>
                        </Grid>
                        <Grid item xs={true} className={classes.label}>
                          <p className={classes.label_cells}>{`${dermapen.producto.nombre}`}</p>
                        </Grid>
                        <Grid item xs={true} className={classes.label}>
                          <p className={classes.label_cells}>{`${dermapen.factura ? '(FACTURA)' : ''}${dermapen.forma_pago_nombre}`}</p>
                        </Grid>
                        <Grid item xs={true} className={classes.label}>
                          <p className={classes.label_cells_total}> {`${toFormatterCurrency(dermapen.total_aplicacion)}`} </p>
                        </Grid>
                        <Grid item xs={true} >
                          <p className={classes.label_cells_total}> {`${toFormatterCurrency(pagoDermatologo)}`} </p>
                        </Grid>
                        <Grid item xs={2} className={classes.label}>
                          <p className={classes.label_cells}>{`${dermapen.observaciones ? dermapen.observaciones : ''}`}</p>
                        </Grid>
                      </Grid>
                    })
                    : ''
                }
              </Grid>
            </Fragment>
            : ''
        }

        {
          aparatologias.length > 0 ?
            <Fragment>
              <Grid container className={classes.container}>
                <Grid item xs={12} >
                  <p className={classes.label_title_descripcion}> {`${totalAparatologias} APARATOLOGIA`}</p>
                </Grid>
                <Grid item xs={true} className={classes.label}>
                  <p className={classes.label_cells_totales}>TIPO DE CITA</p>
                </Grid>
                <Grid item xs={true} className={classes.label}>
                  <p className={classes.label_cells_totales}>PACIENTE</p>
                </Grid>
                <Grid item xs={true} className={classes.label}>
                  <p className={classes.label_cells_totales}>CONSECUTIVO</p>
                </Grid>
                <Grid item xs={true} className={classes.label}>
                  <p className={classes.label_cells_totales}>PRODUCTO</p>
                </Grid>
                <Grid item xs={true} className={classes.label}>
                  <p className={classes.label_cells_totales}>FORMA DE PAGO</p>
                </Grid>
                <Grid item xs={true} className={classes.label}>
                  <p className={classes.label_cells_totales}>SERVICIO</p>
                </Grid>
                {
                  dermatologo._id !== dermatologoDirectoId
                    ? <Grid item xs={true} className={classes.label}>
                      <p className={classes.label_cells_totales}>DERMATOLÓGO</p>
                    </Grid>
                    : ''
                }
                <Grid item xs={2} className={classes.label}>
                  <p className={classes.label_cells_totales}>OBSERVACIONES</p>
                </Grid>
                <Grid item xs={12} className={classes.label}>
                  <hr className={classes.label} />
                </Grid>
                {
                  aparatologias ?
                    aparatologias.map(aparatologia => {
                      let comisionDermatologo = 0;
                      if (aparatologia.forma_pago._id !== formaPagoSesionAnticipadaId) {
                        aparatologia.tratamientos.forEach(tratamiento => {
                          tratamiento.areasSeleccionadas.map(area => {
                            const { servicio, nombre, tratamiento } = area;
                            const itemPrecio = precioAreaBySucursal(sucursal._id, area);
                            if (tratamiento._id === tratamientoLuzpulzadaId) {
                              comisionDermatologo = comisionAreaBySucursalAndTipo(sucursal._id, aparatologia.tipo_cita._id, area);
                            } else {
                              comisionDermatologo += (servicio === servicioAparatologiaId && nombre === 'FACIAL' && tratamiento === tratamientoRadiofrecuencia ? 140 : Number(itemPrecio) * Number(aparatologia.frecuencia === frecuenciaPrimeraVezId ? dermatologo.esquema.porcentaje_laser : (aparatologia.dermatologo === dermatologoDirectoId ? 100 : 0)) / 100);
                            }
                          });
                        });
                      }
                      let pagoDermatologo = comisionDermatologo - ((comisionDermatologo * (aparatologia.porcentaje_descuento_clinica ? aparatologia.porcentaje_descuento_clinica : 0)) / 100);
                      pagoDermatologo = aparatologia.has_descuento_dermatologo ? 0 : pagoDermatologo;
                      pagoTotal += Number(pagoDermatologo);
                      return <Grid container>
                        <Grid item xs={true} className={classes.label}>
                          <p className={classes.label_cells}>{aparatologia.tipo_cita.nombre}</p>
                        </Grid>
                        <Grid item xs={true} className={classes.label}>
                          <p className={classes.label_cells}>{`${aparatologia.paciente.nombres} ${aparatologia.paciente.apellidos}`}</p>
                        </Grid>
                        <Grid item xs={true} className={classes.label}>
                          <p className={classes.label_cells}>{`${aparatologia.consecutivo}`}</p>
                        </Grid>
                        <Grid item xs={true} className={classes.label}>
                          <p className={classes.label_cells}>{`${aparatologia.show_tratamientos}`}</p>
                        </Grid>
                        <Grid item xs={true} className={classes.label}>
                          <p className={classes.label_cells}>{`${aparatologia.factura ? '(FACTURA)' : ''}${aparatologia.forma_pago_nombre}`}</p>
                        </Grid>
                        <Grid item xs={true} className={classes.label}>
                          <p className={classes.label_cells_total}> {`${toFormatterCurrency(aparatologia.total)}`} </p>
                        </Grid>
                        {
                          dermatologo._id !== dermatologoDirectoId
                            ? <Grid item xs={true} className={classes.label}>
                              <p className={classes.label_cells_total}> {`${toFormatterCurrency(pagoDermatologo)}`} </p>
                            </Grid>
                            : ''
                        }
                        <Grid item xs={2} className={classes.label}>
                          <p className={classes.label_cells}>{`${aparatologia.observaciones ? aparatologia.observaciones : ''}`}</p>
                        </Grid>
                      </Grid>
                    })
                    : ''
                }
              </Grid>
            </Fragment>
            : ''
        }

        {
          sesionesAnticipadas.length > 0 ?
            <Fragment>
              <Grid container className={classes.container}>
                <Grid item xs={12}>
                  <p className={classes.label_title_descripcion}> {`${sesionesAnticipadas.length} PAGOS ANTICIPADOS`}</p>
                </Grid>
                <Grid item xs={true} className={classes.label}>
                  <p className={classes.label_cells_totales}>TIPO DE CITA</p>
                </Grid>
                <Grid item xs={true} className={classes.label}>
                  <p className={classes.label_cells_totales}>PACIENTE</p>
                </Grid>
                <Grid item xs={true} className={classes.label}>
                  <p className={classes.label_cells_totales}>TIPO SERVICIO</p>
                </Grid>
                <Grid item xs={true} className={classes.label}>
                  <p className={classes.label_cells_totales}>PRODUCTO</p>
                </Grid>
                <Grid item xs={true} className={classes.label}>
                  <p className={classes.label_cells_totales}>FORMA DE PAGO</p>
                </Grid>
                <Grid item xs={true} className={classes.label}>
                  <p className={classes.label_cells_totales}>SERVICIO</p>
                </Grid>
                {
                  dermatologo._id !== dermatologoDirectoId
                    ? <Grid item xs={true} className={classes.label}>
                      <p className={classes.label_cells_totales}>DERMATOLÓGO</p>
                    </Grid>
                    : ''
                }
                <Grid item xs={2} className={classes.label}>
                  <p className={classes.label_cells_totales}>OBSERVACIONES</p>
                </Grid>
                <Grid item xs={12} className={classes.label}>
                  <hr className={classes.label} />
                </Grid>
                {
                  sesionesAnticipadas ?
                    sesionesAnticipadas.map((sesionAnticipada, index) => {
                      let comisionDermatologo = 0;
                      let pagoDermatologo = 0;
                      if (!sesionAnticipada.has_descuento_dermatologo) {
                        if (sesionAnticipada.servicio._id === servicioAparatologiaId) {
                          sesionAnticipada.tratamientos.forEach(tratamiento => {
                            if (tratamiento._id === laserTratamientoId && index === 0) {
                              tratamiento.areasSeleccionadas.map(area => {
                                const itemPrecio = precioAreaBySucursal(sucursal._id, area);
                                comisionDermatologo += (Number(itemPrecio) * Number(dermatologo.esquema.porcentaje_laser) / 100);
                              });
                            } else {
                              sesionAnticipada.tratamientos.map(tratamiento => {
                                tratamiento.areasSeleccionadas.map(areaSeleccionada => {
                                  switch (sesionAnticipada.tipo_cita._id) {
                                    case revisadoTipoCitaId:
                                      comisionDermatologo += Number(
                                        sucursal._id === sucursalManuelAcunaId ? areaSeleccionada.comision_revisado_ma
                                          : (sucursal._id === sucursalRubenDarioId ? areaSeleccionada.comision_revisado_rd
                                            : areaSeleccionada.comision_revisado)
                                      );
                                      break;
                                    case derivadoTipoCitaId:
                                      comisionDermatologo += Number(
                                        sucursal._id === sucursalManuelAcunaId ? areaSeleccionada.comision_derivado_ma
                                          : (sucursal._id === sucursalRubenDarioId ? areaSeleccionada.comision_derivado_rd
                                            : areaSeleccionada.comision_derivado)
                                      );
                                      break;
                                    case realizadoTipoCitaId:
                                      comisionDermatologo += Number(
                                        sucursal._id === sucursalManuelAcunaId ? areaSeleccionada.comision_realizado_ma
                                          : (sucursal._id === sucursalRubenDarioId ? areaSeleccionada.comision_realizado_rd
                                            : areaSeleccionada.comision_realizado)
                                      );
                                      break;
                                    case directoTipoCitaId: // TOMA EL 100%
                                      comisionDermatologo += Number(
                                        sucursal._id === sucursalManuelAcunaId ? areaSeleccionada.precio_ma
                                          : (sucursal._id === sucursalRubenDarioId ? areaSeleccionada.precio_rd
                                            : areaSeleccionada.precio_fe)
                                      );
                                      break;
                                    case noAplicaTipoCitaId:
                                      comisionDermatologo += Number(0);
                                      break;
                                  }
                                });
                              });
                            }
                          });
                          pagoDermatologo = comisionDermatologo;
                        } else {
                          sesionAnticipada.tratamientos.map(tratamiento => {
                            tratamiento.areasSeleccionadas.map(areaSeleccionada => {
                              switch (sesionAnticipada.tipo_cita._id) {
                                case revisadoTipoCitaId:
                                  comisionDermatologo += Number(
                                    sucursal._id === sucursalManuelAcunaId ? areaSeleccionada.comision_revisado_ma
                                      : (sucursal._id === sucursalRubenDarioId ? areaSeleccionada.comision_revisado_rd
                                        : areaSeleccionada.comision_revisado)
                                  );
                                  break;
                                case derivadoTipoCitaId:
                                  comisionDermatologo += Number(
                                    sucursal._id === sucursalManuelAcunaId ? areaSeleccionada.comision_derivado_ma
                                      : (sucursal._id === sucursalRubenDarioId ? areaSeleccionada.comision_derivado_rd
                                        : areaSeleccionada.comision_derivado)
                                  );
                                  break;
                                case realizadoTipoCitaId:
                                  comisionDermatologo += Number(
                                    sucursal._id === sucursalManuelAcunaId ? areaSeleccionada.comision_realizado_ma
                                      : (sucursal._id === sucursalRubenDarioId ? areaSeleccionada.comision_realizado_rd
                                        : areaSeleccionada.comision_realizado)
                                  );
                                  break;
                                case directoTipoCitaId: // TOMA EL 100%
                                  comisionDermatologo += Number(
                                    sucursal._id === sucursalManuelAcunaId ? areaSeleccionada.precio_ma
                                      : (sucursal._id === sucursalRubenDarioId ? areaSeleccionada.precio_rd
                                        : areaSeleccionada.precio_fe)
                                  );
                                  break;
                                case noAplicaTipoCitaId:
                                  comisionDermatologo += Number(0);
                                  break;
                              }
                            });
                          });
                          pagoDermatologo = comisionDermatologo - ((comisionDermatologo * (sesionAnticipada.porcentaje_descuento_clinica ? sesionAnticipada.porcentaje_descuento_clinica : 0)) / 100);
                        }
                        pagoTotal += Number(pagoDermatologo);
                      }

                      return <Grid container>
                        <Grid item xs={true} className={classes.label}>
                          <p className={classes.label_cells}>{sesionAnticipada.tipo_cita.nombre}</p>
                        </Grid>
                        <Grid item xs={true} >
                          <p className={classes.label_cells}>{`${sesionAnticipada.paciente.nombres} ${sesionAnticipada.paciente.apellidos}`}</p>
                        </Grid>
                        <Grid item xs={true} >
                          <p className={classes.label_cells}>{`${sesionAnticipada.servicio.nombre}`}</p>
                        </Grid>
                        <Grid item xs={true} className={classes.label}>
                          <p className={classes.label_cells}>{`${sesionAnticipada.show_tratamientos}`}</p>
                        </Grid>
                        <Grid item xs={true} className={classes.label}>
                          <p className={classes.label_cells}>{`${sesionAnticipada.factura ? '(FACTURA)' : ''}${sesionAnticipada.forma_pago_nombre}`}</p>
                        </Grid>
                        <Grid item xs={true} className={classes.label}>
                          <p className={classes.label_cells_total}> {`${toFormatterCurrency(sesionAnticipada.total)}`} </p>
                        </Grid>
                        {
                          dermatologo._id !== dermatologoDirectoId
                            ? <Grid item xs={true} className={classes.label}>
                              <p className={classes.label_cells_total}> {`${toFormatterCurrency(pagoDermatologo)}`} </p>
                            </Grid>
                            : ''
                        }
                        <Grid item xs={2} className={classes.label}>
                          <p className={classes.label_cells}>{`${sesionAnticipada.observaciones ? sesionAnticipada.observaciones : ''}`}</p>
                        </Grid>
                      </Grid>
                    })
                    : ''
                }
              </Grid>
            </Fragment>
            : ''
        }

        <Grid container xs={6} className={classes.container_buttom}>
          <Grid container xs={6}>
            <Grid item xs={12} className={classes.label_line}>
              <hr className={classes.hr} />
            </Grid>
            <Grid item xs={12} >
              <p className={classes.label_cells_totales}>{`RECEP: ${empleado.nombre} `}</p>
            </Grid>
          </Grid>

          <Grid container xs={6}>
            <Grid item xs={12} className={classes.label_line}>
              <hr className={classes.hr} />
            </Grid>
            <Grid item xs={12} >
              <p className={classes.label_cells_totales}>{`DERMATÓLOGO: ${dermatologo.nombre}`}</p>
            </Grid>
          </Grid>
        </Grid>

        <Grid container xs={6} className={classes.container_buttom}>
          <Grid item xs={12} className={classes.labelItemRight}>
            <h2 className={classes.labelItemRight}>TOTAL: {toFormatterCurrency(pagoTotal)}</h2>
            {
              dermatologo._id !== dermatologoDirectoId
                ? <h1 className={classes.labelItemRight}>RETENCIÓN: {toFormatterCurrency(dermatologo.pago_completo ? 0 : (pagoTotal / 2))}</h1>
                : ''
            }
          </Grid>
        </Grid>

      </Grid>
    </Fragment>
  );
}

export default FormImprimirPagoDermatologo;