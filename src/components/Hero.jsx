import React, { useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { services } from "../constants";
import { StarsCanvas } from "./canvas";

const ServiceCard = ({ title }) => {
  return (
    <motion.div
      className="xs:w-[250px] w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card flex-shrink-0"
    >
      <div className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[120px] flex justify-evenly items-center flex-col">
        <h3 className="text-white text-[20px] font-bold text-center">
          {title}
        </h3>
      </div>
    </motion.div>
  );
};

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % services.length); // Loop back to first card
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + services.length) % services.length); // Loop back to last card
  };

  return (
    <section
      className={`relative w-full h-screen mx-auto flex items-center justify-center`}
    >
      <StarsCanvas />
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center text-center max-w-7xl mx-auto ${styles.paddingX}`}
      >
        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Mutanx <span className="text-[#915EFF]">Technologies</span>
          </h1>
          <p className={`${styles.heroSubText} mt-4 text-white-100`}>
            Transforming Visions into Digital Reality.
          </p>
          <div className="mt-20 w-full flex flex-col items-center relative">
            {/* Mobile view: Sliding cards with navigation */}
            <div className="hidden sm:flex w-full justify-center">
              <div className="mt-20 flex flex-wrap gap-10">
                {services.map((service, index) => (
                  <ServiceCard key={service.title} index={index} {...service} />
                ))}
              </div>
            </div>

            <div className="flex sm:hidden justify-center w-full">
              {/* Mobile view container */}
              <motion.div
                className="overflow-hidden w-[250px] flex justify-center items-center relative"
              >
                <motion.div
                  key={currentIndex}
                  initial={{ x: "100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", stiffness: 120 }}
                  className="flex"
                >
                  <ServiceCard {...services[currentIndex]} />
                </motion.div>
              </motion.div>

              {/* Navigation buttons for mobile */}
              <button
                className="absolute left-[-5px] top-[40px] bg-[#915EFF] text-white p-2 rounded-full"
                onClick={handlePrevious}
              >
                &#8592;
              </button>
              <button
                className="absolute right-[-5px] top-[40px] bg-[#915EFF] text-white p-2 rounded-full"
                onClick={handleNext}
              >
                &#8594;
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
