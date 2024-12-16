import { motion } from "framer-motion";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";
import { StarsCanvas } from "./canvas";

const Hero = () => {
  return (
    <section className={`relative w-full h-screen mx-auto flex items-center justify-center`}>
      <StarsCanvas />
      <div
        className={`absolute inset-0 flex flex-col items-center justify-center text-center max-w-7xl mx-auto ${styles.paddingX}`}
      >
        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            Mutanx <span className='text-[#915EFF]'>Technologies</span>
          </h1>
          <p className={`${styles.heroSubText} mt-4 text-white-100`}>
            Transforming Visions into Digital Reality.
          </p>
        </div>
      </div>

      {/* <ComputersCanvas /> */}
      {/* <StarsCanvas /> */}

      {/* <div className='absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div> */}
    </section>
  );
};

export default Hero;
 