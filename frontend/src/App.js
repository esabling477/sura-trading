import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProfessionalTradingDashboard from "./components/ProfessionalTradingDashboard";
import MobileAccountPage from "./pages/MobileAccountPage";
import DepositPage from "./pages/DepositPage";
import WithdrawalPage from "./pages/WithdrawalPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import TradingFooter from "./components/TradingFooter";
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
    <div className="App min-h-screen flex flex-col">
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <div className="flex-1">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                
                {/* Main Dashboard */}
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <ProfessionalTradingDashboard />
                    </ProtectedRoute>
                  } 
                />
                
                {/* Account Management Pages */}
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
                
                {/* Placeholder routes for other pages */}
                <Route 
                  path="/dashboard/transfer" 
                  element={
                    <ProtectedRoute>
                      <div className="min-h-screen bg-gray-900 text-white p-4 flex items-center justify-center">
                        <div className="text-center">
                          <h1 className="text-2xl font-bold mb-2">Transfer Page</h1>
                          <p className="text-gray-400">Coming Soon</p>
                        </div>
                      </div>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/dashboard/wallet" 
                  element={
                    <ProtectedRoute>
                      <div className="min-h-screen bg-gray-900 text-white p-4 flex items-center justify-center">
                        <div className="text-center">
                          <h1 className="text-2xl font-bold mb-2">Wallet Page</h1>
                          <p className="text-gray-400">Coming Soon</p>
                        </div>
                      </div>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/dashboard/verification" 
                  element={
                    <ProtectedRoute>
                      <div className="min-h-screen bg-gray-900 text-white p-4 flex items-center justify-center">
                        <div className="text-center">
                          <h1 className="text-2xl font-bold mb-2">Real Name Verification</h1>
                          <p className="text-gray-400">Coming Soon</p>
                        </div>
                      </div>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/dashboard/invite" 
                  element={
                    <ProtectedRoute>
                      <div className="min-h-screen bg-gray-900 text-white p-4 flex items-center justify-center">
                        <div className="text-center">
                          <h1 className="text-2xl font-bold mb-2">Invite Friends</h1>
                          <p className="text-gray-400">Coming Soon</p>
                        </div>
                      </div>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/dashboard/change-password" 
                  element={
                    <ProtectedRoute>
                      <div className="min-h-screen bg-gray-900 text-white p-4 flex items-center justify-center">
                        <div className="text-center">
                          <h1 className="text-2xl font-bold mb-2">Change Password</h1>
                          <p className="text-gray-400">Coming Soon</p>
                        </div>
                      </div>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/dashboard/complaint" 
                  element={
                    <ProtectedRoute>
                      <div className="min-h-screen bg-gray-900 text-white p-4 flex items-center justify-center">
                        <div className="text-center">
                          <h1 className="text-2xl font-bold mb-2">Complaint Email</h1>
                          <p className="text-gray-400">Coming Soon</p>
                        </div>
                      </div>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/dashboard/announcement" 
                  element={
                    <ProtectedRoute>
                      <div className="min-h-screen bg-gray-900 text-white p-4 flex items-center justify-center">
                        <div className="text-center">
                          <h1 className="text-2xl font-bold mb-2">Announcements</h1>
                          <p className="text-gray-400">Coming Soon</p>
                        </div>
                      </div>
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/dashboard/service" 
                  element={
                    <ProtectedRoute>
                      <div className="min-h-screen bg-gray-900 text-white p-4 flex items-center justify-center">
                        <div className="text-center">
                          <h1 className="text-2xl font-bold mb-2">Online Service</h1>
                          <p className="text-gray-400">Coming Soon</p>
                        </div>
                      </div>
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/" 
                  element={<Navigate to="/dashboard" replace />} 
                />
              </Routes>
            </div>
            
            {/* Footer - only show on certain pages */}
            <Routes>
              <Route path="/dashboard" element={<TradingFooter />} />
            </Routes>
          </BrowserRouter>
          <Toaster />
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;