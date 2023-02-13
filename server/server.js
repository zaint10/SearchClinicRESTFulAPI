const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  res.json({ hey: "World!" });
});

const DENTAL_CLINICS_URL =
  "https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json";
const VET_CLINICS_URL =
  "https://storage.googleapis.com/scratchpay-code-challenge/vet-clinics.json";

// Helper function to normalize dental clinic data
const normalizeDentalData = (clinic) => {
  return {
    clinicName: clinic.name,
    clinicState: clinic.stateName,
    availabilityFrom: clinic.availability.from,
    availabilityTo: clinic.availability.to,
  };
};

// Helper function to normalize vet clinic data
const normalizeVetData = (clinic) => {
  return {
    clinicName: clinic.clinicName,
    clinicState: clinic.stateCode,
    availabilityFrom: clinic.opening.from,
    availabilityTo: clinic.opening.to,
  };
};

// Helper function to get all clinics from both providers and normalize the data
const getAllClinics = async () => {
  let dentalClinics = [];
  let vetClinics = [];

  try {
    const dentalResponse = await axios.get(DENTAL_CLINICS_URL);
    dentalClinics = dentalResponse.data.map(normalizeDentalData);
  } catch (error) {
    console.error(error);
  }

  try {
    const vetResponse = await axios.get(VET_CLINICS_URL);
    vetClinics = vetResponse.data.map(normalizeVetData);
  } catch (error) {
    console.error(error);
  }

  return [...dentalClinics, ...vetClinics];
};

app.get("/api", async (req, res) => {
  const { clinicName, clinicState, availabilityFrom, availabilityTo } =
    req.query;

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

  res.json({ clinics });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
