import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Videos from "./pages/Videos";
import UploadVideo from "./pages/UploadVideo";
import PrivateRoute from "./utils/PrivateRoute";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Router>
        <Header />
        <main className="flex-1 bg-gray-100">
          {/* Removed unnecessary centering styles */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected Routes */}
            <Route
              path="/videos"
              element={
                <PrivateRoute allowedRoles={["consumer", "creator"]}>
                  <Videos />
                </PrivateRoute>
              }
            />
            <Route
              path="/videos/upload"
              element={
                <PrivateRoute allowedRoles={["creator"]}>
                  <UploadVideo />
                </PrivateRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
