import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';

const SuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 bg-background">
      <div className="max-w-sm w-full bg-background border border-border rounded-2xl p-8 text-center space-y-5 shadow-2xl animate-fade-in-up">
        <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-foreground font-poppins">Message Sent!</h3>
          <p className="text-base text-foreground-secondary">
            Thank you for reaching out. I'll get back to you within 24 hours.
          </p>
        </div>
        
        <div className="pt-4 border-t border-border">
          <p className="text-foreground-muted text-sm">
            Returning to home in <span className="text-accent font-bold text-2xl">{countdown}s</span>
          </p>
          <div className="w-full h-2 bg-border rounded-full mt-3 overflow-hidden">
            <div 
              className="h-full bg-accent rounded-full transition-all duration-1000 ease-linear"
              style={{ width: `${(countdown / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="w-full mt-2"
        >
          Go Back Now
        </Button>
      </div>
    </div>
  );
};

export default SuccessPage;
