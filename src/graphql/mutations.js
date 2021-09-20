/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createInvestorInterest = /* GraphQL */ `
  mutation CreateInvestorInterest(
    $input: CreateInvestorInterestInput!
    $condition: ModelInvestorInterestConditionInput
  ) {
    createInvestorInterest(input: $input, condition: $condition) {
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
export const updateInvestorInterest = /* GraphQL */ `
  mutation UpdateInvestorInterest(
    $input: UpdateInvestorInterestInput!
    $condition: ModelInvestorInterestConditionInput
  ) {
    updateInvestorInterest(input: $input, condition: $condition) {
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
export const deleteInvestorInterest = /* GraphQL */ `
  mutation DeleteInvestorInterest(
    $input: DeleteInvestorInterestInput!
    $condition: ModelInvestorInterestConditionInput
  ) {
    deleteInvestorInterest(input: $input, condition: $condition) {
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
export const createSellerRealEstateProfile = /* GraphQL */ `
  mutation CreateSellerRealEstateProfile(
    $input: CreateSellerRealEstateProfileInput!
    $condition: ModelSellerRealEstateProfileConditionInput
  ) {
    createSellerRealEstateProfile(input: $input, condition: $condition) {
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
export const updateSellerRealEstateProfile = /* GraphQL */ `
  mutation UpdateSellerRealEstateProfile(
    $input: UpdateSellerRealEstateProfileInput!
    $condition: ModelSellerRealEstateProfileConditionInput
  ) {
    updateSellerRealEstateProfile(input: $input, condition: $condition) {
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
export const deleteSellerRealEstateProfile = /* GraphQL */ `
  mutation DeleteSellerRealEstateProfile(
    $input: DeleteSellerRealEstateProfileInput!
    $condition: ModelSellerRealEstateProfileConditionInput
  ) {
    deleteSellerRealEstateProfile(input: $input, condition: $condition) {
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
