import Markdown from "markdown-to-jsx";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Code from "./Code";

const Post = () => {
  const { blogName } = useParams();
  const [postContent, setPostContent] = useState("");

  // Fetch the Markdown content
  useEffect(() => {
    import(`../assets/markdown/${blogName}.md`)
      .then((res) => {
        fetch(res.default)
          .then((response) => response.text())
          .then((data) => setPostContent(data))
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error("Markdown file not found:", err));
  }, [blogName]);

  // Scroll to the hash if it exists
  const scrollToHash = () => {
    const hash = window.location.hash.substring(1); // Remove the '#' from the hash
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  useEffect(() => {
    scrollToHash(); // Scroll on initial load
    window.addEventListener("hashchange", scrollToHash); // Handle hash change
    return () => {
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, []);

  return (
    <article className="article h-auto bg-white text-black px-8 py-6 rounded-lg">
      <Markdown
        options={{
          overrides: {
            // code: { component: Code },
            a: {
              props: {
                className: "text-blue-500 underline hover:text-blue-700",
                onClick: (e) => {
                  const href = e.target.getAttribute("href");
                  if (href && href.startsWith("#")) {
                    e.preventDefault();
                    const hash = href.substring(1);
                    const element = document.getElementById(hash);
                    if (element) {
                      element.scrollIntoView({ behavior: "smooth", block: "start" });
                      window.history.pushState(null, "", href); // Update the URL
                    }
                  }
                },
              },
            },
            h1: {
              component: ({ children }) => {
                const id = children.toString().toLowerCase().replace(/\s+/g, "-");
                return <h1 id={id} className="text-4xl font-bold mb-4">{children}</h1>;
              },
            },
            h2: {
              component: ({ children }) => {
                const id = children.toString().toLowerCase().replace(/\s+/g, "-");
                return <h2 id={id} className="text-3xl font-bold mb-4">{children}</h2>;
              },
            },
            h3: {
              component: ({ children }) => {
                const id = children.toString().toLowerCase().replace(/\s+/g, "-");
                return <h3 id={id} className="text-2xl font-bold mb-3">{children}</h3>;
              },
            },
          },
        }}
      >
        {postContent}
      </Markdown>
    </article>
  );
};

export default Post;
