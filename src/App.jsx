import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useState } from "react";
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, Blog } from "./components";
import Post from "./components/Post";

export const ThemeContext = createContext();

const App = () => {
  const [isDark, setIsDark] = useState(true);

  const value = {
    isDark,
    setIsDark,
  };

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <ThemeContext.Provider value={value}>
          <Navbar />
          <Routes>
            {/* Home Page */}
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <About />
                  <Experience />
                  <Tech />
                  <Works />
                  <Feedbacks />
                  <Contact />
                </>
              }
            />

            {/* Blog Page */}
            <Route
              path="/blog"
              element={
                <Blog />
              }
            />

            {/* Post Page */}
            <Route
              path="/post/:blogName"
              element={<Post />}
            />
          </Routes>
        </ThemeContext.Provider>
      </div>
    </BrowserRouter>
  );
};

export default App;
