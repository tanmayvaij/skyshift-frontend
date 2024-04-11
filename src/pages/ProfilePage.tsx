import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthAtom } from "../recoil/atoms";
import { Puff } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { toastConfig } from "../configs";
import { toast } from "react-toastify";

interface UserProfile {
  email: string;
  firstName: string;
  joinedOn: string;
  lastName: string;
  _id: string;
}

const ProfilePage = () => {
  const navigate = useNavigate();

  const [auth, setAuth] = useAuthAtom();

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const deleteAccount = () => {
    toast.promise(
      () =>
        axios.delete(`${import.meta.env.VITE_SERVER_URL}/user/delete-account`, {
          headers: { Authentication: auth.authToken },
        }),
      {
        pending: "Please Wait",
        success: {
          render: () => {
            localStorage.removeItem("authConfig");
            setAuth({ isAuthenticated: false, authToken: "" });
            navigate("/");
            return "Account deleted successfully";
          },
        },
        error: {
          render: ({ data }: any) => data.response.data.message,
        },
      },
      toastConfig
    );
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/user/get-profile`, {
        headers: { Authentication: auth.authToken },
      })
      .then((profile) => {
        setUserProfile(profile.data.userProfile);
        console.log(profile);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (userProfile === null) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <Puff visible={true} height="100" width="100" color="dodgerblue" />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-80px)] flex-col">
      <div className="flex items-center justify-center flex-col border rounded-md w-96 p-5 shadow-sm">
        <img src="user.jpg" alt="" className="w-60" />
        <p className="font-medium text-3xl pb-6">
          {userProfile?.firstName} {userProfile?.lastName}
        </p>
        <div className="flex items-center justify-between w-full p-2">
          <span className="font-medium text-gray-600">Email</span>
          <span className="text-sm text-gray-600">{userProfile?.email}</span>
        </div>
        <button
          onClick={deleteAccount}
          className="w-full bg-red-500 hover:bg-red-600 rounded-md text-white p-3 mt-40 font-medium"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
