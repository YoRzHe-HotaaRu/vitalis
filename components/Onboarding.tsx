import React, { useState } from 'react';
import { UserProfile } from '../types';
import { NeoButton, NeoCard, NeoInput } from './ui/NeoComponents';
import { ArrowRight, Check, Activity, Leaf, Target, User } from 'lucide-react';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    age: null,
    goals: [],
    dietaryPreferences: [],
    activityLevel: 'moderate',
    onboardingComplete: false
  });

  const handleNext = () => setStep(p => p + 1);

  const toggleSelection = (field: keyof UserProfile, value: string) => {
    setProfile(prev => {
      const current = prev[field] as string[];
      if (current.includes(value)) {
        return { ...prev, [field]: current.filter(i => i !== value) };
      }
      return { ...prev, [field]: [...current, value] };
    });
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="space-y-6 animate-fadeIn">
            <h1 className="font-serif text-5xl mb-2">Welcome to Vitalis.</h1>
            <p className="text-xl font-mono text-muted-foreground">Your proactive AI health companion.</p>
            <div className="pt-8">
              <label className="block font-bold mb-2 uppercase text-sm">What should we call you?</label>
              <div className="flex gap-4">
                <NeoInput 
                  value={profile.name} 
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  placeholder="Enter your name"
                  autoFocus
                />
                <NeoButton onClick={handleNext} disabled={!profile.name}>
                  <ArrowRight />
                </NeoButton>
              </div>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 text-primary">
                <Target className="w-6 h-6" />
                <span className="font-mono font-bold">MISSION PARAMETERS</span>
            </div>
            <h2 className="font-serif text-4xl">What is your primary focus?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {['Weight Loss', 'Muscle Gain', 'Energy & Focus', 'Longevity', 'Stress Management'].map((goal) => (
                <button
                  key={goal}
                  onClick={() => toggleSelection('goals', goal)}
                  className={`p-6 border-2 border-border text-left transition-all ${
                    profile.goals.includes(goal) 
                    ? 'bg-accent text-accent-foreground shadow-neo translate-x-[-2px] translate-y-[-2px]' 
                    : 'bg-card hover:bg-muted'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-bold font-mono uppercase">{goal}</span>
                    {profile.goals.includes(goal) && <Check size={16} />}
                  </div>
                </button>
              ))}
            </div>
            <div className="flex justify-end pt-4">
               <NeoButton onClick={handleNext} disabled={profile.goals.length === 0}>Next</NeoButton>
            </div>
          </div>
        );
      case 2:
        return (
             <div className="space-y-6 animate-fadeIn">
            <div className="flex items-center gap-2 text-secondary-foreground">
                <Leaf className="w-6 h-6" />
                <span className="font-mono font-bold">FUEL SOURCE</span>
            </div>
            <h2 className="font-serif text-4xl">Any dietary preferences?</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {['Omnivore', 'Vegetarian', 'Vegan', 'Keto', 'Paleo', 'Gluten-Free'].map((diet) => (
                <button
                  key={diet}
                  onClick={() => toggleSelection('dietaryPreferences', diet)}
                  className={`p-4 border-2 border-border text-center font-mono text-sm transition-all ${
                    profile.dietaryPreferences.includes(diet) 
                    ? 'bg-chart3 text-white shadow-neo' 
                    : 'bg-card hover:bg-muted'
                  }`}
                >
                  {diet}
                </button>
              ))}
            </div>
             <div className="flex justify-end pt-4">
               <NeoButton onClick={handleNext}>Next</NeoButton>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-fadeIn">
             <div className="flex items-center gap-2 text-chart4">
                <Activity className="w-6 h-6" />
                <span className="font-mono font-bold">BASELINE METRICS</span>
            </div>
            <h2 className="font-serif text-4xl">How active are you currently?</h2>
            <div className="space-y-3">
              {[
                { id: 'sedentary', label: 'Sedentary', desc: 'Office job, limited exercise' },
                { id: 'moderate', label: 'Moderate', desc: '1-3 workouts per week' },
                { id: 'active', label: 'Active', desc: '3-5 workouts per week' },
                { id: 'athlete', label: 'Athlete', desc: 'Training almost every day' }
              ].map((level) => (
                 <button
                  key={level.id}
                  onClick={() => setProfile({...profile, activityLevel: level.id as any})}
                  className={`w-full p-4 border-2 border-border text-left flex justify-between items-center group transition-all ${
                    profile.activityLevel === level.id
                    ? 'bg-primary text-primary-foreground shadow-neo' 
                    : 'bg-card hover:bg-muted'
                  }`}
                >
                  <div>
                    <div className="font-bold uppercase font-mono">{level.label}</div>
                    <div className={`text-sm ${profile.activityLevel === level.id ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{level.desc}</div>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 border-current ${profile.activityLevel === level.id ? 'bg-current' : 'bg-transparent'}`}></div>
                </button>
              ))}
            </div>
            <div className="flex justify-end pt-4">
               <NeoButton 
                onClick={() => onComplete({...profile, onboardingComplete: true})}
                variant="accent"
               >
                 Launch Mission Control
               </NeoButton>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="mb-8 flex gap-2">
            {[0, 1, 2, 3].map(i => (
                <div key={i} className={`h-2 flex-1 border border-border ${i <= step ? 'bg-foreground' : 'bg-muted'}`} />
            ))}
        </div>
        <NeoCard className="min-h-[400px] flex flex-col justify-center">
            {renderStep()}
        </NeoCard>
      </div>
    </div>
  );
};

export default Onboarding;
