import { Link, useNavigate, useLocation } from "react-router-dom";

const AppHeader = () => {
  const navigate = useNavigate();
  const currentPath = useLocation().pathname;
  const authToken = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  const handleUserLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  const isAuthenticationPage = currentPath === "/" || currentPath === "/signup";

  return (
    <header className="header bg-teal-700 text-white shadow-lg">
      <nav className="navigation container mx-auto flex items-center justify-between py-4 px-6">
        {/* App Branding */}
        <div className="branding text-2xl font-extrabold">
          <Link
            to="/"
            className="brand-link text-teal-200 hover:text-teal-100 transition"
          >
            VideoShare
          </Link>
        </div>

        {authToken && !isAuthenticationPage && (
          <div className="user-actions">
            <button
              onClick={handleUserLogout}
              className="logout-btn bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 transition"
            >
              Logout
            </button>
          </div>
        )}
      </nav>
    </header>
  );
};

export default AppHeader;
