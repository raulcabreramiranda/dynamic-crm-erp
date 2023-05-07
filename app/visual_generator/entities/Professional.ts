import DataBaseEntityType from "./_DataBaseEntity";

const entity: DataBaseEntityType = {
  entityName: "Professional",
  entityNameHumanized: "Professional",
  entityNameHumanizedPlural: "Professionals",
  frontPath: "professionals",
  fields: [
    { fieldName: "name", fieldType: "String", required: true, maxlength: 255 },
    { fieldName: "birthDate", fieldType: "LocalDate" },
    { fieldName: "cpf", fieldType: "String" },
    { fieldName: "rg", fieldType: "String" },
    { fieldName: "telephone", fieldType: "String" },
    { fieldName: "email", fieldType: "String" },
    { fieldName: "contract", fieldType: "String" },
    { fieldName: "startDate", fieldType: "LocalDate" },
    { fieldName: "endDate", fieldType: "LocalDate" },
  ],
  relationships: [],
  showClientView: true,
  allViewInOne: true,
  views: {
    tableLayout: {
      name: { label: "Nome" },
      birthDate: { label: "Data de nascimento" },
      cpf: { label: "Cpf" },
      rg: { label: "Rg" },
      telephone: { label: "Celular" },
      email: { label: "E-mail" },
      contract: { label: "Contrato" },
      startDate: { label: "Data de início" },
      endDate: { label: "Data de término" },
    },
    filterLayout: {
      name: { label: "Nome", size: 3 },
      birthDate: { label: "Data de nascimento", size: 3  },
      cpf: { label: "Cpf", size: 3  },
      rg: { label: "Rg", size: 3  },
      telephone: { label: "Celular", size: 3  },
      email: { label: "E-mail", size: 3  },
      contract: { label: "Contrato", size: 3  },
      startDate: { label: "Data de início", size: 3  },
      endDate: { label: "Data de término", size: 3  },
    },
    formLayout: {
      name: { label: "Nome", size: 5 },
      birthDate: { label: "Data de nascimento", size: 3  },
      cpf: { label: "Cpf", size: 3  },
      rg: { label: "Rg", size: 3  },
      telephone: { label: "Celular", size: 3  },
      email: { label: "E-mail", size: 3  },
      contract: { label: "Contrato", size: 3  },
      startDate: { label: "Data de início", size: 3  },
      endDate: { label: "Data de término", size: 3  },
    },
    viewLayout: {
      name: { label: "Nome", size: 12 },
      birthDate: { label: "Data de nascimento", size: 3  },
      cpf: { label: "Cpf", size: 3  },
      rg: { label: "Rg", size: 3  },
      telephone: { label: "Celular", size: 3  },
      email: { label: "E-mail", size: 3  },
      contract: { label: "Contrato", size: 3  },
      startDate: { label: "Data de início", size: 3  },
      endDate: { label: "Data de término", size: 3  },
    },
  },
};

export default entity;
