"use strict";

const columns = {
  Photo: {
        name: "Photo",
        label: "Photo",
        columns: [
          { name: "id", label: "id", type: "Integer" },
          { name: "description", label: "description", type: "TextBlob" },
          { name: "title", label: "title", type: "String" },
          { name: "hour", label: "hour", type: "String" },
          { name: "link", label: "link", type: "ImageBlob" },
          { name: "typeContent", label: "typeContent", type: "PhotoTypeContent" },
          
          
        ],
      },
};

exports["default"] = columns;
