"use strict";

const relationships = [
 { /* 1- OneToMany_reverso */
          startTable: "AdminPermissionUser", startColumn: "adminPermissionId",           
          endTable: "AdminPermission",  endColumn: "id", 
        },  { /* 1- OneToMany_reverso */
          startTable: "AdminPermissionUser", startColumn: "adminUserId",           
          endTable: "AdminUser",  endColumn: "id", 
        }, ];

exports["default"] = relationships;
