"use strict";

const columns = {
  Customer: {
        name: "Customer",
        label: "Customer",
        columns: [
          { name: "id", label: "id", type: "Integer" },
          { name: "commercialName", label: "commercialName", type: "String" },
          { name: "corporateName", label: "corporateName", type: "String" },
          { name: "personType", label: "personType", type: "CustomerPersonType" },
          { name: "cnpj", label: "cnpj", type: "String" },
          { name: "cpf", label: "cpf", type: "String" },
          { name: "address", label: "address", type: "String" },
          { name: "telephone", label: "telephone", type: "String" },
          { name: "email", label: "email", type: "String" },
          { name: "technicalManagerName", label: "technicalManagerName", type: "String" },
          { name: "technicalManagerSector", label: "technicalManagerSector", type: "String" },
          { name: "technicalManagerFunction", label: "technicalManagerFunction", type: "String" },
          { name: "technicalManagerContact", label: "technicalManagerContact", type: "String" },
          { name: "technicalManagerEmail", label: "technicalManagerEmail", type: "String" },
          
          
        ],
      },
};

exports["default"] = columns;
