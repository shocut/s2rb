/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getReferral = /* GraphQL */ `
  query GetReferral($id: ID!) {
    getReferral(id: $id) {
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
export const listReferrals = /* GraphQL */ `
  query ListReferrals(
    $filter: ModelReferralFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReferrals(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
  }
`;
export const syncReferrals = /* GraphQL */ `
  query SyncReferrals(
    $filter: ModelReferralFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncReferrals(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
  }
`;
export const getAgent = /* GraphQL */ `
  query GetAgent($id: ID!) {
    getAgent(id: $id) {
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
export const listAgents = /* GraphQL */ `
  query ListAgents(
    $filter: ModelAgentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAgents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
export const syncAgents = /* GraphQL */ `
  query SyncAgents(
    $filter: ModelAgentFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncAgents(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
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
      nextToken
      startedAt
    }
  }
`;
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
          nextToken
          startedAt
        }
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
          nextToken
          startedAt
        }
        owner
      }
      nextToken
      startedAt
    }
  }
`;
