export interface ITenant {
  _id: string;
  tenantKey: string;
  tenantName: string;
  tenantProfile?: string;
}

export interface ICreateTenantPayload extends Omit<ITenant, '_id'> {}

export interface IUpdateTenantPayload {
  _id: string;
  tenantName?: string;
  tenantProfile?: string;
}
