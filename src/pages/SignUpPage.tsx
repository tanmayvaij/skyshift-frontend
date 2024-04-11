import { SkyShiftInput } from "../components";
import axios from "axios";
import { useFormik } from "formik";
import { IoCaretBack } from "react-icons/io5";
import { toastConfig } from "../configs";
import { toast } from "react-toastify";
import { signupValidator } from "../validators";
import { useAuthAtom } from "../recoil/atoms";
import { Link, useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const [_, setAuth] = useAuthAtom();

  const navigate = useNavigate();

  const { errors, values, handleBlur, handleChange, handleSubmit } = useFormik({
    validateOnBlur: true,
    validateOnChange: false,
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      cpassword: "",
    },
    validationSchema: signupValidator,
    onSubmit: () => {
      toast.promise(
        () =>
          axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/sign-up`, values),
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
              return "Account created successfully";
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
          className="flex flex-col pr-10"
          onSubmit={handleSubmit}
          method="post"
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

          <h2 className="text-blue-700 font-semibold text-3xl py-6">Sign up</h2>

          <div className="flex-grow">
            <div className="gap-4 grid grid-cols-2">
              <SkyShiftInput
                type="text"
                label="Enter your first name"
                placeholder="Alex"
                value={values.firstName}
                onBlur={handleBlur}
                onChange={handleChange}
                name="firstName"
                errorMessage={errors.firstName}
              />
              <SkyShiftInput
                type="text"
                label="Enter your last name"
                placeholder="Carry"
                value={values.lastName}
                onBlur={handleBlur}
                onChange={handleChange}
                name="lastName"
                errorMessage={errors.lastName}
              />
              <SkyShiftInput
                type="email"
                label="Enter your email address"
                placeholder="example@email.com"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                name="email"
                errorMessage={errors.email}
              />
              <SkyShiftInput
                type="password"
                label="Set your password"
                placeholder="Password"
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                name="password"
                errorMessage={errors.password}
              />
              <SkyShiftInput
                type="password"
                label="Confirm your password"
                placeholder="Confirm password"
                value={values.cpassword}
                onBlur={handleBlur}
                onChange={handleChange}
                name="cpassword"
                errorMessage={errors.cpassword}
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 font-medium text-white rounded-xl p-3"
          >
            Let's Shift ✈
          </button>

          <h4 className="text-center text-sm pt-10">
            <span className="text-gray-500">Already have and account ? </span>
            <Link to="/login" className="font-medium">
              Log In
            </Link>
          </h4>
        </form>

        <img width={750} height={0} src="/signup-image.png" alt="" />
      </div>
    </div>
  );
};

export default SignUpPage;
