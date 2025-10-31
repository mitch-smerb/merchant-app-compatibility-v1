export type Merchant = {
  id: number;
  entityId: string;
  name: string;
  category: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  contactFirstName: string;
  contactLastName: string;
  contactEmail: string;
  contactPhone: string;
  isoName: string;
  agentEmail: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateRequest = {
  entityId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type ZapierPayload = {
  entityId?: number;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
};
