import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import Circulars from './pages/Circulars';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chat from './pages/Chat';
import Exams from './pages/Exams';
import BookShop from './pages/BookShop';
import Support from './pages/Support';
import Header from './components/Header';
import { Container } from './styledComponents/common';

function App() {
  return (
    <>
      <Router>
        <Header />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/circulars" element={<Circulars />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="/bookshop" element={<BookShop />} />
            <Route path="/support" element={<Support />} />
          </Routes>
        </Container>
      </Router>
    </>
  );
}

export default App;
