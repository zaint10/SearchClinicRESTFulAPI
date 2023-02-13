const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const {
  DENTAL_CLINICS_URL,
  VET_CLINICS_URL,
  PAGE_SIZE,
} = require("./constants");
const helper = require("./helpers/helpers");

// Helper function to get all clinics from both providers and normalize the data
const getAllClinics = async () => {
  /**
   * This function is an asynchronous function that returns an array of all clinics from both
   * dental and vet providers. It does this by making two separate API calls, one to the dental
   * clinic provider and the other to the vet clinic provider, and normalizing the returned
   * data using the normalizeDentalData and normalizeVetData functions. The two API
   * calls are wrapped in try-catch blocks to handle any errors that may occur during the calls
   */
  let dentalClinics = [];
  let vetClinics = [];

  try {
    const dentalResponse = await axios.get(DENTAL_CLINICS_URL);
    dentalClinics = dentalResponse.data.map(helper.normalizeDentalData);
  } catch (error) {
    console.error(error);
  }

  try {
    const vetResponse = await axios.get(VET_CLINICS_URL);
    vetClinics = vetResponse.data.map(helper.normalizeVetData);
  } catch (error) {
    console.error(error);
  }

  return [...dentalClinics, ...vetClinics];
};

app.get("/api", async (req, res) => {
  const { clinicName, clinicState, availabilityFrom, availabilityTo } =
    req.query;
  const page = parseInt(req.query.page) || 1;

  let clinics = await getAllClinics();

  // Filter by clinic name
  if (clinicName) {
    clinics = clinics.filter((clinic) =>
      clinic.clinicName.toLowerCase().includes(clinicName.toLowerCase())
    );
  }

  // Filter by state code
  if (clinicState) {
    clinics = clinics.filter((clinic) =>
      clinic.clinicState.toLowerCase().includes(clinicState.toLowerCase())
    );
  }

  // Filter by availability if both are passed
  if (availabilityFrom && availabilityTo) {
    clinics = clinics.filter((clinic) => {
      const clinicAvailabilityFrom = new Date(
        `1970-01-01T${clinic.availabilityFrom}:00Z`
      );
      const clinicAvailabilityTo = new Date(
        `1970-01-01T${clinic.availabilityTo}:00Z`
      );
      const searchAvailabilityFrom = new Date(
        `1970-01-01T${availabilityFrom}:00Z`
      );

      // check if the clinic is available within the given time range
      const searchAvailabilityTo = new Date(`1970-01-01T${availabilityTo}:00Z`);

      return (
        clinicAvailabilityFrom >= searchAvailabilityFrom &&
        clinicAvailabilityTo <= searchAvailabilityTo
      );
    });
  }

  // Filter by From availability
  if (availabilityFrom) {
    clinics = clinics.filter((clinic) => {
      const clinicAvailabilityFrom = new Date(
        `1970-01-01T${clinic.availabilityFrom}:00Z`
      );

      const searchAvailabilityFrom = new Date(
        `1970-01-01T${availabilityFrom}:00Z`
      );
      return clinicAvailabilityFrom >= searchAvailabilityFrom;
    });
  }

  // Filter by To if both are passed
  if (availabilityTo) {
    clinics = clinics.filter((clinic) => {
      const clinicAvailabilityTo = new Date(
        `1970-01-01T${clinic.availabilityTo}:00Z`
      );

      const searchAvailabilityTo = new Date(`1970-01-01T${availabilityTo}:00Z`);

      return clinicAvailabilityTo <= searchAvailabilityTo;
    });
  }

  const startIndex = (page - 1) * PAGE_SIZE;
  const endIndex = page * PAGE_SIZE;
  const paginatedClinics = clinics.slice(startIndex, endIndex);
  // Return the paginated response of clinics data
  res.send({
    clinics: paginatedClinics,
    totalClinics: clinics.length,
    currentPage: page,
    pageSize: PAGE_SIZE,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = app;