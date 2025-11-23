import React, { useState } from 'react';
import { UserProfile, AppStage } from './types';
import Onboarding from './components/Onboarding';
import { Dashboard } from './components/Dashboard/Dashboard';

function App() {
  const [stage, setStage] = useState<AppStage>(AppStage.ONBOARDING);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleOnboardingComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    setStage(AppStage.DASHBOARD);
  };

  return (
    <div className="bg-background min-h-screen text-foreground font-sans selection:bg-accent selection:text-accent-foreground">
      {stage === AppStage.ONBOARDING && (
        <Onboarding onComplete={handleOnboardingComplete} />
      )}
      
      {stage === AppStage.DASHBOARD && userProfile && (
        <Dashboard userProfile={userProfile} />
      )}
    </div>
  );
}

export default App;
