import axios from "axios";
export const loadSupervisorsApi = async () =>
  await axios.get("http://localhost:4000/users");

