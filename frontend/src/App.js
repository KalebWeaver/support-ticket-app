import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import PrivateRoute from './components/auth/PrivateRoute'
import NotFound from './components/main/NotFound'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import OpenTickets from './pages/tickets/OpenTickets'
import ClosedTickets from './pages/tickets/ClosedTickets'
import Ticket from './pages/tickets/Ticket'

function App() {
  return (
    <>
      <Router>
        <main className="h-screen bg-gray-200">
          <Routes>
            {/*----Unprotected----*/}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
            {/*----Protected----*/}
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<OpenTickets />} />
              <Route path="/closed-tickets" element={<ClosedTickets />} />
              <Route path="/tickets/:ticketId" element={<Ticket />} />
            </Route>
          </Routes>
        </main>
      </Router>
    </>
  )
}

export default App
