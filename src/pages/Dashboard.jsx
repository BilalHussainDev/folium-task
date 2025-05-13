import React, { Suspense, useState, startTransition } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Button,
  Stack,
} from "@mui/material";

// Lazy-loaded components
const StockOverview = React.lazy(() => import("components/StockOverview"));
const HistoricalData = React.lazy(() => import("components/HistoricalData"));

const Dashboard = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    startTransition(() => {
      setRefreshKey((prev) => prev + 1);
    });
  };

  return (
    <Box p={3}>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4">Dashboard</Typography>
        <Button variant="contained" onClick={handleRefresh}>
          Refresh All
        </Button>
      </Stack>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          gap: 3,
        }}
      >
        <Suspense
          fallback={
            <Box
              height={300}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <CircularProgress />
            </Box>
          }
        >
          <Box key={`stock-${refreshKey}`}>
            <StockOverview />
          </Box>
        </Suspense>

        <Suspense
          fallback={
            <Box
              height={300}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <CircularProgress />
            </Box>
          }
        >
          <Box key={`historical-${refreshKey}`}>
            <HistoricalData />
          </Box>
        </Suspense>
      </Box>
    </Box>
  );
};

export default Dashboard;
