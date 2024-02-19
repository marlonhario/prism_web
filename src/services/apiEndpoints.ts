import IEndpoint from "../common/interfaces/Endpoint";

export const AuthLogin: (username: string, password: string) => Partial<IEndpoint> = (
  username: string,
  password: string
) => ({
  url: "authenticate",
  method: "POST",
  data: { username, password },
});

export const GetSecurities: Partial<IEndpoint> = {
  url: "calculators/securities",
  method: "GET",
}

export const GetETAs: Partial<IEndpoint> = {
  url: "calculators/etas",
  method: "GET",
}

export const GetETADetails = (security: string, etaType: string): Partial<IEndpoint> => ({
  url: `calculators/etas/details/${security}/${etaType}`,
  method: "GET",
});

export const GetForecast = (ticker: string): Partial<IEndpoint> => ({
  url: `dividends/forecasts/${ticker}`,
  method: "GET",
});

export const GetAnnualForecast = (ticker: string): Partial<IEndpoint> => ({
  url: `dividends/annualizedForecasts/${ticker}`,
  method: "GET",
});

export const GetHistory = (ticker: string): Partial<IEndpoint> => ({
  url: `dividends/history/${ticker}`,
  method: "GET",
});

export const GetEstablishment = (ticker: string): Partial<IEndpoint> => ({
  url: `/establishment/prices/${ticker}`,
  method: "GET",
});

export const PostEnquiry = (data: any): Partial<IEndpoint> => ({
  url: `/enquiry`,
  method: 'POST',
  data: data,
});