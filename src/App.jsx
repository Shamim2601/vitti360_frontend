import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import Circulars from './pages/Circulars';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chat from './pages/Chat';
import Exam from './pages/Exam';
import BookShop from './pages/BookShop';
import Support from './pages/Support';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className="container mt-5 pt-5">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/circulars" element={<Circulars />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/exam" element={<Exam />} />
            <Route path="/bookshop" element={<BookShop />} />
            <Route path="/support" element={<Support />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
