import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
    <p>does it woerk??</p>
    <Router>
      
      <Navbar />
      <div className="container mt-5 pt-5">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/blogs" component={Blogs} />
          <Route path="/circulars" component={Circulars} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/chat" component={Chat} />
          <Route path="/exam" component={Exam} />
          <Route path="/bookshop" component={BookShop} />
          <Route path="/support" component={Support} />
        </Switch>
      </div>
    </Router>
    </>
  );
}

export default App;
