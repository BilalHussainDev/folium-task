import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import Dashboard from "pages/Dashboard";
import "./App.css";
import { store } from "./store";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Dashboard />
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
