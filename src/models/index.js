// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { InvestorInterest, SellerRealEstateProfile, Attachment, Location } = initSchema(schema);

export {
  InvestorInterest,
  SellerRealEstateProfile,
  Attachment,
  Location
};