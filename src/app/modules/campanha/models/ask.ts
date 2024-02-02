import { Answer } from "./answer";

export class Ask {
  id!: any;
  description!: string;
  is_required!: boolean;
  component_type!: string;
  created_at!: Date;
  updated_at!: Date;
  answer_options!: Answer;
}
