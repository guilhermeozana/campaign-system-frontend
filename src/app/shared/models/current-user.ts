export class CurrentUser {
  id!: number;
  type: any;
  attributes!: Attributes;
}

class Attributes {
  email!: string;
  name: string = '';
  user_name!: string;
  created_at!: Date;
  updated_at!: Date;
  jti!: string;
  admin: any;
  publisher!: boolean;
  scope: any
  id!: number;
}






