// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const FeeType = {
  "PERCENTAGE": "PERCENTAGE",
  "FLAT": "FLAT"
};

const ReferralType = {
  "BUYER": "BUYER",
  "SELLER": "SELLER"
};

const { Referral, Agent, InvestorInterest, SellerRealEstateProfile, Location, Attachment } = initSchema(schema);

export {
  Referral,
  Agent,
  InvestorInterest,
  SellerRealEstateProfile,
  FeeType,
  ReferralType,
  Location,
  Attachment
};