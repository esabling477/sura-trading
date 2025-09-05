import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Alert } from '../components/ui/alert';
import { Separator } from '../components/ui/separator';
import { 
  TrendingUp, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

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
          <p className={`mt-2 text-sm ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Your gateway to cryptocurrency trading
          </p>
        </div>

        {/* Login Form */}
        <Card className={`${
          isDark 
            ? 'bg-[#112240] border-gray-700' 
            : 'bg-white border-gray-200 shadow-lg'
        }`}>
          <CardHeader>
            <CardTitle className={`text-center ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              Welcome back
            </CardTitle>
            <p className={`text-center text-sm ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Sign in to your account to continue
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
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
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

              <div className="space-y-2">
                <Label htmlFor="password" className={
                  isDark ? 'text-gray-300' : 'text-gray-700'
                }>
                  Password
                </Label>
                <div className="relative">
                  <Lock className={`absolute left-3 top-3 h-4 w-4 ${
                    isDark ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={handleChange}
                    className={`pl-10 pr-10 ${
                      isDark 
                        ? 'bg-[#0a192f] border-gray-600 text-white placeholder:text-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-3 top-3 ${
                      isDark ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Link 
                to="/forgot-password"
                className={`text-sm block text-right hover:underline ${
                  isDark ? 'text-[#64ffda] hover:text-[#4fd1c7]' : 'text-blue-600 hover:text-blue-800'
                }`}
              >
                Forgot password?
              </Link>

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
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6">
              <Separator className={isDark ? 'bg-gray-700' : 'bg-gray-200'} />
              <p className={`mt-6 text-center text-sm ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Don't have an account?{' '}
                <Link 
                  to="/register"
                  className={`font-medium hover:underline ${
                    isDark ? 'text-[#64ffda] hover:text-[#4fd1c7]' : 'text-blue-600 hover:text-blue-800'
                  }`}
                >
                  Sign up for free
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Demo credentials */}
        <div className={`mt-4 p-4 rounded-lg text-center text-xs ${
          isDark ? 'bg-[#112240] text-gray-400' : 'bg-gray-100 text-gray-600'
        }`}>
          <p className="font-medium mb-1">Demo Credentials:</p>
          <p>Email: demo@gttrading.com</p>
          <p>Password: password123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;