// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { SellerRealEstateProfile, Attachment, Location } = initSchema(schema);

export {
  SellerRealEstateProfile,
  Attachment,
  Location
};