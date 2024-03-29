import { Car, Winner } from '../../types';

const IP = 'http://127.0.0.1';
const PORT = '3000';
const GARAGE_ROUTE = 'garage';
const ENGINE_ROUTE = 'engine';
const WINNERS_ROUTE = 'winners';
export const LIMIT = 7;

const serverAddress = `${IP}:${PORT}/`;

function getQueryCarsUrl(route: string, page?: number, limit?: number) {
  let querySign = '';
  if (limit) querySign = '?';
  if (page && limit) querySign = '&';
  return `${serverAddress}${route}${page ? `?_page=${page}` : ''}${querySign}${limit ? `_limit=${limit}` : ''}`;
}

function getResourceUrl(route: string, id?: number) {
  return `${serverAddress}${route}${id ? `/${id}` : ''}`;
}

export async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

export async function fetchCars(page: number) {
  const cars = await fetchData<Car[]>(
    getQueryCarsUrl(GARAGE_ROUTE, page, LIMIT),
  );
  return cars;
}

export async function fetchHeader(header: string) {
  const response = await fetch(getQueryCarsUrl(GARAGE_ROUTE, 0, 1));
  return response.headers.get(header);
}

export async function deleteCar(id: number) {
  await fetch(getResourceUrl(GARAGE_ROUTE, id), { method: 'DELETE' });
}

export async function createCar(name: string, color: string): Promise<Car> {
  const requestData = {
    name,
    color,
  };
  const response = await fetch(getResourceUrl(GARAGE_ROUTE), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestData),
  });
  const responseData = await response.json();
  return responseData;
}

export async function updateCar(
  id: number,
  name: string,
  color: string,
): Promise<Car> {
  const requestData = {
    name,
    color,
  };

  const response = await fetch(getResourceUrl(GARAGE_ROUTE, id), {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestData),
  });

  const responseData = await response.json();
  return responseData;
}

function getQueryEngineUrl(
  route: string,
  id: number,
  status: 'started' | 'stopped' | 'drive',
) {
  return `${serverAddress}${route}?id=${id}&status=${status}`;
}

export async function controlEngine(id: number, status: 'started' | 'stopped') {
  const response = await fetch(getQueryEngineUrl(ENGINE_ROUTE, id, status), {
    method: 'PATCH',
  });
  const responseData = await response.json();
  return responseData;
}

export async function switchEngine(id: number, status: 'drive') {
  const response = await fetch(getQueryEngineUrl(ENGINE_ROUTE, id, status), {
    method: 'PATCH',
  });
  const responseCode = response.status;
  return responseCode;
}

export async function createWinner(
  id: number,
  wins: number,
  time: number,
): Promise<Winner> {
  const requestData = {
    id,
    wins,
    time,
  };
  const response = await fetch(getQueryCarsUrl(WINNERS_ROUTE), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestData),
  });
  const responseData = await response.json();
  return responseData;
}
