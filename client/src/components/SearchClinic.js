import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchClinic = () => {
  const [clinics, setClinics] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [clinicName, setClinicName] = useState("");
  const [clinicState, setClinicState] = useState("");
  const [availabilityFrom, setAvailabilityFrom] = useState("");
  const [availabilityTo, setAvailabilityTo] = useState("");

  useEffect(() => {
    const fetchClinics = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get("/api", {
          params: {
            name: clinicName,
            state: clinicState,
            from: availabilityFrom,
            to: availabilityTo,
          },
        });

        setClinics(response.data.clinics);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (clinicName || clinicState || availabilityFrom || availabilityTo) {
      fetchClinics();
    }
  }, [clinicName, clinicState, availabilityFrom, availabilityTo]);

  const handleClinicNameKeyDown = (event) => {
    if (event.key == "Enter") setClinicName(event.target.value);
  };

  const handleClinicStateKeyDown = (event) => {
    if (event.key == "Enter") setClinicState(event.target.value);
  };

  const handleAvailabilityFromChange = (event) => {
    setAvailabilityFrom(event.target.value);
  };

  const handleAvailabilityToChange = (event) => {
    setAvailabilityTo(event.target.value);
  };

  return (
    <div>
      <form>
        <div>
          <label htmlFor="clinicName">Clinic Name:</label>
          <input
            type="text"
            id="clinicName"
            onKeyDown={handleClinicNameKeyDown}
          />
        </div>

        <div>
          <label htmlFor="clinicState">Clinic State:</label>
          <input
            type="text"
            id="clinicState"
            onKeyDown={handleClinicStateKeyDown}
          />
        </div>

        <div>
          <label htmlFor="availabilityFrom">Availability From:</label>
          <input
            type="time"
            id="availabilityFrom"
            value={availabilityFrom}
            onChange={handleAvailabilityFromChange}
          />
        </div>

        <div>
          <label htmlFor="availabilityTo">Availability To:</label>
          <input
            type="time"
            id="availabilityTo"
            value={availabilityTo}
            onChange={handleAvailabilityToChange}
          />
        </div>
      </form>

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      <table>
        <thead>
          <tr>
            <th>Clinic Name</th>
            <th>State</th>
            <th>Availability From</th>
            <th>Availability To</th>
          </tr>
        </thead>
        <tbody>
          {clinics.map((result) => (
            <tr key={result.id}>
              <td>{result.name}</td>
              <td>{result.stateName}</td>
              <td>{result.availabilityFrom}</td>
              <td>{result.availabilityTo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SearchClinic;
