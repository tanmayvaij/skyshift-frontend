import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navbar } from "./components";
import HomePage from "./pages/HomePage";
import { useAuthAtom, useUserProfileAtom } from "./recoil/atoms";
import LoginPage from "./pages/LoginPage";
import SignUp from "./pages/SignUpPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DashBoardPage from "./pages/DashBoardPage";
import CreateProjectPage from "./pages/CreateProjectPage";
import { useEffect, useState } from "react";
import ProfilePage from "./pages/ProfilePage";
import { Puff } from "react-loader-spinner";

const App = () => {
  const [auth, setAuth] = useAuthAtom();
  const [_, setProfile] = useUserProfileAtom();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authConfig = localStorage.getItem("authConfig");
    if (authConfig) setAuth(JSON.parse(authConfig));

    const userProfile = localStorage.getItem("userProfile");
    if (userProfile) setProfile(JSON.parse(userProfile));

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <Puff visible={true} height="100" width="100" color="dodgerblue" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <ToastContainer />
      <Navbar />
      {auth.isAuthenticated ? (
        <Routes>
          <Route path="/" element={<DashBoardPage />} />
          <Route path="/create-project" element={<CreateProjectPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;
