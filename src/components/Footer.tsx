
import React from 'react';
import { GitHub, BookOpen, Code } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose md:text-left">
            &copy; {new Date().getFullYear()} AI Architecture Analyzer. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <GitHub className="h-4 w-4" />
            <span>GitHub</span>
          </a>
          <a 
            href="https://docs.example.com" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <BookOpen className="h-4 w-4" />
            <span>Documentation</span>
          </a>
          <a 
            href="https://api.example.com" 
            target="_blank" 
            rel="noreferrer"
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <Code className="h-4 w-4" />
            <span>API</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
