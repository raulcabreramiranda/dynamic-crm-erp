// @ts-nocheck

import { IJorneyDegree } from '../../jorneydegree/_base/jorney-degree-model';
import { ITheme } from '../../theme/_base/theme-model';

import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from '../../../../components/util/date-utils';
import { Translate, translate, hasAnyAuthority, useTranslation, Link } from '../../../../components/util/translate-component';
import React, { useState, useEffect } from 'react';
import {
    useRouter,
    nextCookie,
    getFilterFromSelect,
    getFormFromSelect,
    getListAxios,
    getValueRecursive,
    showFieldsSelectAsync,
    checkAnyValueFields,
    viacepRequest,
    jsonParse,
    trim,
    quillEditorModules,
    quillEditorFormats,
    GetServerSideProps,
    AppProps,
} from '../../../../components/util/entity-utils';
import { serverSideTranslations } from '../../../../components/util/next-i18next';

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT, BASE_API_VERSION_PATH, AUTH_TOKEN_KEY } from '../../../../components/util/constants';
import { ITEMS_PER_PAGE, getSortState } from '../../../../components/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from '../../../../components/util/entity-utils';
import {
    Button,
    Col,
    Row,
    Table,
    Label,
    CardHeader,
    CardBody,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    TabContent,
    TabPane,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';

import cookie from 'js-cookie';
import Select from 'react-select';
import SelectAsync from 'react-select/async';
import MultiSelectTwoColumns from '../../../../components/util/MultiSelectTwoColumns';
import RenderModalSuperSelect from '../../../../components/util/RenderModalSuperSelect';

import IJorney from './jorney-model';

import InputMask from 'react-input-mask';
const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
import 'react-quill/dist/quill.snow.css';

import CurrencyInput from 'react-currency-input';

import ReactPaginate from 'react-paginate';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
// import { pt } from 'date-fns/esm/locale';
import moment from 'moment';
// registerLocale('pt', pt);
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ImageUploading from 'react-images-uploading';
import ImageUpload from 'react-images-upload';

const MySwal = withReactContent(Swal);

export interface IJorneyProps extends AppProps {
    id?: any;
    year?: any;
    name?: any;
    jorneyType?: any;
    jorneyDegrees_cerneDegree_name?: any;
    imageBanner?: any;
    clientId?: any;
    jorneyDegreesId?: any;
    themesId?: any;
    extraFilters?: any;
    activePage?: any;
    sort?: any;
    _router: any;
    props: any;
    order?: any;
    itemsPerPage?: any;
    totalItems?: any;
    state?: any;
    getEntityFiltersURL?: Function;
    setState?: Function;
    t?: Function;
    jorneyList?: any;
    setJorneyList?: Function;
    jorneyEntity?: any;
    setJorneyEntity?: Function;

    imageBannerFileInput?: any;

    getAllEntities?: Function;
    sortEntities?: Function;
    sortFunction?: Function;
    handlePagination?: Function;
    deleteEntityModal?: Function;
    saveEntity?: Function;
    renderHeaderUpdate?: Function;
    renderBodyUpdate?: Function;
    renderNewModal?: Function;
    renderUpdateModal?: Function;
    fieldsBase?: any;
    getFullEntityFormValue?: Function;
    openUpdateModal?: Function;
    renderTable?: Function;
    handleSyncList?: Function;
    getEntitiesFetch?: Function;
    deleteEntityFetch?: Function;
    getEntityFetch?: Function;
    createEntityFetch?: Function;
    updateEntityFetch?: Function;
    getJorneyState?: Function;
    returnFunction?: Function;
    jorneyDegrees?: any;
    themes?: any;
    userAccount?: any;
    loading?: any;
}

const apiUrl = BASE_API_VERSION_PATH + 'api/jorneys';
const getEntityFetch: any = async (context: IJorneyProps, id: any, selectFields = '') => {
    const requestUrl = `${apiUrl}/${id}`;

    const res = await fetch(requestUrl, {
        method: 'get',
        headers: {
            Authorization: 'Bearer ' + cookie.get(AUTH_TOKEN_KEY),
            'Content-Type': 'application/json;charset=utf-8',
            'Select-Fields': selectFields,
        },
    });
    const json = await res.json();
    context.setJorneyEntity(json);

    return json;
};

const createEntityFetch: any = async (context: IJorneyProps, entity: any, listFiltersPage: any) => {
    const nEntity = { ...entity };
    const res = await fetch(apiUrl, {
        method: 'post',
        headers: {
            Authorization: 'Bearer ' + cookie.get(AUTH_TOKEN_KEY),
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(nEntity),
    });
    const json = await res.json();
    context.getAllEntities();
    return json;
};

const updateEntityFetch: any = async (context: IJorneyProps, entity: any, listFiltersPage: any) => {
    const nEntity = { ...entity };
    const res = await fetch(`${apiUrl}`, {
        method: 'put',
        headers: {
            Authorization: 'Bearer ' + cookie.get(AUTH_TOKEN_KEY),
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(nEntity),
    });
    const json = await res.json();
    context.getAllEntities();
    return json;
};

const deleteEntityFetch: any = async (context: IJorneyProps, _jorneyEntity: any, listFiltersPage: any) => {
    await fetch(`${apiUrl}/${_jorneyEntity.id}`, {
        method: 'delete',
        headers: {
            Authorization: 'Bearer ' + cookie.get(AUTH_TOKEN_KEY),
            'Content-Type': 'application/json;charset=utf-8',
        },
    });
    context.getAllEntities();
    return true;
};

const getEntityFiltersURL = (context: IJorneyProps, offset = null) => {
    return (
        '' +
        (context.state.id ? 'id=' + context.state.id + '&' : '') +
        (context.state.year ? 'year=' + context.state.year + '&' : '') +
        (context.state.name ? 'name=' + context.state.name + '&' : '') +
        (context.state.jorneyType ? 'jorneyType=' + context.state.jorneyType + '&' : '') +
        (context.state.jorneyDegrees_cerneDegree_name ? 'jorneyDegrees_cerneDegree_name=' + context.state.jorneyDegrees_cerneDegree_name + '&' : '') +
        (context.state.imageBanner ? 'imageBanner=' + context.state.imageBanner + '&' : '') +
        (context.state.clientId ? 'clientId=' + context.state.clientId + '&' : '') +
        (context.state.jorneyDegreesId ? 'jorneyDegrees=' + context.state.jorneyDegreesId.map((v: any) => v.value + '<->' + v.label).join(',') + '&' : '') +
        (context.state.themesId ? 'themes=' + context.state.themesId.map((v: any) => v.value + '<->' + v.label).join(',') + '&' : '') +
        (context.state.baseFilters ? 'baseFilters=' + context.state.baseFilters + '&' : '') +
        (context.state.extraFilters ? 'extraFilters=' + encodeURI(JSON.stringify(context.state.extraFilters)) + '&' : '') +
        'page=' +
        context.state.activePage +
        '&' +
        'size=' +
        context.state.itemsPerPage +
        '&' +
        (offset !== null ? 'offset=' + offset + '&' : '') +
        'sort=' +
        context.state.sort +
        ',' +
        context.state.order +
        '&' +
        ''
    );
};

const getAllEntities = async (context: IJorneyProps, _fieldsBase: any) => {
    _fieldsBase = _fieldsBase ? _fieldsBase : {};
    const { id, year, name, jorneyType, jorneyDegrees_cerneDegree_name, imageBanner, clientId, jorneyDegreesId, themesId, extraFilters, activePage, itemsPerPage, sort, order } = context.state;

    const res = await context.getEntitiesFetch(
        id,
        year,
        name,
        jorneyType,
        jorneyDegrees_cerneDegree_name,
        imageBanner,
        clientId,
        jorneyDegreesId.map((v) => v.value).join(','),
        themesId.map((v) => v.value).join(','),
        typeof _fieldsBase.extraFilters != undefined ? _fieldsBase.extraFilters : extraFilters,
        typeof _fieldsBase.activePage != undefined ? _fieldsBase.activePage : context.state.activePage,
        typeof _fieldsBase.itemsPerPage != undefined ? _fieldsBase.itemsPerPage : context.state.itemsPerPage,
        `${_fieldsBase.sort ? _fieldsBase.sort : context.state.sort},${_fieldsBase.order ? _fieldsBase.order : context.state.order}`,
    );

    context.setState({
        ...context.state,
        totalItems: res.headers.get('X-Total-Count'),
    });

    const json = await res.json();
    context.setJorneyList(json);
};

const sortEntities = (context: IJorneyProps, _newState = undefined) => {
    context.getAllEntities();
    const endURL = `?page=${context.state.activePage}&sort=${context.state.sort},${context.state.order}`;
    context._router.push(`?${context.getEntityFiltersURL()}`);
};

const sortFunction = (context: IJorneyProps, p: any) => () => {
    context.setState({
        ...context.state,
        order: p === context.state.sort && context.state.order === 'asc' ? 'desc' : 'asc',
        sort: p,
    });
    context.getAllEntities({
        order: p === context.state.sort && context.state.order === 'asc' ? 'desc' : 'asc',
        sort: p,
    });
};

const handlePagination = (context: IJorneyProps, activePage: any) => {
    context.setState({
        ...context.state,
        activePage,
    });
    context.getAllEntities({ activePage });
};

const deleteEntityModal = (context: IJorneyProps, _jorneyEntity: any) => {
    MySwal.fire({
        title: (
            <Translate t={context.t} contentKey="entity.delete.title">
                Confirm delete operation
            </Translate>
        ),
        html: (
            <Translate t={context.t} contentKey="jorney.delete.question" interpolate={{ id: _jorneyEntity.id }}>
                Are you sure you want to delete this Jorney?
            </Translate>
        ),
        icon: 'warning',
        showConfirmButton: true,
        showCancelButton: true,
        confirmButtonColor: '#e70015',
        cancelButtonText: (
            <>
                {' '}
                <i className="fa fa-ban" />
                &nbsp;{' '}
                <Translate t={context.t} contentKey="jorney.btnCancel">
                    Cancel
                </Translate>
            </>
        ),
        confirmButtonText: (
            <>
                {' '}
                <i className="fa fa-trash" />
                &nbsp;
                <Translate t={context.t} contentKey="jorney.btnDelete">
                    Delete
                </Translate>
            </>
        ),
    }).then(async (response) => {
        if (response.isConfirmed) {
            await context.deleteEntityFetch(_jorneyEntity, { reloadList: false });
            context.getAllEntities();
            MySwal.fire({
                title: (
                    <Translate t={context.t} contentKey="entity.delete.title.confirmed">
                        Confirmed delete operation
                    </Translate>
                ),
                icon: 'success',
            });
        }
    });
};

const saveEntity = async (context: IJorneyProps, isNew: any) => {
    const errors = [];

    const selectFieldsList = ['id', 'year', 'name', 'jorneyType', 'jorneyDegrees_cerneDegree_name', 'imageBanner', 'clientId', 'jorneyDegrees.id', 'themes.id'];

    if (errors.length === 0) {
        const _entity = {
            ...context.jorneyEntity,
            // ...values,

            jorneyDegrees: getFormFromSelect(context.state.jorneyDegreesFormValue, 'one-to-many'),

            themes: getFormFromSelect(context.state.themesFormValue, 'one-to-many'),

            id: context.state.idFormValue,
            year: context.state.yearFormValue,
            name: context.state.nameFormValue,
            jorneyType: context.state.jorneyTypeFormValue === null ? null : context.state.jorneyTypeFormValue,
            jorneyDegrees_cerneDegree_name: context.state.jorneyDegrees_cerneDegree_nameFormValue,
            imageBanner: context.state.imageBannerFormValue,
            imageBannerBase64: context.state.imageBannerBase64,
            imageBannerFileName: context.state.imageBannerFileName,
            clientId: context.state.clientIdFormValue,
        };

        const entity = _entity;

        const { id, year, name, jorneyType, jorneyDegrees_cerneDegree_name, imageBanner, clientId, jorneyDegreesId, themesId, extraFilters, activePage, itemsPerPage, sort, order } = context.state;

        if (isNew) {
            context['state'] = { ...context.state, showModalForm: false, showModalEdit: null };
            await context.createEntityFetch(entity);
            context.getAllEntities();
        } else {
            context['state'] = { ...context.state, showModalForm: false, showModalEdit: null };
            await context.updateEntityFetch(entity);
            context.getAllEntities();
        }
    }
};

const renderHeaderUpdate = (context: IJorneyProps, isNew: any) => {
    const { imageBanner, imageBannerContentType, imageBannerBase64 } = context.jorneyEntity;
    const baseFilters = context.state && context.state['baseFilters'] ? context.state['baseFilters'] : null;

    return (
        <>
            <div id="page-heading">
                <span className="page-header ml-3">
                    {isNew ? (
                        <Translate t={context.t} contentKey="jorney.home.createLabel">
                            Create a Jorney
                        </Translate>
                    ) : (
                        <Translate t={context.t} contentKey="jorney.home.editLabel">
                            Edit a Jorney
                        </Translate>
                    )}
                </span>
            </div>
        </>
    );
};

const renderBodyUpdate = (context: IJorneyProps, _jorneyEntity: any, isNew: any) => {
    const { imageBanner, imageBannerContentType, imageBannerBase64 } = _jorneyEntity;
    const baseFilters = context.state && context.state['baseFilters'] ? context.state['baseFilters'] : null;

    return (
        <>
            <Row className="justify-content-center">
                <Col md="11">
                    {context.loading ? (
                        <p>Loading...</p>
                    ) : (
                        <div>
                            {!isNew ? (
                                <div>
                                    <Row>
                                        <Col md="12">
                                            <input id="jorney-id" type="hidden" className="form-control" name="id" required readOnly />
                                        </Col>
                                    </Row>
                                </div>
                            ) : null}
                            <Row className="row-jorney-first-column">
                                <Col md="12">
                                    <div>
                                        <Row>
                                            <Col md="3">
                                                <Label className="mt-4 label-single-line" for="jorney-jorneyDegrees">
                                                    <Translate t={context.t} contentKey="jorney.jorneyDegrees">
                                                        Jorney Degrees
                                                    </Translate>
                                                </Label>
                                            </Col>
                                            <Col md="9">
                                                <SelectAsync
                                                    isMulti={true}
                                                    id="jorney-jorneyDegrees-form"
                                                    name={'jorneyDegrees'}
                                                    instanceId="jorney-jorneyDegrees-form"
                                                    placeholder={translate(context.t, 'jorney.jorneyDegrees-input-placeholder')}
                                                    className={'css-select-control'}
                                                    data-type-rel="one-to-many-owner-side"
                                                    value={context.state.jorneyDegreesFormValue ? context.state.jorneyDegreesFormValue : ''}
                                                    onChange={(options) => context.setState({ ...context.state, jorneyDegreesFormValue: options })}
                                                    defaultOptions={context.state.jorneyDegreesStartSelectOptions ? context.state.jorneyDegreesStartSelectOptions : []}
                                                    loadingMessage={(input) => translate(context.t, 'selectAsync.loadingMessage')}
                                                    noOptionsMessage={(input) =>
                                                        context.state.jorneyDegreesStartSelectOptions === undefined
                                                            ? translate(context.t, 'selectAsync.loadingMessage')
                                                            : translate(context.t, 'selectAsync.noOptionsMessage')
                                                    }
                                                    onMenuOpen={async () => {
                                                        if (context.state.jorneyDegreesStartSelectOptions === undefined) {
                                                            const result = await getListAxios('jorney-degrees', {}, 0, 100, 'id,asc', 'id');
                                                            context.setState({
                                                                ...context.state,
                                                                jorneyDegreesStartSelectOptions: result
                                                                    ? result.map((p: any) => ({ ...p, value: p.id, label: showFieldsSelectAsync(p, 'id') || '' }))
                                                                    : [],
                                                            });
                                                        }
                                                    }}
                                                    loadOptions={(inputValue, callback) => {
                                                        (async () => {
                                                            const result = await getListAxios('jorney-degrees', { 'id.contains': inputValue }, 0, 100, 'id,asc', 'id');
                                                            callback(result ? result.map((p: any) => ({ ...p, value: p.id, label: showFieldsSelectAsync(p, 'id') || '' })) : []);
                                                        })();
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>

                                <Col md="12">
                                    <div>
                                        <Row>
                                            <Col md="3">
                                                <Label className="mt-4 label-single-line" for="jorney-themes">
                                                    <Translate t={context.t} contentKey="jorney.themes">
                                                        Themes
                                                    </Translate>
                                                </Label>
                                            </Col>
                                            <Col md="9">
                                                <SelectAsync
                                                    isMulti={true}
                                                    id="jorney-themes-form"
                                                    name={'themes'}
                                                    instanceId="jorney-themes-form"
                                                    placeholder={translate(context.t, 'jorney.themes-input-placeholder')}
                                                    className={'css-select-control'}
                                                    data-type-rel="one-to-many-owner-side"
                                                    value={context.state.themesFormValue ? context.state.themesFormValue : ''}
                                                    onChange={(options) => context.setState({ ...context.state, themesFormValue: options })}
                                                    defaultOptions={context.state.themesStartSelectOptions ? context.state.themesStartSelectOptions : []}
                                                    loadingMessage={(input) => translate(context.t, 'selectAsync.loadingMessage')}
                                                    noOptionsMessage={(input) =>
                                                        context.state.themesStartSelectOptions === undefined
                                                            ? translate(context.t, 'selectAsync.loadingMessage')
                                                            : translate(context.t, 'selectAsync.noOptionsMessage')
                                                    }
                                                    onMenuOpen={async () => {
                                                        if (context.state.themesStartSelectOptions === undefined) {
                                                            const result = await getListAxios('themes', {}, 0, 100, 'id,asc', 'id');
                                                            context.setState({
                                                                ...context.state,
                                                                themesStartSelectOptions: result ? result.map((p: any) => ({ ...p, value: p.id, label: showFieldsSelectAsync(p, 'id') || '' })) : [],
                                                            });
                                                        }
                                                    }}
                                                    loadOptions={(inputValue, callback) => {
                                                        (async () => {
                                                            const result = await getListAxios('themes', { 'id.contains': inputValue }, 0, 100, 'id,asc', 'id');
                                                            callback(result ? result.map((p: any) => ({ ...p, value: p.id, label: showFieldsSelectAsync(p, 'id') || '' })) : []);
                                                        })();
                                                    }}
                                                />
                                            </Col>
                                        </Row>
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    )}
                </Col>
            </Row>
        </>
    );
};

const renderNewModal = (context: IJorneyProps) => {
    return (
        <Modal className="jorney-new-modal" size={'xl'} isOpen={context.state.showModalForm} toggle={() => context.setState({ ...context.state, showModalForm: false })}>
            <ModalHeader toggle={() => context.setState({ ...context.state, showModalForm: false })}>{context.renderHeaderUpdate(true)}</ModalHeader>
            <div>
                <ModalBody>{context.renderBodyUpdate({}, true)}</ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        id="save-entity"
                        onClick={async (evt) => {
                            const target = evt.currentTarget;
                            target.disabled = true;
                            await context.saveEntity(true);
                            target.disabled = false;
                        }}
                        className="float-right jh-create-entity"
                    >
                        <Translate t={context.t} contentKey="jorney.btnSave">
                            Save
                        </Translate>
                    </Button>
                </ModalFooter>
            </div>
        </Modal>
    );
};

const renderUpdateModal = (context: IJorneyProps) => {
    return context.jorneyEntity && (context.jorneyEntity.id || context.jorneyEntity._id) ? (
        <Modal
            className="jorney-update-modal"
            size={'xl'}
            isOpen={context.state.showModalEdit === context.jorneyEntity.id || context.state.showModalEdit === context.jorneyEntity._id}
            toggle={() => context.setState({ ...context.state, showModalEdit: null })}
        >
            <ModalHeader toggle={() => context.setState({ ...context.state, showModalEdit: null })}>{context.renderHeaderUpdate(false)}</ModalHeader>
            <div>
                <ModalBody>{context.renderBodyUpdate(context.jorneyEntity, false)}</ModalBody>
                <ModalFooter>
                    <Button
                        color="primary"
                        id="save-entity"
                        onClick={(evt) => {
                            const target = evt.currentTarget;
                            target.disabled = true;
                            context.saveEntity(false);
                            target.disabled = false;
                        }}
                        className="float-right jh-create-entity"
                    >
                        <Translate t={context.t} contentKey="jorney.btnSave">
                            Save
                        </Translate>
                    </Button>
                </ModalFooter>
            </div>
        </Modal>
    ) : (
        <> </>
    );
};

const getFullEntityFormValue = (context: IJorneyProps, v: any) => {
    let p: any = null;

    const jorneyDegreesEntity = v.jorneyDegrees ? v.jorneyDegrees.filter((p1: any) => p1).map((p1: any) => ({ ...p1, value: p1.id, label: p1['id'] ? p1.id : '' })) : v.jorneyDegrees;

    const themesEntity = v.themes ? v.themes.filter((p1: any) => p1).map((p1: any) => ({ ...p1, value: p1.id, label: p1['id'] ? p1.id : '' })) : v.themes;

    return {
        idFormValue: v.id, // id,
        yearFormValue: v.year, // year,
        nameFormValue: v.name, // name,
        jorneyTypeFormValue: v.jorneyType, // jorneyType,
        jorneyDegrees_cerneDegree_nameFormValue: v.jorneyDegrees_cerneDegree_name, // jorneyDegrees_cerneDegree_name,
        imageBannerFormValue: v.imageBanner, // imageBanner,
        clientIdFormValue: v.clientId, // clientId,
        jorneyDegreesFormValue: jorneyDegreesEntity,
        themesFormValue: themesEntity,
    };
};

const openUpdateModal = (context: IJorneyProps, v: any, edit = true) => {
    if (v.id) {
        context.getEntityFetch(v.id);
    } else {
        context.setExampleEmbebedWithEnumEntity(v);
    }
    context.setState({ ...context.state, showModalEdit: v._id || v.id, showModalEditView: edit, ...getFullEntityFormValue(context, v) });
};

const cancelFilters = (context: IJorneyProps) => {
    const newState = {
        ...context.state,

        id: '',

        year: '',

        name: '',

        jorneyType: '',

        jorneyDegrees_cerneDegree_name: '',

        imageBanner: '',

        clientId: '',
        jorneyDegreesId: '',
        themesId: '',
    };
    context.setState(newState);
    context.sortEntities(newState);
};

const filterEntity = (context: IJorneyProps) => {
    const newState = {
        ...context.state,
        activePage: 0,
    };
    context.setState(newState);
    context.sortEntities(newState);
};

const renderFilter = (context: IJorneyProps) => {
    if (!context.state._showFilterForm) {
        return <> </>;
    }
    return (
        <>
            <div class="form-filter">
                <Col md="12">
                    <div className="row">
                        {context.state.baseFilters !== 'id' ? (
                            <Col md="3" className="col-filter-jorney-id">
                                <Row className="mr-1 mt-1">
                                    <Label id="idLabel" for="jorney-id">
                                        <Translate t={context.t} contentKey="jorney.id">
                                            ID
                                        </Translate>
                                    </Label>
                                    <input
                                        className="form-control"
                                        type="number"
                                        name="id"
                                        id="jorney-id"
                                        value={context.state.id}
                                        onChange={(evt: any) => context.setState({ ...context.state, id: evt.target.value })}
                                    />
                                </Row>
                            </Col>
                        ) : null}

                        {context.state.baseFilters !== 'year' ? (
                            <Col md="3" className="col-filter-jorney-year">
                                <Row className="mr-1 mt-1">
                                    <Label id="yearLabel" for="jorney-year">
                                        <Translate t={context.t} contentKey="jorney.year">
                                            Ano
                                        </Translate>
                                    </Label>
                                    <input
                                        className="form-control"
                                        type="number"
                                        name="year"
                                        id="jorney-year"
                                        value={context.state.year}
                                        onChange={(evt: any) => context.setState({ ...context.state, year: evt.target.value })}
                                    />
                                </Row>
                            </Col>
                        ) : null}

                        {context.state.baseFilters !== 'name' ? (
                            <Col md="3" className="col-filter-jorney-name">
                                <Row className="mr-1 mt-1">
                                    <Label id="nameLabel" for="jorney-name">
                                        <Translate t={context.t} contentKey="jorney.name">
                                            Nome
                                        </Translate>
                                    </Label>

                                    <input
                                        className="form-control"
                                        type="text"
                                        name="name"
                                        id="jorney-name"
                                        value={context.state.name}
                                        onChange={(evt: any) => context.setState({ ...context.state, name: evt.target.value })}
                                    />
                                </Row>
                            </Col>
                        ) : null}

                        {context.state.baseFilters !== 'jorneyType' ? (
                            <Col md="3" className="col-filter-jorney-jorneyType">
                                <Row className="mr-1 mt-1">
                                    <Label id="jorneyTypeLabel" for="jorney-jorneyType">
                                        <Translate t={context.t} contentKey="jorney.jorneyType">
                                            Tipo Jornada
                                        </Translate>
                                    </Label>
                                    <Select
                                        id="jorney-jorneyType"
                                        className={'css-select-control'}
                                        value={
                                            context.state.jorneyType
                                                ? { value: context.state.jorneyType, label: translate(context.t, 'jorney.JorneyType.' + context.state.jorneyType) }
                                                : { value: '', label: translate(context.t, 'jorney.jorneyType') }
                                        }
                                        options={[
                                            { value: '', label: translate(context.t, 'jorney.jorneyType') },
                                            { value: 'JORNEY', label: translate(context.t, 'jorney.JorneyType.JORNEY') },
                                            { value: 'FREE_PRODUCTION', label: translate(context.t, 'jorney.JorneyType.FREE_PRODUCTION') },
                                            { value: 'SIMULATE', label: translate(context.t, 'jorney.JorneyType.SIMULATE') },
                                        ]}
                                        onChange={(options: any) => context.setState({ ...context.state, jorneyType: options['value'] })}
                                        name="jorneyType"
                                    />
                                </Row>
                            </Col>
                        ) : null}

                        {context.state.baseFilters !== 'jorneyDegrees_cerneDegree_name' ? (
                            <Col md="3" className="col-filter-jorney-jorneyDegrees_cerneDegree_name">
                                <Row className="mr-1 mt-1">
                                    <Label id="jorneyDegrees_cerneDegree_nameLabel" for="jorney-jorneyDegrees_cerneDegree_name">
                                        <Translate t={context.t} contentKey="jorney.jorneyDegrees_cerneDegree_name">
                                            jorneyDegrees.cerneDegree.name
                                        </Translate>
                                    </Label>

                                    <input
                                        className="form-control"
                                        type="text"
                                        name="jorneyDegrees_cerneDegree_name"
                                        id="jorney-jorneyDegrees_cerneDegree_name"
                                        value={context.state.jorneyDegrees_cerneDegree_name}
                                        onChange={(evt: any) => context.setState({ ...context.state, jorneyDegrees_cerneDegree_name: evt.target.value })}
                                    />
                                </Row>
                            </Col>
                        ) : null}

                        {context.state.baseFilters !== 'imageBanner' ? (
                            <Col md="3" className="col-filter-jorney-imageBanner">
                                <Row className="mr-1 mt-1"></Row>
                            </Col>
                        ) : null}

                        {context.state.baseFilters !== 'clientId' ? (
                            <Col md="3" className="col-filter-jorney-clientId">
                                <Row className="mr-1 mt-1">
                                    <Label id="clientIdLabel" for="jorney-clientId">
                                        <Translate t={context.t} contentKey="jorney.clientId">
                                            Client Id
                                        </Translate>
                                    </Label>
                                    <input
                                        className="form-control"
                                        type="number"
                                        name="clientId"
                                        id="jorney-clientId"
                                        value={context.state.clientId}
                                        onChange={(evt: any) => context.setState({ ...context.state, clientId: evt.target.value })}
                                    />
                                </Row>
                            </Col>
                        ) : null}

                        {context.state.baseFilters !== 'jorneyDegrees' ? (
                            <Col md="3">
                                <Row className="mr-1 mt-1">
                                    <div style={{ width: '100%' }}>
                                        <Label for="jorney-jorneyDegrees">
                                            <Translate t={context.t} contentKey="jorney.jorneyDegrees" />
                                        </Label>
                                        <SelectAsync
                                            id="jorney-jorneyDegrees-filter"
                                            instanceId="jorney-jorneyDegrees-filter"
                                            isMulti
                                            className={'css-select-control'}
                                            placeholder={translate(context.t, 'jorney.jorneyDegrees-filter-placeholder')}
                                            name={'jorneyDegrees'}
                                            cacheOptions
                                            value={context.state.jorneyDegreesId}
                                            onChange={(options) => context.setState({ ...context.state, jorneyDegreesId: options })}
                                            defaultOptions={context.state.jorneyDegreesStartFilter ? context.state.jorneyDegreesStartFilter : []}
                                            loadingMessage={(input) => translate(context.t, 'selectAsync.loadingMessage')}
                                            noOptionsMessage={(input) =>
                                                context.state.jorneyDegreesStartFilter === undefined
                                                    ? translate(context.t, 'selectAsync.loadingMessage')
                                                    : translate(context.t, 'selectAsync.noOptionsMessage')
                                            }
                                            onMenuOpen={async () => {
                                                if (context.state.jorneyDegreesStartFilter === undefined) {
                                                    const result = await getListAxios('jorney-degrees', {}, 0, 100, 'id,asc', 'id');
                                                    context.setState({
                                                        ...context.state,
                                                        jorneyDegreesStartFilter: result ? result.map((p: any) => ({ ...p, value: p.id, label: showFieldsSelectAsync(p, 'id') })) : [],
                                                    });
                                                }
                                            }}
                                            loadOptions={(inputValue, callback) => {
                                                (async () => {
                                                    const result = await getListAxios('jorney-degrees', { 'id.contains': inputValue }, 0, 100, 'id,asc', 'id');
                                                    callback(result ? result.map((p: any) => ({ ...p, value: p.id, label: showFieldsSelectAsync(p, 'id') })) : []);
                                                })();
                                            }}
                                        />
                                    </div>
                                </Row>
                            </Col>
                        ) : null}

                        {context.state.baseFilters !== 'themes' ? (
                            <Col md="3">
                                <Row className="mr-1 mt-1">
                                    <div style={{ width: '100%' }}>
                                        <Label for="jorney-themes">
                                            <Translate t={context.t} contentKey="jorney.themes" />
                                        </Label>
                                        <SelectAsync
                                            id="jorney-themes-filter"
                                            instanceId="jorney-themes-filter"
                                            isMulti
                                            className={'css-select-control'}
                                            placeholder={translate(context.t, 'jorney.themes-filter-placeholder')}
                                            name={'themes'}
                                            cacheOptions
                                            value={context.state.themesId}
                                            onChange={(options) => context.setState({ ...context.state, themesId: options })}
                                            defaultOptions={context.state.themesStartFilter ? context.state.themesStartFilter : []}
                                            loadingMessage={(input) => translate(context.t, 'selectAsync.loadingMessage')}
                                            noOptionsMessage={(input) =>
                                                context.state.themesStartFilter === undefined
                                                    ? translate(context.t, 'selectAsync.loadingMessage')
                                                    : translate(context.t, 'selectAsync.noOptionsMessage')
                                            }
                                            onMenuOpen={async () => {
                                                if (context.state.themesStartFilter === undefined) {
                                                    const result = await getListAxios('themes', {}, 0, 100, 'id,asc', 'id');
                                                    context.setState({
                                                        ...context.state,
                                                        themesStartFilter: result ? result.map((p: any) => ({ ...p, value: p.id, label: showFieldsSelectAsync(p, 'id') })) : [],
                                                    });
                                                }
                                            }}
                                            loadOptions={(inputValue, callback) => {
                                                (async () => {
                                                    const result = await getListAxios('themes', { 'id.contains': inputValue }, 0, 100, 'id,asc', 'id');
                                                    callback(result ? result.map((p: any) => ({ ...p, value: p.id, label: showFieldsSelectAsync(p, 'id') })) : []);
                                                })();
                                            }}
                                        />
                                    </div>
                                </Row>
                            </Col>
                        ) : null}
                    </div>
                </Col>

                <div className="row mb-2 mr-1 justify-content-end pull-right">
                    <Button id="search-submit" color="primary" onClick={() => context.filterEntity()}>
                        <i className="fa fa-search" />
                        &nbsp;
                    </Button>
                </div>
            </div>
            <br />
        </>
    );
};

export const renderTable = (context: IJorneyProps) => {
    return (
        <>
            {context.jorneyList && context.jorneyList.filter && context.jorneyList.filter((v: any) => typeof v.deletedAt === 'undefined' || v.deletedAt === null).length > 0 ? (
                <div id="jorney-table-list" className="table-list">
                    <Table id="jorney-table-list" responsive aria-describedby="jorney-heading" className={'table-hover table-striped table-responsive-css'}>
                        <thead className={'thead-light'}>
                            <tr>
                                <th className="hand" onClick={context.sortFunction('id')}>
                                    <Translate t={context.t} contentKey="jorney.id" />
                                    <i className={context.state.sort === 'id' ? (context.state.order === 'asc' ? 'fa fa-sort-up' : 'fa fa-sort-down') : 'fa fa-sort'} />
                                </th>
                                <th className="hand" onClick={context.sortFunction('year')}>
                                    <Translate t={context.t} contentKey="jorney.year" />
                                    <i className={context.state.sort === 'year' ? (context.state.order === 'asc' ? 'fa fa-sort-up' : 'fa fa-sort-down') : 'fa fa-sort'} />
                                </th>
                                <th className="hand" onClick={context.sortFunction('name')}>
                                    <Translate t={context.t} contentKey="jorney.name" />
                                    <i className={context.state.sort === 'name' ? (context.state.order === 'asc' ? 'fa fa-sort-up' : 'fa fa-sort-down') : 'fa fa-sort'} />
                                </th>
                                <th className="hand" onClick={context.sortFunction('jorneyType')}>
                                    <Translate t={context.t} contentKey="jorney.jorneyType" />
                                    <i className={context.state.sort === 'jorneyType' ? (context.state.order === 'asc' ? 'fa fa-sort-up' : 'fa fa-sort-down') : 'fa fa-sort'} />
                                </th>
                                <th className="hand" onClick={context.sortFunction('jorneyDegrees_cerneDegree_name')}>
                                    <Translate t={context.t} contentKey="jorney.jorneyDegrees_cerneDegree_name" />
                                    <i className={context.state.sort === 'jorneyDegrees_cerneDegree_name' ? (context.state.order === 'asc' ? 'fa fa-sort-up' : 'fa fa-sort-down') : 'fa fa-sort'} />
                                </th>
                                <th className="hand" onClick={context.sortFunction('imageBanner')}>
                                    <Translate t={context.t} contentKey="jorney.imageBanner" />
                                    <i className={context.state.sort === 'imageBanner' ? (context.state.order === 'asc' ? 'fa fa-sort-up' : 'fa fa-sort-down') : 'fa fa-sort'} />
                                </th>
                                <th className="hand" onClick={context.sortFunction('clientId')}>
                                    <Translate t={context.t} contentKey="jorney.clientId" />
                                    <i className={context.state.sort === 'clientId' ? (context.state.order === 'asc' ? 'fa fa-sort-up' : 'fa fa-sort-down') : 'fa fa-sort'} />
                                </th>

                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            <tr></tr>
                            {context.jorneyList
                                .filter((v: any) => typeof v.deletedAt === 'undefined' || v.deletedAt === null)
                                .map((jorney: any, i: number) => (
                                    <tr key={`entity-${i}`}>
                                        <td id="id-cell">
                                            <b className="visible-xs"> ID </b>

                                            {jorney.id}
                                        </td>

                                        <td id="year-cell">
                                            <b className="visible-xs"> Ano </b>

                                            {jorney.year}
                                        </td>

                                        <td id="name-cell">
                                            <b className="visible-xs"> Nome </b>

                                            {jorney.name}
                                        </td>

                                        <td id="jorneyType-cell">
                                            <b className="visible-xs"> Tipo Jornada </b>

                                            {jorney.jorneyType ? <Translate t={context.t} contentKey={`jorney.JorneyType.${jorney.jorneyType}`} /> : <> </>}
                                        </td>

                                        <td id="jorneyDegrees_cerneDegree_name-cell">
                                            <b className="visible-xs"> jorneyDegrees.cerneDegree.name </b>

                                            {jorney.jorneyDegrees_cerneDegree_name}
                                        </td>

                                        <td id="imageBanner-cell">
                                            <b className="visible-xs"> Imagem </b>

                                            {jorney.imageBanner ? (
                                                <div>
                                                    <a rel="noopener noreferrer" target={'_blank'} href={trim(BASE_API_VERSION_PATH, '/') + '/' + trim(jorney.imageBanner, '/')}>
                                                        {jorney.imageBannerContentType && jorney.imageBannerContentType.includes('image/') ? (
                                                            <img src={trim(BASE_API_VERSION_PATH, '/') + '/' + trim(jorney.imageBanner, '/')} style={{ maxHeight: '30px' }} />
                                                        ) : (
                                                            <Translate t={context.t} contentKey="jorney.btnOpen">
                                                                Open
                                                            </Translate>
                                                        )}
                                                    </a>
                                                </div>
                                            ) : null}
                                        </td>

                                        <td id="clientId-cell">
                                            <b className="visible-xs"> Client Id </b>

                                            {jorney.clientId}
                                        </td>

                                        <td id="jorneyDegrees-cell" role="one-to-many">
                                            <b className="visible-xs">
                                                {' '}
                                                <Translate t={context.t} contentKey="jorney.jorneyDegrees" />{' '}
                                            </b>

                                            {showFieldsSelectAsync(jorney, 'jorneyDegrees.id', null).map((v: any, ikey: any) => (
                                                <span key={ikey}> {v} </span>
                                            ))}
                                        </td>

                                        <td id="themes-cell" role="one-to-many">
                                            <b className="visible-xs">
                                                {' '}
                                                <Translate t={context.t} contentKey="jorney.themes" />{' '}
                                            </b>

                                            {showFieldsSelectAsync(jorney, 'themes.id', null).map((v: any, ikey: any) => (
                                                <span key={ikey}> {v} </span>
                                            ))}
                                        </td>

                                        <td className="text-right">
                                            <div className="btn-group flex-btn-group-container">
                                                {hasAnyAuthority(context.props.userAccount, ['jorney'], 'view') ? (
                                                    <Link href={'#'}>
                                                        <a className={'btn btn-success btn-sm'} onClick={() => context.openUpdateModal(jorney)}>
                                                            <i className="fa fa-eye" />
                                                        </a>
                                                    </Link>
                                                ) : (
                                                    <></>
                                                )}{' '}
                                                {hasAnyAuthority(context.props.userAccount, ['jorney'], 'canDelete') ? (
                                                    <Link href={'#'}>
                                                        <a className={'btn btn-danger btn-sm'} onClick={() => context.deleteEntityModal(jorney)}>
                                                            <i className="fa fa-trash" />
                                                        </a>
                                                    </Link>
                                                ) : (
                                                    <></>
                                                )}{' '}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </Table>
                    {context.state.totalItems > context.state.itemsPerPage ? (
                        <div className={context.jorneyList && context.jorneyList.length > 0 ? '' : 'd-none'}>
                            <ReactPaginate
                                previousLabel={'<'}
                                nextLabel={'>'}
                                previousClassName={'page-item'}
                                nextClassName={'page-item'}
                                breakClassName={'page-item'}
                                pageClassName={'page-item'}
                                nextLinkClassName={'btn btn-primary'}
                                previousLinkClassName={'btn btn-primary'}
                                breakLinkClassName={'btn btn-primary'}
                                pageLinkClassName={'btn btn-default'}
                                activeLinkClassName={'btn btn-primary'}
                                pageCount={context.state.totalItems / context.state.itemsPerPage}
                                breakLabel={'...'}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={(v: any) => {
                                    if (v.selected >= 0) context.handlePagination(v.selected);
                                }}
                                containerClassName={'pagination'}
                                activeClassName={'active'}
                            />
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            ) : !context.loading ? (
                <div className="alert alert-warning">
                    <Translate t={context.t} contentKey="jorney.home.notFound">
                        No Jornadas found
                    </Translate>
                </div>
            ) : (
                <div />
            )}
        </>
    );
};

const handleSyncList = (context: IJorneyProps) => {
    context.sortEntities();
};

export const returnFunction = (context: IJorneyProps) => {
    return (
        <div>
            <h4 id="jorney-heading" data-cy="JorneyHeading">
                <Translate t={context.t} contentKey="jorney.home.title">
                    Jornadas
                </Translate>
                <div className="d-flex mr-4 justify-content-end">
                    <Button
                        onClick={() =>
                            context.setState({
                                ...context.state,
                                showModalForm: true,
                                idFormValue: null,
                                yearFormValue: null,
                                nameFormValue: null,
                                jorneyTypeFormValue: null,
                                jorneyDegrees_cerneDegree_nameFormValue: null,
                                imageBannerFormValue: null,
                                clientIdFormValue: null,

                                jorneyDegreesStartSelectOptions: undefined,
                                jorneyDegreesFormValue: null,

                                themesStartSelectOptions: undefined,
                                themesFormValue: null,
                                isNew: true,
                            })
                        }
                        color="primary"
                        className="btn btn-primary float-right jh-create-entity"
                    >
                        <Translate t={context.t} contentKey="jorney.home.createLabel">
                            Create a new Jornada
                        </Translate>
                    </Button>{' '}
                    &nbsp;
                </div>
            </h4>
            <div className="table-responsive">
                {context.renderTable ? context.renderTable() : () => {}}
                {context.renderNewModal ? context.renderNewModal() : () => {}}
                {context.renderUpdateModal ? context.renderUpdateModal() : () => {}}
            </div>
        </div>
    );
};

export const getJorneyState = (context: IJorneyProps, location: any) => {
    const _urlBase = new URL(`http://localhost${location}`); // using a dummy url for parsing
    const extraFilters = jsonParse(_urlBase.searchParams.get('extraFilters') || '{}');
    const baseFilters = _urlBase.searchParams.get('baseFilters') || '';
    const offset: any = _urlBase.searchParams.get('offset') || 0;
    const activePage: any = _urlBase.searchParams.get('page') || 0;
    const itemsPerPage: any = _urlBase.searchParams.get('size') || 20;
    const sortOrder: any = (_urlBase.searchParams.get('sort') || 'id,asc').split(',');

    const id = _urlBase.searchParams.get('id') || '';
    const year = _urlBase.searchParams.get('year') || '';
    const name = _urlBase.searchParams.get('name') || '';
    const jorneyType = _urlBase.searchParams.get('jorneyType') || '';
    const jorneyDegrees_cerneDegree_name = _urlBase.searchParams.get('jorneyDegrees_cerneDegree_name') || '';
    const imageBanner = _urlBase.searchParams.get('imageBanner') || '';
    const clientId = _urlBase.searchParams.get('clientId') || '';
    const jorneyDegreesId = _urlBase.searchParams.get('jorneyDegrees') || '';
    const themesId = _urlBase.searchParams.get('themes') || '';
    return {
        activePage,
        itemsPerPage,
        sort: sortOrder[0] ? sortOrder[0] : 'id',
        order: sortOrder[1] ? sortOrder[1] : 'asc',
        baseFilters,
        extraFilters,
        offset,
        id,
        year,
        name,
        jorneyType,
        jorneyDegrees_cerneDegree_name,
        imageBanner,
        clientId,
        jorneyDegreesId: jorneyDegreesId ? jorneyDegreesId.split(',').map((v) => ({ value: v.split('<->')[0], label: v.split('<->')[1] })) : [],
        themesId: themesId ? themesId.split(',').map((v) => ({ value: v.split('<->')[0], label: v.split('<->')[1] })) : [],
    };
};

export const getEntitiesFetch = async (
    context: IJorneyProps,
    id: any,
    year: any,
    name: any,
    jorneyType: any,
    jorneyDegrees_cerneDegree_name: any,
    imageBanner: any,
    clientId: any,
    jorneyDegreesId: any,
    themesId: any,
    extraFilters: any,
    page: any,
    size: any,
    sort: any,
    selectFields = '',
    authorizationBearer = '',
    getAccount = false,
) => {
    const apiUrl = BASE_API_VERSION_PATH + 'api/jorneys';
    const extraFiltersRequest = extraFilters
        ? Object.keys(extraFilters).length > 0
            ? encodeURI(
                  Object.keys(extraFilters)
                      .map((v) => v + '=' + extraFilters[v])
                      .join('&') + '&',
              )
            : ''
        : '';
    const idRequest = id ? (Array.isArray(status) ? `id.in=${id.join(',')}&` : `id.equals=${id}&`) : '';
    const yearRequest = year ? (Array.isArray(status) ? `year.in=${year.join(',')}&` : `year.equals=${year}&`) : '';
    const nameRequest = name ? (Array.isArray(status) ? `name.in=${name.join(',')}&` : `name.contains=${name}&`) : '';
    const jorneyTypeRequest = jorneyType ? (Array.isArray(status) ? `jorneyType.in=${jorneyType.join(',')}&` : `jorneyType.equals=${jorneyType}&`) : '';
    const jorneyDegrees_cerneDegree_nameRequest = jorneyDegrees_cerneDegree_name
        ? Array.isArray(status)
            ? `jorneyDegrees_cerneDegree_name.in=${jorneyDegrees_cerneDegree_name.join(',')}&`
            : `jorneyDegrees_cerneDegree_name.contains=${jorneyDegrees_cerneDegree_name}&`
        : '';
    const imageBannerRequest = imageBanner ? (Array.isArray(status) ? `imageBanner.in=${imageBanner.join(',')}&` : `imageBanner.contains=${imageBanner}&`) : '';
    const clientIdRequest = clientId ? (Array.isArray(status) ? `clientId.in=${clientId.join(',')}&` : `clientId.equals=${clientId}&`) : '';
    const jorneyDegreesRequest = jorneyDegreesId ? `jorneyDegrees.id.in=${jorneyDegreesId}&` : '';
    const themesRequest = themesId ? `themes.id.in=${themesId}&` : '';

    const requestUrl = `${apiUrl}?${extraFiltersRequest}${idRequest}${yearRequest}${nameRequest}${jorneyTypeRequest}${jorneyDegrees_cerneDegree_nameRequest}${imageBannerRequest}${clientIdRequest}${jorneyDegreesRequest}${themesRequest}${
        sort ? `page=${page >= 0 ? page : 0}&size=${size}&sort=${sort}&` : '?'
    }`;

    const res = await fetch(requestUrl, {
        method: 'get',
        headers: {
            Authorization: 'Bearer ' + (authorizationBearer ? authorizationBearer : cookie.get(AUTH_TOKEN_KEY)),
            'Content-Type': 'application/json;charset=utf-8',
            'Select-Fields': selectFields,
            'Get-User-Account': getAccount ? '1' : '0',
        },
    });

    return res;
};

export const Jorney = (props: IJorneyProps): any => {
    const { t } = useTranslation();
    const _router = useRouter();
    const [activeTab, setActiveTab] = useState(0);
    const [jorneyList, setJorneyList] = useState(props.jorneyList ? props.jorneyList : ([] as any));
    const [jorneyEntity, setJorneyEntity] = useState(props.jorneyEntity ? props.jorneyEntity : ({} as any));

    let imageBannerFileInput = React.createRef() as any;

    const { loading, totalItems } = props;

    const [state, setState] = useState({
        id: props.id ? props.id : '',
        year: props.year ? props.year : '',
        name: props.name ? props.name : '',
        jorneyType: props.jorneyType ? props.jorneyType : '',
        jorneyDegrees_cerneDegree_name: props.jorneyDegrees_cerneDegree_name ? props.jorneyDegrees_cerneDegree_name : '',
        imageBanner: props.imageBanner ? props.imageBanner : '',
        clientId: props.clientId ? props.clientId : '',
        jorneyDegreesId: props.jorneyDegreesId ? props.jorneyDegreesId : null,
        themesId: props.themesId ? props.themesId : null,
        extraFilters: props.extraFilters ? props.extraFilters : '',
        activePage: props.activePage ? props.activePage : '0',
        itemsPerPage: props.itemsPerPage ? props.itemsPerPage : ITEMS_PER_PAGE,
        totalItems: props.totalItems ? props.totalItems : 0,
        sort: props.sort ? props.sort : 'id',
        order: props.order ? props.order : 'asc',
    } as any);

    useEffect(() => {
        context.getAllEntities();
    }, [_router.asPath]);

    const context = {
        t: t,
        props: props,
        _router: _router,
        state: state,
        setState: setState,
        jorneyList: jorneyList,
        setJorneyList: setJorneyList,
        jorneyEntity: jorneyEntity,
        setJorneyEntity: setJorneyEntity,

        imageBannerFileInput: imageBannerFileInput,

        getAllEntities: props['getAllEntities'] ? (_fieldsBase) => props['getAllEntities'](context, _fieldsBase) : (_fieldsBase) => getAllEntities(context, _fieldsBase),
        sortEntities: props['sortEntities'] ? () => props['sortEntities'](context) : () => sortEntities(context),
        sortFunction: props['sortFunction'] ? (p) => props['sortFunction'](context, p) : (p) => sortFunction(context, p),
        handlePagination: props['handlePagination'] ? (activePage) => props['handlePagination'](context, activePage) : (activePage) => handlePagination(context, activePage),
        deleteEntityModal: props['deleteEntityModal']
            ? (_cadastroTelemedicinaEntity) => props['deleteEntityModal'](context, _cadastroTelemedicinaEntity)
            : (_cadastroTelemedicinaEntity) => deleteEntityModal(context, _cadastroTelemedicinaEntity),
        saveEntity: props['saveEntity'] ? (isNew) => props['saveEntity'](context, isNew) : (isNew) => saveEntity(context, isNew),
        getFullEntityFormValue: props['getFullEntityFormValue'] ? (v) => props['getFullEntityFormValue'](context, v) : (v) => getFullEntityFormValue(context, v),
        openUpdateModal: props['openUpdateModal'] ? (v: any, edit = true) => props['openUpdateModal'](context, v, edit) : (v: any, edit = true) => openUpdateModal(context, v, edit),
        renderBodyUpdate: props['renderBodyUpdate']
            ? (_jorneyEntity: any, isNew: any) => props['renderBodyUpdate'](context, _jorneyEntity, isNew)
            : (_jorneyEntity: any, isNew: any) => renderBodyUpdate(context, _jorneyEntity, isNew),
        renderUpdateModal: props['renderUpdateModal'] ? () => props['renderUpdateModal'](context) : () => renderUpdateModal(context),
        renderNewModal: props['renderNewModal'] ? () => props['renderNewModal'](context) : () => renderNewModal(context),

        renderHeaderUpdate: props['renderHeaderUpdate'] ? (isNew) => props['renderHeaderUpdate'](context, isNew) : (isNew) => renderHeaderUpdate(context, isNew),
        renderTable: props['renderTable'] ? () => props['renderTable'](context) : () => renderTable(context),
        handleSyncList: props['handleSyncList'] ? () => props['handleSyncList'](context) : () => handleSyncList(context),
        getEntitiesFetch: props['getEntitiesFetch']
            ? (
                  id: any,
                  year: any,
                  name: any,
                  jorneyType: any,
                  jorneyDegrees_cerneDegree_name: any,
                  imageBanner: any,
                  clientId: any,
                  jorneyDegreesId: any,
                  themesId: any,
                  extraFilters: any,
                  page: any,
                  size: any,
                  sort: any,
                  selectFields = '',
                  authorizationBearer = '',
              ) =>
                  props['getEntitiesFetch'](
                      context,
                      id,
                      year,
                      name,
                      jorneyType,
                      jorneyDegrees_cerneDegree_name,
                      imageBanner,
                      clientId,
                      jorneyDegreesId,
                      themesId,
                      extraFilters,
                      page,
                      size,
                      sort,
                      selectFields,
                      authorizationBearer,
                  )
            : (
                  id: any,
                  year: any,
                  name: any,
                  jorneyType: any,
                  jorneyDegrees_cerneDegree_name: any,
                  imageBanner: any,
                  clientId: any,
                  jorneyDegreesId: any,
                  themesId: any,
                  extraFilters: any,
                  page: any,
                  size: any,
                  sort: any,
                  selectFields = '',
                  authorizationBearer = '',
              ) =>
                  getEntitiesFetch(
                      context,
                      id,
                      year,
                      name,
                      jorneyType,
                      jorneyDegrees_cerneDegree_name,
                      imageBanner,
                      clientId,
                      jorneyDegreesId,
                      themesId,
                      extraFilters,
                      page,
                      size,
                      sort,
                      selectFields,
                      authorizationBearer,
                  ),

        createEntityFetch: props['createEntityFetch']
            ? (entity: any, listFiltersPage: any) => props['createEntityFetch'](context, entity, listFiltersPage)
            : (entity: any, listFiltersPage: any) => createEntityFetch(context, entity, listFiltersPage),
        updateEntityFetch: props['updateEntityFetch']
            ? (entity: any, listFiltersPage: any) => props['updateEntityFetch'](context, entity, listFiltersPage)
            : (entity: any, listFiltersPage: any) => updateEntityFetch(context, entity, listFiltersPage),
        deleteEntityFetch: props['deleteEntityFetch']
            ? (id: any, listFiltersPage: any) => props['deleteEntityFetch'](context, id, listFiltersPage)
            : (id: any, listFiltersPage: any) => deleteEntityFetch(context, id, listFiltersPage),
        getEntityFetch: props['getEntityFetch'] ? (id) => props['getEntityFetch'](context, id) : (id) => getEntityFetch(context, id),

        getJorneyState: props['getJorneyState'] ? (location) => props['getJorneyState'](context, location) : (location) => getJorneyState(context, location),
        getEntityFiltersURL: props['getEntityFiltersURL'] ? () => props['getEntityFiltersURL'](context) : () => getEntityFiltersURL(context),
        return: props['returnFunction'] ? () => props['returnFunction'](context) : () => returnFunction(context),
    };

    return context;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const q = nextCookie(ctx);
    const _fieldsBase = getJorneyState(null, ctx.resolvedUrl);
    const apiUrl = BASE_API_VERSION_PATH + 'api/jorneys';

    const res = await getEntitiesFetch(
        null,
        _fieldsBase.id,
        _fieldsBase.year,
        _fieldsBase.name,
        _fieldsBase.jorneyType,
        _fieldsBase.jorneyDegrees_cerneDegree_name,
        _fieldsBase.imageBanner,
        _fieldsBase.clientId,
        _fieldsBase.jorneyDegreesId.map((v) => v.value).join(','),
        _fieldsBase.themesId.map((v) => v.value).join(','),
        _fieldsBase.extraFilters,
        _fieldsBase.activePage,
        _fieldsBase.itemsPerPage,
        `${_fieldsBase.sort},${_fieldsBase.order}`,
        '',
        q[AUTH_TOKEN_KEY],
        false,
    );

    if (!q[AUTH_TOKEN_KEY] || q[AUTH_TOKEN_KEY] === '' || res.status == 401) {
        ctx.res.setHeader('Location', `/login`);
        ctx.res.statusCode = 302;
        ctx.res.end();
        return { props: {} };
    }

    const userAccount = JSON.parse(res.headers.get('User-Account-Data'));

    return {
        props: {
            ..._fieldsBase,
            userAccount,
            totalItems: res.headers.get('X-Total-Count'),
            jorneyList: await res.json(),
            ...(await serverSideTranslations('pt', ['adminTranslations', 'global', 'jorney'])),
        },
    };
};

export default Jorney;
