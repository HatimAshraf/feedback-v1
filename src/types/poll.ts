
export interface PollQuestion {
  id: string;
  statement: string;
  option1: string;
  option2: string;
  correctOption?: 1 | 2 | null; // Optional correct answer (1 or 2)
  explanation?: string; // Optional explanation for the correct answer
}

export interface UserResponse {
  questionId: string;
  selectedOption: 1 | 2;
  confidenceLevel: number; // 1-5 scale
  comment?: string;
  timeSpent?: number; // Time in seconds
}

export interface PollResults {
  responses: UserResponse[];
  totalTimeSpent: number;
  completedAt: Date;
}
