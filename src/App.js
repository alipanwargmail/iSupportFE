import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signin from './Signin';
import Dashboard from './Dashboard';
import ListUser from './ListUser'
import EditUser from './EditUser'
import CreateUser from './CreateUser';
import ListTicket from './ListTicket';
import CreateTicket from './CreateTicket';
import ViewTicket from './ViewTicket';
import ListTicketUser from './ListTicketUser';
import EditTicketUser from './EditTicketUser';
import ListTicketAgent from './ListTicketAgent';
import ViewTicketAgent from './ViewTicketAgent';
import EditTicketAgent from './EditTicketAgent';
import ViewTicketUser from './ViewTicketUser';

function App() {
  const token = localStorage.getItem('token');

  if(!token) {
    return <Signin />
  }

  return (
    <div className="wrapper">
        <Routes>
          <Route exact path="/dashboard" element={<Dashboard />}></Route>
          <Route exac path="/" element={<Dashboard />}></Route>
          <Route exac path="/listuser" element={<ListUser />}></Route>
          <Route exac path="/edituser" element={<EditUser />}></Route>
          <Route exac path="/createuser" element={<CreateUser />}></Route>
          <Route exac path="/listticket" element={<ListTicket />}></Route>
          <Route exac path="/createticket" element={<CreateTicket />}></Route>
          <Route exac path="/viewticket" element={<ViewTicket />}></Route>
          <Route exac path="/viewticketuser" element={<ViewTicketUser />}></Route>
          <Route exac path="/listticketuser" element={<ListTicketUser />}></Route>
          <Route exac path="/editticketuser" element={<EditTicketUser />}></Route>
          <Route exac path="/listticketagent" element={<ListTicketAgent />}></Route>
          <Route exac path="/viewticketagent" element={<ViewTicketAgent />}></Route>
          <Route exac path="/editticketagent" element={<EditTicketAgent />}></Route>
        </Routes>
    </div>
  );
}

export default App;