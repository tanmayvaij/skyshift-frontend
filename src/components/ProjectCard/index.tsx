import { PiCompassToolBold } from "react-icons/pi";
import {
  generateTerraformCode,
  createUserSession,
  startUserSession,
  createJenkinsJob,
  triggerJenkinsBuild,
} from "../../apis";
import { useUserProfileAtom } from "../../recoil/atoms";
import { toast } from "react-toastify";
import { toastConfig } from "../../configs";

interface ProjectCardProps {
  projectId: string;
  projectName: string;
  githubLink: string;
  githubBranch: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  projectId,
  projectName,
  githubBranch,
  githubLink,
}) => {

  const [ profile ] = useUserProfileAtom()

  console.log(profile);
  

  const userProjectSlug = `${profile?.email.split("@")[0]}-${projectId.slice(0, 5)}`

  console.log(userProjectSlug);
  

  const deployProject = () => {
    generateTerraformCode({
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
        {
          from_port: 3000,
          to_port: 3000,
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
          from_port: 443,
          to_port: 443,
          protocol: "tcp",
          cidr_blocks: ["0.0.0.0/0"],
        },
        {
          from_port: 80,
          to_port: 8080,
          protocol: "tcp",
          cidr_blocks: ["0.0.0.0/0"],
        },
        {
          from_port: 5000,
          to_port: 5000,
          protocol: "tcp",
          cidr_blocks: ["0.0.0.0/0"],
        },
        {
          from_port: 50000,
          to_port: 50000,
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
      jenkins_node_label: userProjectSlug,
      jenkins_node_name: userProjectSlug,
      keypair: "shreyash_keypair2",
      label: userProjectSlug,
      name: userProjectSlug,
    })
      .then((res) => {
        console.log("Generate terraform code response", res);

        toast.info("Generated terraform code", toastConfig)

        if (res?.status) {
          createUserSession({ username: userProjectSlug, script: res.response })
            .then((res) => {
              console.log("Create user session response", res);

              toast.info("Created user session", toastConfig)

              startUserSession({
                session_id: res.SessionID,
                username: userProjectSlug,
              })
                .then((res) => {
                  console.log("start user session response", res);

                  createJenkinsJob({
                    job_name: userProjectSlug,
                    build_steps: [
                      "sudo apt update -y",
                      "sudo apt install nodejs npm -y",
                      "git clone https://github.com/tanmayvaij/skyshift-test-app.git",
                      "cd ./skyshift-test-app",
                      "npm install",
                      "npm install -g serve",
                      "npm run build",
                      "serve ./dist/"
                    ],
                    node_label: userProjectSlug,
                  })
                    .then((res) => {
                      console.log("Creating jenkins build response", res);

                      triggerJenkinsBuild({ job_name: userProjectSlug })
                        .then((res) => {
                          console.log("Triggering jenkins build response", res);
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
