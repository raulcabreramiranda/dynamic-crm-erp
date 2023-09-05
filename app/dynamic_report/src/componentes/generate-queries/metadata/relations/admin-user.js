"use strict";

const relationships = [
 { /* 1- OneToMany_reverso */
          startTable: "AdminUser", startColumn: "adminProfileId",           
          endTable: "AdminProfile",  endColumn: "id", 
        },  { /* 2- OneToMany */
          startTable: "AdminUser", startColumn: "id",   
          endTable: "AdminPermissionUser", endColumn: "adminUserId", 
      },  { /* 1- OneToMany_reverso */
          startTable: "AdminUser", startColumn: "adminWhiteLabelId",           
          endTable: "AdminWhiteLabel",  endColumn: "id", 
        }, ];

exports["default"] = relationships;
