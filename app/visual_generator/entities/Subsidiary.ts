import DataBaseEntityType from "./_DataBaseEntity";

const entity: DataBaseEntityType = {
  entityName: "Subsidiary",
  entityNameHumanized: "Subsidiary",
  entityNameHumanizedPlural: "Subsidiaries",
  frontPath: "subsidiaries",
  fields: [
    { fieldName: "commercialName", fieldType: "String" },
    { fieldName: "corporateName", fieldType: "String" },
    { fieldName: "cnpj", fieldType: "String" },
    { fieldName: "telephone", fieldType: "String" },
    { fieldName: "email", fieldType: "String" },
    { fieldName: "address", fieldType: "String" },
    { fieldName: "cnae", fieldType: "String" },
  ],
  relationships: [],
  showClientView: true,
  allViewInOne: true,
  views: {
    tableLayout: {
      commercialName: { label: "Nome comercial" },
      corporateName: { label: "Razão social" },
      cnpj: { label: "CNPJ" },
      telephone: { label: "Telefone" },
      email: { label: "E-mail" },
    },
    filterLayout: {
      commercialName: { label: "Nome comercial", size: 3 },
      corporateName: { label: "Razão social", size: 3  },
      cnpj: { label: "CNPJ", size: 3  },
      telephone: { label: "Telefone", size: 3  },
      email: { label: "E-mail", size: 3  },
    },
    formLayout: {
      commercialName: { label: "Nome comercial", size: 3 },
      corporateName: { label: "Razão social", size: 3  },
      cnpj: { label: "CNPJ", size: 3  },
      telephone: { label: "Telefone", size: 3  },
      email: { label: "E-mail", size: 3  },
      address: { label: "Endereço", size: 3  },
      cnae: { label: "E-mailCnae", size: 3  },
    },
    viewLayout: {
      commercialName: { label: "Nome comercial", size: 3 },
      corporateName: { label: "Razão social", size: 3  },
      cnpj: { label: "CNPJ", size: 3  },
      telephone: { label: "Telefone", size: 3  },
      email: { label: "E-mail", size: 3  },
      address: { label: "Endereço", size: 3  },
      cnae: { label: "E-mailCnae", size: 3  },
    },
  },
};

export default entity;
