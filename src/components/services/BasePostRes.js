import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../utils/baseUrl";

export const ChatAiSession = async (
  data,
  setchatLog,
  chatLog,
  setisloading
) => {
  setisloading(true);
  const res = await axios.post(`${baseUrl}`, data);
  if (res.data.status) {
    setchatLog([
      ...chatLog,
      { user: "Ai", message: res.data.data.choices[0].text },
    ]);
    setisloading(false);
  } else {
    toast.error("Something went wrong");
    setisloading(false);
  }
};
export const imageProcessModel = async (data, setresImage, setisloading) => {
  setisloading(true);
  const res = await axios.post(`${baseUrl}imgecrt`, data);

  if (res.data.status) {
    setresImage(res.data.data);
    setisloading(false);
  } else {
    toast.error("Something went wrong");
    setisloading(false);
  }
};
export const textProcessModel = async (data, setreseditText, setisloading) => {
  setisloading(true);
  const res = await axios.post(`${baseUrl}editText`, data);
  if (res.data.status) {
    setreseditText(res.data.data.choices[0].text);
    setisloading(false);
  } else {
    toast.error("Something went wrong");
    setisloading(false);
  }
};
