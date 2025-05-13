import { api } from ".";

export const getStockData = async (range) => {
    const response = await api.get("query", {
      params: {
        function: "TIME_SERIES_INTRADAY",
        symbol: "IBM",
        interval: "5min",
        month: range,
      },
    });
    return response.data;
};

export const getHistoricalData = async (selectedStock) => {
    const response = await api.get("query", {
      params: {
        function: "TIME_SERIES_DAILY",
        symbol: selectedStock,
      },
    });
    return response.data;
};
