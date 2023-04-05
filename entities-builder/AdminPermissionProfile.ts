import DataBaseEntityType from './_DataBaseEntity'

const entity: DataBaseEntityType = {
    entityName: 'AdminPermissionProfile',
    entityNameHumanized: "AdminProfile's Permission",
    entityNameHumanizedPlural: "AdminProfile's Permissions",
    frontPath: 'admin/permission-profiles',
    
      hasWhiteLabel: false,
    hasSoftDelete: false,
    hasDateAudit: true,
    pagePath: 'pages/admin/permission-profiles',
    fields: [
        {
            fieldName: 'view',
            fieldNameHumanized: 'Visualizar',
            fieldType: 'Boolean',
        },
        {
            fieldName: 'resgister',
            fieldNameHumanized: 'Registro',
            fieldType: 'Boolean',
        },
        { fieldName: 'edit', fieldNameHumanized: 'Editar', fieldType: 'Boolean' },
        {
            fieldName: 'deleteRow',
            fieldNameHumanized: 'Deletar',
            fieldType: 'Boolean',
        },
        {
            fieldName: 'report',
            fieldNameHumanized: 'Relatório',
            fieldType: 'Boolean',
        },
    ],
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
