import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import AudioUpload from './pages/AudioUpload';
import Transcript from "./pages/TranscriptPage";
import './App.css';

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/audioUpload" element={<AudioUpload />} />
          <Route path="/transcript/:id" element={<Transcript />} />
        </Routes>
      </Router>
  );
}

export default App;
