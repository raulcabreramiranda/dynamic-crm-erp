import DataBaseEntityType from './_DataBaseEntity'

const entity: DataBaseEntityType = {
    entityName: 'AdminProfile',
    entityNameHumanized: 'Profile',
    entityNameHumanizedPlural: 'Profiles',
    frontPath: 'admin/profiles',
    hasWhiteLabel: false,
    hasSoftDelete: false,
    hasDateAudit: true,
    pagePath: 'pages/admin/profiles',
    fields: [
        { fieldName: 'name', fieldNameHumanized: 'Nome', fieldType: 'String' },
        { fieldName: 'status', fieldNameHumanized: 'Status', fieldType: 'Integer' },
    ],
    relationships: [
        {
            fieldName: 'adminPermissionProfiles',
            otherEntityTableName: 'AdminPermissionProfile',
            otherEntityRelationshipName: 'adminProfile',
            fieldType: 'OneToMany',
            formLayout: true,
            formLayoutEmbebed: true,
        },
        {
            fieldName: 'adminUsers',
            otherEntityTableName: 'AdminUser',
            otherEntityRelationshipName: 'adminProfile',
            fieldType: 'OneToMany',
        },
    ],
    showClientView: true,
    views: {
      tableLayout: {
        name: { label: "name" },
      },
      filterLayout: {
        name: { size: 12, label: "name" },
      },
      formLayout: {
        name: { size: 12, label: "name" },
      },
      viewLayout: {
        name: { size: 12, label: "name" },
      },
    },
}

export default entity
