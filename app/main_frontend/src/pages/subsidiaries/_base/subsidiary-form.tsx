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
import { EntityContext } from './subsidiary';

const FormUpdate = ({ isNew }: any) => {
    const { entityEdit, formTabActive, setFormTabActive } = useContext(EntityContext);

    if (!entityEdit || !entityEdit.id) {
        return <> </>;
    }

    return (
        <>
            <form>
                <Grid container spacing={7}>
                    <Grid item xs={3}>
                        <div>
                            <Grid>
                                <InputText
                                    id="subsidiary-commercialName"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="commercialName"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Nome comercial' }} contentKey="subsidiary.commercialName" />
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
                                    id="subsidiary-corporateName"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="corporateName"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Razão social' }} contentKey="subsidiary.corporateName" />
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
                                    id="subsidiary-cnpj"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="cnpj"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'CNPJ' }} contentKey="subsidiary.cnpj" />
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
                                    id="subsidiary-telephone"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="telephone"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Telefone' }} contentKey="subsidiary.telephone" />
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
                                    id="subsidiary-email"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="email"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'E-mail' }} contentKey="subsidiary.email" />
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
                                    id="subsidiary-address"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="address"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Endereço' }} contentKey="subsidiary.address" />
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
                                    id="subsidiary-cnae"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="cnae"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'E-mailCnae' }} contentKey="subsidiary.cnae" />
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
