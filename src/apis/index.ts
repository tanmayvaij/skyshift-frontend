import axios, { AxiosResponse } from "axios";

interface SecurityGroupRuleProps {
  from_port: number;
  to_port: number;
  protocol: string;
  cidr_blocks: string[];
}

// terraform code generation
interface TerraformCodeGenerationRequestProps {
  region: string;
  label: string;
  name: string;
  inbound_rules: SecurityGroupRuleProps[];
  outbound_rules: SecurityGroupRuleProps[];
  ami: string;
  instance_type: string;
  keypair: string;
  jenkins_node_name: string;
  jenkins_node_label: string;
}

interface TerraformCodeGenerationResponseProps {
  response: string;
  status: boolean;
}

// create user session
interface CreateUserSessionRequestProps {
  username: string;
  script: string;
}

interface CreateUserSessionResponseProps {
  SessionID: string;
}

// start user session
interface StartUserSessionRequestProps {
  username: string;
  session_id: string;
}

interface StartUserSessionResponseProps {
  code: number;
  Output: string;
}

// jenkins job creation
interface JenkinsJobCreationRequestProps {
  job_name: string;
  node_label: string;
  build_steps: string[];
}

interface JenkinsJobCreationResponseProps {
  message: string;
}

// jenkins build trigger
interface JenkinsBuildTriggerRequestProps {
  job_name: string;
}

interface JenkinsBuildTriggerResponseProps {
  code: 1;
  message: string;
}

interface SessionInfoRequestProps {
  username: string;
  session_id: string;
}

interface SessionInfoResponseProps {
  Output: string;
  code: 1;
  private_ip: string;
  public_ip: string;
}

const axiosInstance = axios.create({
  baseURL: "http://43.205.96.242:5000",
});

export const generateTerraformCode = async (
  data: TerraformCodeGenerationRequestProps
) => {
  try {
    const res = await axiosInstance.post<
      TerraformCodeGenerationRequestProps,
      AxiosResponse<TerraformCodeGenerationResponseProps>
    >("/generate_terraform_code/aws_instance", data);

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createUserSession = async (
  data: CreateUserSessionRequestProps
) => {
  try {
    const res = await axiosInstance.post<
      CreateUserSessionRequestProps,
      AxiosResponse<CreateUserSessionResponseProps>
    >("/user/create_session", data);

    return res.data;
  } catch (error) {
    throw error;
  }
};

export const startUserSession = async (data: StartUserSessionRequestProps) => {
  try {
    const res = await axiosInstance.post<
      StartUserSessionRequestProps,
      AxiosResponse<StartUserSessionResponseProps>
    >("/user/start_session", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const createJenkinsJob = async (
  data: JenkinsJobCreationRequestProps
) => {
  try {
    const res = await axiosInstance.post<
      JenkinsJobCreationRequestProps,
      AxiosResponse<JenkinsJobCreationResponseProps>
    >("/jenkins/create_job", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const triggerJenkinsBuild = async (
  data: JenkinsBuildTriggerRequestProps
) => {
  try {
    const res = await axiosInstance.post<
      JenkinsBuildTriggerRequestProps,
      AxiosResponse<JenkinsBuildTriggerResponseProps>
    >("/jenkins/trigger_build", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const sessionInfo = async (data: SessionInfoRequestProps) => {
  try {
    const res = await axiosInstance.post<
      SessionInfoRequestProps,
      AxiosResponse<SessionInfoResponseProps>
    >("/user/session_info", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};
