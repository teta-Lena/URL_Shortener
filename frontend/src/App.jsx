import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import UrlShortening from "./pages/UrlShortening";
import ProtectedRoute from "./components/ProtectedRoute";
import WelcomePage from "./pages/WelcomePage";
import SignUp from "./pages/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/newaccount" element={<SignUp />} />

        <Route
          path="/urlshortener"
          element={
            <ProtectedRoute>
              <UrlShortening />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
export default App;
