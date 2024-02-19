import {BrowserRouter, Routes, Route} from "react-router-dom"
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ProfilePage from "./pages/ProfilePage";
import Header from "./components/Header";
export default function App(){
  return(
  <BrowserRouter>
  <Header />
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/about" element={<AboutPage/>}/>
      <Route path="/profile" element={<ProfilePage/>}/>
    </Routes>
  </BrowserRouter>
  );
}
