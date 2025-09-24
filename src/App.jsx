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
import { SignUp } from "./pages/SignUp";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<AppLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/profile/addpost/:id" element={<AddPost />} />
              <Route path="/treks" element={<TreksMain />} />
              {/* <Route path="/treks/:id" element={<TrekIndiviual />} /> */}
              <Route path="/treks/:id" element={<TrekIndiviual />} />
              <Route path="community" element={<Community />} />
              <Route path="gallery" element={<GalleryPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
      <Toaster
        position="top-center"
        guter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 4000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "white",
            color: "var(--color-grey-700)",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
