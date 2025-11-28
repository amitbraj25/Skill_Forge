import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
}

export const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  label,
  value,
  subtitle,
  trend = 'neutral',
}) => {
  const trendColors = {
    up: 'text-accent-emerald',
    down: 'text-red-400',
    neutral: 'text-gray-400',
  };

  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-2">{label}</p>
          <p className="text-3xl font-bold gradient-text">{value}</p>
          {subtitle && <p className={`text-sm mt-2 ${trendColors[trend]}`}>{subtitle}</p>}
        </div>
        <Icon className="w-8 h-8 text-accent-cyan opacity-60" />
      </div>
    </Card>
  );
};

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="card-dark">{children}</div>
);
