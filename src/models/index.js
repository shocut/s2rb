// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const RealEstateStatus = {
  "NEW": "NEW",
  "DOCS_UPLOADED": "DOCS_UPLOADED",
  "DOCS_IN_REVIEW": "DOCS_IN_REVIEW",
  "DOCS_REVIEWED": "DOCS_REVIEWED",
  "REFERRAL_GENERATED": "REFERRAL_GENERATED",
  "REFERRAL_DISPATCHED": "REFERRAL_DISPATCHED",
  "REFERRAL_SIGNED": "REFERRAL_SIGNED",
  "LISTING_AUTHORIZED": "LISTING_AUTHORIZED",
  "AGENT_INSPECTED": "AGENT_INSPECTED",
  "TITLE_CHECKED": "TITLE_CHECKED",
  "UNDER_CONTRACT": "UNDER_CONTRACT",
  "SOLD": "SOLD"
};

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
  RealEstateStatus,
  FeeType,
  ReferralType,
  Location,
  Attachment
};