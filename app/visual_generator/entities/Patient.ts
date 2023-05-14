import DataBaseEntityType from "./_DataBaseEntity";

const entity: DataBaseEntityType = {
  entityName: "Patient",
  entityNameHumanized: "Patient",
  entityNameHumanizedPlural: "Patient",
  frontPath: "patients",
  fields: [
    { fieldName: "name", fieldType: "String", required: true, maxlength: 255 },
    { fieldName: "cpf", fieldType: "String", maxlength: 255 },
    { fieldName: "rg", fieldType: "String", maxlength: 12 },
    {
      fieldName: "sex",
      fieldType: "Enum",
      fieldValues: "MASCULINO,FEMININO",
      required: true,
    },
    { fieldName: "birthDate", fieldType: "LocalDate" },
    { fieldName: "weight", fieldType: "BigDecimal" },
    { fieldName: "height", fieldType: "BigDecimal" },
    { fieldName: "healthPlanEnrollment", fieldType: "String", maxlength: 255 },
    { fieldName: "liminar", fieldType: "Enum", fieldValues: "SIM,NAO" },
    { fieldName: "observations", fieldType: "TextBlob" },
    {
      fieldName: "informationProfessional",
      fieldType: "String",
      maxlength: 255,
    },
    { fieldName: "register", fieldType: "Boolean" },
    {
      fieldName: "zipCode",
      fieldType: "String",
      required: true,
      maxlength: 20,
    },
    { fieldName: "hospitalReference", fieldType: "String", maxlength: 255 },
    { fieldName: "street", fieldType: "String", maxlength: 255 },
    { fieldName: "complement", fieldType: "String", maxlength: 200 },
    { fieldName: "number", fieldType: "String", required: true, maxlength: 20 },
    { fieldName: "neighborhood", fieldType: "String", maxlength: 100 },
    { fieldName: "city", fieldType: "String", maxlength: 250 },
    { fieldName: "uf", fieldType: "String", maxlength: 250 },
    { fieldName: "reference", fieldType: "String", maxlength: 250 },
    { fieldName: "lat", fieldType: "BigDecimal" },
    { fieldName: "lng", fieldType: "BigDecimal" },
    {
      fieldName: "status",
      fieldType: "Enum",
      fieldValues: "ATIVO,AVALIACAO,ALTA,HOSPITALIZADO,OBITO,MIGRACAO",
      required: true,
    },
    { fieldName: "adId", fieldType: "Enum", fieldValues: "AD,ID" },
    { fieldName: "nead", fieldType: "Long" },
    {
      fieldName: "patientComplexity",
      fieldType: "Enum",
      fieldValues: "BAIXA,MEDIA,ALTA,VENTILACAOMECANICA",
    }, //
    { fieldName: "obese", fieldType: "Enum", fieldValues: "SIM,NAO" }, //
  ],
  relationships: [],
  showClientView: true,
  allViewInOne: false,
  views: {
    tableLayout: {
      name: { label: "Nome1" },
      zipCode: { label: "CEP" },
      neighborhood: { label: "Bairro" },
      city: { label: "Cidade" },
      uf: { label: "Estado" },
      status: { label: "Status" },
      _:{
        labels:{
          listTitle: "Lista de Pacientes importante",          
          deleteTitle: "Lista de Pacientes importante",
          deleteText: "Lista de Pacientes importante",          
          newTopListButton: "Criar novo Paciente",          
        },
        permissions: {
          LIST: {session: "PATIENT", method:"LIST"},
          SEE: {session: "PATIENT", method:"SEE"},
          CREATE: {session: "PATIENT", method:"CREATE"},
          EDIT: {session: "PATIENT", method:"EDIT"},
          REMOVE: {session: "PATIENT", method:"REMOVE"},
        }
      },
    },
    filterLayout: {
      name: { label: "Nome", size: 3 },
      zipCode: { label: "CEP", size: 3 },
      neighborhood: { label: "Bairro", size: 3 },
      city: { label: "Cidade", size: 3 },
      uf: { label: "Estado", size: 2 },
      cpf: { size: 3 },
      register: { size: 2 },
      status: { label: "Status", size: 2 },
    },
    formLayout: {
      name: { size: 5 },
      cpf: { size: 4, others: { InputMask: "999.999.999-99" } },
      rg: { size: 3, others: { InputMask: "99.999.999-9" } },
      sex: { size: 4 },
      birthDate: { size: 4 },
      weight: { size: 4 },
      height: { size: 4 },
      zipCode: { label: "CEP", size: 4, others: { CepBr: "cep" } },
      street: { size: 8, others: { CepBr: "logradouro" } },
      number: { size: 4 },
      neighborhood: { size: 8, others: { CepBr: "bairro" } },
      city: { size: 3, others: { CepBr: "localidade" } },
      uf: { size: 3, others: { CepBr: "uf" } },
      complement: { size: 6 },
      reference: { size: 6 },
      healthPlanEnrollment: { size: 6 },
      liminar: { size: 6 },
      patientComplexity: { size: 6 },
      adId: { size: 6 },
      obese: { size: 6 },
      nead: { size: 6 },
      hospitalReference: { size: 6 },
      observations: { size: 12, others: { Type: "HtmlEditor" } },
      informationProfessional: { size: 6 },
      // professionalBlocked{size:6}, //many-to-many
      // professionalPreferred{size:6}, //many-to-many
      // patientSupplier{size:12,Embebed:true} , //many-to-many
      // patientCid{size:12,Embebed:true,EmbebedExtended:true} , //many-to-many
      // patientAllergy{size:12,Embebed:true,EmbebedExtended:true} , //many-to-many
      // patientContact{size:12,Embebed:true} , //many-to-many
      // patientResponsible{size:12,Embebed:true} , //many-to-many
      _:{
        labels:{        
          newTitle: "Novo pacientes",          
          editTitle: "Editar um paciente",    
          saveTopButton: "Salvar agora",          
          backTopButton: "Voltar",          
        },
      },
    },
    viewLayout: {
      name: { size: 12 },
      cpf: { size: 12, others: { InputMask: "999.999.999-99" } },
      rg: { size: 12, others: { InputMask: "99.999.999-9" } },
      sex: { size: 12 },
      birthDate: { size: 12 },
      weight: { size: 12 },
      height: { size: 12 },
      zipCode: { label: "CEP", size: 12, others: { CepBr: "cep" } },
      street: { size: 12, others: { CepBr: "logradouro" } },
      number: { size: 12 },
      neighborhood: { size: 12, others: { CepBr: "bairro" } },
      city: { size: 12, others: { CepBr: "localidade" } },
      uf: { size: 12, others: { CepBr: "uf" } },
      complement: { size: 12 },
      reference: { size: 12 },
      // client: {size:12}, //many-to-many (owner),
      healthPlanEnrollment: { size: 12 },
      liminar: { size: 12 },
      patientComplexity: { size: 12 },
      patientDevice: { size: 12 },
      adId: { size: 12 },
      obese: { size: 12 },
      nead: { size: 12 },
      hospitalReference: { size: 12 },
      observations: { size: 12 },
      informationProfessional: { size: 12 },
      // professionalBlocked: {size:12}, //many-to-many,
      // professionalPreferred: {size:12}, //many-to-many,
      // patientSupplier: {size:12,Embebed:true} , //many-to-many,
      // patientDoctorPrescription: {size:12}, //one-to-one (owner),
      // patientNursingPrescription: {size:12}, //one-to-one (owner),
      // patientCid: {size:12,Embebed:true,EmbebedExtended:true} , //many-to-many,
      // patientAllergy: {size:12,Embebed:true,EmbebedExtended:true} , //many-to-many,
      // patientContact: {size:12,Embebed:true} , //many-to-many,
      // patientResponsible: {size:12,Embebed:true} , //many-to-many,
      // AttendacesPatientList: {Component:true} , //many-to-many,
      // GoogleMapComponent: {Component:true} , //many-to-many,
      _:{
        labels:{     
          viewTitle: "Ver detalhes do paciente",        
          backTopViewButton: "Atras",            
        },
      },
    },
  },
};

export default entity;