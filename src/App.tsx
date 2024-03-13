import { Box } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import ResultsPage from "./pages/Results";
import NewUserPage from "./pages/NewUser";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Box sx={{ height: "100vh", width: "100vw" }}>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/results"
            element={
              <ProtectedRoute>
                <ResultsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/new-user"
            element={
              <ProtectedRoute>
                <NewUserPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
