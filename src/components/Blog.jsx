// import React, { useState } from 'react';
// import { Tilt } from 'react-tilt';
// import { motion } from 'framer-motion';
// import ReactMarkdown from 'react-markdown';
// import { styles } from '../styles';
// import { fadeIn, textVariant } from '../utils/motion';
// import { SectionWrapper } from '../hoc';

// const blogs = [
//   { title: 'Blog 1', markdownFile: 'blog1.md' },
//   { title: 'Blog 2', markdownFile: 'blog2.md' },
//   { title: 'Blog 3', markdownFile: 'blog3.md' },
//   { title: 'Blog 4', markdownFile: 'blog4.md' },
//   { title: 'Blog 5', markdownFile: 'blog5.md' },
// ];

// const ServiceCard = ({ title, onClick }) => {
//   return (
//     <div
//       className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card cursor-pointer'
//       onClick={onClick}>
//       <div
//         className='bg-tertiary h-[300px] rounded-[20px] py-5 px-12 min-h-[150px] flex justify-evenly items-center flex-col'>
//         <h3 className="text-white text-[20px] font-bold text-center">{title}</h3>
//       </div>
//     </div>
//   );
// };

// const Blog = () => {
//   const [selectedMarkdown, setSelectedMarkdown] = useState(null);

//   const loadMarkdown = async (fileName) => {
//     const response = await fetch(`../assets/markdown/${fileName}`);
//     const text = await response.text();
//     setSelectedMarkdown(text);
//   };

//   return (
//     <div className="flex flex-col items-center">
//       <motion.div variants={textVariant()}>
//         <h2 className={styles.sectionHeadText}>Blog</h2>
//       </motion.div>

//       {!selectedMarkdown ? (
//         <div className="flex flex-wrap gap-6 mt-8 justify-center">
//           {blogs.map((blog, index) => (
//             <ServiceCard
//               key={index}
//               title={blog.title}
//               onClick={() => loadMarkdown(blog.markdownFile)}
//             />
//           ))}
//         </div>
//       ) : (
//         <div className="mt-8 max-w-3xl w-full p-4 bg-gray-100 rounded-lg shadow-lg">
//           <ReactMarkdown className="text-secondary text-[17px] leading-[30px]">
//             {selectedMarkdown}
//           </ReactMarkdown>
//           <button
//             onClick={() => setSelectedMarkdown(null)}
//             className="mt-4 p-2 bg-blue-500 text-white rounded">
//             Back to Blogs
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SectionWrapper(Blog, "blog");
import React, { useRef, useState, useEffect,form } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { github } from '../assets';
import { SectionWrapper } from '../hoc';
import { Blogs } from '../constants';
import { fadeIn, textVariant } from '../utils/motion';

const BlogCard = React.forwardRef(({ index, name, description, tags, image }, ref) => {
  const navigate = useNavigate();

  const handleLearnMore = () => {
    navigate(`/post/${name}`);
  };

  return (
    <motion.div
      ref={ref}
      className="bg-tertiary p-5 rounded-2xl w-full flex flex-col md:flex-row"
      // variants={fadeIn("up", "spring", index * 0.5, 0.75)}
    >
      <div className="w-full md:w-1/3 h-auto relative">
        <img src={image} alt="project_image" className="object-cover rounded-xl" />
      </div>
      <div className="flex flex-col justify-center ml-0 mt-4 md:ml-8 md:mt-0">
        <h3 className="text-white font-bold text-[24px]">{name}</h3>
        <p className="text-secondary text-[14px] my-2">{description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {tags.map((tag) => (
            <span key={`${name}-${tag.name}`} className={`text-[14px] ${tag.color}`}>
              #{tag.name}
            </span>
          ))}
        </div>
        <button
          onClick={handleLearnMore}
          className="ml-0 mt-4 bg-primary py-4 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
        >
          Learn More &rarr;
        </button>
      </div>
    </motion.div>
  );
});

const TableOfContents = ({ blogs, refs }) => {
  const handleClick = (index) => {
    refs[index]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-[250px] hidden md:block rounded-xl bg-tertiary p-6 h-screen sticky top-0 overflow-auto">
      <h3 className="text-white font-bold mb-6 text-center">Table of Contents</h3>
      <ul className="space-y-4">
        {blogs.map((blog, index) => (
          <li
            key={blog.name}
            className="text-secondary text-[16px] cursor-pointer hover:underline"
            onClick={() => handleClick(index)}
          >
            {blog.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

// const FilterBlogs = ({refs }) => {
//   const handleClick = (index) => {
//     refs[index]?.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   return (
//     <div className="w-[250px] hidden md:block rounded-xl bg-tertiary p-5 sticky top-0 ">
//       <h3 className="text-white font-bold mb-6 text-center">Filter</h3>
      
//     </div>
//   );
// };
const Blog = () => {
  const refs = Blogs.map(() => useRef(null));
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState(Blogs);
  const [suggestions, setSuggestions] = useState([]);
  const suggestionRef = useRef(null);

  useEffect(() => {
    const updatedBlogs = searchTerm.trim()
      ? Blogs.filter((blog) =>
          blog.tags.some((tag) => tag.name.toLowerCase().includes(searchTerm.toLowerCase()))
        )
      : Blogs;

    setFilteredBlogs(updatedBlogs);
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    const allTags = Blogs.flatMap((blog) => blog.tags.map((tag) => tag.name));
    const uniqueTags = [...new Set(allTags)];
    setSuggestions(
      uniqueTags.filter((tag) => tag.toLowerCase().includes(value.toLowerCase())).slice(0, 5)
    );
  };

  return (
    <>
      {/* Heading and Filter Form */}
      <motion.div className="flex flex-col sm:flex-row justify-between items-center sm:items-start">
        <h2 className={`${styles.sectionHeadText} text-center sm:text-left`}>Blogs</h2>
        <form ref={suggestionRef} className="relative mt-3 sm:mt-0 sm:ml-4">
          <input
            className="bg-primary border-white border-2 rounded-xl p-2 placeholder-white w-[200px] sm:w-[250px] text-sm text-white focus:outline-none"
            placeholder="Filter by tags"
            value={searchTerm}
            onChange={handleInputChange}
          />
          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="absolute top-full left-0 bg-white text-black rounded-lg shadow-md mt-2 w-full z-10">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => {
                    setSearchTerm(suggestion);
                    setSuggestions([]); // Hide suggestions on selection
                  }}
                >
                  {suggestion}
                </div>
              ))}
            </div>
          )}
        </form>
      </motion.div>

      {/* Introductory Text */}
      <div className="w-full flex">
        <motion.p
          // variants={fadeIn("", "", 0.1, 1)}
          className="mt-3 text-secondary text-[17px] max-w-7xl leading-[30px]"
        >
          Welcome to the official blog of Mutanx Technologies! Our platform is dedicated to sharing
          valuable insights, industry trends, and updates about app development, cloud services, and
          technology solutions tailored to help startups and established businesses thrive.
        </motion.p>
      </div>

      {/* Blog List Section */}
      <div className="mt-14 flex flex-col md:flex-row w-full h-auto">
        {/* Table of Contents */}
        <TableOfContents blogs={filteredBlogs} refs={refs} />

        {/* Blog Cards */}
        <div className="flex-1 flex flex-col gap-7 ml-4 md:ml-8">
          {filteredBlogs.map((blog, index) => (
            <BlogCard
              key={`blog-${index}`}
              index={index}
              {...blog}
              ref={refs[index]}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Blog, "");