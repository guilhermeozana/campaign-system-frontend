export class Menu {
  id!: number;
  name!: string;
  url!: string;
  icon!: string;
  active!: boolean;
  system_id!: number;
  menus_id!: number;
  created_at!: Date;
  updated_at!: Date;
  children!: Menu[];
}
