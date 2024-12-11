import React from 'react'
import { Tilt } from 'react-tilt'
import { motion} from 'framer-motion';

import { styles } from '../styles';
import { services } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';
import { SectionWrapper } from '../hoc'
const ServiceCard = ({ index, title, icon}) => {
  return (
   <Tilt className="xs:w-[250px] w-full">
     <motion.div 
      variants={fadeIn("right", "spring", 0.5 *index, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
     >
      <div 
      options = {{
        max: 45,
        scale: 1,
        speed: 450
      }}
      className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
      >
        <img src={icon} alt={title}
        className='w-16 h-16 object-contain'/>
        <h3 className="text-white text-[20px] font-bold text-center">{title}</h3>
      </div>
     </motion.div>
   </Tilt>
  )
}
const About = () => {
  return (
    <>
    <motion.div variants={textVariant()}>
      <p className={styles.sectionSubText}>Introduction</p>
      <h2 className={styles.sectionHeadText}>Overview.</h2>
    </motion.div>
    <motion.p variants={fadeIn("", "", 0.1, 1)}
    className="mt-4 text-secondary text-[17px] 
    max-w-3xl leading-[30px]"
    >
        Welcome to Mutanx Technologies, where we transform visions into impactful digital solutions.
        We are a forward-focused technology company specializing in app development and cloud services, designed to empower startups and growing businesses. Our mission is to simplify your journey into the digital world by providing seamless development solutions and long-term support, enabling you to focus on what truly matters—achieving your goals.

        At Mutanx Technologies, we craft intuitive, scalable, and efficient applications tailored to your unique needs. In addition, our cloud services empower organizations to enhance their infrastructure and optimize performance. With six months of free maintenance support for every client, we ensure your solutions evolve with your business.
        Together, lets build powerful apps and scalable solutions that shape the future of your business.
    </motion.p>

    <div className='mt-20 flex flex-wrap gap-10'>
      {services.map((service, index) => (
        <ServiceCard key={service.title} index={index} {...service}/>
      ))}

    </div>
    </>
  )
}

export default SectionWrapper(About, "about")