import * as Yup from "yup";

export const loginValidator = Yup.object({
  email: Yup.string().email().required("email is required"),
  password: Yup.string().required("password is required"),
});
