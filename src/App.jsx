import { BrowserRouter, Routes, Route } from "react-router-dom";
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, Blog } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary'>
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
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
