import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function useApiDetails() {

  let params = useParams()
  let [data, setData] = useState([]);
  let [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData(params.id)
  }, []);

  async function fetchData() {
    setIsLoading(true);
    const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/");
    setIsLoading(false);
    setData(data.data);
  }

  return [data, isLoading];
}
