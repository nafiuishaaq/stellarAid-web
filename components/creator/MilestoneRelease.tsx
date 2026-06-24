'use client';

import React, { useState } from 'react';
import MilestoneCard from '../ui/milestone';
import { Milestone } from '@/types';

const mockMilestones: Milestone[] = [
  {
    id: 1,
    title: 'MILESTONE 1: PROJECT SETUP & TEAM FORMATION',
    status: 'unlocked',
    amount: 15000,
    progress: 100,
    goal: 15000,
  },
  {
    id: 2,
    title: 'MILESTONE 2: PLATFORM DEVELOPMENT & ALPHA TESTING',
    status: 'locked',
    amount: 25000,
    progress: 45,
    goal: 40000,
  },
  {
    id: 3,
    title: 'MILESTONE 3: PUBLIC BETA LAUNCH & MARKETING',
    status: 'locked',
    amount: 20000,
    progress: 0,
    goal: 60000,
  },
  {
    id: 4,
    title: 'MILESTONE 4: FINAL RELEASE & SCALING',
    status: 'released',
    amount: 10000,
    progress: 100,
    goal: 10000,
  },
];

const MilestoneRelease: React.FC = () => {
  const [milestones, setMilestones] = useState<Milestone[]>(mockMilestones);

  const handleRelease = (id: number) => {
    // Here you would typically trigger a wallet interaction
    // For now, we'll simulate the process
    console.log(`Requesting release for milestone ${id}`);
    setMilestones(milestones.map(m => 
      m.id === id ? { ...m, status: 'pending' } : m
    ));

    // Simulate a delay for the release process
    setTimeout(() => {
      setMilestones(milestones.map(m => 
        m.id === id ? { ...m, status: 'released' } : m
      ));
    }, 3000);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Milestone Fund Release</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {milestones.map(milestone => (
          <MilestoneCard key={milestone.id} milestone={milestone} onRelease={handleRelease} />
        ))}
      </div>
    </div>
  );
};

export default MilestoneRelease;