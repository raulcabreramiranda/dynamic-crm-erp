import DataBaseEntityType from "./_DataBaseEntity";

const entity: DataBaseEntityType = {
  entityName: "BusinessEntityField",
  entityNameHumanized: "Business Entity Field",
  entityNameHumanizedPlural: "Business Entity Fields",
  frontPath: "BusinessEntityField",
  allViewInOne: true,
  showClientView: true,
  hasWhiteLabel: true,
  hasDateAudit: true,
  pagePath: "pages/BusinessEntityField",
  fields: [
    {
      fieldName: "fieldName",
      fieldNameHumanized: "fieldName",
      fieldType: "String",
    },  
    {
      fieldName: "fieldNameHumanized",
      fieldNameHumanized: "fieldNameHumanized",
      fieldType: "String",
    },   
    {
      fieldName: "fieldType",
      fieldNameHumanized: "fieldType",
      fieldType: "Enum",
      fieldValues: "FRONT,END",
    },   
  ],
  relationships: [
    {
      fieldName: "businessEntity",
      otherEntityTableName: "BusinessEntity",
      otherEntityRelationshipName: "businessEntityField",
      fieldType: "OneToMany",
    },
  ],
  views: {
    filterLayout: {
      fieldName: { size: 3, label: "Name" },
      fieldNameHumanized: { size: 3, label: "Humanized" },
      fieldType: { size: 3, label: "Type" },
    },
    tableLayout: {
      fieldName: { label: "Name" },
      fieldNameHumanized: { label: "Humanized" },
      fieldType: { label: "Type" },
    },
    formLayout: {
      fieldName: { size: 3, label: "Name" },
      fieldNameHumanized: { size: 3, label: "Humanized" },
      fieldType: { size: 3, label: "Type" },
    },
    viewLayout: {
      fieldName: { size: 3, label: "Name" },
      fieldNameHumanized: { size: 3, label: "Humanized" },
      fieldType: { size: 3, label: "Type" },
    },
  },
};

export default entity;
