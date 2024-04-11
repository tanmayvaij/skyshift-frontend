import { SkyShiftInput } from "../components";
import { toastConfig } from "../configs";
import { useAuthAtom } from "../recoil/atoms";
import axios from "axios";
import { useFormik } from "formik";
import { IoCaretBack } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginValidator } from "../validators";

const LoginPage = () => {
  const [_, setAuth] = useAuthAtom();

  const navigate = useNavigate();

  const { errors, values, handleBlur, handleChange, handleSubmit } = useFormik({
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: loginValidator,
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: () => {
      toast.promise(
        () =>
          axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/sign-in`, values),
        {
          pending: "Please Wait",
          success: {
            render: ({ data }: any) => {
              localStorage.setItem(
                "authConfig",
                JSON.stringify({
                  isAuthenticated: true,
                  authToken: data.data.authToken,
                })
              );

              setAuth({
                isAuthenticated: true,
                authToken: data.data.authToken,
              });

              navigate("/");

              return "Logged in successfully";
            },
          },
          error: {
            render: ({ data }: any) => data.response.data.message,
          },
        },
        toastConfig
      );
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-sky-50">
      <div className="flex justify-between rounded-lg bg-white p-16 shadow-md flex-wrap">
        <form
          onSubmit={handleSubmit}
          method="post"
          className="flex flex-col pr-10 w-[30rem]"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img src="/logo.png" width={80} height={80} alt="" />
              <h2 className="font-bold text-3xl text-blue-700">SkyShift</h2>
            </div>

            <Link
              to="/"
              className="flex items-center border px-3 py-2 rounded-md space-x-2"
            >
              <IoCaretBack />
              <span>Back</span>
            </Link>
          </div>

          <h2 className="text-blue-700 font-semibold text-3xl py-6">Log In</h2>

          <div className="flex-grow">
            <div className="gap-4 grid grid-cols-1">
              <SkyShiftInput
                type="email"
                label="Enter your email address"
                placeholder="example@email.com"
                onChange={handleChange}
                onBlur={handleBlur}
                name="email"
                value={values.email}
                errorMessage={errors.email}
              />
              <SkyShiftInput
                type="password"
                label="Enter your password"
                placeholder="Password"
                onChange={handleChange}
                onBlur={handleBlur}
                name="password"
                value={values.password}
                errorMessage={errors.password}
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 font-medium text-white rounded-xl p-3"
          >
            Let's Shift ✈
          </button>

          <h4 className="text-center text-sm pt-10">
            <span className="text-gray-500">Don't have and account ? </span>
            <Link to="/signup" className="font-medium">
              Sign Up
            </Link>
          </h4>
        </form>

        <img width={750} height={0} src="/login-image.jpg" alt="" />
      </div>
    </div>
  );
};

export default LoginPage;
