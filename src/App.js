import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useEffect ,useState,useRef} from "react";
import StudentsList from "./Students/StudentsList";
import Login from "./Login/Login";
import Header from "./Sidebar/Header";
import Dashboard from './components/Dashboard';


const loggedIn = localStorage.getItem('user');
const authenticated = localStorage.getItem('authenticated');
var collepse ='';



function App() {

  useEffect(() => {
    const handleClick = event => {
      const close = document.getElementById("header");
      const close1 = document.getElementById("header-close");
      if(close){
        collepse=true;
        const main = document.getElementsByClassName("main")
        const sidebar = document.getElementsByClassName("sidebar")
        main[0].className="col-10 main"
        sidebar[0].className="col-2 sidebar"
      }
      if(close1){
        const main = document.getElementsByClassName("main")
        const sidebar = document.getElementsByClassName("sidebar")
        main[0].className="col-11 main"
        sidebar[0].className="col-1 sidebar"
      }
    };
    document.addEventListener('click', handleClick);
  }, [collepse]);
  return (
    <div className="App d-flex row ">
      {!(loggedIn && authenticated) ? <Route path="/login" component={Login} />
        : <Router >
          <div className="col-2 sidebar">
            <Header />
          </div>
          <div className="col-10 main">
            <Switch >
              <Route exact path="/dashboard" component={Dashboard} />
              <Route path="/students" component={StudentsList} />
            </Switch>
          </div>

        </Router>}
    </div>
  );
}

export default App;
