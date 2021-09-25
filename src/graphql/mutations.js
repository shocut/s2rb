/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createReferral = /* GraphQL */ `
  mutation CreateReferral(
    $input: CreateReferralInput!
    $condition: ModelReferralConditionInput
  ) {
    createReferral(input: $input, condition: $condition) {
      id
      feeBasis
      token
      clientType
      listingPriceEstimate
      clientReason
      feeType
      feeValue
      referralType
      buyerReferenceID
      sellerrealestateprofileID
      senderSignedDate
      receiverSignedDate
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateReferral = /* GraphQL */ `
  mutation UpdateReferral(
    $input: UpdateReferralInput!
    $condition: ModelReferralConditionInput
  ) {
    updateReferral(input: $input, condition: $condition) {
      id
      feeBasis
      token
      clientType
      listingPriceEstimate
      clientReason
      feeType
      feeValue
      referralType
      buyerReferenceID
      sellerrealestateprofileID
      senderSignedDate
      receiverSignedDate
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteReferral = /* GraphQL */ `
  mutation DeleteReferral(
    $input: DeleteReferralInput!
    $condition: ModelReferralConditionInput
  ) {
    deleteReferral(input: $input, condition: $condition) {
      id
      feeBasis
      token
      clientType
      listingPriceEstimate
      clientReason
      feeType
      feeValue
      referralType
      buyerReferenceID
      sellerrealestateprofileID
      senderSignedDate
      receiverSignedDate
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const createAgent = /* GraphQL */ `
  mutation CreateAgent(
    $input: CreateAgentInput!
    $condition: ModelAgentConditionInput
  ) {
    createAgent(input: $input, condition: $condition) {
      id
      name
      officeName
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
      email
      primaryPhone
      cellPhone
      faxNumber
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const updateAgent = /* GraphQL */ `
  mutation UpdateAgent(
    $input: UpdateAgentInput!
    $condition: ModelAgentConditionInput
  ) {
    updateAgent(input: $input, condition: $condition) {
      id
      name
      officeName
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
      email
      primaryPhone
      cellPhone
      faxNumber
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const deleteAgent = /* GraphQL */ `
  mutation DeleteAgent(
    $input: DeleteAgentInput!
    $condition: ModelAgentConditionInput
  ) {
    deleteAgent(input: $input, condition: $condition) {
      id
      name
      officeName
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
      email
      primaryPhone
      cellPhone
      faxNumber
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
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
        fileKey
        status
        description
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Referrals {
        items {
          id
          feeBasis
          token
          clientType
          listingPriceEstimate
          clientReason
          feeType
          feeValue
          referralType
          buyerReferenceID
          sellerrealestateprofileID
          senderSignedDate
          receiverSignedDate
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
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
        fileKey
        status
        description
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Referrals {
        items {
          id
          feeBasis
          token
          clientType
          listingPriceEstimate
          clientReason
          feeType
          feeValue
          referralType
          buyerReferenceID
          sellerrealestateprofileID
          senderSignedDate
          receiverSignedDate
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
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
        fileKey
        status
        description
      }
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
      Referrals {
        items {
          id
          feeBasis
          token
          clientType
          listingPriceEstimate
          clientReason
          feeType
          feeValue
          referralType
          buyerReferenceID
          sellerrealestateprofileID
          senderSignedDate
          receiverSignedDate
          _version
          _deleted
          _lastChangedAt
          createdAt
          updatedAt
        }
        nextToken
        startedAt
      }
      owner
    }
  }
`;
