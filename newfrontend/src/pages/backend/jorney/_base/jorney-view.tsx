import Grid from '@mui/material/Grid';
import { Translate, translate } from 'src/layouts/components/translate-component';
import CardContent from '@mui/material/CardContent';

import ViewDate from 'src/layouts/components/inputs/ViewDate';
import ViewText from 'src/layouts/components/inputs/ViewText';
import ViewSelect from 'src/layouts/components/inputs/ViewSelect';
import ViewSelectMany from 'src/layouts/components/inputs/ViewSelectMany';
import ViewUploadImage from 'src/layouts/components/inputs/ViewUploadImage';

import { IJorney } from './jorney-model';
import { EntityContext } from './jorney';

const ViewForm = () => {
    return (
        <>
            <CardContent>
                <form>
                    <Grid container spacing={7}>
                        <Grid item xs={12}>
                            <div>
                                <Grid>
                                    <ViewUploadImage
                                        id="jorney-imageBanner"
                                        entityContext={EntityContext}
                                        name="imageBanner"
                                        label={
                                            <>
                                                <Translate contentKey="jorney.Image" />
                                            </>
                                        }
                                    />
                                </Grid>
                            </div>
                        </Grid>

                        <Grid item xs={3}>
                            <div>
                                <Grid>
                                    <ViewDate
                                        id="jorney-year"
                                        entityContext={EntityContext}
                                        name="year"
                                        label={
                                            <>
                                                <Translate contentKey="jorney.Year" />
                                            </>
                                        }
                                    />
                                </Grid>
                            </div>
                        </Grid>

                        <Grid item xs={3}>
                            <div>
                                <Grid>
                                    <ViewText
                                        id="jorney-name"
                                        entityContext={EntityContext}
                                        type="text"
                                        name="name"
                                        label={
                                            <>
                                                <Translate contentKey="jorney.Name" />
                                            </>
                                        }
                                    />
                                    {/* <input
            onChange={evt => setState({ ...state,  nameFormValue: evt.target.value })} 
            value={state.nameFormValue ? state.nameFormValue : ""}
            id="jorney-name" 
            entityContext={EntityContext}
            type="text" 
            name="name" 
            className={"form-control"} 
             
          /> */}
                                </Grid>
                            </div>
                        </Grid>

                        <Grid item xs={3}>
                            <div>
                                <Grid>
                                    <ViewSelect
                                        id="jorney-jorneyType"
                                        options={[
                                            { value: 'JORNEY', label: translate('jorney.JorneyType.JORNEY') },
                                            { value: 'FREE_PRODUCTION', label: translate('jorney.JorneyType.FREE_PRODUCTION') },
                                            { value: 'SIMULATE', label: translate('jorney.JorneyType.SIMULATE') },
                                        ]}
                                        entityContext={EntityContext}
                                        name="jorneyType"
                                        label={
                                            <>
                                                <Translate contentKey="jorney.jorneyType" />
                                            </>
                                        }
                                    />
                                </Grid>
                            </div>
                        </Grid>

                        <Grid item xs={3}>
                            <div>
                                <Grid>
                                    <ViewText
                                        id="jorney-clientId"
                                        entityContext={EntityContext}
                                        type="number"
                                        precision={0}
                                        name="clientId"
                                        label={
                                            <>
                                                <Translate contentKey="jorney.Client Id" />
                                            </>
                                        }
                                    />
                                </Grid>
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <div>
                                <ViewSelectMany
                                    id="jorney-jorneyDegrees-form"
                                    options={[]}
                                    entityContext={EntityContext}
                                    optionsLink={'jorney-degrees'}
                                    optionsSort={{ year: 'asc' }}
                                    optionsShowFields={['year']}
                                    name="jorneyDegrees"
                                    label={
                                        <>
                                            <Translate contentKey="jorney.Jorney Degrees" />
                                        </>
                                    }
                                />
                                {/*<SelectAsync
            isMulti={true }
            id="jorney-jorneyDegrees-form" name={"jorneyDegrees"} 
            instanceId="jorney-jorneyDegrees-form"
            placeholder={translate(t, 'jorney.Jorney Degrees-input-placeholder')}
            className={"css-select-control"} data-type-rel="one-to-many-owner-side"
            value={state.jorneyDegreesFormValue ? state.jorneyDegreesFormValue : ""}
            onChange={(options) => setState({ ...state,  jorneyDegreesFormValue: options })}
            defaultOptions={state.jorneyDegreesStartSelectOptions ? state.jorneyDegreesStartSelectOptions : []}
            loadingMessage={(input)=>(translate(t, "selectAsync.loadingMessage"))}
            noOptionsMessage={(input)=>state.jorneyDegreesStartSelectOptions === undefined ? translate(t, "selectAsync.loadingMessage") : translate(t, "selectAsync.noOptionsMessage")}
            onMenuOpen={async ()=>{ 
              if(state.jorneyDegreesStartSelectOptions === undefined){
                const result = await getListAxios('jorney-degrees', {}, 0, 100, 'year,asc', 'year');
                setState({ ...state, jorneyDegreesStartSelectOptions: result ? result.map((p:any)=>({...p, value: p.id, label: (showFieldsSelectAsync(p, 'year') || "") })) : []  })
              }
            }} 
            loadOptions={(inputValue, callback) => {
              (async () => {const result = await getListAxios(
                'jorney-degrees', 
                {'year.contains': inputValue}, 
                0, 
                100, 
                'year,asc', 
                'year');
              callback(
                result ? result.map((p:any)=>({...p, value: p.id, label: (showFieldsSelectAsync(p, 'year') || "")})) : []
              );})()
            }}
          /> */}
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <div>
                                <ViewSelectMany
                                    id="jorney-themes-form"
                                    options={[]}
                                    entityContext={EntityContext}
                                    optionsLink={'themes'}
                                    optionsSort={{ id: 'asc' }}
                                    optionsShowFields={['id']}
                                    name="themes"
                                    label={
                                        <>
                                            <Translate contentKey="jorney.Themes" />
                                        </>
                                    }
                                />
                                {/*<SelectAsync
            isMulti={true }
            id="jorney-themes-form" name={"themes"} 
            instanceId="jorney-themes-form"
            placeholder={translate(t, 'jorney.Themes-input-placeholder')}
            className={"css-select-control"} data-type-rel="one-to-many-owner-side"
            value={state.themesFormValue ? state.themesFormValue : ""}
            onChange={(options) => setState({ ...state,  themesFormValue: options })}
            defaultOptions={state.themesStartSelectOptions ? state.themesStartSelectOptions : []}
            loadingMessage={(input)=>(translate(t, "selectAsync.loadingMessage"))}
            noOptionsMessage={(input)=>state.themesStartSelectOptions === undefined ? translate(t, "selectAsync.loadingMessage") : translate(t, "selectAsync.noOptionsMessage")}
            onMenuOpen={async ()=>{ 
              if(state.themesStartSelectOptions === undefined){
                const result = await getListAxios('themes', {}, 0, 100, 'id,asc', 'id');
                setState({ ...state, themesStartSelectOptions: result ? result.map((p:any)=>({...p, value: p.id, label: (showFieldsSelectAsync(p, 'id') || "") })) : []  })
              }
            }} 
            loadOptions={(inputValue, callback) => {
              (async () => {const result = await getListAxios(
                'themes', 
                {'id.contains': inputValue}, 
                0, 
                100, 
                'id,asc', 
                'id');
              callback(
                result ? result.map((p:any)=>({...p, value: p.id, label: (showFieldsSelectAsync(p, 'id') || "")})) : []
              );})()
            }}
          /> */}
                            </div>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </>
    );
};

export default ViewForm;
