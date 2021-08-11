import api from "../config/api.jsx";
import axios from "axios";
import { URL } from "../config/constants";

export const getListado = () => {
  return (dispatch) => {
    return axios.get(
      "https://mfwkweb-api.clarovideo.net//services/cms/level?api_version=v5.86&authpn=webclient&authpt=tfg1h3j4k6fd7&format=json&region=mexico&device_id=web&device_category=web&device_model=web&device_type=web&device_manufacturer=generic&HKS=9s5hqq76r3g6sg4jb90l38us52&isCacheable=true&node=gen_accion&domain=https%3A%2F%2Fmfwkweb-api.clarovideo.net%2F&origin=https%3A%2F%2Fwww.clarovideo.com%2F&user_id=22822863"
    );
  };
};

export const getListadoCatalogs = (urlPart) => {
  return (dispatch) => {
    return axios.get(
      `${URL.urlBase.base}${urlPart}?api_version=v5.86&authpn=webclient&authpt=tfg1h3j4k6fd7&format=json&region=mexico&device_id=web&device_category=web&device_model=web&device_type=web&device_manufacturer=generic&HKS=9s5hqq76r3g6sg4jb90l38us52`
    );
  };
};

export const getDetalleCatalogs = (group_id) => {
  return (dispatch) => {
    axios
      .get(
        `https://mfwkweb-api.clarovideo.net/services/content/data?device_id=web&device_category=web&device_model=web&device_type=%20web&format=json&device_manufacturer=generic&authpn=webclient&authpt=tfg1h3j4k6fd7&api_version=v5.86&region=mexico&HKS%20=9s5hqq76r3g6sg4jb90l38us52&user_id=22822863&group_id=${group_id}`
      )
      .then((response) => {
        dispatch({
          type: "GET_LISTADO",
          value: response.data,
        });
      })
      .catch((err) => {});
  };
};
