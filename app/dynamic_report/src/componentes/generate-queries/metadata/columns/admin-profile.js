"use strict";

const columns = {
  AdminProfile: {
        name: "AdminProfile",
        label: "AdminProfile",
        columns: [
          { name: "id", label: "id", type: "Integer" },
          { name: "name", label: "name", type: "String" },
          { name: "status", label: "status", type: "Integer" },
          
          { name: "adminPermissionProfilesId", label: "adminPermissionProfiles", type: "OneToMany" }, 
          { name: "adminUsersId", label: "adminUsers", type: "OneToMany" }, 
          
        ],
      },
};

exports["default"] = columns;
