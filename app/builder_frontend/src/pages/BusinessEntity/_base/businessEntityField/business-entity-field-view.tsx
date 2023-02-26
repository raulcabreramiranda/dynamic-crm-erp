import Grid from 'src/layouts/components/Grid';
import { Translate, translate } from 'src/layouts/components/translate-component';
import CardContent from 'src/layouts/components/Card/CardContent';

import ViewBoolean from 'src/layouts/components/inputs/ViewBoolean';
import ViewDate from 'src/layouts/components/inputs/ViewDate';
import ViewText from 'src/layouts/components/inputs/ViewText';
import ViewSelect from 'src/layouts/components/inputs/ViewSelect';
import ViewSelectMany from 'src/layouts/components/inputs/ViewSelectMany';
import ViewImage from 'src/layouts/components/inputs/ViewImage';

import { IBusinessEntityField } from 'src/pages/BusinessEntityField/_base/business-entity-field-model';

import { EntityContext } from './business-entity-field';

const ViewForm = () => {
    return (
        <>
            <CardContent>
                <form>
                    <Grid container spacing={7}>
                        <Grid item xs={3}>
                            <div>
                                <Grid>
                                    <ViewText
                                        id="business-entity-field-fieldName"
                                        entityContext={EntityContext}
                                        type="text"
                                        name="fieldName"
                                        label={
                                            <>
                                                <Translate contentKey="businessEntityField.Name" />
                                            </>
                                        }
                                    />
                                    {/* <input
            onChange={evt => setState({ ...state,  fieldNameFormValue: evt.target.value })} 
            value={state.fieldNameFormValue ? state.fieldNameFormValue : ""}
            id="business-entity-field-fieldName" 
            entityContext={EntityContext}
            type="text" 
            name="fieldName" 
            className={"form-control"} 
             
          /> */}
                                </Grid>
                            </div>
                        </Grid>

                        <Grid item xs={3}>
                            <div>
                                <Grid>
                                    <ViewText
                                        id="business-entity-field-fieldNameHumanized"
                                        entityContext={EntityContext}
                                        type="text"
                                        name="fieldNameHumanized"
                                        label={
                                            <>
                                                <Translate contentKey="businessEntityField.Humanized" />
                                            </>
                                        }
                                    />
                                    {/* <input
            onChange={evt => setState({ ...state,  fieldNameHumanizedFormValue: evt.target.value })} 
            value={state.fieldNameHumanizedFormValue ? state.fieldNameHumanizedFormValue : ""}
            id="business-entity-field-fieldNameHumanized" 
            entityContext={EntityContext}
            type="text" 
            name="fieldNameHumanized" 
            className={"form-control"} 
             
          /> */}
                                </Grid>
                            </div>
                        </Grid>

                        <Grid item xs={3}>
                            <div>
                                <Grid>
                                    <ViewSelect
                                        id="business-entity-field-fieldType"
                                        options={[
                                            { value: 'FRONT', label: translate('businessEntityField.BusinessEntityFieldFieldType.FRONT') },
                                            { value: 'END', label: translate('businessEntityField.BusinessEntityFieldFieldType.END') },
                                        ]}
                                        entityContext={EntityContext}
                                        name="fieldType"
                                        label={
                                            <>
                                                <Translate contentKey="businessEntityField.fieldType" />
                                            </>
                                        }
                                    />
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </>
    );
};

export default ViewForm;
