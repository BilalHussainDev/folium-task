// import { api } from ".";
import { historicalData } from "data/historicalData";
import { data } from "data/index"; // will be removed --------------

export const getStockData = async (range) => {
  //   const response = await api.get("query", {
  //     params: {
  //       function: "TIME_SERIES_INTRADAY",
  //       symbol: "IBM",
  //       interval: "5min",
  //       month: range,
  //     },
  //   });
  //   return response.data;
  return data; // will be removed --------------------
};

export const getHistoricalData = async (selectedStock) => {
  //   const response = await api.get("query", {
  //     params: {
  //       function: "TIME_SERIES_DAILY",
  //       symbol: selectedStock,
  //     },
  //   });
  //   return response.data;
  return historicalData; // will be removed --------------------
};
