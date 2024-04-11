import axios from "axios";
import { useAuthAtom } from "../recoil/atoms";
import { useEffect, useState } from "react";
import ProjectCard from "../components/ProjectCard";
import { Puff } from "react-loader-spinner";

interface UserProject {
  _id: string;
  userId: string;
  projectName: string;
  githubLink: string;
  githubBranch: string;
  buildCommand: string;
  startCommand: string;
}

const DashBoardPage = () => {
  const [auth] = useAuthAtom();

  const [userProjects, setUserProjects] = useState<UserProject[] | null>(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_SERVER_URL}/project/get`, {
        headers: { Authentication: auth.authToken },
      })
      .then((res) => {
        setUserProjects(res.data.projects);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (userProjects === null) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
        <Puff visible={true} height="100" width="100" color="dodgerblue" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-center p-8 flex-col">
        <h2 className="font-medium text-4xl text-gray-800">Your Projects</h2>
        <img src="project.jpg" className="w-64" alt="" />
      </div>
      {userProjects.length !== 0 ? (
        <div className="grid grid-cols-3 gap-3 mx-16">
          {userProjects?.map((project) => {
            return (
              <ProjectCard
                key={project._id}
                projectId={project._id}
                projectName={project.projectName}
                githubBranch={project.githubBranch}
                githubLink={project.githubLink}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center h-80">
            <p className="text-lg">No projects to deployed yet</p>
        </div>
      )}
    </div>
  );
};

export default DashBoardPage;
