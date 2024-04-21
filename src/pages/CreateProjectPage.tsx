import { SkyShiftInput } from "../components";
import { toastConfig } from "../configs";
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthAtom } from "../recoil/atoms";

const CreateProjectPage = () => {
  const [auth] = useAuthAtom();

  const navigate = useNavigate();

  const { errors, values, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      projectName: "",
      githubLink: "",
      githubBranch: "",
      buildCommand: "",
      startCommand: "",
      projectLanguage: ""
    },
    onSubmit: () => {
      toast.promise(
        () =>
          axios.post(
            `${import.meta.env.VITE_SERVER_URL}/project/create`,
            values,
            { headers: { Authentication: auth.authToken } }
          ),
        {
          pending: "Please Wait",
          success: {
            render: ({ data }: any) => {
              navigate("/");
              return data.data.message;
            },
          },
          error: {
            render: ({ data }: any) => {
              return data.response.data.message;
            },
          },
        },
        toastConfig
      );
    },
  });

  return (
    <div className="flex items-center justify-center space-x-16 min-h-[calc(100vh-80px)]">
      <img src="createproject.jpg" className="w-[30rem]" alt="" />
      <form
        onSubmit={handleSubmit}
        className="grid items-center grid-cols-1 space-y-5 mt-10 w-[500px]"
      >
        <SkyShiftInput
          type="text"
          placeholder="Project name"
          name="projectName"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.projectName}
          errorMessage={errors.projectName}
          label="Enter project name"
        />
        <SkyShiftInput
          type="text"
          placeholder="Github link"
          name="githubLink"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.githubLink}
          errorMessage={errors.githubLink}
          label="Enter project's github link"
        />
        <SkyShiftInput
          type="text"
          placeholder="Github branch"
          name="githubBranch"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.githubBranch}
          errorMessage={errors.githubBranch}
          label="Enter your github branch"
        />
        <SkyShiftInput
          type="text"
          placeholder="Build command"
          name="buildCommand"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.buildCommand}
          errorMessage={errors.buildCommand}
          label="Enter the build command"
        />
        <SkyShiftInput
          type="text"
          placeholder="Start command"
          name="startCommand"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.startCommand}
          errorMessage={errors.startCommand}
          label="Enter the start command"
        />

        <SkyShiftInput
          type="text"
          placeholder="project Language"
          name="projectLanguage"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.projectLanguage}
          errorMessage={errors.projectLanguage}
          label="Enter your project language"
        />

        <button
          type="submit"
          className="bg-blue-600 font-medium text-white rounded-xl p-3 hover:bg-blue-800"
        >
          Create
        </button>
      </form>
    </div>
  );
};

export default CreateProjectPage;
