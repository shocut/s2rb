/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getSellerRealEstateProfile = /* GraphQL */ `
  query GetSellerRealEstateProfile($id: ID!) {
    getSellerRealEstateProfile(id: $id) {
      id
      searchStage
      houseType
      primaryHome
      address {
        id
        name
        description
        streetAddress
        city
        adminArea
        stateProvinceOrRegion
        country
        countryCode
        postalCode
        postalCodeSuffix
        formattedAddress
      }
      sellerReference
      rentBackPeriod
      bedrooms
      bathrooms
      attachments {
        name
        category
        fileURL
        status
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listSellerRealEstateProfiles = /* GraphQL */ `
  query ListSellerRealEstateProfiles(
    $filter: ModelSellerRealEstateProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSellerRealEstateProfiles(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        searchStage
        houseType
        primaryHome
        address {
          id
          name
          description
          streetAddress
          city
          adminArea
          stateProvinceOrRegion
          country
          countryCode
          postalCode
          postalCodeSuffix
          formattedAddress
        }
        sellerReference
        rentBackPeriod
        bedrooms
        bathrooms
        attachments {
          name
          category
          fileURL
          status
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncSellerRealEstateProfiles = /* GraphQL */ `
  query SyncSellerRealEstateProfiles(
    $filter: ModelSellerRealEstateProfileFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncSellerRealEstateProfiles(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        searchStage
        houseType
        primaryHome
        address {
          id
          name
          description
          streetAddress
          city
          adminArea
          stateProvinceOrRegion
          country
          countryCode
          postalCode
          postalCodeSuffix
          formattedAddress
        }
        sellerReference
        rentBackPeriod
        bedrooms
        bathrooms
        attachments {
          name
          category
          fileURL
          status
        }
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
