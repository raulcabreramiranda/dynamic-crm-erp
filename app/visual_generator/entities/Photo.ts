import DataBaseEntityType from "./_DataBaseEntity"

const entity: DataBaseEntityType = {
  entityName: "Photo",
  entityNameHumanized: "Photo",
  entityNameHumanizedPlural: "Photo",
  frontPath: "photos",
  fields: [
    {
      fieldName: "description",
      fieldNameHumanized: "description",
      fieldType: "TextBlob",
    },
    { fieldName: "title", fieldNameHumanized: "title", fieldType: "String" },
    { fieldName: "hour", fieldNameHumanized: "hour", fieldType: "String" },
    { fieldName: "link", fieldNameHumanized: "link", fieldType: "ImageBlob" },
    {
      fieldValues: "TEXT,PRESENTATION,DEEPENING",
      fieldName: "typeContent",
      fieldNameHumanized: "typeContent",
      fieldType: "Enum",
    },
  ],
  relationships: [
    {
      fieldName: "trainingEnvironmentComponent",
      otherEntityTableName: "TrainingEnvironmentComponent",
      otherEntityRelationshipName: "trainingEnvironmentContent",
      fieldType: "OneToMany_reverso",
    },
  ],
  showClientView: true,
  views: {
    tableLayout: {
      title: { label: "title" },
      description: { size: 12 },
      link: { size: 12 },
      typeContent: { size: 12 },
    },
    filterLayout: {
      title: { size: 12, label: "title" },
      description: { size: 12, label: "description" },
      link: { size: 12, label: "link" },
      typeContent: { size: 12, label: "typeContent" },
    },
    formLayout: {
      title: { size: 12, label: "title" },
      description: { size: 12, label: "description" },
      link: { size: 12, label: "link" },
      typeContent: { size: 12, label: "typeContent" },
    },
    viewLayout: {
      title: { size: 12, label: "title" },
      description: { size: 12, label: "description" },
      link: { size: 12, label: "link", widthPreview: "100%", heightPreview: "auto" },
      typeContent: { size: 12, label: "typeContent" },
    },
  },
}

export default entity
