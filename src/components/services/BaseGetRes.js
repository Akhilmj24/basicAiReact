import axios from "axios";
import { baseUrl } from "../utils/baseUrl";

export const getModel = async (setlistAi) => {
  const res = await axios.get(`${baseUrl}models`);
  if (res.data.status) {
    setlistAi(res.data.data);
  } else {
  }
};

export const userList = [
  { id: "text-davinci-002", name: "Scarlett Johansson" },
  { id: "text-davinci-003", name: "Jessica Alba" },
  { id: "text-ada-001", name: "Zendaya" },
  { id: "text-davinci-insert-002", name: "Steve " },
  { id: "code-davinci-002", name: "Ben Job" },
  { id: "code-cushman-001", name: "Margot Robbie" },
];
