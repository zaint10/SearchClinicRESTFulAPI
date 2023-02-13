// Helper function to normalize dental clinic data
const normalizeDentalData = (clinic) => {
  /*
   * This function takes a dental clinic data object as an argument and returns
   * a new object with four properties: clinicName, clinicState, availabilityFrom,
   * and availabilityTo. The returned object is a normalized representation of the
   * original dental clinic data, which means it contains only the relevant
   * information in a standardized format.
   */
  return {
    clinicName: clinic.name,
    clinicState: clinic.stateName,
    availabilityFrom: clinic.availability.from,
    availabilityTo: clinic.availability.to,
  };
};

// Helper function to normalize vet clinic data
const normalizeVetData = (clinic) => {
  /*
   * This function takes a vet clinic data object as an argument and returns a new object
   * with the same four properties as normalizeDentalData. The returned object is
   * a normalized representation of the original vet clinic data, which means it contains
   * only the relevant information in a standardized format.
   */
  return {
    clinicName: clinic.clinicName,
    clinicState: clinic.stateCode,
    availabilityFrom: clinic.opening.from,
    availabilityTo: clinic.opening.to,
  };
};

module.exports = {
  normalizeDentalData,
  normalizeVetData,
};
