
import React, { useState } from 'react';
import { ResumeData } from '../types';
import { getGeneralAIAssistance } from '../services/geminiService';
import { Button } from './ui/Button';
import { Textarea } from './ui/Textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Sparkles, XIcon } from './icons';

interface AIAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  resumeData: ResumeData;
}

export const AIAssistantModal: React.FC<AIAssistantModalProps> = ({ isOpen, onClose, resumeData }) => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleAsk = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setError('');
    setResponse('');
    try {
      const result = await getGeneralAIAssistance(query, resumeData);
      setResponse(result);
    } catch (err) {
      setError('Sorry, something went wrong. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" aria-modal="true" role="dialog">
      <Card className="w-full max-w-2xl relative">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Assistant
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close AI Assistant">
            <XIcon className="h-5 w-5" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Ask for help to improve your resume. e.g., "Suggest 3 strong action verbs for a project manager." or "Review my summary for clarity and impact."
          </p>
          <div className="space-y-2">
            <Textarea 
              placeholder="Your question..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              rows={3}
              disabled={isLoading}
            />
            <Button onClick={handleAsk} disabled={isLoading || !query.trim()} className="w-full">
              {isLoading && <Sparkles className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Thinking...' : 'Ask AI'}
            </Button>
          </div>
          {(isLoading || response || error) && (
            <div className="border-t pt-4 mt-4">
              <h4 className="text-sm font-semibold mb-2">Response:</h4>
              {isLoading && <p className="text-sm text-muted-foreground animate-pulse">Getting feedback...</p>}
              {error && <p className="text-sm text-destructive">{error}</p>}
              {response && <div className="text-sm text-foreground bg-muted/50 p-3 rounded-md whitespace-pre-wrap max-h-60 overflow-y-auto">{response}</div>}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
