
import React from 'react';
import { Link } from 'react-router-dom';
import { Cpu, BarChart2, FileText, Home, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center px-4">
        <div className="flex items-center gap-2 font-semibold">
          <Cpu className="h-6 w-6 text-primary" />
          <span className="hidden font-bold sm:inline-block">
            AI Architecture Analyzer
          </span>
        </div>
        <nav className="flex flex-1 items-center justify-end gap-4 sm:gap-6">
          <Button variant="ghost" asChild className="text-sm font-medium">
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Link>
          </Button>
          <Button variant="ghost" asChild className="text-sm font-medium">
            <Link to="/test">
              <Cpu className="mr-2 h-4 w-4" />
              Run Test
            </Link>
          </Button>
          <Button variant="ghost" asChild className="text-sm font-medium">
            <Link to="/results">
              <BarChart2 className="mr-2 h-4 w-4" />
              Results
            </Link>
          </Button>
          <Button variant="ghost" asChild className="text-sm font-medium">
            <Link to="/documentation">
              <FileText className="mr-2 h-4 w-4" />
              Documentation
            </Link>
          </Button>
          <Button variant="ghost" asChild className="text-sm font-medium">
            <Link to="/about">
              <Info className="mr-2 h-4 w-4" />
              About
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
