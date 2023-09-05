"use strict";

const columns = {
  Patient: {
        name: "Patient",
        label: "Patient",
        columns: [
          { name: "id", label: "id", type: "Integer" },
          { name: "name", label: "name", type: "String" },
          { name: "cpf", label: "cpf", type: "String" },
          { name: "rg", label: "rg", type: "String" },
          { name: "sex", label: "sex", type: "PatientSex" },
          { name: "birthDate", label: "birthDate", type: "LocalDate" },
          { name: "weight", label: "weight", type: "BigDecimal" },
          { name: "height", label: "height", type: "BigDecimal" },
          { name: "healthPlanEnrollment", label: "healthPlanEnrollment", type: "String" },
          { name: "liminar", label: "liminar", type: "PatientLiminar" },
          { name: "observations", label: "observations", type: "TextBlob" },
          { name: "informationProfessional", label: "informationProfessional", type: "String" },
          { name: "register", label: "register", type: "Boolean" },
          { name: "zipCode", label: "zipCode", type: "String" },
          { name: "hospitalReference", label: "hospitalReference", type: "String" },
          { name: "street", label: "street", type: "String" },
          { name: "complement", label: "complement", type: "String" },
          { name: "number", label: "number", type: "String" },
          { name: "neighborhood", label: "neighborhood", type: "String" },
          { name: "city", label: "city", type: "String" },
          { name: "uf", label: "uf", type: "String" },
          { name: "reference", label: "reference", type: "String" },
          { name: "lat", label: "lat", type: "BigDecimal" },
          { name: "lng", label: "lng", type: "BigDecimal" },
          { name: "status", label: "status", type: "PatientStatus" },
          { name: "adId", label: "adId", type: "PatientAdId" },
          { name: "nead", label: "nead", type: "Long" },
          { name: "patientComplexity", label: "patientComplexity", type: "PatientPatientComplexity" },
          { name: "obese", label: "obese", type: "PatientObese" },
          
          
        ],
      },
};

exports["default"] = columns;
