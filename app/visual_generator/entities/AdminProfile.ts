import DataBaseEntityType from "./_DataBaseEntity";

const entity: DataBaseEntityType = {
  entityName: "AdminProfile",
  entityNameHumanized: "Profile",
  entityNameHumanizedPlural: "Profiles",
  frontPath: "admin/profiles",
  hasWhiteLabel: false,
  hasSoftDelete: false,
  hasDateAudit: true,
  pagePath: "pages/admin/profiles",
  fields: [
    { fieldName: "name", fieldNameHumanized: "Nome", fieldType: "String" },
    { fieldName: "status", fieldNameHumanized: "Status", fieldType: "Integer" },
  ],
  relationships: [
    {
      fieldName: "adminPermissionProfiles",
      otherEntityTableName: "AdminPermissionProfile",
      otherEntityRelationshipName: "adminProfile",
      fieldType: "OneToMany",
    },
    {
      fieldName: "adminUsers",
      otherEntityTableName: "AdminUser",
      otherEntityRelationshipName: "adminProfile",
      fieldType: "OneToMany",
    },
  ],
  showClientView: true,
  views: {
    tableLayout: {
      id: { label: "id" },
      name: { label: "name" },
      adminPermissionProfiles: {
        label: "Permisos",
        showFields: ["id", "adminPermission.id", "adminPermission.name"],
      },
    },
    filterLayout: {
      name: { size: 12, label: "name" },
      adminPermissionProfiles: { label: "Permisos" },
    },
    formLayout: {
      name: { size: 12, label: "name" },
      adminPermissionProfiles: {
        embedded: true,
        embeddedViews: {
          tableLayout: {
            "adminPermission.id":  { label: "Id" },
            "adminPermission.name":  { label: "Nome" },
          },
          viewLayout: {
            "adminPermission.id":  { label: "Id" },
            "adminPermission.name":  { label: "Nome" },
          },
          formLayout: {
            "adminPermission":  { 
              label: "Selecione os Permisos",
              showFields: ["name"],
             },
          },
        },
        label: "Permisos",
        
      },
    },
    viewLayout: {
      name: { size: 12, label: "name" },
      adminPermissionProfiles: {
        embedded: true,
        embeddedViews: {
          
        },
        label: "Permisos",
        showFields: ["id", "adminPermission.id", "adminPermission.name"],
      },
    },
  },
};

export default entity;
