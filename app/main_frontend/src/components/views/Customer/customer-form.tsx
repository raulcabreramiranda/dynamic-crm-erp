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
import EntityContext from 'src/components/contexts/Customer/customer-context';

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
                                    id="customer-commercialName"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="commercialName"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Nome comercial' }} contentKey="customer.commercialName" />
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
                                    id="customer-corporateName"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="corporateName"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Razão social' }} contentKey="customer.corporateName" />
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
                                    id="customer-cnpj"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="cnpj"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'CNPJ' }} contentKey="customer.cnpj" />
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
                                    id="customer-cpf"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="cpf"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'CPF' }} contentKey="customer.cpf" />
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
                                    id="customer-telephone"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="telephone"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Telefone' }} contentKey="customer.telephone" />
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
                                    id="customer-email"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="email"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'E-mail' }} contentKey="customer.email" />
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
                                    id="customer-address"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="address"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Endereço' }} contentKey="customer.address" />
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
                                    id="customer-technicalManagerName"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="technicalManagerName"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Responsável técnico (Nome)' }} contentKey="customer.technicalManagerName" />
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
                                    id="customer-technicalManagerSector"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="technicalManagerSector"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Responsável técnico (Setor)' }} contentKey="customer.technicalManagerSector" />
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
                                    id="customer-technicalManagerFunction"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="technicalManagerFunction"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Responsável técnico (Função)' }} contentKey="customer.technicalManagerFunction" />
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
                                    id="customer-technicalManagerContact"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="technicalManagerContact"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Responsável técnico (Contato)' }} contentKey="customer.technicalManagerContact" />
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
                                    id="customer-technicalManagerEmail"
                                    entityContext={EntityContext}
                                    type="text"
                                    name="technicalManagerEmail"
                                    labelPos="top"
                                    label={
                                        <>
                                            <Translate label={{ pt: 'Responsável técnico (E-mail)' }} contentKey="customer.technicalManagerEmail" />
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
