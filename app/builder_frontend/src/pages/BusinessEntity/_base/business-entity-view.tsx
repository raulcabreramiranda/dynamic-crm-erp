import Grid from 'src/layouts/components/Grid';
import { Translate, translate } from 'src/layouts/components/translate-component';
import CardContent from 'src/layouts/components/Card/CardContent';

import ViewBoolean from 'src/layouts/components/inputs/ViewBoolean';
import ViewDate from 'src/layouts/components/inputs/ViewDate';
import ViewText from 'src/layouts/components/inputs/ViewText';
import ViewSelect from 'src/layouts/components/inputs/ViewSelect';
import ViewSelectMany from 'src/layouts/components/inputs/ViewSelectMany';
import ViewImage from 'src/layouts/components/inputs/ViewImage';

import { IBusinessEntity } from './business-entity-model';
import { EntityContext } from './business-entity-detail';

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
                                        id="business-entity-entityName"
                                        entityContext={EntityContext}
                                        type="text"
                                        name="entityName"
                                        label={
                                            <>
                                                <Translate contentKey="businessEntity.Name" />
                                            </>
                                        }
                                    />
                                    {/* <input
            onChange={evt => setState({ ...state,  entityNameFormValue: evt.target.value })} 
            value={state.entityNameFormValue ? state.entityNameFormValue : ""}
            id="business-entity-entityName" 
            entityContext={EntityContext}
            type="text" 
            name="entityName" 
            className={"form-control"} 
             
          /> */}
                                </Grid>
                            </div>
                        </Grid>

                        <Grid item xs={4}>
                            <div>
                                <Grid>
                                    <ViewText
                                        id="business-entity-entityNameHumanized"
                                        entityContext={EntityContext}
                                        type="text"
                                        name="entityNameHumanized"
                                        label={
                                            <>
                                                <Translate contentKey="businessEntity.Humanized name" />
                                            </>
                                        }
                                    />
                                    {/* <input
            onChange={evt => setState({ ...state,  entityNameHumanizedFormValue: evt.target.value })} 
            value={state.entityNameHumanizedFormValue ? state.entityNameHumanizedFormValue : ""}
            id="business-entity-entityNameHumanized" 
            entityContext={EntityContext}
            type="text" 
            name="entityNameHumanized" 
            className={"form-control"} 
             
          /> */}
                                </Grid>
                            </div>
                        </Grid>

                        <Grid item xs={5}>
                            <div>
                                <Grid>
                                    <ViewText
                                        id="business-entity-entityNameHumanizedPlural"
                                        entityContext={EntityContext}
                                        type="text"
                                        name="entityNameHumanizedPlural"
                                        label={
                                            <>
                                                <Translate contentKey="businessEntity.Humanized plural name" />
                                            </>
                                        }
                                    />
                                    {/* <input
            onChange={evt => setState({ ...state,  entityNameHumanizedPluralFormValue: evt.target.value })} 
            value={state.entityNameHumanizedPluralFormValue ? state.entityNameHumanizedPluralFormValue : ""}
            id="business-entity-entityNameHumanizedPlural" 
            entityContext={EntityContext}
            type="text" 
            name="entityNameHumanizedPlural" 
            className={"form-control"} 
             
          /> */}
                                </Grid>
                            </div>
                        </Grid>

                        <Grid item xs={3}>
                            <div>
                                <Grid>
                                    <ViewBoolean
                                        id="business-entity-hasWhiteLabel"
                                        options={[
                                            { value: true, label: translate('businessEntity.hasWhiteLabel.YES') },
                                            { value: false, label: translate('businessEntity.hasWhiteLabel.NOT') },
                                        ]}
                                        entityContext={EntityContext}
                                        name="hasWhiteLabel"
                                        label={
                                            <>
                                                <Translate contentKey="businessEntity.hasWhiteLabel" />
                                            </>
                                        }
                                    />{' '}
                                </Grid>
                            </div>
                        </Grid>

                        <Grid item xs={3}>
                            <div>
                                <Grid>
                                    <ViewBoolean
                                        id="business-entity-hasDateAudit"
                                        options={[
                                            { value: true, label: translate('businessEntity.hasDateAudit.YES') },
                                            { value: false, label: translate('businessEntity.hasDateAudit.NOT') },
                                        ]}
                                        entityContext={EntityContext}
                                        name="hasDateAudit"
                                        label={
                                            <>
                                                <Translate contentKey="businessEntity.hasDateAudit" />
                                            </>
                                        }
                                    />{' '}
                                </Grid>
                            </div>
                        </Grid>

                        <Grid item xs={6}>
                            <div>
                                <Grid>
                                    <ViewText
                                        id="business-entity-frontPath"
                                        entityContext={EntityContext}
                                        type="text"
                                        name="frontPath"
                                        label={
                                            <>
                                                <Translate contentKey="businessEntity.frontPath" />
                                            </>
                                        }
                                    />
                                    {/* <input
            onChange={evt => setState({ ...state,  frontPathFormValue: evt.target.value })} 
            value={state.frontPathFormValue ? state.frontPathFormValue : ""}
            id="business-entity-frontPath" 
            entityContext={EntityContext}
            type="text" 
            name="frontPath" 
            className={"form-control"} 
             
          /> */}
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
