import { SurveySerialized } from './survey_serialized';

export class Survey {
  id!: any;
  campaign_id!: number;
  campaign_name?: string;
  name!: string;
  description!: string;
  ask_ids!: any;
  is_required?: any;
  show_after?: any;
  active_in_app?: any;
  active_in_site?: any;
  created_at?: any;
  updated_at?: any;
  survey_serialized?: SurveySerialized;
}

export class SurveyRequest {
  survey: any;
}
