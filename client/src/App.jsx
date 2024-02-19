import {BrowserRouter, Routes, Route} from "react-router-dom"
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
export default function App(){
  return(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/about" element={<AboutPage/>}/>
      <Route path="/profile" element={<ProfilePage/>}/>
    </Routes>
  </BrowserRouter>
  );
}
