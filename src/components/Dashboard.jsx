import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getDashboardData } from "api/dashboard";

const Dashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboardData"],
    queryFn: getDashboardData,
  });

  console.log("data", data);

  return <Box>I'm Dashboard</Box>;
};

export default Dashboard;
