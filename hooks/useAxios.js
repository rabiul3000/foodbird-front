import axiosInstance from "../src/api/axiosInstance";
import { useCallback } from "react";

const useAxios = () => {
  
  
const get = useCallback((url, config = {}) => {
    return axiosInstance.get(url, config);
  }, []);

  const post = useCallback((url, data, config = {}) => {
    return axiosInstance.post(url, data, config);
  }, []);



  const put = useCallback((url, data, config = {}) => {
    return axiosInstance.put(url, data, config);
  }, []);

  const del = useCallback((url, config = {}) => {
    return axiosInstance.delete(url, config);
  }, []);

  return { get, post, put, del };
};

export default useAxios;
