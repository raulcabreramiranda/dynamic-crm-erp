import { useContext } from 'react';
import { TabView, TabPanel } from 'primereact/tabview';
import Button from 'src/layouts/components/Button';

import Grid from 'src/layouts/components/Grid';
import { Translate, translate } from 'src/layouts/components/translate-component';
import CardContent from 'src/layouts/components/Card/CardContent';

import ViewBoolean from 'src/layouts/components/inputs/ViewBoolean';
import ViewDate from 'src/layouts/components/inputs/ViewDate';
import ViewText from 'src/layouts/components/inputs/ViewText';
import ViewSelect from 'src/layouts/components/inputs/ViewSelect';
import ViewSelectMany from 'src/layouts/components/inputs/ViewSelectMany';
import ViewImage from 'src/layouts/components/inputs/ViewImage';

import { IPatient } from 'src/pages/patients/_base/patient-model';

import { EntityContext } from './patient-detail';

const ViewForm = () => {
    const { viewTabActive, setViewTabActive } = useContext(EntityContext);

    return (
        <>
            <form>
                <Grid container spacing={7}>
                    <Grid item xs={12}>
                        <div>
                            <Grid>
                                <ViewText
                                    id="patient-name"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="name"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'name' }} contentKey="patient.name" />
                                        </>
                                    }
                                />
                                {/* <input
            onChange={evt => setState({ ...state,  nameFormValue: evt.target.value })} 
            value={state.nameFormValue ? state.nameFormValue : ""}
            id="patient-name" 
            entityContext={EntityContext}
            type="text" 
            name="name" 
            className={"form-control"} 
             
          /> */}
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <div>
                            <Grid>
                                <ViewText
                                    id="patient-cpf"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="cpf"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'cpf' }} contentKey="patient.cpf" />
                                        </>
                                    }
                                />
                                {/* <input
            onChange={evt => setState({ ...state,  cpfFormValue: evt.target.value })} 
            value={state.cpfFormValue ? state.cpfFormValue : ""}
            id="patient-cpf" 
            entityContext={EntityContext}
            type="text" 
            name="cpf" 
            className={"form-control"} 
             
          /> */}
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <div>
                            <Grid>
                                <ViewText
                                    id="patient-rg"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="rg"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'rg' }} contentKey="patient.rg" />
                                        </>
                                    }
                                />
                                {/* <input
            onChange={evt => setState({ ...state,  rgFormValue: evt.target.value })} 
            value={state.rgFormValue ? state.rgFormValue : ""}
            id="patient-rg" 
            entityContext={EntityContext}
            type="text" 
            name="rg" 
            className={"form-control"} 
             
          /> */}
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <div>
                            <Grid>
                                <ViewSelect
                                    id="patient-sex"
                                    options={[
                                        { value: 'MASCULINO', label: translate('patient.PatientSex.MASCULINO') },
                                        { value: 'FEMININO', label: translate('patient.PatientSex.FEMININO') },
                                    ]}
                                    entityContext={EntityContext}
                                    name="sex"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'sex' }} contentKey="patient.sex" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <div>
                            <Grid>
                                <ViewDate
                                    id="patient-birthDate"
                                    entityContext={EntityContext}
                                    name="birthDate"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'birthDate' }} contentKey="patient.birthDate" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <div>
                            <Grid>
                                <ViewText
                                    id="patient-weight"
                                    entityContext={EntityContext}
                                    type="number"
                                    precision={2}
                                    name="weight"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'weight' }} contentKey="patient.weight" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <div>
                            <Grid>
                                <ViewText
                                    id="patient-height"
                                    entityContext={EntityContext}
                                    type="number"
                                    precision={2}
                                    name="height"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'height' }} contentKey="patient.height" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <div>
                            <Grid>
                                <ViewText
                                    id="patient-zipCode"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="zipCode"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'CEP' }} contentKey="patient.zipCode" />
                                        </>
                                    }
                                />
                                {/* <input
            onChange={evt => setState({ ...state,  zipCodeFormValue: evt.target.value })} 
            value={state.zipCodeFormValue ? state.zipCodeFormValue : ""}
            id="patient-zipCode" 
            entityContext={EntityContext}
            type="text" 
            name="zipCode" 
            className={"form-control"} 
             
          /> */}
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <div>
                            <Grid>
                                <ViewText
                                    id="patient-street"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="street"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'street' }} contentKey="patient.street" />
                                        </>
                                    }
                                />
                                {/* <input
            onChange={evt => setState({ ...state,  streetFormValue: evt.target.value })} 
            value={state.streetFormValue ? state.streetFormValue : ""}
            id="patient-street" 
            entityContext={EntityContext}
            type="text" 
            name="street" 
            className={"form-control"} 
             
          /> */}
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <div>
                            <Grid>
                                <ViewText
                                    id="patient-number"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="number"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'number' }} contentKey="patient.number" />
                                        </>
                                    }
                                />
                                {/* <input
            onChange={evt => setState({ ...state,  numberFormValue: evt.target.value })} 
            value={state.numberFormValue ? state.numberFormValue : ""}
            id="patient-number" 
            entityContext={EntityContext}
            type="text" 
            name="number" 
            className={"form-control"} 
             
          /> */}
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <div>
                            <Grid>
                                <ViewText
                                    id="patient-neighborhood"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="neighborhood"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'neighborhood' }} contentKey="patient.neighborhood" />
                                        </>
                                    }
                                />
                                {/* <input
            onChange={evt => setState({ ...state,  neighborhoodFormValue: evt.target.value })} 
            value={state.neighborhoodFormValue ? state.neighborhoodFormValue : ""}
            id="patient-neighborhood" 
            entityContext={EntityContext}
            type="text" 
            name="neighborhood" 
            className={"form-control"} 
             
          /> */}
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <div>
                            <Grid>
                                <ViewText
                                    id="patient-city"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="city"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'city' }} contentKey="patient.city" />
                                        </>
                                    }
                                />
                                {/* <input
            onChange={evt => setState({ ...state,  cityFormValue: evt.target.value })} 
            value={state.cityFormValue ? state.cityFormValue : ""}
            id="patient-city" 
            entityContext={EntityContext}
            type="text" 
            name="city" 
            className={"form-control"} 
             
          /> */}
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <div>
                            <Grid>
                                <ViewText
                                    id="patient-uf"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="uf"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'uf' }} contentKey="patient.uf" />
                                        </>
                                    }
                                />
                                {/* <input
            onChange={evt => setState({ ...state,  ufFormValue: evt.target.value })} 
            value={state.ufFormValue ? state.ufFormValue : ""}
            id="patient-uf" 
            entityContext={EntityContext}
            type="text" 
            name="uf" 
            className={"form-control"} 
             
          /> */}
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <div>
                            <Grid>
                                <ViewText
                                    id="patient-complement"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="complement"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'complement' }} contentKey="patient.complement" />
                                        </>
                                    }
                                />
                                {/* <input
            onChange={evt => setState({ ...state,  complementFormValue: evt.target.value })} 
            value={state.complementFormValue ? state.complementFormValue : ""}
            id="patient-complement" 
            entityContext={EntityContext}
            type="text" 
            name="complement" 
            className={"form-control"} 
             
          /> */}
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <div>
                            <Grid>
                                <ViewText
                                    id="patient-reference"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="reference"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'reference' }} contentKey="patient.reference" />
                                        </>
                                    }
                                />
                                {/* <input
            onChange={evt => setState({ ...state,  referenceFormValue: evt.target.value })} 
            value={state.referenceFormValue ? state.referenceFormValue : ""}
            id="patient-reference" 
            entityContext={EntityContext}
            type="text" 
            name="reference" 
            className={"form-control"} 
             
          /> */}
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <div>
                            <Grid>
                                <ViewText
                                    id="patient-healthPlanEnrollment"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="healthPlanEnrollment"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'healthPlanEnrollment' }} contentKey="patient.healthPlanEnrollment" />
                                        </>
                                    }
                                />
                                {/* <input
            onChange={evt => setState({ ...state,  healthPlanEnrollmentFormValue: evt.target.value })} 
            value={state.healthPlanEnrollmentFormValue ? state.healthPlanEnrollmentFormValue : ""}
            id="patient-healthPlanEnrollment" 
            entityContext={EntityContext}
            type="text" 
            name="healthPlanEnrollment" 
            className={"form-control"} 
             
          /> */}
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <div>
                            <Grid>
                                <ViewSelect
                                    id="patient-liminar"
                                    options={[
                                        { value: 'SIM', label: translate('patient.PatientLiminar.SIM') },
                                        { value: 'NAO', label: translate('patient.PatientLiminar.NAO') },
                                    ]}
                                    entityContext={EntityContext}
                                    name="liminar"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'liminar' }} contentKey="patient.liminar" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <div>
                            <Grid>
                                <ViewSelect
                                    id="patient-patientComplexity"
                                    options={[
                                        { value: 'BAIXA', label: translate('patient.PatientPatientComplexity.BAIXA') },
                                        { value: 'MEDIA', label: translate('patient.PatientPatientComplexity.MEDIA') },
                                        { value: 'ALTA', label: translate('patient.PatientPatientComplexity.ALTA') },
                                        { value: 'VENTILACAOMECANICA', label: translate('patient.PatientPatientComplexity.VENTILACAOMECANICA') },
                                    ]}
                                    entityContext={EntityContext}
                                    name="patientComplexity"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'patientComplexity' }} contentKey="patient.patientComplexity" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <div>
                            <Grid>
                                <ViewSelect
                                    id="patient-adId"
                                    options={[
                                        { value: 'AD', label: translate('patient.PatientAdId.AD') },
                                        { value: 'ID', label: translate('patient.PatientAdId.ID') },
                                    ]}
                                    entityContext={EntityContext}
                                    name="adId"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'adId' }} contentKey="patient.adId" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <div>
                            <Grid>
                                <ViewSelect
                                    id="patient-obese"
                                    options={[
                                        { value: 'SIM', label: translate('patient.PatientObese.SIM') },
                                        { value: 'NAO', label: translate('patient.PatientObese.NAO') },
                                    ]}
                                    entityContext={EntityContext}
                                    name="obese"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'obese' }} contentKey="patient.obese" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <div>
                            <Grid>
                                <ViewText
                                    id="patient-nead"
                                    entityContext={EntityContext}
                                    type="number"
                                    precision={0}
                                    name="nead"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'nead' }} contentKey="patient.nead" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <div>
                            <Grid>
                                <ViewText
                                    id="patient-hospitalReference"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="hospitalReference"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'hospitalReference' }} contentKey="patient.hospitalReference" />
                                        </>
                                    }
                                />
                                {/* <input
            onChange={evt => setState({ ...state,  hospitalReferenceFormValue: evt.target.value })} 
            value={state.hospitalReferenceFormValue ? state.hospitalReferenceFormValue : ""}
            id="patient-hospitalReference" 
            entityContext={EntityContext}
            type="text" 
            name="hospitalReference" 
            className={"form-control"} 
             
          /> */}
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <div>
                            <Grid>
                                <ViewText
                                    id="patient-observations"
                                    entityContext={EntityContext}
                                    type="textarea"
                                    name="observations"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'observations' }} contentKey="patient.observations" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <div>
                            <Grid>
                                <ViewText
                                    id="patient-informationProfessional"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="informationProfessional"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'informationProfessional' }} contentKey="patient.informationProfessional" />
                                        </>
                                    }
                                />
                                {/* <input
            onChange={evt => setState({ ...state,  informationProfessionalFormValue: evt.target.value })} 
            value={state.informationProfessionalFormValue ? state.informationProfessionalFormValue : ""}
            id="patient-informationProfessional" 
            entityContext={EntityContext}
            type="text" 
            name="informationProfessional" 
            className={"form-control"} 
             
          /> */}
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default ViewForm;
