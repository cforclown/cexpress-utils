export interface IRole {
  id: string;
  name: string;
  desc: string;
  capabilities: Record<string, Record<string, any>>;
  tenant: string;
  default?: boolean;
}
