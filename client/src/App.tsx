import { Toaster } from "sonner";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
import VideoSearch from "./pages/videosearch/VideoSearch";
import Header from "./components/Header";
function App() {
  
  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/search/:video_id" element={<VideoSearch />} />
        </Routes>
      </Router>
      <Toaster/>
    </>
  )
}

export default App
