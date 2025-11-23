export enum AppStage {
  ONBOARDING,
  DASHBOARD
}

export enum MessageSender {
  USER,
  BOT,
  SYSTEM
}

export interface Message {
  id: string;
  text: string;
  sender: MessageSender;
  timestamp: Date;
  metadata?: {
    type?: 'plan' | 'alert' | 'success';
    data?: any;
  };
}

export interface UserProfile {
  name: string;
  age: number | null;
  goals: string[];
  dietaryPreferences: string[];
  activityLevel: 'sedentary' | 'moderate' | 'active' | 'athlete';
  onboardingComplete: boolean;
}

export interface BiometricData {
  steps: number;
  sleepHours: number;
  waterIntake: number; // in oz
  energyScore: number; // 0-100
  heartRate: number;
}

export interface DailyGoal {
  type: 'move' | 'eat' | 'sleep' | 'mind';
  current: number;
  target: number;
  unit: string;
  color: string;
}