"use strict";

const relationships = [
 { /* 1- OneToMany_reverso */
          startTable: "AdminPermissionProfile", startColumn: "adminPermissionId",           
          endTable: "AdminPermission",  endColumn: "id", 
        },  { /* 1- OneToMany_reverso */
          startTable: "AdminPermissionProfile", startColumn: "adminProfileId",           
          endTable: "AdminProfile",  endColumn: "id", 
        }, ];

exports["default"] = relationships;
