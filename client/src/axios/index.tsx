import axios from "axios";
import { URL_SERVER } from "../App";

const sendReqPost = async (data: object | [object], toUrl: string) => {
  try {
    const res = await axios({
      method: "post",
      url: `${URL_SERVER}${toUrl}`,
      data,
    });
    if (res.data) {
      return res.data;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

const sendReqGet = async (data: object, toUrl: string) => {
  try {
    const res = await axios({
      method: "get",
      url: `${URL_SERVER}${toUrl}`,
      headers: data,
    });
    if (res.data) {
      return res.data;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};
export { sendReqPost, sendReqGet };
