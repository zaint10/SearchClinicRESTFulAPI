import React, { useState, useEffect } from "react";
import axios from "axios";

const SearchClinic = () => {
  // State variables to store the list of clinics, error message, loading status, and search parameters
  const [clinics, setClinics] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [clinicName, setClinicName] = useState("");
  const [clinicState, setClinicState] = useState("");
  const [availabilityFrom, setAvailabilityFrom] = useState("");
  const [availabilityTo, setAvailabilityTo] = useState("");

  // useEffect hook to fetch clinics data based on the search parameters
  useEffect(() => {
    const fetchClinics = async () => {
      // set loading status to true and clear any previous error message
      setLoading(true);
      setError(null);

      try {
        // send a GET request to the API with the search parameters as query string
        const response = await axios.get("/api", {
          params: {
            clinicName: clinicName,
            clinicState: clinicState,
            availabilityFrom: availabilityFrom,
            availabilityTo: availabilityTo,
          },
        });

        // set the clinics data to the state
        setClinics(response.data.clinics);
      } catch (err) {
        // if there's an error, set the error message to the state
        setError(err.message);
      } finally {
        // set loading status to false
        setLoading(false);
      }
    };

    // only fetch the clinics data if at least one search parameter is provided
    if (clinicName || clinicState || availabilityFrom || availabilityTo) {
      fetchClinics();
    }
  }, [clinicName, clinicState, availabilityFrom, availabilityTo]);

  // function to handle the "Enter" key press on the clinic name input
  const handleClinicNameKeyDown = (event) => {
    if (event.key == "Enter") setClinicName(event.target.value);
  };

  // function to handle the "Enter" key press on the clinic state input
  const handleClinicStateKeyDown = (event) => {
    if (event.key == "Enter") setClinicState(event.target.value);
  };

  // function to handle changes to the availability from input
  const handleAvailabilityFromChange = (event) => {
    setAvailabilityFrom(event.target.value);
  };

  // function to handle changes to the availability to input
  const handleAvailabilityToChange = (event) => {
    setAvailabilityTo(event.target.value);
  };

  return (
    <div>
      <form>
        <div>
          {/* Form to input the clinic name, state, availability from and availability to */}
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

      {/* Showing loader or any error while calling the API */}
      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      {/* Table for showing all the clinics */}
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
              <td>{result.clinicName}</td>
              <td>{result.clinicState}</td>
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
