import React, { useState, useEffect } from 'react';
import FormItemCatalogo from './FormItemCatalogo';
import {
  showAllSexos,
} from "../../../services";
import { createLaboratorio, showAllLaboratorios, updateLaboratorio } from '../../../services/laboratorios';
import { Fragment } from 'react';
import { Backdrop, CircularProgress } from '@material-ui/core';
import myStyles from '../../../css';
import { createProductoComercial, updateProductoComercial } from '../../../services/productos_comerciales';
import { createOcupacion, updateOcupacion } from '../../../services/ocupacion';
import { createEspecialidad, updateEspecialidad } from '../../../services/especialidades';
import { esquemasCatalogoId } from '../../../utils/constants';
import { createEsquema, showAllEsquemas, updateEsquema } from '../../../services/esquemas';
import { getToken } from '../../../utils/utils';
import { createEmployee, updateEmployee } from '../../../services/empleados';

const ModalItemCatalogo = (props) => {

  const laboratoriosCatalogoId = process.env.REACT_APP_LABORATORIOS_CATALOGO_ID;
  const productoComercialCatalogoId = process.env.REACT_APP_PRODUCTO_COMERCIAL_CATALOGO_ID;
  const ocupacionCatalogoId = process.env.REACT_APP_OCUPACION_CATALOGO_ID;
  const especialidadCatalogoId = process.env.REACT_APP_ESPECIALIDAD_CATALOGO_ID;
  const dermatologosCatalogoId = process.env.REACT_APP_DERMATOLOGOS_CATALOGO_ID;

  const booleanObjects = [
    {
      value: true,
      descripcion: 'SI',
    },
    {
      value: false,
      descripcion: 'NO',
    },
  ];

  const {
    empleado,
    open,
    onClose,
    loadCatalogos,
    item,
    catalogo,
    setMessage,
    setSeverity,
    setOpenAlert,
    colorBase,
  } = props;

  const token = getToken(empleado);

  const classes = myStyles(colorBase)();

  const [isLoading, setIsLoading] = useState(true);

  const [values, setValues] = useState({
    ...item,
  });

  const [laboratorios, setLaboratorios] = useState([]);
  const [esquemas, setEsquemas] = useState([]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value.toUpperCase()
    });
  }

  const handleChangeSelect = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  }

  const loadLaboratorios = async () => {
    const response = await showAllLaboratorios();
    if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
      setLaboratorios(response.data);
    }
  }

  const loadEsquemas = async () => {
    const response = await showAllEsquemas();
    if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
      const resEsquemas = response.data;
      setEsquemas(resEsquemas);
    }
  }

  const handleChangeCombo = (event, newValue) => {
    setIsLoading(true);
    setValues({
      ...values,
      [event.target.name]: newValue ? newValue._id : newValue,
    });
    setIsLoading(false);
  };

  const handleChangeDate = async (date, show, field) => {
		setIsLoading(true);
		setValues({
			...values,
			[field]: date,
		});
		setIsLoading(false);
	};

  const loadAll = async () => {
    setIsLoading(true);
    if (catalogo.columns.filter(column => column.title === 'LABORATORIO').length > 0) await loadLaboratorios();
    if (catalogo.columns.filter(column => column.title === 'ESQUEMA').length > 0) await loadEsquemas();
    setIsLoading(false);
  }

  useEffect(() => {
    loadAll();
  }, []);

  const handleGuardarItem = async (event, newItem) => {
    setIsLoading(true);
    let response;
    switch (catalogo._id) {
      case laboratoriosCatalogoId:
        response = item._id ? await updateLaboratorio(item._id, newItem) : await createLaboratorio(newItem);
        break;
      case productoComercialCatalogoId:
        response = item._id ? await updateProductoComercial(item._id, newItem) : await createProductoComercial(newItem);
        break;
      case ocupacionCatalogoId:
        response = item._id ? await updateOcupacion(item._id, newItem) : await createOcupacion(newItem);
        break;
      case especialidadCatalogoId:
        response = item._id ? await updateEspecialidad(item._id, newItem) : await createEspecialidad(newItem);
        break;
      case esquemasCatalogoId:
        response = item._id ? await updateEsquema(item._id, newItem, token) : await createEsquema(newItem, token);
        break;
      case dermatologosCatalogoId:
        response = item._id ? await updateEmployee(item._id, newItem, token) : await createEmployee(newItem, token);
        break;

    }

    if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK
      || `${response.status}` === process.env.REACT_APP_RESPONSE_CODE_CREATED) {
      setSeverity('success');
      setOpenAlert(true);
      setMessage(item._id ? 'REGISTRO ACTUALIZADO CORRECTAMENTE' : 'REGISTRO CREADO CORRECTAMENTE');
    }

    loadCatalogos();
    onClose();
    setIsLoading(false);
  }

  return (
    <Fragment>
      {
        !isLoading ?
          <FormItemCatalogo
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            values={values}
            colorBase={colorBase}
            open={open}
            onClickCancel={onClose}
            booleanObjects={booleanObjects}
            onChange={handleChange}
            onChangeSelect={handleChangeSelect}
            onChangeCombo={handleChangeCombo}
            onGuardarItem={handleGuardarItem}
            onChangeDate={handleChangeDate}
            catalogo={catalogo}
            laboratorios={laboratorios}
            esquemas={esquemas}
          />
          : <Backdrop className={classes.backdrop} open={isLoading} >
            <CircularProgress color="inherit" />
          </Backdrop>
      }
    </Fragment>


  );
}

export default ModalItemCatalogo;