import { authenticatedNavLinkData, navLinkData } from "../../data/index";
import NavLink from "./NavLink";
import { useAuthAtom } from "../../recoil/atoms";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [auth, setAuth] = useAuthAtom();

  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("authConfig")
    setAuth({
      isAuthenticated: false,
      authToken: "",
    });
    navigate("/");
  };

  const logoSize = 80;

  const path = useLocation().pathname;

  if (path === "/signup" || path === "/login") return null;

  return (
    <div className="flex px-10 items-center justify-between shadow">
      <Link to="/" className="space-x-3 flex items-center">
        <img
          width={logoSize}
          height={logoSize}
          src="/logo.png"
          alt="startup-logo"
        />
        <h2 className="text-2xl text-blue-600 font-bold">SkyShift</h2>
      </Link>

      <div className="space-x-3">
        {!auth.isAuthenticated
          ? navLinkData.map((props, id) => <NavLink key={id} {...props} />)
          : authenticatedNavLinkData.map((props, id) => (
              <NavLink key={id} {...props} />
            ))}
      </div>

      {!auth.isAuthenticated ? (
        <div className="space-x-2">
          <Link
            to="/login"
            className="font-medium text-gray-800 rounded-xl hover:bg-gray-100 px-5 py-3"
          >
            Log in
          </Link>
          <Link
            to="/signup"
            className="bg-blue-600 text-white rounded-xl px-5 py-3 font-medium hover:bg-blue-800"
          >
            Sign up
          </Link>
        </div>
      ) : (
        <button
          onClick={logout}
          className="bg-blue-600 text-white rounded-xl px-5 py-2 font-medium hover:bg-blue-800"
        >
          Log out
        </button>
      )}
    </div>
  );
};
