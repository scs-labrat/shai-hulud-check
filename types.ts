export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export interface IOC {
  type: 'SHA1' | 'Filename' | 'Command' | 'Filepath';
  value: string;
  description: string;
}

export interface DetectionRule {
  name: string;
  query: string;
  type: 'SentinelOne' | 'Generic';
}

export enum ThreatLevel {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  CRITICAL = 'Critical'
}