// @ts-ignore

type DataBaseEntityTypeTags = {
    type: string
    description: any
}

type DataBaseEntityViewFieldMetaData = {
    size?: number;
    label?: string;
    showFields?: string[];
    superSelect?: string[];
    widthPreview?: string;
    heightPreview?: string;
    dateType?: 'DesktopDate' | 'MobileDate' | 'Time' | 'DateTime';
    filterMethod?: 'contains' | 'equals' | 'in' | 'notIn' | 'greaterThan' | 'lessThan' | 'greaterOrEqualThan' | 'lessOrEqualThan' | 'between' | 'specified'
}
type DataBaseEntityViewFields = {
    [name: string]: DataBaseEntityViewFieldMetaData
}    
type DataBaseEntityViews = {
    filterLayout?: DataBaseEntityViewFields
    tableLayout?: DataBaseEntityViewFields
    formLayout?: DataBaseEntityViewFields
    viewLayout?: DataBaseEntityViewFields
}
type DataBaseEntityTypeFieldsBase = {
    fieldValues?: any, 
    fieldName?: any, 
    fieldNameHumanized?: any,
    fieldType?: any,
    description?: any,
}
type DataBaseEntityTypeFields = {
    fieldValues?: string
    rDestin?: any
    rOrigin?: string
    objeto_nome_rel?: any
    objeto_nome_id?: any
    parameter_nome_rel?: any
    parameter_nome_id?: any
    whiteLabel?: 1
    tableObjectRelId?: any
    tableObjectPropertyRelId?: any
    tableObjectId?: number
    fieldOrder?: number
    fieldName?: string
    fieldNameHumanized?: string
    fieldType?: string
    toStringFields?: string
    formLayout?: boolean
    formLayoutLabel?: string
    formLayoutSize?: number
    formLayoutInputMask?: string
    formLayoutDefaultValue?: string
    formLayoutCurrency?: string
    formLayoutType?: string
    formLayoutDisabled?: string
    formLayoutShowCondition?: string
    formLayoutListCondition?: string
    formLayoutComponent?: string
    formLayoutShowFields?: string
    formLayoutCepBr?: string
    formLayoutEmbebed?: boolean
    viewLayout?: boolean
    viewLayoutCepBr?: string
    viewLayoutType?: string
    viewLayoutCurrency?: string
    viewLayoutDisabled?: string
    viewLayoutInputMask?: string
    viewLayoutShowCondition?: string
    viewLayoutListCondition?: string
    viewLayoutSize?: number
    viewLayoutLabel?: string
    viewLayoutComponent?: string
    viewLayoutShowFields?: string
    viewLayoutEmbebed?: string
    filterLayout?: boolean
    filterLayoutCepBr?: string
    filterLayoutType?: string
    filterLayoutCurrency?: string
    filterLayoutDisabled?: string
    filterLayoutInputMask?: string
    filterLayoutShowCondition?: string
    filterLayoutListCondition?: string
    filterLayoutSize?: number
    filterLayoutLabel?: 'top' | 'left'
    filterLayoutComponent?: string
    filterLayoutShowFields?: string
    tableLayout?: boolean
    tableLayoutComponent?: string
    type?: string
    description?: any
    formLayoutSetStateOnChange?: string
    tags?: []
    fieldTypeBlobContent?: any
    fieldIsEnum?: boolean
    fieldEnumPath?: string
    fieldValidate?: boolean
}
type DataBaseEntityTypeRelationshipsBase = {

    fieldName: string,
    otherEntityTableName: string,
    otherEntityRelationshipName: string,
    fieldType: string,

    formLayout?: boolean,
    formLayoutEmbebed?: boolean,
}
type DataBaseEntityTypeRelationships = {
    otherEntity?: Partial<DataBaseEntityType>
    otherRelationship?: Partial<DataBaseEntityTypeRelationships>
    fieldValues?: string
    rDestin?: string
    rOrigin?: string
    objeto_nome_rel?: string
    parameter_nome_rel?: string    
    objeto_nome_id?: string | number
    parameter_nome_id?: string | number
    tableObjectRelId?: string | number
    tableObjectPropertyRelId?: string | number
    fieldOrder?: number
    fieldName?: string
    fieldNameHumanized?: string
    fieldType?: string
    toStringFields?: string
    listTableLayoutShowFields?: string
    formLayout?: boolean
    formLayoutLabel?: string
    formLayoutSize?: number
    formLayoutInputMask?: string
    formLayoutDefaultValue?: string
    formLayoutCurrency?: string
    formLayoutType?: string
    formLayoutDisabled?: string
    formLayoutShowCondition?: string
    formLayoutListCondition?: string
    formLayoutComponent?: string
    formLayoutShowFields?: string
    formLayoutCepBr?: string
    formLayoutEmbebed?: boolean
    viewLayout?: boolean
    viewLayoutCepBr?: string
    viewLayoutType?: string
    viewLayoutCurrency?: string
    viewLayoutDisabled?: string
    viewLayoutInputMask?: string
    viewLayoutShowCondition?: string
    viewLayoutListCondition?: string
    viewLayoutSize?: number
    viewLayoutLabel?: string
    viewLayoutComponent?: string
    viewLayoutShowFields?: string
    viewLayoutEmbebed?: string
    filterLayout?: boolean
    filterLayoutCepBr?: string
    filterLayoutType?: string
    filterLayoutCurrency?: string
    filterLayoutDisabled?: string
    filterLayoutInputMask?: string
    filterLayoutShowCondition?: string
    filterLayoutListCondition?: string
    filterLayoutSize?: number
    filterLayoutLabel?: string
    filterLayoutComponent?: string
    filterLayoutShowFields?: string
    tableLayout?: boolean
    tableLayoutComponent?: string
    type?: string
    description?: null
    formLayoutSetStateOnChange?: string
    tags?: []    
    ownerSide?: boolean
    relationshipType?: string
    relationshipName?: string
    relationshipNamePlural?: string
    relationshipNameHumanized?: string
    relationshipNameCapitalized?: string
    relationshipNameCapitalizedPlural?: string
    relationshipFieldName?: string
    relationshipFieldNamePlural?: string
    otherEntityField?: string
    otherEntityName?: string
    otherEntityPath?: string
    otherEntityFileName?: string
    otherEntityRelationshipName?: string
    otherEntityRelationshipNamePlural?: string
    otherEntityRelationshipNameCapitalized?: string
    otherEntityRelationshipNameCapitalizedPlural?: string
    otherEntityTableName?: string
    otherEntityNamePlural?: string
    otherEntityNameCapitalized?: string
    otherEntityNameCapitalizedPlural?: string
    otherEntityAngularName?: string
    otherEntityModelName?: string
}
type DataBaseEntityType = {
    entityName?: string 
    entityNameHumanized?: string
    entityNameHumanizedPlural?: string
    frontPath?: string
    allViewInOne?: boolean
    notlistButtons?: boolean
    notViewDetails?: boolean
    showClientView?: boolean
    hasWhiteLabel?: boolean
    hasSoftDelete?: boolean
    hasDateAudit?: boolean
    notListTableHideId?: boolean
    notMigrationGenerate?: boolean
    notExtendService?: boolean
    notExtendController?: boolean
    notExtendModule?: boolean
    pagePath?: string
    differentRelationships?: Object
    tags?: Array<DataBaseEntityTypeTags>
    views?: DataBaseEntityViews
    fields?: Array<DataBaseEntityTypeFields>
    relationships?: Array<DataBaseEntityTypeRelationships>
}

export default DataBaseEntityType
