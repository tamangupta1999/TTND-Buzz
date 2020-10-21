import React from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import DashboardLayout from './components/Dashboard/DashboardComponent';
import Login from './components/LoginComponent/LoginComponent';
import Logout from './components/LogoutComponent/LogoutComponent';
import Buzz from './containers/BuzzContainer';
import MyBuzz from './containers/MyBuzzContainer';
import Complaint from './containers/ComplaintContainer';
import ComplaintView from './components/Complaint/ComplaintViewComponent/ComplaintViewComponent';
import Resolve from './containers/ResolveContainer';
import About from './components/SharedComponent/SharedComponent';
import Help from './components/SharedComponent/SharedComponent';
import Profile from './containers/UserContainer';
import SuperAdminDashboard from './containers/SuperAdminDashboardContainer';

toast.configure();

function App() {

  return (
    <div className="App" >
      <BrowserRouter>
        <Switch>
          <Route path='/' exact component={Login} />
          <Route path='/profile' exact component={Profile} />
          <Route path='/dashboard' exact component={SuperAdminDashboard} />
          <Route path='/logout' exact component={Logout} />
          <DashboardLayout>
            <Route path='/logout' exact component={Logout} />
            <Route path='/buzz' exact component={Buzz} />
            <Route path='/myBuzz' exact component={MyBuzz} />
            <Route path='/complaint' exact component={Complaint} />
            <Route path='/complaint/:complaintId' exact component={ComplaintView} />
            <Route path='/resolve' exact component={Resolve} />
            <Route path='/about' exact component={About} />
            <Route path='/help' exact component={Help} />
            <Redirect to="/buzz" />
          </DashboardLayout>
        </Switch>
      </BrowserRouter>
    </div >
  );
}


export default App;
