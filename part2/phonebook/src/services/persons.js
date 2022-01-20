import axios from "axios";
const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(res => res.data);
}

const create = newPerson => {
  const request = axios.post(baseUrl, newPerson);
  return request.then(res => res.data);
}

const deletePerson = id => {
  return axios.delete(`${baseUrl}/${id}`)
}

const updatePerson = (id, updatedPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedPerson)
  return request.then(res => res.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, deletePerson, updatePerson }