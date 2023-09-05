"use strict";

const relationships = [
 { /* 2- OneToMany */
          startTable: "AdminPermission", startColumn: "id",   
          endTable: "AdminPermissionProfile", endColumn: "adminPermissionId", 
      },  { /* 2- OneToMany */
          startTable: "AdminPermission", startColumn: "id",   
          endTable: "AdminPermissionUser", endColumn: "adminPermissionId", 
      }, ];

exports["default"] = relationships;
