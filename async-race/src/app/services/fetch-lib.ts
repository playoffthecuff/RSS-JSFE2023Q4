import { Car } from '../../types';

const IP = 'http://127.0.0.1';
const PORT = '3000';
const GARAGE_ROUTE = 'garage';
// const ENGINE_ROUTE = 'engine';
// const WINNERS_ROUTE = 'winners';
export const LIMIT = 7;

const serverAddress = `${IP}:${PORT}/`;

function getQueryUrl(route: string, page?: number, limit?: number) {
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
  const cars = await fetchData<Car[]>(getQueryUrl(GARAGE_ROUTE, page, LIMIT));
  return cars;
}

export async function fetchHeader(header: string) {
  const response = await fetch(getQueryUrl(GARAGE_ROUTE, 0, 1));
  return response.headers.get(header);
}

export async function deleteCar(id: number) {
  await fetch(getResourceUrl(GARAGE_ROUTE, id), { method: 'DELETE' });
}

export async function createCar<Car>(
  name: string,
  color: string,
): Promise<Car> {
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
