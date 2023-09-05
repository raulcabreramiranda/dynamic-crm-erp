"use strict";

const columns = {
  AdminPermissionUser: {
        name: "AdminPermissionUser",
        label: "AdminPermissionUser",
        columns: [
          { name: "id", label: "id", type: "Integer" },
          { name: "view", label: "view", type: "Boolean" },
          { name: "resgister", label: "resgister", type: "Boolean" },
          { name: "edit", label: "edit", type: "Boolean" },
          { name: "deleteRow", label: "deleteRow", type: "Boolean" },
          { name: "report", label: "report", type: "Boolean" },
          
          { name: "adminPermissionId", label: "adminPermission", type: "OneToMany_reverso" }, 
          { name: "adminUserId", label: "adminUser", type: "OneToMany_reverso" }, 
          
        ],
      },
};

exports["default"] = columns;
