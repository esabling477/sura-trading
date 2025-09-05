import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
import { 
  X,
  User,
  CreditCard,
  ArrowDownCircle,
  ArrowUpCircle,
  RefreshCw,
  Wallet,
  UserCheck,
  Users,
  Lock,
  Mail,
  Bell,
  Headphones,
  LogOut
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const MobileNavigation = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { isDark } = useTheme();

  const handleLogout = () => {
    logout();
    navigate('/login');
    onClose();
  };

  const menuItems = [
    { 
      id: 'assets', 
      label: 'My assets', 
      icon: User, 
      path: '/dashboard/mine',
      active: location.pathname === '/dashboard/mine'
    },
    { 
      id: 'deposit', 
      label: 'Deposit', 
      icon: ArrowDownCircle, 
      path: '/dashboard/deposit' 
    },
    { 
      id: 'withdrawal', 
      label: 'Withdrawal', 
      icon: ArrowUpCircle, 
      path: '/dashboard/withdrawal' 
    },
    { 
      id: 'transfer', 
      label: 'Transfer', 
      icon: RefreshCw, 
      path: '/dashboard/transfer' 
    },
    { 
      id: 'wallet', 
      label: 'Wallet', 
      icon: Wallet, 
      path: '/dashboard/wallet' 
    },
    { 
      id: 'verification', 
      label: 'Real Name Verification', 
      icon: UserCheck, 
      path: '/dashboard/verification' 
    },
    { 
      id: 'invite', 
      label: 'Invite Friends', 
      icon: Users, 
      path: '/dashboard/invite' 
    },
    { 
      id: 'password', 
      label: 'Change Password', 
      icon: Lock, 
      path: '/dashboard/change-password' 
    },
    { 
      id: 'complaint', 
      label: 'Complaint email', 
      icon: Mail, 
      path: '/dashboard/complaint' 
    },
    { 
      id: 'announcement', 
      label: 'announcement', 
      icon: Bell, 
      path: '/dashboard/announcement' 
    },
    { 
      id: 'service', 
      label: 'Online Service', 
      icon: Headphones, 
      path: '/dashboard/service' 
    }
  ];

  const handleMenuClick = (path) => {
    navigate(path);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50" 
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`absolute left-0 top-0 h-full w-80 ${
        isDark ? 'bg-[#0a192f]' : 'bg-white'
      } shadow-xl`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-4 border-b ${
          isDark ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <h2 className={`text-lg font-semibold ${
            isDark ? 'text-white' : 'text-gray-900'
          }`}>
            Mine
          </h2>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onClose}
            className={isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Menu Items */}
        <ScrollArea className="flex-1 h-full">
          <div className="p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.active || location.pathname === item.path;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  className={`w-full justify-start h-12 ${
                    isActive 
                      ? 'bg-[#8BC34A] text-white hover:bg-[#7CB342]' 
                      : (isDark 
                          ? 'text-gray-300 hover:text-white hover:bg-gray-700' 
                          : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                        )
                  }`}
                  onClick={() => handleMenuClick(item.path)}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Button>
              );
            })}
            
            <Separator className={`my-4 ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`} />
            
            {/* Logout */}
            <Button
              variant="ghost"
              className={`w-full justify-start h-12 text-red-500 hover:text-red-600 ${
                isDark ? 'hover:bg-red-900/20' : 'hover:bg-red-50'
              }`}
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </Button>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default MobileNavigation;