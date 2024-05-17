import { PiCompassToolBold } from "react-icons/pi";
import {
  generateTerraformCode,
  createUserSession,
  startUserSession,
  createJenkinsJob,
  triggerJenkinsBuild,
  sessionInfo,
} from "../../apis";
import { useUserProfileAtom } from "../../recoil/atoms";
import { toast } from "react-toastify";
import { toastConfig } from "../../configs";
import { useState } from "react";
import { Watch } from "react-loader-spinner";

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
  const [profile] = useUserProfileAtom();

  console.log(profile);

  const projectDir = githubLink.split("/")[4].split(".")[0];

  const userProjectSlug = `${profile?.email.split("@")[0]}-${projectId.slice(
    0,
    10
  )}`;

  console.log(userProjectSlug);

  const [isDeploymentStarted, setIsDeploymentStarted] = useState(false);

  const [deploymentStatus, setDeplymentStatus] = useState<string[]>([]);

  const [isProjectDeployed, setISProjectDeployed] = useState(false);

  let sessionRes = {};

  const deployProject = () => {
    setIsDeploymentStarted(true);

    setDeplymentStatus((prev) => [...prev, "Generating terraform code..."]);

    generateTerraformCode({
      region: "ap-south-1",
      label: "my-project2",
      name: "my-project2",
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
          from_port: 5000,
          to_port: 5000,
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
          from_port: 8080,
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
      ami: "ami-03bb6d83c60fc5f7c",
      instance_type: "t2.micro",
      keypair: "terraform",
      jenkins_node_name: userProjectSlug,
      jenkins_node_label: userProjectSlug,
    })
      .then((res) => {
        console.log("Generate terraform code response", res);

        // toast.info("Generated terraform code", toastConfig)

        if (res?.status) {
          setDeplymentStatus((prev) => [...prev, "Creating user session..."]);

          createUserSession({ username: userProjectSlug, script: res.response })
            .then((res) => {
              console.log("Create user session response", res);

              // toast.info("Created user session", toastConfig)

              sessionRes = {
                session_id: res.SessionID,
                username: userProjectSlug,
              };

              setDeplymentStatus((prev) => [
                ...prev,
                "Starting user session...",
              ]);

              startUserSession({
                session_id: res.SessionID,
                username: userProjectSlug,
              })
                .then((res) => {
                  console.log("start user session response", res);

                  // toast.info("Starting user session", toastConfig)

                  setDeplymentStatus((prev) => [
                    ...prev,
                    "Creating jenkins job...",
                  ]);

                  createJenkinsJob({
                    job_name: userProjectSlug,
                    build_steps: [
                      "sudo apt update -y",
                      "sudo snap install docker",
                      `git clone ${githubLink}`,
                      `cd ./${projectDir}`,
                      `sudo docker build -t ${userProjectSlug} .`,
                      `sudo docker run -p 3000:3000 ${userProjectSlug}`,
                    ],
                    node_label: userProjectSlug,
                  })
                    .then((res) => {
                      console.log("Creating jenkins build response", res);

                      // toast.info("Creating jenkins build", toastConfig)

                      setDeplymentStatus((prev) => [
                        ...prev,
                        "Triggering jenkins build...",
                      ]);

                      triggerJenkinsBuild({ job_name: userProjectSlug })
                        .then((res) => {
                          console.log("Triggering jenkins build response", res);

                          // toast.info(
                          //   "Triggering jenkins build response",
                          //   toastConfig
                          // );

                          if (res?.code === 1) {
                            setDeplymentStatus((prev) => [
                              ...prev,
                              "Getting session info...",
                            ]);

                            sessionInfo(sessionRes)
                              .then((res) => {

                                setDeplymentStatus((prev) => [
                                  ...prev,
                                  "Doing security checks...",
                                ]);

                                console.log("Getting session response", res);

                                setTimeout(() => {
                                  setDeplymentStatus((prev) => [
                                    ...prev,
                                    `Live website link ${res.Output.split("public_ip")[1].match(/\d+\.\d+\.\d+\.\d+/)![0]}:3000`,
                                  ]);
                                  setIsDeploymentStarted(false);
                                  setISProjectDeployed(true)
                                }, 240000);
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                          }
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

        <div className="flex items-center justify-center flex-col">
          {isProjectDeployed ? (
            <button
              disabled
              className="flex space-x-3 items-center bg-green-500 mt-10 text-white font-medium rounded-md px-4 py-2"
            >
              Deployed
            </button>
          ) : (
            <>
              {isDeploymentStarted ? (
                <button
                  disabled
                  className="flex space-x-3 items-center bg-blue-500 mt-10 text-white font-medium rounded-md px-4 py-2"
                >
                  <Watch
                    visible={true}
                    height="20"
                    width="20"
                    radius="48"
                    color="white"
                  />
                  <span>Deploying...</span>
                </button>
              ) : (
                <button
                  onClick={deployProject}
                  className=" bg-blue-600 hover:bg-blue-700 mt-10 text-white font-medium rounded-md px-4 py-2"
                >
                  Deploy
                </button>
              )}
            </>
          )}

          {/* <p className="mt-4 flex items-center justify-between w-full">
            <span className="font-medium">Status:- </span>
            <span className="text-black text-sm">{deploymentStatus}</span>
          </p> */}
          <div className="text-white bg-black flex items-start flex-col border w-full pt-3 pb-3 px-3 mt-2 rounded-md h-28 overflow-y-auto">
            {deploymentStatus.map((log, id) => {
              return (
                <p className="text-xs" key={id}>
                  {`${id + 1} ${log}`}
                </p>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
