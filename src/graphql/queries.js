/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getInvestorInterest = /* GraphQL */ `
  query GetInvestorInterest($id: ID!) {
    getInvestorInterest(id: $id) {
      id
      name
      email
      phone
      investmentRange
      financing
      message
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listInvestorInterests = /* GraphQL */ `
  query ListInvestorInterests(
    $filter: ModelInvestorInterestFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInvestorInterests(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        email
        phone
        investmentRange
        financing
        message
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncInvestorInterests = /* GraphQL */ `
  query SyncInvestorInterests(
    $filter: ModelInvestorInterestFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncInvestorInterests(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        email
        phone
        investmentRange
        financing
        message
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
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
        status
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
          status
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
          status
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
