"use strict";

const columns = {
  AdminWhiteLabel: {
        name: "AdminWhiteLabel",
        label: "AdminWhiteLabel",
        columns: [
          { name: "id", label: "id", type: "Integer" },
          { name: "name", label: "name", type: "String" },
          { name: "logo", label: "logo", type: "ImageBlob" },
          { name: "socialReason", label: "socialReason", type: "String" },
          { name: "fantasyName", label: "fantasyName", type: "String" },
          { name: "cnpj", label: "cnpj", type: "String" },
          { name: "zipCode", label: "zipCode", type: "String" },
          { name: "street", label: "street", type: "String" },
          { name: "complement", label: "complement", type: "String" },
          { name: "number", label: "number", type: "String" },
          { name: "neighborhood", label: "neighborhood", type: "String" },
          { name: "city", label: "city", type: "String" },
          { name: "uf", label: "uf", type: "String" },
          
          { name: "adminUsersId", label: "adminUsers", type: "OneToMany" }, 
          
        ],
      },
};

exports["default"] = columns;
