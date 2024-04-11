import * as Yup from "yup";

export const signupValidator = Yup.object({
  firstName: Yup.string().required("first name is required"),
  lastName: Yup.string().required("last name is required"),
  email: Yup.string().email().required("email is required"),
  password: Yup.string().min(8).required("password min length should be 8"),
  cpassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Passwords must match")
    .min(8)
    .required("confirm password is required"),
});
