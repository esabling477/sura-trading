import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import TradingDashboard from "./components/TradingDashboard";
import MobileTradingDashboard from "./components/MobileTradingDashboard";
import MobileAccountPage from "./pages/MobileAccountPage";
import DepositPage from "./pages/DepositPage";
import WithdrawalPage from "./pages/WithdrawalPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "./components/ui/toaster";

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="App">
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              
              {/* Desktop Dashboard */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    {isMobile ? <MobileTradingDashboard /> : <TradingDashboard />}
                  </ProtectedRoute>
                } 
              />
              
              {/* Mobile Pages */}
              <Route 
                path="/dashboard/mine" 
                element={
                  <ProtectedRoute>
                    <MobileAccountPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/deposit" 
                element={
                  <ProtectedRoute>
                    <DepositPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/withdrawal" 
                element={
                  <ProtectedRoute>
                    <WithdrawalPage />
                  </ProtectedRoute>
                } 
              />
              
              {/* Placeholder routes for other mobile pages */}
              <Route 
                path="/dashboard/transfer" 
                element={
                  <ProtectedRoute>
                    <div className="min-h-screen bg-[#0a192f] text-white p-4">
                      <h1>Transfer Page - Coming Soon</h1>
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/wallet" 
                element={
                  <ProtectedRoute>
                    <div className="min-h-screen bg-[#0a192f] text-white p-4">
                      <h1>Wallet Page - Coming Soon</h1>
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/verification" 
                element={
                  <ProtectedRoute>
                    <div className="min-h-screen bg-[#0a192f] text-white p-4">
                      <h1>Real Name Verification - Coming Soon</h1>
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/invite" 
                element={
                  <ProtectedRoute>
                    <div className="min-h-screen bg-[#0a192f] text-white p-4">
                      <h1>Invite Friends - Coming Soon</h1>
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/change-password" 
                element={
                  <ProtectedRoute>
                    <div className="min-h-screen bg-[#0a192f] text-white p-4">
                      <h1>Change Password - Coming Soon</h1>
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/complaint" 
                element={
                  <ProtectedRoute>
                    <div className="min-h-screen bg-[#0a192f] text-white p-4">
                      <h1>Complaint Email - Coming Soon</h1>
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/announcement" 
                element={
                  <ProtectedRoute>
                    <div className="min-h-screen bg-[#0a192f] text-white p-4">
                      <h1>Announcements - Coming Soon</h1>
                    </div>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/service" 
                element={
                  <ProtectedRoute>
                    <div className="min-h-screen bg-[#0a192f] text-white p-4">
                      <h1>Online Service - Coming Soon</h1>
                    </div>
                  </ProtectedRoute>
                } 
              />
              
              <Route 
                path="/" 
                element={<Navigate to="/dashboard" replace />} 
              />
            </Routes>
          </BrowserRouter>
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;