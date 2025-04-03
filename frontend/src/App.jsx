import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DashBoard } from './pages/dashboard';
import { Login } from './pages/Login';
import { Mapview } from './pages/Mapview';
import { Authenticated } from './components/Authenticated';
import { Signup } from './pages/SignUp';
import { Toaster } from "sonner";

function App() {
  

  return (
    <>
    <Toaster position='top-right'/>
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <Authenticated>
              <DashBoard />
            </Authenticated>

          }
        />
        <Route
          path="/map/:id"
          element={
            <Authenticated>
              <Mapview />
            </Authenticated>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
