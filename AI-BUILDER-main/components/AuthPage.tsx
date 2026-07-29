import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/Card';
import { Input } from './ui/Input';
import type { User } from '../types';
import { Sparkles } from './icons';

interface AuthPageProps {
  onLogin: (user: User) => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleToggleView = () => {
    setIsLoginView(!isLoginView);
    setError('');
    setSuccessMessage('');
    setFullName('');
    setEmail('');
    setPassword('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    // NOTE: In a real app, use a proper password hashing library.
    // Storing plaintext passwords is NOT secure.
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (isLoginView) {
      // Handle Login
      const user = users.find((u: any) => u.email === email);
      if (user && user.password === password) {
        onLogin({ fullName: user.fullName, email: user.email });
      } else {
        setError('Invalid email or password.');
      }
    } else {
      // Handle Sign Up
      if (users.some((u: any) => u.email === email)) {
        setError('An account with this email already exists.');
        return;
      }
      
      const newUser = { fullName, email, password };
      const updatedUsers = [...users, newUser];
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      // Switch to login view with a success message
      setSuccessMessage('Account created successfully! Please log in.');
      setIsLoginView(true);
      setFullName('');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4">
      <div className="text-center mb-8">
        <div className="flex justify-center items-center gap-3">
            <Sparkles className="h-8 w-8 text-primary" />
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
                AI RESUME BUILDER
            </h1>
            <Sparkles className="h-8 w-8 text-primary" />
        </div>
        <p className="mt-4 text-lg text-muted-foreground">
            Sign in or create an account to get started.
        </p>
      </div>
      
      <Card className="w-full max-w-sm bg-background/80 dark:bg-card/60 backdrop-blur text-foreground">
        <CardHeader>
          <CardTitle className="text-2xl">{isLoginView ? 'Welcome Back!' : 'Create an Account'}</CardTitle>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {!isLoginView && (
              <div className="space-y-1">
                <label htmlFor="name" className="text-sm font-medium">Full Name</label>
                <Input id="name" placeholder="John Doe" required value={fullName} onChange={e => setFullName(e.target.value)} />
              </div>
            )}
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input id="email" type="email" placeholder="john.doe@email.com" required value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="space-y-1">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <Input id="password" type="password" required value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            {successMessage && <p className="text-sm text-green-600 dark:text-green-500">{successMessage}</p>}
            {error && <p className="text-sm text-destructive">{error}</p>}
          </CardContent>
          <CardFooter className="flex flex-col items-stretch gap-4">
            <Button type="submit">{isLoginView ? 'Login' : 'Sign Up'}</Button>
            <p className="text-center text-sm text-muted-foreground">
              {isLoginView ? "Don't have an account?" : "Already have an account?"}
              <Button variant="link" type="button" onClick={handleToggleView} className="font-semibold">
                {isLoginView ? 'Sign Up' : 'Login'}
              </Button>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};