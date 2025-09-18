import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Community from "./pages/Community";
import TreksMain from "./pages/TreksMain";
import AppLayout from "./AppLayout";
import TrekIndiviual from "./pages/TrekIndiviual";
import GalleryPage from "./pages/Gallery";
import Login from "./pages/Login";
import AddPost from "./pages/AddPost";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<AppLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/profile/addpost/:id" element={<AddPost />} />
            <Route path="/treks" element={<TreksMain />} />
            {/* <Route path="/treks/:id" element={<TrekIndiviual />} /> */}
            <Route path="/treks/testVal" element={<TrekIndiviual />} />
            <Route path="community" element={<Community />} />
            <Route path="gallery" element={<GalleryPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
