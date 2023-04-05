import DataBaseEntityType from './_DataBaseEntity'

const entity: DataBaseEntityType = {
    entityName: 'AdminPermission',
    entityNameHumanized: 'Permission',
    entityNameHumanizedPlural: 'Permissions',
    frontPath: 'admin/permissions',
    
      hasWhiteLabel: false,
    hasSoftDelete: false,
    hasDateAudit: true,
    pagePath: 'pages/admin/permissions',
    fields: [
        { fieldName: 'name', fieldNameHumanized: 'Nome', fieldType: 'String' },
        { fieldName: 'slug', fieldNameHumanized: 'Slug', fieldType: 'String' },
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
            fieldName: 'adminPermissionProfiles',
            otherEntityTableName: 'AdminPermissionProfile',
            otherEntityRelationshipName: 'adminPermission',
            fieldType: 'OneToMany',
        },
        {
            fieldName: 'adminPermissionUsers',
            otherEntityTableName: 'AdminPermissionUser',
            otherEntityRelationshipName: 'adminPermission',
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
