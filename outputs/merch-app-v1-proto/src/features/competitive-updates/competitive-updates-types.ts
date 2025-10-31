export type CompetitiveUpdate = {
  id: number;
  code: string;
  type: string;
  subtype: string;
  title: string;
  text: string;
  publish: boolean;
  characterization: string;
  liked: boolean;
  createdAt: string;
  updatedAt: string;
};

export type MerchantCompetitiveUpdates = {
  merchantId: number;
  instanceId: string;
  radius: number;
  competitiveUpdates: CompetitiveUpdate[];
};

export type PatchRequest = {
  merchantId: number;
  id: number;
  liked: boolean;
};
