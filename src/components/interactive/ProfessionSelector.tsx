"use client";
import React from "react";
import { motion } from "framer-motion";
import { 
  GraduationCap, 
  PenTool, 
  Briefcase, 
  Stethoscope, 
  Code2, 
  UserCircle, 
  ChevronRight,
  BookOpen,
  LucideIcon,
  Video,
  Clapperboard,
  TrendingUp,
  Cpu,
  Compass
} from "lucide-react";
import { TiltCard } from "./TiltCard";

export type ProfessionType = 
  'teacher' | 'student' | 'scholar' | 
  'manager' | 'coordinator' | 'executive' |
  'actor' | 'influencer' | 'editor' | 'artist' |
  'engineer' | 'architect' | 'data_scientist' |
  'doctor' | 'lawyer' | 'consultant' |
  'player' | 'coach' | 'scout' | 'general';

interface IdentitySubdivision {
  id: ProfessionType;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

interface IdentityCollective {
  id: string;
  label: string;
  subdivisions: IdentitySubdivision[];
}

const identityTree: IdentityCollective[] = [
  {
    id: 'academic',
    label: 'Academic_Collective',
    subdivisions: [
      { id: 'teacher', title: 'Teacher / Lecturer', description: 'Curriculum & subject mastery.', icon: GraduationCap, color: 'bg-indigo-500' },
      { id: 'student', title: 'Student / Researcher', description: 'Learning journey & class work.', icon: BookOpen, color: 'bg-cyan-500' },
      { id: 'scholar', title: 'Scholar / Author', description: 'Publications & research focus.', icon: GraduationCap, color: 'bg-violet-500' },
    ]
  },
  {
    id: 'admin',
    label: 'Administrative_Collective',
    subdivisions: [
      { id: 'manager', title: 'Corporate Manager', description: 'Team & strategy management.', icon: Briefcase, color: 'bg-amber-500' },
      { id: 'executive', title: 'Executive Director', description: 'Organizational leadership.', icon: Briefcase, color: 'bg-slate-700' },
    ]
  },
  {
    id: 'creative',
    label: 'Creative_Collective',
    subdivisions: [
      { id: 'actor', title: 'Actor / Performer', description: 'Showreels & acting credits.', icon: Clapperboard, color: 'bg-violet-600' },
      { id: 'influencer', title: 'Influencer / Creator', description: 'Reach & platform metrics.', icon: TrendingUp, color: 'bg-pink-500' },
      { id: 'editor', title: 'Editor / Writer', description: 'Medium & software stack.', icon: PenTool, color: 'bg-rose-500' },
      { id: 'artist', title: 'Designer / Artist', description: 'Tools & visual portfolio.', icon: PenTool, color: 'bg-orange-500' },
    ]
  },
  {
    id: 'tech',
    label: 'Technical_Collective',
    subdivisions: [
      { id: 'engineer', title: 'Software Engineer', description: 'Technical & repo focus.', icon: Code2, color: 'bg-blue-600' },
      { id: 'architect', title: 'System Architect', description: 'Systems & cloud design.', icon: Cpu, color: 'bg-indigo-600' },
    ]
  },
  {
    id: 'sports',
    label: 'Athletic_Collective',
    subdivisions: [
      { id: 'player', title: 'Active Player', description: 'Sport, Team & Career Stats.', icon: TrendingUp, color: 'bg-emerald-600' },
      { id: 'coach', title: 'Sports Coach', description: 'Coaching style & record.', icon: UserCircle, color: 'bg-emerald-500' },
      { id: 'scout', title: 'Talent Scout', description: 'Discoveries & focus area.', icon: Compass, color: 'bg-slate-500' },
    ]
  }
];

interface ProfessionSelectorProps {
  onSelect: (types: ProfessionType[]) => void;
  selected?: ProfessionType | ProfessionType[];
}

export const ProfessionSelector = ({ onSelect, selected }: ProfessionSelectorProps) => {
  const currentSelected = Array.isArray(selected) ? selected : (selected ? [selected] : []);

  const renderCollective = (collective: IdentityCollective) => (
    <div key={collective.id} className="space-y-6">
      <div className="flex items-center gap-4 px-2">
        <div className="h-px flex-1 bg-slate-200"></div>
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em]">{collective.label}</h4>
        <div className="h-px flex-1 bg-slate-200"></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {collective.subdivisions.map((sub, index) => {
          const Icon = sub.icon;
          const isSelected = currentSelected.includes(sub.id);
          
          return (
            <motion.div
              key={sub.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => {
                const nextSelected = isSelected
                  ? currentSelected.filter(id => id !== sub.id)
                  : [...currentSelected, sub.id];
                onSelect(nextSelected);
              }}
              className="relative cursor-pointer group"
            >
              <div className={`p-5 rounded-2xl border-2 transition-all duration-300 h-full ${
                isSelected 
                  ? 'bg-blue-50/50 border-blue-500 shadow-xl shadow-blue-500/10' 
                  : 'bg-white border-slate-100 hover:border-slate-200'
              }`}>
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-10 h-10 ${sub.color} rounded-xl flex items-center justify-center text-white shadow-lg`}>
                    <Icon size={20} />
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    isSelected ? 'bg-blue-600 border-blue-600' : 'border-slate-200'
                  }`}>
                    {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </div>
                </div>
                <h3 className="text-xs font-black text-slate-900 mb-1 uppercase tracking-tight">{sub.title}</h3>
                <p className="text-[9px] text-slate-500 font-medium leading-relaxed uppercase tracking-tighter">
                  {sub.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="space-y-12 p-2">
      {identityTree.map(renderCollective)}
    </div>
  );
};
