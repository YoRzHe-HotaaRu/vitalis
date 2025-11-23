import React, { useEffect, useState } from 'react';
import { UserProfile, BiometricData } from '../../types';
import { ChatInterface } from '../Chat/ChatInterface';
import { NeoCard, Badge } from '../ui/NeoComponents';
import { Activity, Moon, Droplets, Zap, Flame, Calendar, Trophy, Heart, ArrowUpRight } from 'lucide-react';
import { generateQuickTip } from '../../services/geminiService';

interface DashboardProps {
  userProfile: UserProfile;
}

// Simulated Live Data Hook
const useLiveBiometrics = () => {
  const [data, setData] = useState<BiometricData>({
    steps: 4230,
    sleepHours: 6.5,
    waterIntake: 24,
    energyScore: 72,
    heartRate: 68
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        heartRate: 60 + Math.floor(Math.random() * 20),
        steps: prev.steps + Math.floor(Math.random() * 5)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return data;
};

export const Dashboard: React.FC<DashboardProps> = ({ userProfile }) => {
  const biometrics = useLiveBiometrics();
  const [tip, setTip] = useState<string>("Analyzing recent patterns...");

  useEffect(() => {
    generateQuickTip(biometrics).then(setTip);
  }, []); // Run once on mount for demo

  return (
    <div className="flex h-screen w-full bg-background text-foreground overflow-hidden flex-col md:flex-row">
      
      {/* Sidebar / Stats Column */}
      <div className="w-full md:w-80 border-r-2 border-border flex flex-col h-full bg-sidebar overflow-y-auto no-scrollbar shrink-0">
        <div className="p-6 border-b-2 border-border">
          <h1 className="font-serif text-2xl tracking-tight">VITALIS</h1>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-mono text-xs text-muted-foreground uppercase">Biometrics Active</span>
          </div>
        </div>

        {/* Energy Score (Hero Metric) */}
        <div className="p-6 border-b-2 border-border bg-card">
          <div className="flex justify-between items-start mb-4">
             <span className="font-mono font-bold text-sm uppercase">Energy Score</span>
             <Zap className="text-accent w-5 h-5" />
          </div>
          <div className="text-5xl font-serif font-bold mb-2">{biometrics.energyScore}</div>
          <div className="w-full bg-muted h-2 border border-border">
             <div className="bg-accent h-full transition-all duration-1000" style={{ width: `${biometrics.energyScore}%` }}></div>
          </div>
          <p className="mt-4 text-xs font-mono leading-relaxed text-muted-foreground border-l-2 border-accent pl-2">
            {tip}
          </p>
        </div>

        {/* Live Intelligence / Tips Replacement */}
        <div className="p-6 border-b-2 border-border bg-muted/10">
           <div className="flex items-center justify-between mb-4">
              <span className="font-mono font-bold text-xs uppercase tracking-widest text-muted-foreground">Live Intelligence</span>
              <div className="flex items-center gap-1">
                 <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                 <span className="font-mono text-[10px] font-bold">ONLINE</span>
              </div>
           </div>

           <div className="space-y-3">
              {/* Tip Card 1 */}
              <div className="bg-background border-2 border-border p-3 shadow-neo-sm hover:shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2 text-chart4">
                          <Droplets size={16} className="fill-current" />
                          <span className="font-bold font-mono text-xs uppercase">Hydration Gap</span>
                      </div>
                      <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm font-medium leading-tight mb-2">
                    You're <strong>{Math.max(0, 80 - biometrics.waterIntake)}oz</strong> behind target. 
                  </p>
                  <div className="text-[10px] font-mono bg-muted inline-block px-1 py-0.5 border border-border">
                    ACTION: DRINK 12OZ
                  </div>
              </div>

              {/* Tip Card 2 */}
              <div className="bg-background border-2 border-border p-3 shadow-neo-sm hover:shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2 text-chart3">
                          <Activity size={16} />
                          <span className="font-bold font-mono text-xs uppercase">Mobility</span>
                      </div>
                      <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm font-medium leading-tight mb-2">
                    Sedentary for <strong>1h 45m</strong>. Metabolic rate dropping.
                  </p>
                  <div className="text-[10px] font-mono bg-muted inline-block px-1 py-0.5 border border-border">
                    ACTION: 5 MIN STRETCH
                  </div>
              </div>
              
               {/* Tip Card 3 */}
              <div className="bg-background border-2 border-border p-3 shadow-neo-sm hover:shadow-neo hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all cursor-pointer group">
                  <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2 text-chart2">
                          <Moon size={16} />
                          <span className="font-bold font-mono text-xs uppercase">Recovery</span>
                      </div>
                      <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm font-medium leading-tight mb-2">
                    High cognitive load detected today.
                  </p>
                  <div className="text-[10px] font-mono bg-muted inline-block px-1 py-0.5 border border-border">
                    ACTION: NSDR PROTOCOL
                  </div>
              </div>
           </div>
        </div>

        {/* Widgets */}
        <div className="p-6 space-y-4 bg-muted/20 flex-1">
             <NeoCard className="p-4" title="Habit Streak">
                <div className="flex items-center gap-3">
                    <Flame className="text-orange-500 w-8 h-8" />
                    <div>
                        <div className="text-2xl font-bold font-serif">12 Days</div>
                        <div className="text-xs font-mono text-muted-foreground">Keep it up!</div>
                    </div>
                </div>
             </NeoCard>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative h-full overflow-hidden min-w-0">
         {/* Header (Mobile Only mainly, but visible on Desktop for profile) */}
         <header className="h-16 border-b-2 border-border flex justify-between items-center px-6 bg-background z-10 shrink-0">
            <div className="flex items-center gap-3 md:hidden">
               <span className="font-serif font-bold text-xl">VITALIS</span>
            </div>
            <div className="hidden md:block font-mono text-sm text-muted-foreground">
               MISSION CONTROL // <span className="text-foreground font-bold">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-4">
                <Badge color="bg-accent/20 text-accent-foreground">LEVEL 3</Badge>
                <div className="w-8 h-8 bg-foreground text-background flex items-center justify-center font-bold border border-border">
                    {userProfile.name.charAt(0)}
                </div>
            </div>
         </header>

         {/* Chat Interface Container */}
         <div className="flex-1 relative overflow-hidden flex flex-col min-h-0">
             <ChatInterface userProfile={userProfile} biometrics={biometrics} />
         </div>
      </div>

      {/* Right Sidebar (Contextual Widgets - Hidden on smaller screens) */}
      <div className="hidden xl:block w-80 border-l-2 border-border bg-sidebar p-6 space-y-6 overflow-y-auto shrink-0">
          <div className="font-mono font-bold text-sm uppercase mb-4 text-muted-foreground">Today's Protocol</div>
          
          <NeoCard title="Nutrition" className="bg-background">
             <ul className="space-y-3 mt-2">
                <li className="flex items-start gap-2 text-sm">
                    <div className="mt-1 w-2 h-2 bg-chart1 flex-shrink-0" />
                    <span>Oatmeal w/ protein powder & berries</span>
                </li>
                <li className="flex items-start gap-2 text-sm">
                    <div className="mt-1 w-2 h-2 bg-chart1 flex-shrink-0" />
                    <span>Grilled chicken salad + avocado</span>
                </li>
                 <li className="flex items-start gap-2 text-sm opacity-50">
                    <div className="mt-1 w-2 h-2 border border-chart1 flex-shrink-0" />
                    <span>Salmon & asparagus</span>
                </li>
             </ul>
          </NeoCard>

           <NeoCard title="Training" className="bg-background">
             <div className="relative aspect-video bg-muted border-2 border-border mb-3 flex items-center justify-center">
                 <Activity className="opacity-20" />
                 <div className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-transparent transition-colors cursor-pointer">
                    <div className="w-10 h-10 bg-white border-2 border-black flex items-center justify-center rounded-full shadow-neo-sm">
                        <div className="ml-1 w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-black border-b-[6px] border-b-transparent"></div>
                    </div>
                 </div>
             </div>
             <div className="font-bold text-sm">Upper Body Power</div>
             <div className="text-xs font-mono text-muted-foreground mt-1">45 min • Moderate Intensity</div>
          </NeoCard>

           <NeoCard className="bg-accent text-accent-foreground border-accent-foreground" title="Daily Challenge">
             <div className="flex gap-4 items-center">
                <Trophy size={24} />
                <div className="text-sm font-bold">Log all meals before 8 PM</div>
             </div>
           </NeoCard>
      </div>

    </div>
  );
};