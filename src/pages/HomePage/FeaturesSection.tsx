interface FeatureCardProps {
  imageSrc: string;
  title: string;
  text: string;
}

const featureData: FeatureCardProps[] = [
    {
      imageSrc: "/deployment.jpg",
      title: "Automated Deployment Workflows",
      text: "SkyShift automates deployment workflows, ensuring reliable results across diverse environments.",
    },
    {
      imageSrc: "/support.jpg",
      title: "Support for Multiple Programming Languages",
      text: "SkyShift supports popular web development frameworks like Flask, Node.js, Django, and Flutter, accommodating various applications.",
    },
    {
      imageSrc: "/infrastructure.jpg",
      title: "Scalable and Flexible Infrastructure",
      text: "SkyShift leverages Terraform for scalable infrastructure provisioning, adapting seamlessly to diverse cloud platforms.",
    },
    {
      imageSrc: "/monitoring.jpg",
      title: "Real-time Monitoring and Insights",
      text: "SkyShift offers real-time visibility into deployment pipelines, enabling quick troubleshooting and incident resolution.",
    },
    {
      imageSrc: "/security.jpg",
      title: "Enhanced Security Measures",
      text: "SkyShift implements robust security measures, including code signing and vulnerability scanning, to safeguard applications.",
    },
    {
      imageSrc: "/uiux.jpg",
      title: "User-friendly Web Interface",
      text: "SkyShift features a user-friendly web interface built with React, offering intuitive project creation and monitoring capabilities.",
    },
  ];
  

const FeatureCard: React.FC<FeatureCardProps> = ({ imageSrc, text, title }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-white p-4 w-96 rounded-md overflow-hidden shadow-md">
      <img className="w-40 h-40 pb-2" src={imageSrc} />
      <h3 className="font-medium pb-4">{title}</h3>
      <p className="text-sm">{text}</p>
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <div className="flex items-center justify-center flex-col  py-10">
        <h2 className="text-blue-900 font-semibold text-5xl">Our Features</h2>
      <div className="grid grid-cols-3 gap-3 p-10">
        {featureData.map((props, id) => {
          return <FeatureCard key={id} {...props} />;
        })}
      </div>
    </div>
  );
};

export default FeaturesSection;
