import * as Yup from "yup";

export const projectValidator = Yup.object({
  projectName: Yup.string().required("Project name is required"),
  githubLink: Yup.string().required("Github repo link is required"),
  branchName: Yup.string().required("Github branch name is required"),
  buildCommand: Yup.string().optional(),
  startCommand: Yup.string().required("Project start command is required"),
  projectLanguage: Yup.string().required("Project language is required")
});
