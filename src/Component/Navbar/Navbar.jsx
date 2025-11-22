import { useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";

export default function Navbar() {
  const { user, logOut, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  console.log(user);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        console.log("User logged out successfully");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Logout failed:", error);
      });
  };

  const links = (
    <div className="flex gap-3">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/PMSTasks">PMSTasks</NavLink>
      <NavLink to="/dashboard">Dashboard</NavLink>
    </div>
  );

  if (loading) return null;

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      <div className="navbar-start">
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
          >
            {links}
          </ul>
        </div>

        <button onClick={()=>navigate('/')} className="btn btn-ghost text-xl">
          SRS
        </button>
      </div>

      {/* Desktop Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end flex items-center gap-2">
        {user ? (
          <div className="flex items-center gap-2">
            {/* User Photo */}
            <img
              src={
                user.photoURL ||
                "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
              }
              alt={user.displayName || "User Avatar"}
              className="w-8 h-8 rounded-full object-cover"
              onError={(e) =>
                (e.currentTarget.src =
                  "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y")
              }
            />
            {/* User Name */}
            {user.displayName && (
              <span className="font-medium text-gray-700">
                {user.displayName}
              </span>
            )}
            <button onClick={handleLogOut} className="btn">
              Log Out
            </button>
          </div>
        ) : (
          <button onClick={() => navigate("/login")} className="btn">
            Login
          </button>
        )}
      </div>
    </div>
  );
}
