import React from "react";
import { motion } from "framer-motion";
import { InlineWidget } from "react-calendly";

import { styles } from "../styles";
import { SectionWrapper } from "../hoc";
import { textVariant } from "../utils/motion";

const Contact = () => {
  return (
    <div className="mt-12 bg-black-100 rounded-[20px]">
      {/* Header Section */}
      <div className={`bg-tertiary rounded-2xl ${styles.padding} min-h-[300px]`}>
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>Contact us</p>
          <h2 className={styles.sectionHeadText}>Book a free call.</h2>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className={`-mt-20 pb-14 ${styles.paddingX} flex flex-wrap gap-7`}>
        {/* Information Section */}
        <motion.div className="flex-1 sm:flex-[0.5] bg-black-100 p-6 sm:p-6 rounded-2xl text-white">
          <h3 className="text-[20px] sm:text-[24px] font-bold mb-4">
            Let’s see if we can help you scale
          </h3>
          <p className="text-[14px] sm:text-[16px] mb-4">
            Unlock your business’s potential with the right digital strategy.
            Book a call today, and let’s create a solid plan to ensure your
            business’s future success!
          </p>
          <p className="text-[22px] sm:text-[22px] font-bold mb-2">
            You are a good fit if:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li className="text-[14px] sm:text-[16px]">
              You’re ready to enhance your brand with a digital transformation
              strategy.
            </li>
            <li className="text-[14px] sm:text-[16px]">
              You need expert guidance to turn your business ideas into reality.
            </li>
            <li className="text-[14px] sm:text-[16px]">
              You want to stay ahead in your industry by leveraging cutting-edge
              technologies.
            </li>
          </ul>
          <p className="text-[20px] sm:text-[22px] font-semibold mb-2">
            Schedule your free 30-minute consultation
          </p>
          <p className="text-[12px] sm:text-[14px] italic">Founder, Mutanx Technologies</p>
        </motion.div>

        {/* Desktop Widget Section */}
        <motion.div className="hidden sm:block flex-1 sm:flex-[0.5] bg-black-100 p-6 sm:p-6 rounded-2xl">
          <InlineWidget
            url="https://calendly.com/mraashir3/30min?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=110d25&text_color=aca3de&primary_color=8b80c4&back=1&month=2024-12"
            styles={{ height: "813px", width: "100%" }}
          />
        </motion.div>

        {/* Mobile Widget Section */}
        <motion.div className="block md:hidden bg-black-100 p-1 rounded-2xl w-full">
          <InlineWidget
            url="https://calendly.com/mraashir3/30min?hide_landing_page_details=1&hide_gdpr_banner=1&background_color=110d25&text_color=aca3de&primary_color=8b80c4&back=1&month=2024-12"
            styles={{ height: "930px", width: "100%" }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
