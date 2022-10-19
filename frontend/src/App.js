import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import PrivateRoute from './components/auth/PrivateRoute'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/main/Home'
import MyTickets from './pages/tickets/MyTickets'

function App() {
  return (
    <>
      <Router>
        <main className="h-screen bg-gray-200">
          <Routes>
            {/*----Unprotected----*/}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/*----Protected----*/}
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<Home />} />
              <Route path="/tickets" element={<MyTickets />} />
            </Route>
          </Routes>
        </main>
      </Router>
    </>
  )
}

export default App
