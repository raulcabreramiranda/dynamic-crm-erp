import DataBaseEntityType from "./_DataBaseEntity";

const entity: DataBaseEntityType = {
  entityName: "Company",
  entityNameHumanized: "Company",
  entityNameHumanizedPlural: "Companies",
  frontPath: "companies",
  fields: [
    { fieldName: "commercialNameTeste1", fieldType: "String" },
    { fieldName: "commercialName", fieldType: "String" },
    { fieldName: "corporateName", fieldType: "String" },
    { fieldName: "cnpj", fieldType: "String" },
    { fieldName: "telephone", fieldType: "String" },
    { fieldName: "email", fieldType: "String" },
    { fieldName: "address", fieldType: "String" },
    { fieldName: "cnae", fieldType: "String" },
    { fieldName: "technicalManagerName", fieldType: "String" },
    { fieldName: "technicalManagerCategory", fieldType: "String" },
    { fieldName: "technicalManagerBoardNumber", fieldType: "String" },

  ],
  relationships: [],
  showClientView: true,
  allViewInOne: true,
  tabData: {
    VIEW_TAB_BASE: {
      label: "Base"
    },
    VIEW_TAB_DATA: {
      label: "Data"
    },
    VIEW_TAB_TECHNICAL_MANAGER: {
      label: "Responsável técnico"
    }
  },
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
      commercialName: { label: "Nome comercial", size: 3, tab: "VIEW_TAB_BASE" },
      corporateName: { label: "Razão social", size: 3, tab: "VIEW_TAB_BASE" },
      cnpj: { label: "CNPJ", size: 3, tab: "VIEW_TAB_BASE" },
      telephone: { label: "Telefone", size: 3, tab: "VIEW_TAB_BASE"  },
      email: { label: "E-mail", size: 3, tab: "VIEW_TAB_DATA"  },
      address: { label: "Endereço", size: 3, tab: "VIEW_TAB_DATA"  },
      cnae: { label: "E-mailCnae", size: 3, tab: "VIEW_TAB_DATA"  },
      technicalManagerName: { label: "Responsável técnico (Nome)", size: 3, tab: "VIEW_TAB_TECHNICAL_MANAGER"  },
      technicalManagerCategory: { label: "Responsável técnico (Nome)", size: 3, tab: "VIEW_TAB_TECHNICAL_MANAGER"    },
      technicalManagerBoardNumber: { label: "Responsável técnico (Nome)", size: 3, tab: "VIEW_TAB_TECHNICAL_MANAGER"    },
    },
    viewLayout: {
      commercialName: { label: "Nome comercial", size: 3, tab: "VIEW_TAB_BASE" },
      corporateName: { label: "Razão social", size: 3, tab: "VIEW_TAB_BASE" },
      cnpj: { label: "CNPJ", size: 3, tab: "VIEW_TAB_BASE" },
      telephone: { label: "Telefone", size: 3, tab: "VIEW_TAB_BASE"  },
      email: { label: "E-mail", size: 3, tab: "VIEW_TAB_BASE"  },
      address: { label: "Endereço", size: 3, tab: "VIEW_TAB_BASE"  },
      cnae: { label: "E-mailCnae", size: 3, tab: "VIEW_TAB_BASE"  },
      technicalManagerName: { label: "Responsável técnico (Nome)", size: 3, tab: "VIEW_TAB_TECHNICAL_MANAGER"  },
      technicalManagerCategory: { label: "Responsável técnico (Nome)", size: 3, tab: "VIEW_TAB_TECHNICAL_MANAGER"    },
      technicalManagerBoardNumber: { label: "Responsável técnico (Nome)", size: 3, tab: "VIEW_TAB_TECHNICAL_MANAGER"    },
    },
  },
};

export default entity;
