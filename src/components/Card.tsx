import React from 'react';

interface CardProps {
  children: React.ReactNode;
  interactive?: boolean;
  onClick?: () => void;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  interactive = false,
  onClick,
  className = '',
}) => {
  return (
    <div
      className={`${interactive ? 'card-interactive' : 'card-dark'} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
