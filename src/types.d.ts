interface SkyShiftErrorMessageProps {
  Error: string;
}

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

interface TerraformCodeGenerationErrorProps {
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
  build_steps: string;
}

interface JenkinsJobCreationResponseProps {
  message: string;
}

// jenkins build trigger
interface JenkinsBuildTriggerRequestProps {
  job_name: string;
}

interface JenkinsBuildTriggerResponseProps {
  message: string;
}
