"use strict";

const columns = {
  AdminAuditEntity: {
        name: "AdminAuditEntity",
        label: "AdminAuditEntity",
        columns: [
          { name: "id", label: "id", type: "Integer" },
          { name: "entityId", label: "entityId", type: "Integer" },
          { name: "entityType", label: "entityType", type: "String" },
          { name: "action", label: "action", type: "String" },
          { name: "entityValue", label: "entityValue", type: "TextBlob" },
          { name: "entityKeyDiff", label: "entityKeyDiff", type: "TextBlob" },
          { name: "commitVersion", label: "commitVersion", type: "Integer" },
          
          
        ],
      },
};

exports["default"] = columns;
