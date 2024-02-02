export class Answer {
  id?: number;
  ask_id?: number | null;
  sequence!: number;
  description!: string;
  active!: boolean;
  created_at!: Date;
  updated_at!: Date;
  survey_id?: any;
  answer_option_id?: any;
  user_id?: any;
  answer_text?: any;
}

export class AnswerRequest {
  answer!: Answer;
}


