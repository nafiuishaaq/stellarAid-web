"use client";
import React from 'react';
import { Button } from './Button';
import { Badge } from './Badge';
import { Progress } from './Progress';
import { Milestone } from '@/types';
import { cn } from '@/lib/utils';

interface MilestoneCardProps {
  milestone: Milestone;
  onRelease: (id: number) => void;
}

const MilestoneCard: React.FC<MilestoneCardProps> = ({ milestone, onRelease }) => {
  const { id, title, status, amount, progress, goal } = milestone;

  const isReleaseEligible = status === 'unlocked';

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <Badge status={status} />
        </div>
        <p className="text-sm text-gray-500 mb-1">
          <span className="font-medium text-gray-700">${amount.toLocaleString()}</span> Milestone Amount
        </p>
        {status !== 'locked' && (
          <div className="mt-3">
            <div className="flex justify-between items-center text-xs text-gray-600 mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} />
            <p className="text-xs text-gray-500 mt-1">
              ${goal.toLocaleString()} raised
            </p>
          </div>
        )}
      </div>
      <div className="mt-4">
        {isReleaseEligible ? (
          <Button onClick={() => onRelease(id)} className="w-full">
            Request Release
          </Button>
        ) : (
          <Button variant="secondary" disabled className="w-full">
            {status === 'released' ? 'Released' : 'Locked'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default MilestoneCard;