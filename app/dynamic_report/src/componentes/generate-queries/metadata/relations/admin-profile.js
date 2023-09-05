"use strict";

const relationships = [
 { /* 2- OneToMany */
          startTable: "AdminProfile", startColumn: "id",   
          endTable: "AdminPermissionProfile", endColumn: "adminProfileId", 
      },  { /* 2- OneToMany */
          startTable: "AdminProfile", startColumn: "id",   
          endTable: "AdminUser", endColumn: "adminProfileId", 
      }, ];

exports["default"] = relationships;
