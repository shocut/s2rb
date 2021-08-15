import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";



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

type SellerRealEstateProfileMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class SellerRealEstateProfile {
  readonly id: string;
  readonly searchStage?: string;
  readonly houseType?: string;
  readonly primaryHome?: string;
  readonly address?: Location;
  readonly sellerReference?: string;
  readonly rentBackPeriod?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<SellerRealEstateProfile, SellerRealEstateProfileMetaData>);
  static copyOf(source: SellerRealEstateProfile, mutator: (draft: MutableModel<SellerRealEstateProfile, SellerRealEstateProfileMetaData>) => MutableModel<SellerRealEstateProfile, SellerRealEstateProfileMetaData> | void): SellerRealEstateProfile;
}