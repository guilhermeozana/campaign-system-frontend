import { Banner } from "./banner";

export class Campanha {
  campaign!: Campaign;
}

export class Campaign {
  id!: number;
  name!: string;
  description!: string;
  active!: any;
  starts_at!: any;
  stop_at!: any;
  banners!: Banner[];
}
