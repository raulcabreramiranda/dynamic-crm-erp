"use strict";

const columns = {
  AdminPermission: {
        name: "AdminPermission",
        label: "AdminPermission",
        columns: [
          { name: "id", label: "id", type: "Integer" },
          { name: "name", label: "name", type: "String" },
          { name: "session", label: "session", type: "AdminPermissionSession" },
          { name: "method", label: "method", type: "AdminPermissionMethod" },
          
          { name: "adminPermissionProfilesId", label: "adminPermissionProfiles", type: "OneToMany" }, 
          { name: "adminPermissionUsersId", label: "adminPermissionUsers", type: "OneToMany" }, 
          
        ],
      },
};

exports["default"] = columns;
