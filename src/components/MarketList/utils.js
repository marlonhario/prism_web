import { regions } from "./Filters/utils";

/**
 * static API path 
 */
export const APIPath = {
  listOfSecurities: "/calculators/securities",
  etas: "/calculators/etas",
  etaDetails: "/calculators/etas/details",
  establishment: "/establishment/prices"
};

/**
 * Get all sub region based on selected region to filter the security list
 */
export const getAllRegion = (selectedRegion) => regions.filter(r => r.title === selectedRegion);