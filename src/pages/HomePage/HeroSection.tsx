interface WordHighlighterProps {
  children: string;
}

const WordHighlighter: React.FC<WordHighlighterProps> = ({ children }) => {
  return (
    <span className="font-medium text-white bg-pink-600 pb-[3px] px-[5px] rounded-md">
      {children}
    </span>
  );
};

const HeroSection = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
      <div className="flex items-center justify-center space-x-20 max-w-[1200px]">
        <div className="space-y-8">
          <h1 className="text-6xl font-semibold text-blue-900">
            Elevating codes to cloud Horizon
          </h1>

          <p className="text-gray-800 ">
            As we are experiencing the{" "}
            <WordHighlighter>technical revolution</WordHighlighter> , In the
            field of software development the three most important factors are{" "}
            <WordHighlighter>speed</WordHighlighter> ,{" "}
            <WordHighlighter>efficiency</WordHighlighter> , and{" "}
            <WordHighlighter>affordability</WordHighlighter> . However,
            traditional deployment techniques frequently find it difficult to
            keep up, which interferes with creativity, agility and innovation.
          </p>

          <div className="space-x-3">
            <button className="text-lg border text-gray-800 font-medium px-8 py-4 rounded-xl">
              Learn More 📚
            </button>
            <button className="text-lg bg-blue-700 text-white font-medium px-8 py-4 rounded-xl">
              Try Now 🚀
            </button>
          </div>
        </div>

        <img
          src="/img3.png"
          height={600}
          width={600}
          alt="hero-section-illustration"
          id="hero-image"
          className="relative"
        />
      </div>
    </div>
  );
};

export default HeroSection;
