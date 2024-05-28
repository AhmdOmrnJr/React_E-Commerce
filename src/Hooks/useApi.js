import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export default function useApi(endPoint) {

  let [data, setData] = useState([]);
  let [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData()
  }, []);

  async function fetchData() {
    setIsLoading(true);
    const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/" + endPoint);
    setIsLoading(false);
    setData(data.data);
  }

  return [data, isLoading];
}
