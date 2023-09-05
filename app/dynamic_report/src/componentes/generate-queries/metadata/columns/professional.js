"use strict";

const columns = {
  Professional: {
        name: "Professional",
        label: "Professional",
        columns: [
          { name: "id", label: "id", type: "Integer" },
          { name: "name", label: "name", type: "String" },
          { name: "birthDate", label: "birthDate", type: "LocalDate" },
          { name: "cpf", label: "cpf", type: "String" },
          { name: "rg", label: "rg", type: "String" },
          { name: "telephone", label: "telephone", type: "String" },
          { name: "email", label: "email", type: "String" },
          { name: "contract", label: "contract", type: "String" },
          { name: "startDate", label: "startDate", type: "LocalDate" },
          { name: "endDate", label: "endDate", type: "LocalDate" },
          
          
        ],
      },
};

exports["default"] = columns;
