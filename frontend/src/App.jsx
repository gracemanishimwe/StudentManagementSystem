import "./App.css";
import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { useState } from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Students from "./pages/Students";
import Attendance from "./pages/Attendance";
import Dashboard from "./pages/Dashboard";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <nav className="navbar">
        <h2>Attendance System</h2>

        <ul>
          <li><Link to="/">Home</Link></li>
          {isLoggedIn && (
            <>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/students">Students</Link></li>
              <li><Link to="/attendance">Attendance</Link></li>
            </>
          )}
          <li>
            {isLoggedIn ? (
              <button onClick={() => setIsLoggedIn(false)}>Logout</button>
            ) : (
              <Link to="/login">Login</Link>
            )}
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/login" 
          element={<Login setIsLoggedIn={setIsLoggedIn} />} 
        />
        
        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/students" 
          element={isLoggedIn ? <Students /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/attendance" 
          element={isLoggedIn ? <Attendance /> : <Navigate to="/login" />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;