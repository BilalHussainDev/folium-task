// import { api } from ".";
import { data } from "data/index"; // will be removed --------------

export const getDashboardData = async () => {
//   const response = await api.get("query", {
//     params: {
//       function: "TIME_SERIES_INTRADAY",
//       symbol: "IBM",
//       interval: "5min",
//     },
//   });
//   return response.data;
return data; // will be removed --------------------
};
