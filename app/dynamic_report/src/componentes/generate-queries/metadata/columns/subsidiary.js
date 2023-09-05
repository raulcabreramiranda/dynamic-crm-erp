"use strict";

const columns = {
  Subsidiary: {
        name: "Subsidiary",
        label: "Subsidiary",
        columns: [
          { name: "id", label: "id", type: "Integer" },
          { name: "commercialName", label: "commercialName", type: "String" },
          { name: "corporateName", label: "corporateName", type: "String" },
          { name: "cnpj", label: "cnpj", type: "String" },
          { name: "telephone", label: "telephone", type: "String" },
          { name: "email", label: "email", type: "String" },
          { name: "address", label: "address", type: "String" },
          { name: "cnae", label: "cnae", type: "String" },
          
          
        ],
      },
};

exports["default"] = columns;
