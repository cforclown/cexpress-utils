export interface ITenant {
  id: string;
  shortName: string;
  name: string;
  profile?: string;
}

export interface ICreateTenantPayload extends Omit<ITenant, 'id'> {}

export interface IUpdateTenantPayload {
  id: string;
  name?: string;
  profile?: string;
}
