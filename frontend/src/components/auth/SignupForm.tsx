
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { GithubIcon } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

const SignupForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate signup - In a real app, you would connect this to your auth provider
    try {
      // Fake delay to simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Show success message
      toast({
        title: "Account created successfully",
        description: "Welcome to ColorWave!",
      });

      // Ideally redirect user to dashboard
    } catch (error) {
      toast({
        title: "Sign up failed",
        description: "There was an error creating your account.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-6 animate-slide-up">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            type="text"
            placeholder="John Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            className="bg-white/50 border-gray-200"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="hello@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-white/50 border-gray-200"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-white/50 border-gray-200"
          />
          <p className="text-xs text-gray-500">Must be at least 8 characters</p>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" required />
          <Label htmlFor="terms" className="text-xs text-gray-500">
            I agree to the{" "}
            <Link to="/terms" className="text-custom-purple2 hover:text-custom-purple1">
              Terms of Service
            </Link>
            {" "}and{" "}
            <Link to="/privacy" className="text-custom-purple2 hover:text-custom-purple1">
              Privacy Policy
            </Link>
          </Label>
        </div>
        
        <Button 
          type="submit" 
          className="w-full bg-custom-purple2 hover:bg-custom-purple1 text-white"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Create account"}
        </Button>
      </form>

      <div className="flex items-center gap-4">
        <Separator className="flex-grow bg-gray-200" />
        <span className="text-xs text-gray-400">OR CONTINUE WITH</span>
        <Separator className="flex-grow bg-gray-200" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button 
          variant="outline" 
          className="bg-white hover:bg-gray-50 border border-gray-200"
          onClick={() => {
            toast({
              title: "Google Sign Up",
              description: "This would connect to Google in a real application.",
            });
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" className="h-5 w-5 mr-2">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            <path d="M1 1h22v22H1z" fill="none"/>
          </svg>
          Google
        </Button>
        
        <Button 
          variant="outline" 
          className="bg-white hover:bg-gray-50 border border-gray-200"
          onClick={() => {
            toast({
              title: "GitHub Sign Up",
              description: "This would connect to GitHub in a real application.",
            });
          }}
        >
          <GithubIcon className="h-5 w-5 mr-2" />
          GitHub
        </Button>
      </div>

      <div className="text-center text-sm">
        <span className="text-gray-500">Already have an account?</span>{" "}
        <Link to="/login" className="font-medium text-custom-purple2 hover:text-custom-purple1">
          Sign in
        </Link>
      </div>
    </div>
  );
};

export default SignupForm;
