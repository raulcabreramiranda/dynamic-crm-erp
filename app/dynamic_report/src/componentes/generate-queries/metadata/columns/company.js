"use strict";

const columns = {
  Company: {
        name: "Company",
        label: "Company",
        columns: [
          { name: "id", label: "id", type: "Integer" },
          { name: "commercialNameTeste833", label: "commercialNameTeste833", type: "String" },
          { name: "commercialName", label: "commercialName", type: "String" },
          { name: "corporateName", label: "corporateName", type: "String" },
          { name: "cnpj", label: "cnpj", type: "String" },
          { name: "telephone", label: "telephone", type: "String" },
          { name: "email", label: "email", type: "String" },
          { name: "address", label: "address", type: "String" },
          { name: "cnae", label: "cnae", type: "String" },
          { name: "technicalManagerName", label: "technicalManagerName", type: "String" },
          { name: "technicalManagerCategory", label: "technicalManagerCategory", type: "String" },
          { name: "technicalManagerBoardNumber", label: "technicalManagerBoardNumber", type: "String" },
          
          
        ],
      },
};

exports["default"] = columns;
