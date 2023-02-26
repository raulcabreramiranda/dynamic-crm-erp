import DataBaseEntityType from "./_DataBaseEntity";

const entity: DataBaseEntityType = {
  entityName: "BusinessEntity",
  entityNameHumanized: "Business Entity",
  entityNameHumanizedPlural: "Business Entities",
  frontPath: "BusinessEntity",
  allViewInOne: false,
  showClientView: true,
  hasWhiteLabel: true,
  hasDateAudit: true,
  pagePath: "pages/BusinessEntity",
  fields: [
    {
      fieldName: "entityName",
      fieldNameHumanized: "entityName",
      fieldType: "String",
    },
    {
      fieldName: "entityNameHumanized",
      fieldNameHumanized: "entityNameHumanized",
      fieldType: "String",
    },
    {
      fieldName: "entityNameHumanizedPlural",
      fieldNameHumanized: "entityNameHumanizedPlural",
      fieldType: "String",
    },
    {
      fieldName: "frontPath",
      fieldNameHumanized: "frontPath",
      fieldType: "String",
    },
    {
      fieldName: "hasWhiteLabel",
      fieldNameHumanized: "hasWhiteLabel",
      fieldType: "Boolean",
    },
    {
      fieldName: "hasDateAudit",
      fieldNameHumanized: "hasDateAudit",
      fieldType: "Boolean",
    },
  ],
  relationships: [
    {
        fieldName: 'businessEntityField',
        otherEntityTableName: 'BusinessEntityField',
        otherEntityRelationshipName: 'businessEntity',
        fieldType: 'OneToMany',
    },
  ],
  views: {
    filterLayout: {
      entityName: { size: 3, label: "Name" },
      entityNameHumanized: { size: 4, label: "Humanized name" },
      entityNameHumanizedPlural: { size: 5, label: "Humanized plural name" },
      hasWhiteLabel: { size: 3, label: "hasWhiteLabel" },
      hasDateAudit: { size: 3, label: "hasDateAudit" },
      frontPath: { size: 6, label: "frontPath" },
      businessEntityField: { size: 12, label: "Fields",showFields:["fieldName", "fieldNameHumanized"]  },
    },
    tableLayout: {
      entityName: { label: "Name" },
      entityNameHumanized: { label: "Humanized name" },
      entityNameHumanizedPlural: { label: "Humanized plural name" },
      hasWhiteLabel: { label: "hasWhiteLabel" },
      hasDateAudit: { label: "hasDateAudit" },
      frontPath: { label: "frontPath" },
      businessEntityField: { label: "Fields",showFields:["fieldName", "fieldNameHumanized"]},
    },
    formLayout: {
      entityName: { size: 3, label: "Name" },
      entityNameHumanized: { size: 4, label: "Humanized name" },
      entityNameHumanizedPlural: { size: 5, label: "Humanized plural name" },
      hasWhiteLabel: { size: 3, label: "hasWhiteLabel" },
      hasDateAudit: { size: 3, label: "hasDateAudit" },
      frontPath: { size: 6, label: "frontPath" },
      businessEntityField: { 
        size: 12, 
        label: "Fields", 
        embebedFields: {
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
        }
      },
    },
    viewLayout: {
      entityName: { size: 3, label: "Name" },
      entityNameHumanized: { size: 4, label: "Humanized name" },
      entityNameHumanizedPlural: { size: 5, label: "Humanized plural name" },
      hasWhiteLabel: { size: 3, label: "hasWhiteLabel" },
      hasDateAudit: { size: 3, label: "hasDateAudit" },
      frontPath: { size: 6, label: "frontPath" },
      businessEntityField: { size: 12, label: "Fields",showFields:["fieldName", "fieldNameHumanized"]  },
    },
  },
};

export default entity;
