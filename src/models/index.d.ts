import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



export declare class Attachment {
  readonly name: string;
  readonly category?: string;
  readonly fileURL?: string;
  readonly status?: string;
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
  constructor(init: ModelInit<Location>);
}

type InvestorInterestMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type SellerRealEstateProfileMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
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
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<SellerRealEstateProfile, SellerRealEstateProfileMetaData>);
  static copyOf(source: SellerRealEstateProfile, mutator: (draft: MutableModel<SellerRealEstateProfile, SellerRealEstateProfileMetaData>) => MutableModel<SellerRealEstateProfile, SellerRealEstateProfileMetaData> | void): SellerRealEstateProfile;
}