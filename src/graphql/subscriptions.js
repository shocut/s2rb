/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateReferral = /* GraphQL */ `
  subscription OnCreateReferral {
    onCreateReferral {
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
export const onUpdateReferral = /* GraphQL */ `
  subscription OnUpdateReferral {
    onUpdateReferral {
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
export const onDeleteReferral = /* GraphQL */ `
  subscription OnDeleteReferral {
    onDeleteReferral {
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
export const onCreateAgent = /* GraphQL */ `
  subscription OnCreateAgent {
    onCreateAgent {
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
export const onUpdateAgent = /* GraphQL */ `
  subscription OnUpdateAgent {
    onUpdateAgent {
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
export const onDeleteAgent = /* GraphQL */ `
  subscription OnDeleteAgent {
    onDeleteAgent {
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
export const onCreateInvestorInterest = /* GraphQL */ `
  subscription OnCreateInvestorInterest {
    onCreateInvestorInterest {
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
export const onUpdateInvestorInterest = /* GraphQL */ `
  subscription OnUpdateInvestorInterest {
    onUpdateInvestorInterest {
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
export const onDeleteInvestorInterest = /* GraphQL */ `
  subscription OnDeleteInvestorInterest {
    onDeleteInvestorInterest {
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
export const onCreateSellerRealEstateProfile = /* GraphQL */ `
  subscription OnCreateSellerRealEstateProfile {
    onCreateSellerRealEstateProfile {
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
export const onUpdateSellerRealEstateProfile = /* GraphQL */ `
  subscription OnUpdateSellerRealEstateProfile {
    onUpdateSellerRealEstateProfile {
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
export const onDeleteSellerRealEstateProfile = /* GraphQL */ `
  subscription OnDeleteSellerRealEstateProfile {
    onDeleteSellerRealEstateProfile {
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
