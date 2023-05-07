import DataBaseEntityType from './_DataBaseEntity'

const entity: DataBaseEntityType = {
    entityName: 'AdminPermissionProfile',
    entityNameHumanized: "AdminProfile's Permission",
    entityNameHumanizedPlural: "AdminProfile's Permissions",
    frontPath: 'admin/permission-profiles',
    hasWhiteLabel: false,
    hasSoftDelete: false,
    hasDateAudit: false,
    pagePath: 'pages/admin/permission-profiles',
    fields: [],
    relationships: [
        {
            fieldName: 'adminPermission',
            otherEntityTableName: 'AdminPermission',
            otherEntityRelationshipName: 'adminPermissionProfiles',
            fieldType: 'OneToMany_reverso',
        },
        {
            fieldName: 'adminProfile',
            otherEntityTableName: 'AdminProfile',
            otherEntityRelationshipName: 'adminPermissionProfiles',
            fieldType: 'OneToMany_reverso',
        },
    ],
}

export default entity
