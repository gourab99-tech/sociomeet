import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route,
} from "react-router-dom";
import HomePage from "./pages/home";
import LoginPage from "./pages/loginPage";
import ProfilePage from "./pages/profilePage";
import Navbar from "./pages/navbar";

const App = () => {
  return (
    <div className="app">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
