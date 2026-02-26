
export enum AgentRole {
  POLYMATH = 'POLYMATH',
  TOUR_GUIDE = 'TOUR_GUIDE',
  PATHFINDER = 'PATHFINDER',
  FACILITY = 'FACILITY',
  PHOTO = 'PHOTO',
  EXPERT = 'EXPERT'
}

export interface Agent {
  id: AgentRole;
  name: string;
  tag: string;
  subTag: string;
  intro: string;
  greeting: string;
  image: string;
  avatar: string;
  presets: string[];
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}
