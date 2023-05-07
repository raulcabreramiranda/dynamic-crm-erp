import DataBaseEntityType from "./_DataBaseEntity";

const entity: DataBaseEntityType = {
  entityName: "AdminPermission",
  entityNameHumanized: "Permission",
  entityNameHumanizedPlural: "Permissions",
  frontPath: "admin/permissions",

  hasWhiteLabel: false,
  hasSoftDelete: false,
  hasDateAudit: true,
  pagePath: "pages/admin/permissions",
  fields: [
    { fieldName: "name", fieldType: "String" },
    {
      fieldName: "session",
      fieldType: "Enum",
      fieldValues: "PATIENT",
    },
    {
      fieldName: "method",
      fieldType: "Enum",
      fieldValues: "LIST,SEE,EDIT,REMOVE,CREATE",
    },
  ],
  relationships: [
    {
      fieldName: "adminPermissionProfiles",
      otherEntityTableName: "AdminPermissionProfile",
      otherEntityRelationshipName: "adminPermission",
      fieldType: "OneToMany",
    },
    {
      fieldName: "adminPermissionUsers",
      otherEntityTableName: "AdminPermissionUser",
      otherEntityRelationshipName: "adminPermission",
      fieldType: "OneToMany",
    },
  ],
  showClientView: true,
  views: {
    tableLayout: {
      name: { label: "Nome" },
      session: { label: "Sessão" },
      method: { label: "Método" },
    },
    filterLayout: {
      name: { size: 6, label: "name" },
    },
    formLayout: {
      name: { size: 6, label: "name" },
      session: { size: 3, label: "Sessão" },
      method: { label: "Método" },
    },
    viewLayout: {
      name: { size: 6, label: "name" },
      session: { size: 3, label: "Sessão" },
      method: { size: 3, label: "Método" },
    },
  },
};

export default entity;
