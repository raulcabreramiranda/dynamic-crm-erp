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
import { EntityContext } from './professional';

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
                                    id="professional-name"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="name"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Nome' }} contentKey="professional.name" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={3}>
                        <div>
                            <Grid>
                                <InputDate
                                    id="professional-birthDate"
                                    entityContext={EntityContext}
                                    dateType="DateTime"
                                    name="birthDate"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Data de nascimento' }} contentKey="professional.birthDate" />
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
                                    id="professional-cpf"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="cpf"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Cpf' }} contentKey="professional.cpf" />
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
                                    id="professional-rg"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="rg"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Rg' }} contentKey="professional.rg" />
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
                                    id="professional-telephone"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="telephone"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Celular' }} contentKey="professional.telephone" />
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
                                    id="professional-email"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="email"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'E-mail' }} contentKey="professional.email" />
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
                                    id="professional-contract"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="contract"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Contrato' }} contentKey="professional.contract" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={3}>
                        <div>
                            <Grid>
                                <InputDate
                                    id="professional-startDate"
                                    entityContext={EntityContext}
                                    dateType="DateTime"
                                    name="startDate"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Data de início' }} contentKey="professional.startDate" />
                                        </>
                                    }
                                />
                            </Grid>
                        </div>
                    </Grid>

                    <Grid item xs={3}>
                        <div>
                            <Grid>
                                <InputDate
                                    id="professional-endDate"
                                    entityContext={EntityContext}
                                    dateType="DateTime"
                                    name="endDate"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Data de término' }} contentKey="professional.endDate" />
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
