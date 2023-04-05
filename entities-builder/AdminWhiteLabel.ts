import DataBaseEntityType from './_DataBaseEntity'

const entity: DataBaseEntityType = {
    entityName: 'AdminWhiteLabel',
    entityNameHumanized: 'WhiteLabel',
    entityNameHumanizedPlural: 'WhiteLabels',
    frontPath: 'admin/white-labels',
    
      hasWhiteLabel: false,
    hasSoftDelete: false,
    hasDateAudit: true,
    pagePath: 'pages/admin/white-labels',
    fields: [
        { fieldName: 'name', fieldNameHumanized: 'Nome', fieldType: 'String' },
        { fieldName: 'logo', fieldNameHumanized: 'Logo', fieldType: 'ImageBlob' },
        {
            fieldName: 'socialReason',
            fieldNameHumanized: 'Razão Social',
            fieldType: 'String',
        },
        {
            fieldName: 'fantasyName',
            fieldNameHumanized: 'Nome Fantasia',
            fieldType: 'String',
        },
        { fieldName: 'cnpj', fieldNameHumanized: 'CNPJ', fieldType: 'String' },
        {
            fieldName: 'zipCode',
            fieldNameHumanized: 'zipCode',
            fieldType: 'String',
        },
        { fieldName: 'street', fieldNameHumanized: 'street', fieldType: 'String' },
        {
            fieldName: 'complement',
            fieldNameHumanized: 'complement',
            fieldType: 'String',
        },
        { fieldName: 'number', fieldNameHumanized: 'number', fieldType: 'String' },
        {
            fieldName: 'neighborhood',
            fieldNameHumanized: 'neighborhood',
            fieldType: 'String',
        },
        { fieldName: 'city', fieldNameHumanized: 'city', fieldType: 'String' },
        { fieldName: 'uf', fieldNameHumanized: 'uf', fieldType: 'String' },
    ],
    relationships: [
        {
            fieldName: 'adminUsers',
            otherEntityTableName: 'AdminUser',
            otherEntityRelationshipName: 'adminWhiteLabel',
            fieldType: 'OneToMany',
            formLayout: true,
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
