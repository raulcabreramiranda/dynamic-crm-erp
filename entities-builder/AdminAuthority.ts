import DataBaseEntityType from './_DataBaseEntity'

const entity: DataBaseEntityType = {
    entityName: 'AdminAuthority',
    entityNameHumanized: 'Authority',
    entityNameHumanizedPlural: 'Authorities',
    frontPath: 'admin/authorities',
    
      hasWhiteLabel: false,
    hasSoftDelete: false,
    hasDateAudit: true,
    pagePath: 'pages/admin/authorities',
    fields: [{ fieldName: 'name', fieldNameHumanized: 'Nome', fieldType: 'String' }],
    relationships: [],
}

export default entity
