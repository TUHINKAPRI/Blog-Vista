import Header from "components/Header";
import PrivateRoute from "components/PrivateRoute";
import ScrollToTop from "components/ScrollToTop";
import Signin from "pages/auth/Signin";
import Signup from "pages/auth/Signup";
import About from "pages/layout/about/About";
import Dashboard from "pages/layout/dashboard/Dashboard";
import Home from "pages/layout/home/Home";
import CreatePost from "pages/layout/post/CreatePost";
import PostPage from "pages/layout/post/PostPage";
import UpdatePost from "pages/layout/post/UpdatePost";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route path='/post/:id' element={<PostPage/>}/>
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<UpdatePost />} />
        </Route>
      </Routes>
    </div>
  );
}
export default App;
