
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-custom-purple1 via-custom-purple2 to-custom-pink2 p-6 text-center">
      <div className="absolute top-0 left-0 w-full h-full bg-white/10 backdrop-blur-[2px]" />
      
      <div className="glass-card p-8 space-y-8 max-w-md animate-fade-in z-10">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-custom">
          Welcome to My Book Store
        </h1>
        
        <p className="text-lg text-gray-700">
          Experience our beautiful authentication system with a vibrant color palette.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            asChild
            className="bg-custom-purple2 hover:bg-custom-purple1 text-white"
          >
            <Link to="/login">Sign In</Link>
          </Button>
          
          <Button 
            asChild
            variant="outline"
            className="bg-white/70 hover:bg-white/90 border-custom-pink1 text-custom-purple1"
          >
            <Link to="/signup">Create Account</Link>
          </Button>
        </div>
      </div>
      
    </div>
  );
};

export default Index;
