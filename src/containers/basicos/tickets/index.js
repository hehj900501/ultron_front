import React, { Fragment, useEffect, useState } from "react"
import withStyles from "@material-ui/core/styles/withStyles"
import CrudApp from "./CrudApp/CrudApp"
import {
  createticket,
  deleteTicket,
  showAllTicketPrioridades,
  showAllTicketStatuss,
  showAlltickets,
  updateTicket,
} from "../../../services/tickets_bim/tickets_bim"
import { showAllOffices } from "./../../../services/index"
import { showAllEmployees, findEmployeesByRolIdAvailable } from "./../../../services/empleados"
import { Backdrop, CircularProgress } from "@material-ui/core"

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing(5)}px ${theme.spacing(5)}px ${theme.spacing(
      5
    )}px`,
  },
  container: {
    maxWidth: "200px",
  },
  title: {
    color: "#2BA6C6",
  },
})

const TicketsForm = (props) => {
  const { sucursal, empleado, colorBase } = props

  const token = empleado.access_token
  const biomedicoRolId = process.env.REACT_APP_BIOMEDICO_ROL_ID

  const classes = props

  const [isLoading, setIsLoading] = useState(true)
  const [prioridades, setPrioridades] = useState([])
  const [request, setRequest] = useState({
    status: {
      _id: "64c9551abf45c311c098ab82",
      nombre: "EN ESPERA"
    },
    prioridad: {
      _id: "64c954f0bf45c311c098ab81",
      nombre: "ALTA"
    },
    asignado_a: {
      _id: "6452a9b3591ea02f406fd016",
      nombre: "OSCAR OSWALDO PLASCENCIA VÁZQUEZ"
    },
  })
  const [status, setStatus] = useState([])
  const [ingeniero, setIngeniero] = useState([])
  const [tickets, setTickets] = useState([])

  const completeData =
    !request.incidencia ||
    !request.prioridad ||
    !request.status ||
    !request.observaciones

  const loadPrioridades = async () => {
    const response = await showAllTicketPrioridades()
    if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
      setPrioridades(response.data)
    }
  }

  const loadStatus = async () => {
    const response = await showAllTicketStatuss()
    if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
      setStatus(response.data)
    }
  }

  const loadIngeniero = async () => {
    const response = await findEmployeesByRolIdAvailable(biomedicoRolId, token)
    if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
      const ingenieros = response.data
      setIngeniero(response.data)
      loadOffices(ingenieros)
    }
  }

  const loadOffices = async (ingenieros) => {
    const response = await showAllOffices()
    if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
      const sucursales = response.data
      loadEmployees(ingenieros, sucursales)
    }
  }

  const loadEmployees = async (ingenieros, sucursales) => {
    const response = await showAllEmployees(token)
    if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
      const empleados = response.data
      loadTickets(ingenieros, sucursales, empleados)
    }
  }

  const loadTickets = async (ingenieros, sucursales, empleados) => {
    const response = await showAlltickets()
    if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
      await response.data.forEach((ticket) => {
        const findCreado = empleados ? empleados.find((empleado) => {
          if (empleado._id === ticket.creado) {
            ticket.creado = empleado.nombre
          }
        }) : {}
        const findIngeniero = ingenieros ? ingenieros.find((ingeniero) => {
          if (ingeniero._id === ticket.asignado_a) {
            ticket.asignado_a = ingeniero.nombre
          }
        }) : {}
        const findSucursal = sucursales ? sucursales.find((sucursal) => {
          if (sucursal._id === ticket.sucursal) {
            ticket.sucursal = sucursal.nombre
          }
        }) : sucursales
      })
      setTickets(response.data)
      setIsLoading(false)
    }
  }

  const handleChange = (event) => {
    setRequest({
      ...request,
      [event.target.name]: event.target.value.toUpperCase(),
    })
  }

  const handleChangePrioridades = (e, newValue) => {
    setRequest({ ...request, prioridad: newValue })
  }

  const handleChangeStatus = (e, newValue) => {
    setRequest({ ...request, status: newValue })
  }

  const handleChangeIngeniero = (e, newValue) => {
    setRequest({ ...request, asignado_a: newValue })
  }

  const handleClickGuardar = async (e) => {
    if (!request._id) {
      request.creado = empleado._id
      request.sucursal = sucursal._id
      request.asignado_a = process.env.REACT_APP_INGENIERO_ASIGNADO_ID
      const response = await createticket(request)
      if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_CREATED) {
        loadAll()
      }
    } else {
      if (empleado.rol._id === process.env.REACT_APP_BIOMEDICO_ROL_ID) {
        if (request.status._id === process.env.REACT_APP_BIM_CERRADO_STATUS_ID) {
          const nuevafecha = new Date()
          request.fecha_t = nuevafecha
        }
      }
      const response = await updateTicket(request, request._id)
      if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
        loadAll()
      }
    }
  }

  const handleClean = async (e) => {
    request.incidencias = null
    request.status = null
    request.prioridad = null
    request.observaciones = null
    loadAll()
  }

  const handleEdit = async (e, ticket) => {
    setRequest(ticket)
    loadAll()
  }

  const handleClickEliminar = async (e, row) => {
    const response = await deleteTicket(row._id)
    if (`${response.status}` === process.env.REACT_APP_RESPONSE_CODE_OK) {
      loadAll()
    }
  }

  const loadAll = async () => {
    setIsLoading(true)
    await loadPrioridades()
    await loadStatus()
    await loadIngeniero()
  }

  useEffect(() => {
    loadAll()
  }, [])

  return (
    <Fragment>
      {!isLoading ? (
        <CrudApp
          colorBase={colorBase}
          prioridades={prioridades}
          status={status}
          ingeniero={ingeniero}
          onChangePrioridades={handleChangePrioridades}
          onChangeStatus={handleChangeStatus}
          onChangeIngeniero={handleChangeIngeniero}
          request={request}
          handleClickGuardar={handleClickGuardar}
          handleClickEliminar={handleClickEliminar}
          handleClean={handleClean}
          handleEdit={handleEdit}
          onChange={handleChange}
          tickets={tickets}
          completeData={completeData}
          empleado={empleado}
        />
      ) : (
        <Backdrop className={classes.backdrop} open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </Fragment>
  )
}

export default withStyles(styles)(TicketsForm)
