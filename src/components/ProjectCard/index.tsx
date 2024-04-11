import { PiCompassToolBold } from "react-icons/pi";
import {
  generateTerraformCode,
  createUserSession,
  startUserSession,
  createJenkinsJob,
  triggerJenkinsBuild,
} from "../../apis";

interface ProjectCardProps {
  projectId: string;
  projectName: string;
  githubLink: string;
  githubBranch: string;
}

const terraformCodeGenerationConfig = {
  region: "ap-south-1",
  ami: "ami-03bb6d83c60fc5f7c",
  inbound_rules: [
    {
      from_port: 80,
      to_port: 80,
      protocol: "tcp",
      cidr_blocks: ["0.0.0.0/0"],
    },
    {
      from_port: 22,
      to_port: 22,
      protocol: "tcp",
      cidr_blocks: ["0.0.0.0/0"],
    },
  ],
  instance_type: "t2.micro",
  outbound_rules: [
    {
      from_port: 80,
      to_port: 80,
      protocol: "tcp",
      cidr_blocks: ["0.0.0.0/0"],
    },
    {
      from_port: 22,
      to_port: 22,
      protocol: "tcp",
      cidr_blocks: ["0.0.0.0/0"],
    },
  ],
  jenkins_node_label: "premchand",
  jenkins_node_name: "premchand",
  keypair: "shreyash_keypair2",
  label: "premchand",
  name: "premchand",
};

const ProjectCard: React.FC<ProjectCardProps> = ({
  projectId,
  projectName,
  githubBranch,
  githubLink,
}) => {
  const deployProject = () => {
    alert("generating terraform code")
    generateTerraformCode(terraformCodeGenerationConfig)
      .then((res) => {
        
        if (res?.status) {
          alert("Creating user session")
          createUserSession({ username: "premchand", script: res.response })
            .then((res) => {

              alert("Starting user session")
              startUserSession({
                session_id: res.SessionID,
                username: "premchand",
              })
                .then(() => {
                  
                  alert("creating jenkins build")
                  createJenkinsJob({
                    job_name: "premchand",
                    build_steps: [
                      "sudo su",
                      "apt update -y",
                      "apt install nodejs npm -y",
                      "git clone https://github.com/tanmayvaij/skyshift-test-app.git",
                      "cd ./skyshift-test-app",
                      "npm install",
                      "npm start",
                    ],
                    node_label: "premchand",
                  })
                    .then(() => {

                      alert("triggering jenkins build")
                      triggerJenkinsBuild({ job_name: "premchand" })
                        .then((res) => {
                          console.log(res);
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <div className="border rounded-md overflow-hidden shadow-sm">
      <p className="flex items-center justify-center space-x-2 p-2 bg-gray-900">
        <PiCompassToolBold className="text-xl text-white" />
        <span className="text-xs text-gray-300">{projectId}</span>
      </p>
      <h3 className="text-xl text-center border-b font-semibold text-blue-600 p-4">
        {projectName}
      </h3>
      <div className="px-4 pb-10 pt-4 text-gray-500">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Github Link</span>
          <span className="text-xs ">{githubLink}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Github Branch</span>
          <span className="text-xs">{githubBranch}</span>
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={deployProject}
            className=" bg-blue-600 hover:bg-blue-700 mt-10 text-white font-medium rounded-md px-4 py-2"
          >
            Deploy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
