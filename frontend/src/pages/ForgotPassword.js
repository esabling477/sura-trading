import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Alert } from '../components/ui/alert';
import { 
  TrendingUp, 
  Mail, 
  ArrowLeft,
  Loader2,
  CheckCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const { forgotPassword } = useAuth();
  const { isDark } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    const result = await forgotPassword(email);
    
    if (result.success) {
      setMessage(result.message);
      setSent(true);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  if (sent) {
    return (
      <div className={`min-h-screen flex items-center justify-center px-4 ${
        isDark ? 'bg-[#0a192f]' : 'bg-gray-50'
      }`}>
        <div className="absolute top-4 right-4">
          <ThemeToggle />
        </div>
        
        <div className="w-full max-w-md">
          <Card className={`${
            isDark 
              ? 'bg-[#112240] border-gray-700' 
              : 'bg-white border-gray-200 shadow-lg'
          }`}>
            <CardContent className="pt-6">
              <div className="text-center">
                <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                  isDark ? 'bg-green-900/20' : 'bg-green-100'
                }`}>
                  <CheckCircle className={`h-8 w-8 ${
                    isDark ? 'text-green-400' : 'text-green-600'
                  }`} />
                </div>
                
                <h2 className={`text-xl font-semibold mb-2 ${
                  isDark ? 'text-white' : 'text-gray-900'
                }`}>
                  Check your email
                </h2>
                
                <p className={`text-sm mb-6 ${
                  isDark ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  We've sent a password reset link to <br />
                  <span className="font-medium">{email}</span>
                </p>
                
                <div className="space-y-3">
                  <Button
                    onClick={() => window.open('mailto:', '_blank')}
                    className={`w-full ${
                      isDark 
                        ? 'bg-[#64ffda] hover:bg-[#4fd1c7] text-[#0a192f]' 
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    }`}
                  >
                    Open email app
                  </Button>
                  
                  <Link to="/login">
                    <Button 
                      variant="outline" 
                      className={`w-full ${
                        isDark 
                          ? 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white' 
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back to login
                    </Button>
                  </Link>
                </div>
                
                <p className={`mt-6 text-xs ${
                  isDark ? 'text-gray-500' : 'text-gray-500'
                }`}>
                  Didn't receive the email? Check your spam folder or{' '}
                  <button 
                    onClick={() => setSent(false)}
                    className={`underline hover:no-underline ${
                      isDark ? 'text-[#64ffda]' : 'text-blue-600'
                    }`}
                  >
                    try again
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${
      isDark ? 'bg-[#0a192f]' : 'bg-gray-50'
    }`}>
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      
      <div className="w-full max-w-md">
        {/* Logo and Brand */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className={`p-3 rounded-lg ${
              isDark ? 'bg-[#64ffda]/10' : 'bg-blue-100'
            }`}>
              <TrendingUp className={`h-8 w-8 ${
                isDark ? 'text-[#64ffda]' : 'text-blue-600'
              }`} />
            </div>
          </div>
          <h1 className={`text-3xl font-bold ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            GT Trading
          </h1>
        </div>

        {/* Forgot Password Form */}
        <Card className={`${
          isDark 
            ? 'bg-[#112240] border-gray-700' 
            : 'bg-white border-gray-200 shadow-lg'
        }`}>
          <CardHeader>
            <CardTitle className={`text-center ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Forgot password?
            </CardTitle>
            <p className={`text-center text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Enter your email address and we'll send you a link to reset your password
            </p>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className={`mb-4 ${
                isDark 
                  ? 'bg-red-900/20 border-red-800 text-red-400' 
                  : 'bg-red-50 border-red-200 text-red-800'
              }`}>
                {error}
              </Alert>
            )}

            {message && (
              <Alert className={`mb-4 ${
                isDark 
                  ? 'bg-green-900/20 border-green-800 text-green-400' 
                  : 'bg-green-50 border-green-200 text-green-800'
              }`}>
                {message}
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className={
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }>
                  Email address
                </Label>
                <div className="relative">
                  <Mail className={`absolute left-3 top-3 h-4 w-4 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError('');
                    }}
                    className={`pl-10 ${
                      isDark 
                        ? 'bg-[#0a192f] border-gray-600 text-white placeholder:text-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="john@example.com"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className={`w-full ${
                  isDark 
                    ? 'bg-[#64ffda] hover:bg-[#4fd1c7] text-[#0a192f]' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending reset link...
                  </>
                ) : (
                  'Send reset link'
                )}
              </Button>
            </form>

            <div className="mt-6">
              <Link 
                to="/login"
                className={`flex items-center justify-center text-sm hover:underline ${
                  isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;