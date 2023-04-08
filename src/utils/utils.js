import { TOKEN } from "./constants";
import jwtDecode from "jwt-decode";

export const getCurrentDate = (separator = "-") => {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${date}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${year}`;
};

export const buildParamsTerrestre = (params, page) => {
  let fParams = "?";

  if (params.id_cliente != "") {
    fParams += `idCliente=${params.id_cliente}`;
  }

  if (params.fecha_entrega != "") {
    fParams += `&fechaEntrega=${params.fecha_entrega}`;
  }

  if (params.placa_vehiculo != "") {
    fParams += `&placaVehiculo=${params.placa_vehiculo}`;
  }

  fParams += `&page=${page}`;

  return fParams;
};

export const buildParamsMaritimo = (params, page) => {
  let fParams = "?";

  if (params.id_cliente != "") {
    fParams += `idCliente=${params.id_cliente}`;
  }

  if (params.fecha_entrega != "") {
    fParams += `&fechaEntrega=${params.fecha_entrega}`;
  }

  if (params.placa_vehiculo != "") {
    fParams += `&nroFlota=${params.nro_flota}`;
  }

  fParams += `&page=${page}`;

  return fParams;
};

export const setTokenApi = (token) => {
  localStorage.setItem(TOKEN, token);
};

export const getTokenApi = () => {
  return localStorage.getItem(TOKEN);
};

export const logoutApi = () => {
  localStorage.removeItem(TOKEN);
};

export const isUserLogedApi = () => {
  const token = getTokenApi();
  if (!token) {
    logoutApi();

    return null;
  }
  if (isExpired(token)) {
    logoutApi();
  }

  return jwtDecode(token);
};

function isExpired(token) {
  const { exp } = jwtDecode(token);
  const expire = exp * 1000;
  const timeout = expire - Date.now();
  if (timeout < 0) {
    return true;
  }

  return false;
}
