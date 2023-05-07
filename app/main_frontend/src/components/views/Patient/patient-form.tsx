import { useContext } from 'react';
import Grid from 'src/layouts/components/Grid';
import { Translate, translate } from 'src/layouts/components/translate-component';
import CardContent from 'src/layouts/components/Card/CardContent';

import { TabView, TabPanel } from 'primereact/tabview';
import Button from 'src/layouts/components/Button';
import InputBoolean from 'src/layouts/components/inputs/InputBoolean';
import InputDate from 'src/layouts/components/inputs/InputDate';
import InputText from 'src/layouts/components/inputs/InputText';
import InputSelect from 'src/layouts/components/inputs/InputSelect';
import InputSelectMany from 'src/layouts/components/inputs/InputSelectMany';
import InputImage from 'src/layouts/components/inputs/InputImage';
import InputSuperSelect from 'src/layouts/components/modal-super-select/InputSuperSelect';
import EntityContext from 'src/components/contexts/Patient/patient-context-update';

const FormUpdate = ({ isNew }: any) => {
    const { entityEdit, formTabActive, setFormTabActive } = useContext(EntityContext);

    if (!entityEdit || !entityEdit.id) {
        return <> </>;
    }

    return (
        <>
            <form>
                <Grid container spacing={7}>
                    <Grid item xs={5}>
                        <div>
                            <Grid>
                                <InputText
                                    id="patient-name"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="name"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'name' }} contentKey="patient.name" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={4}>
                        <div>
                            <Grid>
                                <InputText
                                    id="patient-cpf"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="cpf"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'cpf' }} contentKey="patient.cpf" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={3}>
                        <div>
                            <Grid>
                                <InputText
                                    id="patient-rg"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="rg"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'rg' }} contentKey="patient.rg" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={4}>
                        <div>
                            <Grid>
                                <InputSelect
                                    id="patient-sex"
                                    options={[
                                        { value: 'MASCULINO', label: translate('patient.PatientSex.MASCULINO') },
                                        { value: 'FEMININO', label: translate('patient.PatientSex.FEMININO') },
                                    ]}
                                    entityContext={EntityContext}
                                    name="sex"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'sex' }} contentKey="patient.sex" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={4}>
                        <div>
                            <Grid>
                                <InputDate
                                    id="patient-birthDate"
                                    entityContext={EntityContext}
                                    dateType="DateTime"
                                    name="birthDate"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'birthDate' }} contentKey="patient.birthDate" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={4}>
                        <div>
                            <Grid>
                                <InputText
                                    id="patient-weight"
                                    entityContext={EntityContext}
                                    type="number"
                                    precision={2}
                                    name="weight"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'weight' }} contentKey="patient.weight" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={4}>
                        <div>
                            <Grid>
                                <InputText
                                    id="patient-height"
                                    entityContext={EntityContext}
                                    type="number"
                                    precision={2}
                                    name="height"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'height' }} contentKey="patient.height" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={4}>
                        <div>
                            <Grid>
                                <InputText
                                    id="patient-zipCode"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="zipCode"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'CEP' }} contentKey="patient.zipCode" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={8}>
                        <div>
                            <Grid>
                                <InputText
                                    id="patient-street"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="street"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'street' }} contentKey="patient.street" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={4}>
                        <div>
                            <Grid>
                                <InputText
                                    id="patient-number"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="number"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'number' }} contentKey="patient.number" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={8}>
                        <div>
                            <Grid>
                                <InputText
                                    id="patient-neighborhood"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="neighborhood"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'neighborhood' }} contentKey="patient.neighborhood" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={3}>
                        <div>
                            <Grid>
                                <InputText
                                    id="patient-city"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="city"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'city' }} contentKey="patient.city" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={3}>
                        <div>
                            <Grid>
                                <InputText
                                    id="patient-uf"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="uf"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'uf' }} contentKey="patient.uf" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={6}>
                        <div>
                            <Grid>
                                <InputText
                                    id="patient-complement"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="complement"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'complement' }} contentKey="patient.complement" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={6}>
                        <div>
                            <Grid>
                                <InputText
                                    id="patient-reference"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="reference"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'reference' }} contentKey="patient.reference" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={6}>
                        <div>
                            <Grid>
                                <InputText
                                    id="patient-healthPlanEnrollment"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="healthPlanEnrollment"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'healthPlanEnrollment' }} contentKey="patient.healthPlanEnrollment" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={6}>
                        <div>
                            <Grid>
                                <InputSelect
                                    id="patient-liminar"
                                    options={[
                                        { value: 'SIM', label: translate('patient.PatientLiminar.SIM') },
                                        { value: 'NAO', label: translate('patient.PatientLiminar.NAO') },
                                    ]}
                                    entityContext={EntityContext}
                                    name="liminar"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'liminar' }} contentKey="patient.liminar" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={6}>
                        <div>
                            <Grid>
                                <InputSelect
                                    id="patient-patientComplexity"
                                    options={[
                                        { value: 'BAIXA', label: translate('patient.PatientPatientComplexity.BAIXA') },
                                        { value: 'MEDIA', label: translate('patient.PatientPatientComplexity.MEDIA') },
                                        { value: 'ALTA', label: translate('patient.PatientPatientComplexity.ALTA') },
                                        { value: 'VENTILACAOMECANICA', label: translate('patient.PatientPatientComplexity.VENTILACAOMECANICA') },
                                    ]}
                                    entityContext={EntityContext}
                                    name="patientComplexity"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'patientComplexity' }} contentKey="patient.patientComplexity" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={6}>
                        <div>
                            <Grid>
                                <InputSelect
                                    id="patient-adId"
                                    options={[
                                        { value: 'AD', label: translate('patient.PatientAdId.AD') },
                                        { value: 'ID', label: translate('patient.PatientAdId.ID') },
                                    ]}
                                    entityContext={EntityContext}
                                    name="adId"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'adId' }} contentKey="patient.adId" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={6}>
                        <div>
                            <Grid>
                                <InputSelect
                                    id="patient-obese"
                                    options={[
                                        { value: 'SIM', label: translate('patient.PatientObese.SIM') },
                                        { value: 'NAO', label: translate('patient.PatientObese.NAO') },
                                    ]}
                                    entityContext={EntityContext}
                                    name="obese"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'obese' }} contentKey="patient.obese" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={6}>
                        <div>
                            <Grid>
                                <InputText
                                    id="patient-nead"
                                    entityContext={EntityContext}
                                    type="number"
                                    precision={0}
                                    name="nead"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'nead' }} contentKey="patient.nead" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={6}>
                        <div>
                            <Grid>
                                <InputText
                                    id="patient-hospitalReference"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="hospitalReference"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'hospitalReference' }} contentKey="patient.hospitalReference" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <div>
                            <Grid>
                                <InputText
                                    id="patient-observations"
                                    entityContext={EntityContext}
                                    type="textarea"
                                    precision={0}
                                    name="observations"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'observations' }} contentKey="patient.observations" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={6}>
                        <div>
                            <Grid>
                                <InputText
                                    id="patient-informationProfessional"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="informationProfessional"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'informationProfessional' }} contentKey="patient.informationProfessional" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default FormUpdate;
