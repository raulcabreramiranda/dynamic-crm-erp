"use strict";

const columns = {
  AdminPermissionProfile: {
        name: "AdminPermissionProfile",
        label: "AdminPermissionProfile",
        columns: [
          { name: "id", label: "id", type: "Integer" },
          
          { name: "adminPermissionId", label: "adminPermission", type: "OneToMany_reverso" }, 
          { name: "adminProfileId", label: "adminProfile", type: "OneToMany_reverso" }, 
          
        ],
      },
};

exports["default"] = columns;
