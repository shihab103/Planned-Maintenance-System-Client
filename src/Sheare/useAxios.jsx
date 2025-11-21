import axios from "axios";
import { useMemo } from "react";

const useAxios = () => {
  const instance = useMemo(() => {
    return axios.create({
      baseURL: import.meta.env.VITE_API,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }, []);

  return instance;
};

export default useAxios;
