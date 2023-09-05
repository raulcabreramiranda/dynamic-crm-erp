"use strict";

const columns = {
  AdminUser: {
        name: "AdminUser",
        label: "AdminUser",
        columns: [
          { name: "id", label: "id", type: "Integer" },
          { name: "login", label: "login", type: "String" },
          { name: "fullname", label: "fullname", type: "String" },
          { name: "cellphone", label: "cellphone", type: "String" },
          { name: "phone", label: "phone", type: "String" },
          { name: "email", label: "email", type: "String" },
          { name: "activated", label: "activated", type: "Boolean" },
          { name: "langKey", label: "langKey", type: "String" },
          { name: "password", label: "password", type: "String" },
          { name: "imageUrl", label: "imageUrl", type: "ImageBlob" },
          { name: "resetDate", label: "resetDate", type: "String" },
          { name: "re", label: "re", type: "String" },
          { name: "ra", label: "ra", type: "String" },
          { name: "userType", label: "userType", type: "AdminUserUserType" },
          { name: "clientId", label: "clientId", type: "Integer" },
          
          { name: "adminProfileId", label: "adminProfile", type: "OneToMany_reverso" }, 
          { name: "adminPermissionUsersId", label: "adminPermissionUsers", type: "OneToMany" }, 
          { name: "adminWhiteLabelId", label: "adminWhiteLabel", type: "OneToMany_reverso" }, 
          
        ],
      },
};

exports["default"] = columns;
