import { BrowserRouter,Routes , Route} from "react-router";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Community from "./pages/Community";
import TreksMain from "./pages/TreksMain";
import AppLayout from "./AppLayout";

function App() {

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route  path="/" element={
          <AppLayout/>
        }>
          <Route path="/" element={<Home/>}/>
          <Route path="/profile/:id"  element={<Profile/>}/>
          <Route path="/treks" element={<TreksMain/>}/>
          <Route path="community" element={<Community/>}/>
        </Route>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
