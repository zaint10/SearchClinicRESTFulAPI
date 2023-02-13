import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchClinic = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchClinics = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get("/api", {
          params: {},
        });

        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClinics();
  }, []);

  return <div>Hi, I'm server's data {JSON.stringify(data)} </div>;
};

export default SearchClinic;
