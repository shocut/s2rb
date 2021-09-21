import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum FeeType {
  PERCENTAGE = "PERCENTAGE",
  FLAT = "FLAT"
}

export enum ReferralType {
  BUYER = "BUYER",
  SELLER = "SELLER"
}

export declare class Location {
  readonly id?: string;
  readonly name: string;
  readonly description?: string;
  readonly streetAddress: string;
  readonly city: string;
  readonly adminArea?: string;
  readonly stateProvinceOrRegion: string;
  readonly country: string;
  readonly countryCode?: string;
  readonly postalCode: string;
  readonly postalCodeSuffix?: string;
  readonly formattedAddress?: string;
  readonly status?: string;
  constructor(init: ModelInit<Location>);
}

export declare class Attachment {
  readonly name: string;
  readonly category?: string;
  readonly fileURL?: string;
  readonly status?: string;
  readonly description?: string;
  constructor(init: ModelInit<Attachment>);
}

type ReferralMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type AgentMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type InvestorInterestMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type SellerRealEstateProfileMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Referral {
  readonly id: string;
  readonly feeBasis?: FeeType | keyof typeof FeeType;
  readonly token?: string;
  readonly clientType?: string;
  readonly listingPriceEstimate?: number;
  readonly clientReason?: string;
  readonly feeType?: string;
  readonly feeValue?: string;
  readonly referralType?: ReferralType | keyof typeof ReferralType;
  readonly buyerReferenceID?: string;
  readonly sellerrealestateprofileID?: string;
  readonly senderSignedDate?: string;
  readonly receiverSignedDate?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Referral, ReferralMetaData>);
  static copyOf(source: Referral, mutator: (draft: MutableModel<Referral, ReferralMetaData>) => MutableModel<Referral, ReferralMetaData> | void): Referral;
}

export declare class Agent {
  readonly id: string;
  readonly name?: string;
  readonly officeName?: string;
  readonly address?: Location;
  readonly email?: string;
  readonly primaryPhone?: string;
  readonly cellPhone?: string;
  readonly faxNumber?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Agent, AgentMetaData>);
  static copyOf(source: Agent, mutator: (draft: MutableModel<Agent, AgentMetaData>) => MutableModel<Agent, AgentMetaData> | void): Agent;
}

export declare class InvestorInterest {
  readonly id: string;
  readonly name?: string;
  readonly email?: string;
  readonly phone?: string;
  readonly investmentRange?: string;
  readonly financing?: string;
  readonly message?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<InvestorInterest, InvestorInterestMetaData>);
  static copyOf(source: InvestorInterest, mutator: (draft: MutableModel<InvestorInterest, InvestorInterestMetaData>) => MutableModel<InvestorInterest, InvestorInterestMetaData> | void): InvestorInterest;
}

export declare class SellerRealEstateProfile {
  readonly id: string;
  readonly searchStage?: string;
  readonly houseType?: string;
  readonly primaryHome?: string;
  readonly address?: Location;
  readonly sellerReference?: string;
  readonly rentBackPeriod?: string;
  readonly bedrooms?: string;
  readonly bathrooms?: string;
  readonly attachments?: (Attachment | null)[];
  readonly Referrals?: (Referral | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<SellerRealEstateProfile, SellerRealEstateProfileMetaData>);
  static copyOf(source: SellerRealEstateProfile, mutator: (draft: MutableModel<SellerRealEstateProfile, SellerRealEstateProfileMetaData>) => MutableModel<SellerRealEstateProfile, SellerRealEstateProfileMetaData> | void): SellerRealEstateProfile;
}