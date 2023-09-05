"use strict";

const relationships = [
 { /* 2- OneToMany */
          startTable: "AdminWhiteLabel", startColumn: "id",   
          endTable: "AdminUser", endColumn: "adminWhiteLabelId", 
      }, ];

exports["default"] = relationships;
