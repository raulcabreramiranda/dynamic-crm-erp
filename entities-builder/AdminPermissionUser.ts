import DataBaseEntityType from './_DataBaseEntity'

const entity: DataBaseEntityType = {
    entityName: 'AdminPermissionUser',
    entityNameHumanized: "User's Permission",
    entityNameHumanizedPlural: "User's Permissions",
    frontPath: 'admin/permission-users',
    
      hasWhiteLabel: false,
    hasSoftDelete: false,
    hasDateAudit: true,
    pagePath: 'pages/admin/permission-users',
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
            otherEntityRelationshipName: 'adminPermissionUsers',
            fieldType: 'OneToMany_reverso',
        },
        {
            fieldName: 'adminUser',
            otherEntityTableName: 'AdminUser',
            otherEntityRelationshipName: 'adminPermissionUsers',
            fieldType: 'OneToMany_reverso',
        },
    ],
}

export default entity
