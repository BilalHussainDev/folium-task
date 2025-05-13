import {
  Card,
  CardContent,
  Typography,
  Box,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Grid,
  CircularProgress,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { getHistoricalData } from "api/dashboard";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const STOCK_OPTIONS = [
  { label: "United States", value: "IBM" },
  { label: "London", value: "TSCO.LON" },
  { label: "Canada", value: "SHOP.TRT" },
];

const StockOverview = () => {
  // will be changed according to StockOverview ---------------
  const [selectedStock, setSelectedStock] = useState("");
  
  // will be changed according to StockOverview -------------------
  const { data, isLoading } = useQuery({
    queryKey: ["stockOverview", selectedStock],
    queryFn: () => getHistoricalData(selectedStock),
    enabled: !!selectedStock,
  });

  // Extract latest stock data
  const latestData = useMemo(() => {
    if (!data?.["Time Series (Daily)"]) return null;

    const latestDate = Object.keys(data["Time Series (Daily)"])[0];
    const values = data["Time Series (Daily)"][latestDate];

    return {
      date: latestDate,
      open: parseFloat(values["1. open"]),
      high: parseFloat(values["2. high"]),
      low: parseFloat(values["3. low"]),
      close: parseFloat(values["4. close"]),
    };
  }, [data]);

  // Prepare chart data
  const chartData = useMemo(() => {
    if (!data?.["Time Series (Daily)"]) return [];

    return Object.entries(data["Time Series (Daily)"])
      .map(([date, values]) => ({
        date,
        close: parseFloat(values["4. close"]),
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  }, [data]);

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, width: "100%", height: "100%" }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" mb={2}>
          <Typography variant="h6">Stock Overview</Typography>
          <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel>Stock</InputLabel>
            <Select
              value={selectedStock}
              label="Stock"
              onChange={(e) => setSelectedStock(e.target.value)}
            >
              {STOCK_OPTIONS.map((stock) => (
                <MenuItem key={stock.value} value={stock.value}>
                  {stock.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {isLoading ? (
          <Box
            height={250}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <CircularProgress />
          </Box>
        ) : latestData ? (
          <>
            <Grid container spacing={2} mb={2}>
              <Grid item xs={6} md={3}>
                <Typography variant="subtitle2" color="text.secondary">
                  Open
                </Typography>
                <Typography variant="h6">
                  ${latestData.open.toFixed(2)}
                </Typography>
              </Grid>
              <Grid item xs={6} md={3}>
                <Typography variant="subtitle2" color="text.secondary">
                  High
                </Typography>
                <Typography variant="h6">
                  ${latestData.high.toFixed(2)}
                </Typography>
              </Grid>
              <Grid item xs={6} md={3}>
                <Typography variant="subtitle2" color="text.secondary">
                  Low
                </Typography>
                <Typography variant="h6">
                  ${latestData.low.toFixed(2)}
                </Typography>
              </Grid>
              <Grid item xs={6} md={3}>
                <Typography variant="subtitle2" color="text.secondary">
                  Close
                </Typography>
                <Typography variant="h6">
                  ${latestData.close.toFixed(2)}
                </Typography>
              </Grid>
            </Grid>

            <Box height={250}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 12 }}
                    minTickGap={15}
                  />
                  <YAxis domain={["dataMin", "dataMax"]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="close"
                    stroke="#1976d2"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </>
        ) : (
          <Box
            height={250}
            display="flex"
            justifyContent="center"
            alignItems="center"
            bgcolor="#f5f5f5"
            borderRadius={2}
          >
            <Typography variant="body2" color="text.secondary">
              Select a stock to view data
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default StockOverview;
