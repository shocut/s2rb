import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum PropertyCondition {
  EXCELLENT = "EXCELLENT",
  GOOD = "GOOD",
  FAIR = "FAIR",
  POOR = "POOR"
}

export enum ClientReason {
  FORBEARANCE = "FORBEARANCE",
  FORECLOSURE = "FORECLOSURE",
  RETIREMENT = "RETIREMENT",
  MARKET = "MARKET",
  OTHER = "OTHER"
}

export enum RealEstateStatus {
  NEW = "NEW",
  DOCS_UPLOADED = "DOCS_UPLOADED",
  DOCS_IN_REVIEW = "DOCS_IN_REVIEW",
  DOCS_REVIEWED = "DOCS_REVIEWED",
  REFERRAL_GENERATED = "REFERRAL_GENERATED",
  REFERRAL_DISPATCHED = "REFERRAL_DISPATCHED",
  REFERRAL_SIGNED = "REFERRAL_SIGNED",
  LISTING_AUTHORIZED = "LISTING_AUTHORIZED",
  AGENT_INSPECTED = "AGENT_INSPECTED",
  TITLE_CHECKED = "TITLE_CHECKED",
  UNDER_CONTRACT = "UNDER_CONTRACT",
  SOLD = "SOLD"
}

export enum FeeType {
  PERCENTAGE = "PERCENTAGE",
  FLAT = "FLAT"
}

export enum ReferralType {
  BUYER = "BUYER",
  SELLER = "SELLER"
}

export declare class ExteriorRepair {
  readonly painting?: number;
  readonly structure?: number;
  readonly landscaping?: number;
  readonly roof?: number;
  readonly windows?: number;
  readonly other?: number;
  constructor(init: ModelInit<ExteriorRepair>);
}

export declare class InteriorRepair {
  readonly painting?: number;
  readonly structure?: number;
  readonly appliances?: number;
  readonly utilities?: number;
  readonly flooring?: number;
  readonly other?: number;
  constructor(init: ModelInit<InteriorRepair>);
}

export declare class Attachment {
  readonly name: string;
  readonly category?: string;
  readonly fileKey?: string;
  readonly status?: string;
  readonly description?: string;
  constructor(init: ModelInit<Attachment>);
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

type BrokerPriceOpinionMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
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

export declare class BrokerPriceOpinion {
  readonly id: string;
  readonly sellerRealEstateProfileID?: string;
  readonly dateInspected?: string;
  readonly agentEmail?: string;
  readonly exteriorInspected?: boolean;
  readonly interiorInspected?: boolean;
  readonly salePriceEstimateAsIs?: number;
  readonly salePriceEstimateAsRepaired?: number;
  readonly houseType?: string;
  readonly occupant?: string;
  readonly attachments?: (Attachment | null)[];
  readonly interiorRepairs?: InteriorRepair;
  readonly exteriorRepairs?: ExteriorRepair;
  readonly repairsRecommended?: boolean;
  readonly propertyCondition?: PropertyCondition | keyof typeof PropertyCondition;
  readonly inspectionComments?: string;
  readonly isPropertyOnMLS?: boolean;
  readonly revision?: number;
  readonly status?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<BrokerPriceOpinion, BrokerPriceOpinionMetaData>);
  static copyOf(source: BrokerPriceOpinion, mutator: (draft: MutableModel<BrokerPriceOpinion, BrokerPriceOpinionMetaData>) => MutableModel<BrokerPriceOpinion, BrokerPriceOpinionMetaData> | void): BrokerPriceOpinion;
}

export declare class Referral {
  readonly id: string;
  readonly feeBasis?: string;
  readonly token?: string;
  readonly clientType?: string;
  readonly listingPriceEstimate?: number;
  readonly clientReason?: string;
  readonly feeType?: string;
  readonly feeValue?: string;
  readonly referralType?: string;
  readonly buyerReferenceID?: string;
  readonly senderSignedDate?: string;
  readonly receiverSignedDate?: string;
  readonly referralNote?: string;
  readonly sellerRealEstateProfileID?: string;
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
  readonly status?: RealEstateStatus | keyof typeof RealEstateStatus;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly sellerPhone?: string;
  readonly sellerEmail?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<SellerRealEstateProfile, SellerRealEstateProfileMetaData>);
  static copyOf(source: SellerRealEstateProfile, mutator: (draft: MutableModel<SellerRealEstateProfile, SellerRealEstateProfileMetaData>) => MutableModel<SellerRealEstateProfile, SellerRealEstateProfileMetaData> | void): SellerRealEstateProfile;
}