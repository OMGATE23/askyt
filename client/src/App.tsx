import { Toaster } from "sonner";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
import VideoSearch from "./pages/videosearch/VideoSearch";
import Header from "./components/Header";
function App() {
  
  return (
    <div className="max-w-[100vw] relative">
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search/:video_id" element={<VideoSearch />} />
        </Routes>
      </Router>
      <Toaster/>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-white via-white to-purple-200 opacity-70 z-[-10]" />
    </div>
  )
}

export default App
