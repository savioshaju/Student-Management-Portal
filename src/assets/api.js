import axios from "axios";

const api = axios.create({
  baseURL: 'https://res-34wr.onrender.com'
});



export const getStudents = async () => {
  const response = await api.get('/students');
  return response.data;
};


export const getStudentByRollNumber = async (rollNumber) => {
  const response = await api.get(`/students/${rollNumber}`);
  return response.data;
};
