
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-custom-purple1 via-custom-purple2 to-custom-pink2 p-4">
      <div className="absolute top-0 left-0 w-full h-full bg-white/10 backdrop-blur-[2px]" />
      
      <Card className="w-full max-w-md glass-card animate-fade-in">
        <CardContent className="p-6 sm:p-8">
          <div className="w-full flex flex-col items-center space-y-6">
            <div className="text-center">
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-custom">
                ColorWave
              </h2>
              <p className="text-gray-500 mt-2">Your digital journey begins here</p>
            </div>
            
            {children}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthLayout;
