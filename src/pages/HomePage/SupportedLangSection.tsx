interface LangCardProps {
  imageSrc: string;
  title: string;
}

const langData: LangCardProps[] = [
  {
    imageSrc: "/python.png",
    title: "Python",
  },
  {
    imageSrc: "/nodejs.png",
    title: "NodeJS",
  },
  {
    imageSrc: "/ruby.png",
    title: "Ruby",
  },
  {
    imageSrc: "/java.png",
    title: "Java",
  },
  {
    imageSrc: "/php.png",
    title: "PHP",
  },
  {
    imageSrc: "/golang.png",
    title: "Golang",
  },
];

const LangCard: React.FC<LangCardProps> = ({ imageSrc, title }) => {
  return (
    <div className="flex items-center justify-center flex-col">
      <img className="w-24" src={imageSrc} />
      <p className="font-medium text-blue-900 p-4">{title}</p>
    </div>
  );
};

const SupportedLangSection = () => {
  return (
    <div className="flex items-center justify-center py-14">
      <div className="flex items-center justify-center flex-col">
        <h2 className="text-blue-900 font-semibold text-5xl w-[900px] text-center">
          Unleash Your Potential with Our Supported Programming Languages
        </h2>
        <div className="grid grid-cols-3 p-14 gap-20">
          {
            langData.map((props, id) => {
                return <LangCard {...props} key={id} />
            })
          }
        </div>
      </div>
    </div>
  );
};

export default SupportedLangSection;
