/* eslint-disable */

var referralTemplateData = new Map();

referralTemplateData.set("VA", {
  id: "5df3180a09ea16dc4b95f910",
  referral_no: "{referral_num}",
  company: "S2RB",
  email: "support@s2rb.com",
  phone: "+1 (844) 366-5081",
  address: "23113 Red Admiral Pl.",
  trans_date: "{updatedAt}",
  agentSection: {
    sectionTitle: "Receiving and Sending Agent Information",
    items: [
      {
        label1: "Receving Agent:",
        label2: "Sending Agent:",
        val1: "Thomas Donegan",
        val2: "Andrew Norton",
      },
      {
        label1: "Office Name:",
        label2: "Office Name:",
        val1: "RE/MAX Premier",
        val2: "S2RB Brokerage",
      },
      {
        label1: "Address:",
        label2: "Address:",
        val1: "44675 Cape Court, #110",
        val2: "23113 Red Admiral Pl.",
      },
      {
        label1: "City:",
        label2: "City:",
        val1: "Ashburn",
        val2: "Brambleton",
      },
      {
        label1: "State/Prov, Zip/PC:",
        label2: "State/Prov, Zip/PC:",
        val1: "VA, 20147",
        val2: "VA, 20148",
      },
      {
        label1: "Country:",
        label2: "Country:",
        val1: "USA",
        val2: "USA",
      },
      {
        label1: "E-mail:",
        label2: "E-mail:",
        val1: "TDonegan@remax.net",
        val2: "support@s2rb.com",
      },
      {
        label1: "Primary Phone:",
        label2: "Primary Phone:",
        val1: "(703) 802-2850",
        val2: "(844) 366-5081",
      },
      {
        label1: "Cell Phone:",
        label2: "Cell Phone:",
        val1: "(703) 798-1093",
        val2: "(844) 366-5081",
      },
      {
        label1: "Fax Number:",
        label2: "Fax Number:",
        val1: "",
        val2: "",
      },
    ],
  },
});

referralTemplateData.set("clientSection", {
  clientSection: {
    sectionTitle: "Client Information",
    items: [
      {
        label1: "Name:",
        label2: "Home Phone:",
        val1: "{firstname} {lastName}",
        val2: "{sellerPhone}",
      },
      {
        label1: "Current Address:",
        label2: "Work Phone:",
        val1: "{streetAddress}",
        val2: "",
      },
      {
        label1: "City:",
        label2: "Cell Phone:",
        val1: "{city}",
        val2: "{sellerPhone}",
      },
      {
        label1: "State/Prov, Zip/PC:",
        label2: "E-Mail:",
        val1: "{stateProvinceOrRegion}",
        val2: "{sellerEmail}",
      },
      {
        label1: "Country:",
        label2: "Expected Sell Date:",
        val1: "USA",
        val2: "",
      },
      {
        label1: "Additional Information:",
        label2: "Expected Rent Back:",
        val1: "",
        val2: "{rentBackPeriod}",
      },
    ],
  },
  clientPropertySection: {
    sectionTitle: "Current Property Information",
    items: [
      {
        label1: "Client is a:",
        label2: "Estimated Price:",
        val1: "Seller",
        val2: "N/A",
      },
      {
        label1: "Home Style:",
        label2: "Bedrooms:",
        val1: "{houseType}",
        val2: "{bedrooms}",
      },
      {
        label1: "Reason for selling:",
        label2: "Bathrooms:",
        val1: "",
        val2: "{bathrooms}",
      },
    ],
  },
});

referralTemplateData.set("agreementSection", {
  agreementSection: {
    refPercent: "30",
    sellingSide: "U+2714",
  },
});

export default referralTemplateData;
