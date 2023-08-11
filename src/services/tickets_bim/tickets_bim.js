import axios from "axios";

export const baseUrl = process.env.REACT_APP_BASE_URL_U_TICKET_BIM;

export const showAlltickets = async () => {
  try {
    const response = await axios({
      url: `${baseUrl}/ticket`,
      method: "GET",
    });
    return response;
  } catch (error) {
    console.log("showAlltickets", error);
    return error;
  }
};

export const createticket = async (tickets) => {
  try {
    const response = await axios({
      url: `${baseUrl}/ticket`,
      method: "POST",
      data: tickets,
    });
    return response;
  } catch (error) {
    console.log("createticket", error);
    return error;
  }
};

export const showAllTicketPrioridades = async () => {
  try {
    const response = await axios({
      url: `${baseUrl}/ticketprioridad`,
      method: "GET",
    });
    return response;
  } catch (error) {
    console.log("showAllTicketPrioridades", error);
    return error;
  }
};

export const showAllTicketStatuss = async () => {
  try {
    const response = await axios({
      url: `${baseUrl}/ticketstatus`,
      method: "GET",
    });
    return response;
  } catch (error) {
    console.log("showAllTicketStatuss", error);
    return error;
  }
};

export const deleteTicket = async (ticketId) => {
  try {
    const response = await axios({
      url: `${baseUrl}/ticket/${ticketId}`,
      method: "DELETE",
    });
    return response;
  } catch (error) {
    console.log("deleteTicket", error);
  }
};

export const updateTicket = async (ticket, ticketId) => {
  try {
    const response = await axios({
      url: `${baseUrl}/ticket/${ticketId}`,
      method: "PUT",
      data: ticket,
    });
    return response;
  } catch (error) {
    console.log("updateTicket", error);
    return error;
  }
};

export const findticketById = async (ticketId) => {
  try {
    const response = await axios({
      url: `${baseUrl}/ticket/${ticketId}`,
      method: "GET",
    });
    return response;
  } catch (error) {
    console.log("findticketById", error);
  }
};
