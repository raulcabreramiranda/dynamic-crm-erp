import DataBaseEntityType from './_DataBaseEntity'

const entity: DataBaseEntityType = {
    entityName: 'AdminAuditEntity',
    entityNameHumanized: 'Auditoria de Entidade',
    entityNameHumanizedPlural: 'Auditoria de Entidades',
    frontPath: 'admin/audit-entities',
    
      hasWhiteLabel: false,
    hasSoftDelete: false,
    hasDateAudit: true,
    pagePath: 'pages/admin/audit-entities',
    fields: [
        {
            fieldName: 'entityId',
            fieldNameHumanized: 'Entidade ID',
            fieldType: 'Integer',
        },
        {
            fieldName: 'entityType',
            fieldNameHumanized: 'Tipo Entidade',
            fieldType: 'String',
        },
        { fieldName: 'action', fieldNameHumanized: 'Ação', fieldType: 'String' },
        {
            fieldName: 'entityValue',
            fieldNameHumanized: 'Valor da Entidade',
            fieldType: 'TextBlob',
        },
        {
            fieldName: 'entityKeyDiff',
            fieldNameHumanized: 'Diferença de chave de entidade',
            fieldType: 'TextBlob',
        },
        {
            fieldName: 'commitVersion',
            fieldNameHumanized: 'Versão de commit',
            fieldType: 'Integer',
        },
    ],
    relationships: [],
}

export default entity
