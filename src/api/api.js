//const URL = "http://localhost:8181/api/v1/docucenter";

import {
  buildParamsTerrestre,
  buildParamsMaritimo,
  getTokenApi,
} from "../utils/utils";

export const loginApi = async (data) => {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(data),
  };

  const res = await fetch(`/auth`, requestOptions);
  return await res.json();
};

export const createClienteApi = async (data) => {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Conten-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
  };
  const res = await fetch(`/docucenter/clientes`, requestOptions);
  return await res.json();
};

export const getAllClientesApi = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Conten-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
  };
  const res = await fetch(`/docucenter/clientes`, requestOptions);
  return await res.json();
};

export const createLogTerApi = async (data) => {
  const requestOptions = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Conten-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
  };
  const res = await fetch(`/docucenter/peterrestres`, requestOptions);
  return await res.json();
};

export const getAllPETerrestresApi = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Conten-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
  };
  const res = await fetch(`/docucenter/peterrestres`, requestOptions);
  return await res.json();
};

export const editLogTerApi = async (data) => {
  const requestOptions = {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Conten-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
  };
  const res = await fetch(
    `/docucenter/peterrestres/${data.id}`,
    requestOptions
  );
  return await res.json();
};

export const deleteLogTerApi = async (id) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Conten-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
  };

  const res = await fetch(`/docucenter/peterrestres/${id}`, requestOptions);
  return await res.json();
};

export const searchPETerrestresApi = async (params, page) => {
  const queryParams = buildParamsTerrestre(params, page);
  const requestOptions = {
    method: "GET",
    headers: {
      "Conten-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
  };
  const res = await fetch(
    `/docucenter/peterrestres/search${queryParams}`,
    requestOptions
  );
  return await res.json();
};

//-------------------------------------------------------------------------

export const createLogMarApi = async (data) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Conten-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
    body: JSON.stringify(data),
  };
  const res = await fetch(`/docucenter/pemaritimos`, requestOptions);
  return await res.json();
};

export const getAllPEMaritimosApi = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Conten-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
  };
  const res = await fetch(`/docucenter/pemaritimos`, requestOptions);
  return await res.json();
};

export const editLogMarApi = async (data) => {
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Conten-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
    body: JSON.stringify(data),
  };
  const res = await fetch(`/docucenter/pemaritimos/${data.id}`, requestOptions);
  return await res.json();
};

export const deleteLogMarApi = async (id) => {
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Conten-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
  };
  const res = await fetch(`/docucenter/pemaritimos/${id}`, requestOptions);
  return await res.json();
};

export const searchPEMaritimosApi = async (params, page) => {
  const queryParams = buildParamsMaritimo(params, page);
  const requestOptions = {
    method: "GET",
    headers: {
      "Conten-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
  };
  const res = await fetch(
    `/docucenter/pemaritimos/search${queryParams}`,
    requestOptions
  );
  return await res.json();
};
