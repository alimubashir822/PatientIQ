"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, Sparkles, Trophy } from "lucide-react";

interface GoalItem {
  id: string;
  label: string;
  description: string;
  completed: boolean;
}

export function PatientGoalsChecklist() {
  const [goals, setGoals] = React.useState<GoalItem[]>([
    { id: "profile", label: "Complete Health Profile", description: "Fill in personal info, blood type, and emergency contacts.", completed: true },
    { id: "upload", label: "Upload History Baseline", description: "Upload a PDF or scan to your Secure Document Vault.", completed: true },
    { id: "appointment", label: "Book Routine Consultation", description: "Schedule a routine checkup with your cardiologist.", completed: false },
    { id: "household", label: "Link Household Sync", description: "Connect household family profiles to sync schedules.", completed: false }
  ]);

  const toggleGoal = (id: string) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, completed: !g.completed } : g));
  };

  const completedCount = goals.filter(g => g.completed).length;
  const progressPercent = Math.round((completedCount / goals.length) * 100);

  return (
    <Card className="border-primary/20 bg-linear-to-br from-white to-sky-50/15 shadow-glow">
      <CardHeader className="pb-3 flex flex-row justify-between items-start gap-4">
        <div>
          <span className="text-[10px] uppercase font-bold text-primary tracking-wider flex items-center gap-1">
            <Trophy className="h-3 w-3 text-amber-500" />
            Patient Engagement Goals
          </span>
          <CardTitle className="text-base mt-1.5">My Health Milestones</CardTitle>
          <CardDescription className="text-xs">
            Complete daily checkup activities to optimize your preventive care wellness score.
          </CardDescription>
        </div>
        <div className="flex flex-col items-end shrink-0">
          <span className="text-2xl font-black font-display text-primary">{progressPercent}%</span>
          <span className="text-[10px] font-semibold text-muted-foreground">Goals Complete</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        
        {/* Dynamic Progress Slider */}
        <div className="space-y-1">
          <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          {progressPercent === 100 && (
            <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1 animate-pulse">
              <Sparkles className="h-3.5 w-3.5" /> All milestones reached! Your profile is operating at peak efficiency.
            </span>
          )}
        </div>

        {/* Goals Checklist List */}
        <div className="grid grid-cols-1 gap-2.5">
          {goals.map((goal) => (
            <button
              key={goal.id}
              onClick={() => toggleGoal(goal.id)}
              className={`flex items-start gap-3 p-3 border rounded-xl text-left transition-all cursor-pointer ${
                goal.completed 
                  ? "bg-slate-50/50 border-border/80 text-slate-700" 
                  : "bg-white border-border hover:border-slate-300 shadow-xs text-slate-800"
              }`}
            >
              <div className="shrink-0 pt-0.5">
                {goal.completed ? (
                  <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500 fill-emerald-50" />
                ) : (
                  <Circle className="h-4.5 w-4.5 text-slate-300 hover:text-primary transition-colors" />
                )}
              </div>
              <div className="overflow-hidden">
                <span className={`text-xs font-bold block leading-snug ${goal.completed ? "line-through text-slate-400" : ""}`}>
                  {goal.label}
                </span>
                <span className={`text-[10px] leading-relaxed block mt-0.5 ${goal.completed ? "text-slate-400" : "text-muted-foreground"}`}>
                  {goal.description}
                </span>
              </div>
            </button>
          ))}
        </div>

      </CardContent>
    </Card>
  );
}
