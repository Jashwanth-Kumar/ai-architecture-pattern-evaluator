
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';
import { ArchitecturePattern } from '@/types/architecture';

interface ArchitecturePatternCardProps {
  pattern: ArchitecturePattern;
  selected?: boolean;
  onClick?: () => void;
}

const ArchitecturePatternCard: React.FC<ArchitecturePatternCardProps> = ({ 
  pattern, 
  selected = false,
  onClick
}) => {
  const cardStyle = {
    borderColor: selected ? pattern.color : undefined,
    borderWidth: selected ? '2px' : '1px',
    cursor: onClick ? 'pointer' : 'default'
  };

  return (
    <Card 
      className="h-full flex flex-col transition-all hover:shadow-md"
      style={cardStyle}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          {pattern.name}
          {selected && <Badge style={{ backgroundColor: pattern.color }}>Selected</Badge>}
        </CardTitle>
        <CardDescription>{pattern.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-sm mb-2 flex items-center">
              <Check className="w-4 h-4 mr-1 text-green-500" /> Benefits
            </h4>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {pattern.benefits.slice(0, 3).map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-sm mb-2 flex items-center">
              <X className="w-4 h-4 mr-1 text-red-500" /> Limitations
            </h4>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {pattern.limitations.slice(0, 3).map((limitation, index) => (
                <li key={index}>{limitation}</li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div 
          className="w-full h-1 rounded-full" 
          style={{ backgroundColor: pattern.color }}
        ></div>
      </CardFooter>
    </Card>
  );
};

export default ArchitecturePatternCard;
