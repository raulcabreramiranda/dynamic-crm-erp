// @ts-nocheck

import { IJorneyDegree } from '../../jorneydegree/_base/jorney-degree-model';
import { IJorneyGalerySection } from '../../jorneygalerysection/_base/jorney-galery-section-model';

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

import IJorneyGalery from './jorney-galery-model';

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

export interface IJorneyGaleryProps extends AppProps {
    id?: any;
    name?: any;
    canEdit?: any;
    isInsideSubject?: any;
    jorneyDegrees_jorney_name?: any;
    orneyDegrees_theme_name?: any;
    orneyDegrees_cerneDegree_name?: any;
    jorneyGaleryType?: any;
    jorneyDegreesId?: any;
    jorneyGalerySectionsId?: any;
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
    jorneyGaleryList?: any;
    setJorneyGaleryList?: Function;
    jorneyGaleryEntity?: any;
    setJorneyGaleryEntity?: Function;

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
    getJorneyGaleryState?: Function;
    returnFunction?: Function;
    jorneyDegrees?: any;
    jorneyGalerySections?: any;
    userAccount?: any;
    loading?: any;
}

const apiUrl = BASE_API_VERSION_PATH + 'api/jorney-galeries';
const getEntityFetch: any = async (context: IJorneyGaleryProps, id: any, selectFields = '') => {
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
    context.setJorneyGaleryEntity(json);

    return json;
};

const createEntityFetch: any = async (context: IJorneyGaleryProps, entity: any, listFiltersPage: any) => {
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

const updateEntityFetch: any = async (context: IJorneyGaleryProps, entity: any, listFiltersPage: any) => {
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

const deleteEntityFetch: any = async (context: IJorneyGaleryProps, _jorneyGaleryEntity: any, listFiltersPage: any) => {
    await fetch(`${apiUrl}/${_jorneyGaleryEntity.id}`, {
        method: 'delete',
        headers: {
            Authorization: 'Bearer ' + cookie.get(AUTH_TOKEN_KEY),
            'Content-Type': 'application/json;charset=utf-8',
        },
    });
    context.getAllEntities();
    return true;
};

const getEntityFiltersURL = (context: IJorneyGaleryProps, offset = null) => {
    return (
        '' +
        (context.state.id ? 'id=' + context.state.id + '&' : '') +
        (context.state.name ? 'name=' + context.state.name + '&' : '') +
        (context.state.canEdit ? 'canEdit=' + context.state.canEdit + '&' : '') +
        (context.state.isInsideSubject ? 'isInsideSubject=' + context.state.isInsideSubject + '&' : '') +
        (context.state.jorneyDegrees_jorney_name ? 'jorneyDegrees_jorney_name=' + context.state.jorneyDegrees_jorney_name + '&' : '') +
        (context.state.orneyDegrees_theme_name ? 'orneyDegrees_theme_name=' + context.state.orneyDegrees_theme_name + '&' : '') +
        (context.state.orneyDegrees_cerneDegree_name ? 'orneyDegrees_cerneDegree_name=' + context.state.orneyDegrees_cerneDegree_name + '&' : '') +
        (context.state.jorneyGaleryType ? 'jorneyGaleryType=' + context.state.jorneyGaleryType + '&' : '') +
        (context.state.jorneyDegreesId ? 'jorneyDegrees=' + context.state.jorneyDegreesId.map((v: any) => v.value + '<->' + v.label).join(',') + '&' : '') +
        (context.state.jorneyGalerySectionsId ? 'jorneyGalerySections=' + context.state.jorneyGalerySectionsId.map((v: any) => v.value + '<->' + v.label).join(',') + '&' : '') +
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

const getAllEntities = async (context: IJorneyGaleryProps, _fieldsBase: any) => {
    _fieldsBase = _fieldsBase ? _fieldsBase : {};
    const {
        id,
        name,
        canEdit,
        isInsideSubject,
        jorneyDegrees_jorney_name,
        orneyDegrees_theme_name,
        orneyDegrees_cerneDegree_name,
        jorneyGaleryType,
        jorneyDegreesId,
        jorneyGalerySectionsId,
        extraFilters,
        activePage,
        itemsPerPage,
        sort,
        order,
    } = context.state;

    const res = await context.getEntitiesFetch(
        id,
        name,
        canEdit,
        isInsideSubject,
        jorneyDegrees_jorney_name,
        orneyDegrees_theme_name,
        orneyDegrees_cerneDegree_name,
        jorneyGaleryType,
        jorneyDegreesId.map((v) => v.value).join(','),
        jorneyGalerySectionsId.map((v) => v.value).join(','),
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
    context.setJorneyGaleryList(json);
};

const sortEntities = (context: IJorneyGaleryProps, _newState = undefined) => {
    context.getAllEntities();
    const endURL = `?page=${context.state.activePage}&sort=${context.state.sort},${context.state.order}`;
    context._router.push(`?${context.getEntityFiltersURL()}`);
};

const sortFunction = (context: IJorneyGaleryProps, p: any) => () => {
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

const handlePagination = (context: IJorneyGaleryProps, activePage: any) => {
    context.setState({
        ...context.state,
        activePage,
    });
    context.getAllEntities({ activePage });
};

const deleteEntityModal = (context: IJorneyGaleryProps, _jorneyGaleryEntity: any) => {
    MySwal.fire({
        title: (
            <Translate t={context.t} contentKey="entity.delete.title">
                Confirm delete operation
            </Translate>
        ),
        html: (
            <Translate t={context.t} contentKey="jorneyGalery.delete.question" interpolate={{ id: _jorneyGaleryEntity.id }}>
                Are you sure you want to delete this JorneyGalery?
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
                <Translate t={context.t} contentKey="jorneyGalery.btnCancel">
                    Cancel
                </Translate>
            </>
        ),
        confirmButtonText: (
            <>
                {' '}
                <i className="fa fa-trash" />
                &nbsp;
                <Translate t={context.t} contentKey="jorneyGalery.btnDelete">
                    Delete
                </Translate>
            </>
        ),
    }).then(async (response) => {
        if (response.isConfirmed) {
            await context.deleteEntityFetch(_jorneyGaleryEntity, { reloadList: false });
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

const saveEntity = async (context: IJorneyGaleryProps, isNew: any) => {
    const errors = [];

    const selectFieldsList = [
        'id',
        'name',
        'canEdit',
        'isInsideSubject',
        'jorneyDegrees_jorney_name',
        'orneyDegrees_theme_name',
        'orneyDegrees_cerneDegree_name',
        'jorneyGaleryType',
        'jorneyDegrees.id',
        'jorneyGalerySections.id',
    ];

    if (errors.length === 0) {
        const _entity = {
            ...context.jorneyGaleryEntity,
            // ...values,

            jorneyDegrees: getFormFromSelect(context.state.jorneyDegreesFormValue, 'many-to-one'),

            jorneyGalerySections: getFormFromSelect(context.state.jorneyGalerySectionsFormValue, 'one-to-many'),

            id: context.state.idFormValue,
            name: context.state.nameFormValue,
            canEdit: context.state.canEditFormValue === null ? false : context.state.canEditFormValue,
            isInsideSubject: context.state.isInsideSubjectFormValue === null ? false : context.state.isInsideSubjectFormValue,
            jorneyDegrees_jorney_name: context.state.jorneyDegrees_jorney_nameFormValue,
            orneyDegrees_theme_name: context.state.orneyDegrees_theme_nameFormValue,
            orneyDegrees_cerneDegree_name: context.state.orneyDegrees_cerneDegree_nameFormValue,
            jorneyGaleryType: context.state.jorneyGaleryTypeFormValue === null ? null : context.state.jorneyGaleryTypeFormValue,
        };

        const entity = _entity;

        const {
            id,
            name,
            canEdit,
            isInsideSubject,
            jorneyDegrees_jorney_name,
            orneyDegrees_theme_name,
            orneyDegrees_cerneDegree_name,
            jorneyGaleryType,
            jorneyDegreesId,
            jorneyGalerySectionsId,
            extraFilters,
            activePage,
            itemsPerPage,
            sort,
            order,
        } = context.state;

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

const renderHeaderUpdate = (context: IJorneyGaleryProps, isNew: any) => {
    const baseFilters = context.state && context.state['baseFilters'] ? context.state['baseFilters'] : null;

    return (
        <>
            <div id="page-heading">
                <span className="page-header ml-3">
                    {isNew ? (
                        <Translate t={context.t} contentKey="jorneyGalery.home.createLabel">
                            Create a JorneyGalery
                        </Translate>
                    ) : (
                        <Translate t={context.t} contentKey="jorneyGalery.home.editLabel">
                            Edit a JorneyGalery
                        </Translate>
                    )}
                </span>
            </div>
        </>
    );
};

const renderBodyUpdate = (context: IJorneyGaleryProps, _jorneyGaleryEntity: any, isNew: any) => {
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
                                            <input id="jorney-galery-id" type="hidden" className="form-control" name="id" required readOnly />
                                        </Col>
                                    </Row>
                                </div>
                            ) : null}
                            <Row className="row-jorney-galery-first-column">
                                <Col md="12">
                                    <div>
                                        <Row>
                                            <Col md="3">
                                                <Label className="mt-4 label-single-line" for="jorney-galery-jorneyDegrees">
                                                    <Translate t={context.t} contentKey="jorneyGalery.jorneyDegrees">
                                                        Jorney Degrees
                                                    </Translate>
                                                </Label>
                                            </Col>
                                            <Col md="9">
                                                <SelectAsync
                                                    isMulti={false}
                                                    id="jorney-galery-jorneyDegrees-form"
                                                    name={'jorneyDegrees'}
                                                    instanceId="jorney-galery-jorneyDegrees-form"
                                                    placeholder={translate(context.t, 'jorneyGalery.jorneyDegrees-input-placeholder')}
                                                    className={'css-select-control'}
                                                    data-type-rel="many-to-one-other-side"
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
                                                <Label className="mt-4 label-single-line" for="jorney-galery-jorneyGalerySections">
                                                    <Translate t={context.t} contentKey="jorneyGalery.jorneyGalerySections">
                                                        Jorney Galery Sections
                                                    </Translate>
                                                </Label>
                                            </Col>
                                            <Col md="9">
                                                <SelectAsync
                                                    isMulti={true}
                                                    id="jorney-galery-jorneyGalerySections-form"
                                                    name={'jorneyGalerySections'}
                                                    instanceId="jorney-galery-jorneyGalerySections-form"
                                                    placeholder={translate(context.t, 'jorneyGalery.jorneyGalerySections-input-placeholder')}
                                                    className={'css-select-control'}
                                                    data-type-rel="one-to-many-owner-side"
                                                    value={context.state.jorneyGalerySectionsFormValue ? context.state.jorneyGalerySectionsFormValue : ''}
                                                    onChange={(options) => context.setState({ ...context.state, jorneyGalerySectionsFormValue: options })}
                                                    defaultOptions={context.state.jorneyGalerySectionsStartSelectOptions ? context.state.jorneyGalerySectionsStartSelectOptions : []}
                                                    loadingMessage={(input) => translate(context.t, 'selectAsync.loadingMessage')}
                                                    noOptionsMessage={(input) =>
                                                        context.state.jorneyGalerySectionsStartSelectOptions === undefined
                                                            ? translate(context.t, 'selectAsync.loadingMessage')
                                                            : translate(context.t, 'selectAsync.noOptionsMessage')
                                                    }
                                                    onMenuOpen={async () => {
                                                        if (context.state.jorneyGalerySectionsStartSelectOptions === undefined) {
                                                            const result = await getListAxios('jorney-galery-sections', {}, 0, 100, 'id,asc', 'id');
                                                            context.setState({
                                                                ...context.state,
                                                                jorneyGalerySectionsStartSelectOptions: result
                                                                    ? result.map((p: any) => ({ ...p, value: p.id, label: showFieldsSelectAsync(p, 'id') || '' }))
                                                                    : [],
                                                            });
                                                        }
                                                    }}
                                                    loadOptions={(inputValue, callback) => {
                                                        (async () => {
                                                            const result = await getListAxios('jorney-galery-sections', { 'id.contains': inputValue }, 0, 100, 'id,asc', 'id');
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

const renderNewModal = (context: IJorneyGaleryProps) => {
    return (
        <Modal className="jorney-galery-new-modal" size={'xl'} isOpen={context.state.showModalForm} toggle={() => context.setState({ ...context.state, showModalForm: false })}>
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
                        <Translate t={context.t} contentKey="jorneyGalery.btnSave">
                            Save
                        </Translate>
                    </Button>
                </ModalFooter>
            </div>
        </Modal>
    );
};

const renderUpdateModal = (context: IJorneyGaleryProps) => {
    return context.jorneyGaleryEntity && (context.jorneyGaleryEntity.id || context.jorneyGaleryEntity._id) ? (
        <Modal
            className="jorney-galery-update-modal"
            size={'xl'}
            isOpen={context.state.showModalEdit === context.jorneyGaleryEntity.id || context.state.showModalEdit === context.jorneyGaleryEntity._id}
            toggle={() => context.setState({ ...context.state, showModalEdit: null })}
        >
            <ModalHeader toggle={() => context.setState({ ...context.state, showModalEdit: null })}>{context.renderHeaderUpdate(false)}</ModalHeader>
            <div>
                <ModalBody>{context.renderBodyUpdate(context.jorneyGaleryEntity, false)}</ModalBody>
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
                        <Translate t={context.t} contentKey="jorneyGalery.btnSave">
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

const getFullEntityFormValue = (context: IJorneyGaleryProps, v: any) => {
    let p: any = null;

    p = v.jorneyDegrees;
    const jorneyDegreesEntity = p ? { ...p, value: p.id, label: p['id'] ? p.id : '' } : p;

    const jorneyGalerySectionsEntity = v.jorneyGalerySections
        ? v.jorneyGalerySections.filter((p1: any) => p1).map((p1: any) => ({ ...p1, value: p1.id, label: p1['id'] ? p1.id : '' }))
        : v.jorneyGalerySections;

    return {
        idFormValue: v.id, // id,
        nameFormValue: v.name, // name,
        canEditFormValue: v.canEdit, // canEdit,
        isInsideSubjectFormValue: v.isInsideSubject, // isInsideSubject,
        jorneyDegrees_jorney_nameFormValue: v.jorneyDegrees_jorney_name, // jorneyDegrees_jorney_name,
        orneyDegrees_theme_nameFormValue: v.orneyDegrees_theme_name, // orneyDegrees_theme_name,
        orneyDegrees_cerneDegree_nameFormValue: v.orneyDegrees_cerneDegree_name, // orneyDegrees_cerneDegree_name,
        jorneyGaleryTypeFormValue: v.jorneyGaleryType, // jorneyGaleryType,
        jorneyDegreesFormValue: jorneyDegreesEntity,
        jorneyGalerySectionsFormValue: jorneyGalerySectionsEntity,
    };
};

const openUpdateModal = (context: IJorneyGaleryProps, v: any, edit = true) => {
    if (v.id) {
        context.getEntityFetch(v.id);
    } else {
        context.setExampleEmbebedWithEnumEntity(v);
    }
    context.setState({ ...context.state, showModalEdit: v._id || v.id, showModalEditView: edit, ...getFullEntityFormValue(context, v) });
};

const cancelFilters = (context: IJorneyGaleryProps) => {
    const newState = {
        ...context.state,

        id: '',

        name: '',

        canEdit: '',

        isInsideSubject: '',

        jorneyDegrees_jorney_name: '',

        orneyDegrees_theme_name: '',

        orneyDegrees_cerneDegree_name: '',

        jorneyGaleryType: '',
        jorneyDegreesId: '',
        jorneyGalerySectionsId: '',
    };
    context.setState(newState);
    context.sortEntities(newState);
};

const filterEntity = (context: IJorneyGaleryProps) => {
    const newState = {
        ...context.state,
        activePage: 0,
    };
    context.setState(newState);
    context.sortEntities(newState);
};

const renderFilter = (context: IJorneyGaleryProps) => {
    if (!context.state._showFilterForm) {
        return <> </>;
    }
    return (
        <>
            <div class="form-filter">
                <Col md="12">
                    <div className="row">
                        {context.state.baseFilters !== 'id' ? (
                            <Col md="3" className="col-filter-jorney-galery-id">
                                <Row className="mr-1 mt-1">
                                    <Label id="idLabel" for="jorney-galery-id">
                                        <Translate t={context.t} contentKey="jorneyGalery.id">
                                            ID
                                        </Translate>
                                    </Label>
                                    <input
                                        className="form-control"
                                        type="number"
                                        name="id"
                                        id="jorney-galery-id"
                                        value={context.state.id}
                                        onChange={(evt: any) => context.setState({ ...context.state, id: evt.target.value })}
                                    />
                                </Row>
                            </Col>
                        ) : null}

                        {context.state.baseFilters !== 'name' ? (
                            <Col md="3" className="col-filter-jorney-galery-name">
                                <Row className="mr-1 mt-1">
                                    <Label id="nameLabel" for="jorney-galery-name">
                                        <Translate t={context.t} contentKey="jorneyGalery.name">
                                            Nome
                                        </Translate>
                                    </Label>

                                    <input
                                        className="form-control"
                                        type="text"
                                        name="name"
                                        id="jorney-galery-name"
                                        value={context.state.name}
                                        onChange={(evt: any) => context.setState({ ...context.state, name: evt.target.value })}
                                    />
                                </Row>
                            </Col>
                        ) : null}

                        {context.state.baseFilters !== 'canEdit' ? (
                            <Col md="3" className="col-filter-jorney-galery-canEdit">
                                <Row className="mr-1 mt-1">
                                    <Label id="canEditLabel" for="jorney-galery-canEdit">
                                        <Translate t={context.t} contentKey="jorneyGalery.canEdit">
                                            Editavel
                                        </Translate>
                                    </Label>
                                    <Select
                                        id="jorney-galery-canEdit"
                                        className={'css-select-control'}
                                        value={
                                            context.state.canEdit === 0
                                                ? { value: 0, label: translate(context.t, 'jorneyGalery.canEdit_filter_without') }
                                                : context.state.canEdit === 1
                                                ? { value: 1, label: translate(context.t, 'jorneyGalery.canEdit_filter_with') }
                                                : { value: '', label: translate(context.t, 'jorneyGalery.canEdit_filter_all') }
                                        }
                                        options={[
                                            { value: '', label: translate(context.t, 'jorneyGalery.canEdit_filter_all') },
                                            { value: 1, label: translate(context.t, 'jorneyGalery.canEdit_filter_with') },
                                            { value: 0, label: translate(context.t, 'jorneyGalery.canEdit_filter_without') },
                                        ]}
                                        onChange={(options: any) => context.setState({ ...context.state, canEdit: options['value'] })}
                                        name="canEdit"
                                    />
                                </Row>
                            </Col>
                        ) : null}

                        {context.state.baseFilters !== 'isInsideSubject' ? (
                            <Col md="3" className="col-filter-jorney-galery-isInsideSubject">
                                <Row className="mr-1 mt-1">
                                    <Label id="isInsideSubjectLabel" for="jorney-galery-isInsideSubject">
                                        <Translate t={context.t} contentKey="jorneyGalery.isInsideSubject">
                                            Dentro do assunto
                                        </Translate>
                                    </Label>
                                    <Select
                                        id="jorney-galery-isInsideSubject"
                                        className={'css-select-control'}
                                        value={
                                            context.state.isInsideSubject === 0
                                                ? { value: 0, label: translate(context.t, 'jorneyGalery.isInsideSubject_filter_without') }
                                                : context.state.isInsideSubject === 1
                                                ? { value: 1, label: translate(context.t, 'jorneyGalery.isInsideSubject_filter_with') }
                                                : { value: '', label: translate(context.t, 'jorneyGalery.isInsideSubject_filter_all') }
                                        }
                                        options={[
                                            { value: '', label: translate(context.t, 'jorneyGalery.isInsideSubject_filter_all') },
                                            { value: 1, label: translate(context.t, 'jorneyGalery.isInsideSubject_filter_with') },
                                            { value: 0, label: translate(context.t, 'jorneyGalery.isInsideSubject_filter_without') },
                                        ]}
                                        onChange={(options: any) => context.setState({ ...context.state, isInsideSubject: options['value'] })}
                                        name="isInsideSubject"
                                    />
                                </Row>
                            </Col>
                        ) : null}

                        {context.state.baseFilters !== 'jorneyDegrees_jorney_name' ? (
                            <Col md="3" className="col-filter-jorney-galery-jorneyDegrees_jorney_name">
                                <Row className="mr-1 mt-1">
                                    <Label id="jorneyDegrees_jorney_nameLabel" for="jorney-galery-jorneyDegrees_jorney_name">
                                        <Translate t={context.t} contentKey="jorneyGalery.jorneyDegrees_jorney_name">
                                            jorneyDegrees.jorney.name
                                        </Translate>
                                    </Label>

                                    <input
                                        className="form-control"
                                        type="text"
                                        name="jorneyDegrees_jorney_name"
                                        id="jorney-galery-jorneyDegrees_jorney_name"
                                        value={context.state.jorneyDegrees_jorney_name}
                                        onChange={(evt: any) => context.setState({ ...context.state, jorneyDegrees_jorney_name: evt.target.value })}
                                    />
                                </Row>
                            </Col>
                        ) : null}

                        {context.state.baseFilters !== 'orneyDegrees_theme_name' ? (
                            <Col md="3" className="col-filter-jorney-galery-orneyDegrees_theme_name">
                                <Row className="mr-1 mt-1">
                                    <Label id="orneyDegrees_theme_nameLabel" for="jorney-galery-orneyDegrees_theme_name">
                                        <Translate t={context.t} contentKey="jorneyGalery.orneyDegrees_theme_name">
                                            orneyDegrees.theme.name
                                        </Translate>
                                    </Label>

                                    <input
                                        className="form-control"
                                        type="text"
                                        name="orneyDegrees_theme_name"
                                        id="jorney-galery-orneyDegrees_theme_name"
                                        value={context.state.orneyDegrees_theme_name}
                                        onChange={(evt: any) => context.setState({ ...context.state, orneyDegrees_theme_name: evt.target.value })}
                                    />
                                </Row>
                            </Col>
                        ) : null}

                        {context.state.baseFilters !== 'orneyDegrees_cerneDegree_name' ? (
                            <Col md="3" className="col-filter-jorney-galery-orneyDegrees_cerneDegree_name">
                                <Row className="mr-1 mt-1">
                                    <Label id="orneyDegrees_cerneDegree_nameLabel" for="jorney-galery-orneyDegrees_cerneDegree_name">
                                        <Translate t={context.t} contentKey="jorneyGalery.orneyDegrees_cerneDegree_name">
                                            orneyDegrees.cerneDegree.name
                                        </Translate>
                                    </Label>

                                    <input
                                        className="form-control"
                                        type="text"
                                        name="orneyDegrees_cerneDegree_name"
                                        id="jorney-galery-orneyDegrees_cerneDegree_name"
                                        value={context.state.orneyDegrees_cerneDegree_name}
                                        onChange={(evt: any) => context.setState({ ...context.state, orneyDegrees_cerneDegree_name: evt.target.value })}
                                    />
                                </Row>
                            </Col>
                        ) : null}

                        {context.state.baseFilters !== 'jorneyGaleryType' ? (
                            <Col md="3" className="col-filter-jorney-galery-jorneyGaleryType">
                                <Row className="mr-1 mt-1">
                                    <Label id="jorneyGaleryTypeLabel" for="jorney-galery-jorneyGaleryType">
                                        <Translate t={context.t} contentKey="jorneyGalery.jorneyGaleryType">
                                            Tipo de seção da galeria de jornada
                                        </Translate>
                                    </Label>
                                    <Select
                                        id="jorney-galery-jorneyGaleryType"
                                        className={'css-select-control'}
                                        value={
                                            context.state.jorneyGaleryType
                                                ? { value: context.state.jorneyGaleryType, label: translate(context.t, 'jorneyGalery.JorneyGaleryType.' + context.state.jorneyGaleryType) }
                                                : { value: '', label: translate(context.t, 'jorneyGalery.jorneyGaleryType') }
                                        }
                                        options={[
                                            { value: '', label: translate(context.t, 'jorneyGalery.jorneyGaleryType') },
                                            { value: 'VIDEO', label: translate(context.t, 'jorneyGalery.JorneyGaleryType.VIDEO') },
                                            { value: 'TEXTO', label: translate(context.t, 'jorneyGalery.JorneyGaleryType.TEXTO') },
                                            { value: 'IMAGEM', label: translate(context.t, 'jorneyGalery.JorneyGaleryType.IMAGEM') },
                                            { value: 'INSIDE_SUBJECT', label: translate(context.t, 'jorneyGalery.JorneyGaleryType.INSIDE_SUBJECT') },
                                        ]}
                                        onChange={(options: any) => context.setState({ ...context.state, jorneyGaleryType: options['value'] })}
                                        name="jorneyGaleryType"
                                    />
                                </Row>
                            </Col>
                        ) : null}

                        {context.state.baseFilters !== 'jorneyDegrees' ? (
                            <Col md="3">
                                <Row className="mr-1 mt-1">
                                    <div style={{ width: '100%' }}>
                                        <Label for="jorney-galery-jorneyDegrees">
                                            <Translate t={context.t} contentKey="jorneyGalery.jorneyDegrees" />
                                        </Label>
                                        <SelectAsync
                                            id="jorney-galery-jorneyDegrees-filter"
                                            instanceId="jorney-galery-jorneyDegrees-filter"
                                            isMulti
                                            className={'css-select-control'}
                                            placeholder={translate(context.t, 'jorneyGalery.jorneyDegrees-filter-placeholder')}
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

                        {context.state.baseFilters !== 'jorneyGalerySections' ? (
                            <Col md="3">
                                <Row className="mr-1 mt-1">
                                    <div style={{ width: '100%' }}>
                                        <Label for="jorney-galery-jorneyGalerySections">
                                            <Translate t={context.t} contentKey="jorneyGalery.jorneyGalerySections" />
                                        </Label>
                                        <SelectAsync
                                            id="jorney-galery-jorneyGalerySections-filter"
                                            instanceId="jorney-galery-jorneyGalerySections-filter"
                                            isMulti
                                            className={'css-select-control'}
                                            placeholder={translate(context.t, 'jorneyGalery.jorneyGalerySections-filter-placeholder')}
                                            name={'jorneyGalerySections'}
                                            cacheOptions
                                            value={context.state.jorneyGalerySectionsId}
                                            onChange={(options) => context.setState({ ...context.state, jorneyGalerySectionsId: options })}
                                            defaultOptions={context.state.jorneyGalerySectionsStartFilter ? context.state.jorneyGalerySectionsStartFilter : []}
                                            loadingMessage={(input) => translate(context.t, 'selectAsync.loadingMessage')}
                                            noOptionsMessage={(input) =>
                                                context.state.jorneyGalerySectionsStartFilter === undefined
                                                    ? translate(context.t, 'selectAsync.loadingMessage')
                                                    : translate(context.t, 'selectAsync.noOptionsMessage')
                                            }
                                            onMenuOpen={async () => {
                                                if (context.state.jorneyGalerySectionsStartFilter === undefined) {
                                                    const result = await getListAxios('jorney-galery-sections', {}, 0, 100, 'id,asc', 'id');
                                                    context.setState({
                                                        ...context.state,
                                                        jorneyGalerySectionsStartFilter: result ? result.map((p: any) => ({ ...p, value: p.id, label: showFieldsSelectAsync(p, 'id') })) : [],
                                                    });
                                                }
                                            }}
                                            loadOptions={(inputValue, callback) => {
                                                (async () => {
                                                    const result = await getListAxios('jorney-galery-sections', { 'id.contains': inputValue }, 0, 100, 'id,asc', 'id');
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

export const renderTable = (context: IJorneyGaleryProps) => {
    return (
        <>
            {context.jorneyGaleryList && context.jorneyGaleryList.filter && context.jorneyGaleryList.filter((v: any) => typeof v.deletedAt === 'undefined' || v.deletedAt === null).length > 0 ? (
                <div id="jorney-galery-table-list" className="table-list">
                    <Table id="jorney-galery-table-list" responsive aria-describedby="jorney-galery-heading" className={'table-hover table-striped table-responsive-css'}>
                        <thead className={'thead-light'}>
                            <tr>
                                <th className="hand" onClick={context.sortFunction('id')}>
                                    <Translate t={context.t} contentKey="jorneyGalery.id" />
                                    <i className={context.state.sort === 'id' ? (context.state.order === 'asc' ? 'fa fa-sort-up' : 'fa fa-sort-down') : 'fa fa-sort'} />
                                </th>
                                <th className="hand" onClick={context.sortFunction('name')}>
                                    <Translate t={context.t} contentKey="jorneyGalery.name" />
                                    <i className={context.state.sort === 'name' ? (context.state.order === 'asc' ? 'fa fa-sort-up' : 'fa fa-sort-down') : 'fa fa-sort'} />
                                </th>
                                <th className="hand" onClick={context.sortFunction('canEdit')}>
                                    <Translate t={context.t} contentKey="jorneyGalery.canEdit" />
                                    <i className={context.state.sort === 'canEdit' ? (context.state.order === 'asc' ? 'fa fa-sort-up' : 'fa fa-sort-down') : 'fa fa-sort'} />
                                </th>
                                <th className="hand" onClick={context.sortFunction('isInsideSubject')}>
                                    <Translate t={context.t} contentKey="jorneyGalery.isInsideSubject" />
                                    <i className={context.state.sort === 'isInsideSubject' ? (context.state.order === 'asc' ? 'fa fa-sort-up' : 'fa fa-sort-down') : 'fa fa-sort'} />
                                </th>
                                <th className="hand" onClick={context.sortFunction('jorneyDegrees_jorney_name')}>
                                    <Translate t={context.t} contentKey="jorneyGalery.jorneyDegrees_jorney_name" />
                                    <i className={context.state.sort === 'jorneyDegrees_jorney_name' ? (context.state.order === 'asc' ? 'fa fa-sort-up' : 'fa fa-sort-down') : 'fa fa-sort'} />
                                </th>
                                <th className="hand" onClick={context.sortFunction('orneyDegrees_theme_name')}>
                                    <Translate t={context.t} contentKey="jorneyGalery.orneyDegrees_theme_name" />
                                    <i className={context.state.sort === 'orneyDegrees_theme_name' ? (context.state.order === 'asc' ? 'fa fa-sort-up' : 'fa fa-sort-down') : 'fa fa-sort'} />
                                </th>
                                <th className="hand" onClick={context.sortFunction('orneyDegrees_cerneDegree_name')}>
                                    <Translate t={context.t} contentKey="jorneyGalery.orneyDegrees_cerneDegree_name" />
                                    <i className={context.state.sort === 'orneyDegrees_cerneDegree_name' ? (context.state.order === 'asc' ? 'fa fa-sort-up' : 'fa fa-sort-down') : 'fa fa-sort'} />
                                </th>
                                <th className="hand" onClick={context.sortFunction('jorneyGaleryType')}>
                                    <Translate t={context.t} contentKey="jorneyGalery.jorneyGaleryType" />
                                    <i className={context.state.sort === 'jorneyGaleryType' ? (context.state.order === 'asc' ? 'fa fa-sort-up' : 'fa fa-sort-down') : 'fa fa-sort'} />
                                </th>

                                <th>
                                    <Translate t={context.t} contentKey="jorneyGalery.jorneyDegrees" />
                                </th>

                                <th />
                            </tr>
                        </thead>
                        <tbody>
                            <tr></tr>
                            {context.jorneyGaleryList
                                .filter((v: any) => typeof v.deletedAt === 'undefined' || v.deletedAt === null)
                                .map((jorneyGalery: any, i: number) => (
                                    <tr key={`entity-${i}`}>
                                        <td id="id-cell">
                                            <b className="visible-xs"> ID </b>

                                            {jorneyGalery.id}
                                        </td>

                                        <td id="name-cell">
                                            <b className="visible-xs"> Nome </b>

                                            {jorneyGalery.name}
                                        </td>

                                        <td id="canEdit-cell">
                                            <b className="visible-xs"> Editavel </b>

                                            <div className="switcher switcher-success">
                                                <input
                                                    className="form-control"
                                                    type="checkbox"
                                                    name={'canEdit_' + jorneyGalery.id}
                                                    id={'canEdit_' + i + jorneyGalery.id}
                                                    checked={jorneyGalery.canEdit}
                                                    onClick={() => context.updateEntityFetch({ ...jorneyGalery, canEdit: !jorneyGalery.canEdit })}
                                                />
                                                <label className="slider round" htmlFor={'canEdit_' + i + jorneyGalery.id} />
                                            </div>
                                        </td>

                                        <td id="isInsideSubject-cell">
                                            <b className="visible-xs"> Dentro do assunto </b>

                                            <div className="switcher switcher-success">
                                                <input
                                                    className="form-control"
                                                    type="checkbox"
                                                    name={'isInsideSubject_' + jorneyGalery.id}
                                                    id={'isInsideSubject_' + i + jorneyGalery.id}
                                                    checked={jorneyGalery.isInsideSubject}
                                                    onClick={() => context.updateEntityFetch({ ...jorneyGalery, isInsideSubject: !jorneyGalery.isInsideSubject })}
                                                />
                                                <label className="slider round" htmlFor={'isInsideSubject_' + i + jorneyGalery.id} />
                                            </div>
                                        </td>

                                        <td id="jorneyDegrees_jorney_name-cell">
                                            <b className="visible-xs"> jorneyDegrees.jorney.name </b>

                                            {jorneyGalery.jorneyDegrees_jorney_name}
                                        </td>

                                        <td id="orneyDegrees_theme_name-cell">
                                            <b className="visible-xs"> orneyDegrees.theme.name </b>

                                            {jorneyGalery.orneyDegrees_theme_name}
                                        </td>

                                        <td id="orneyDegrees_cerneDegree_name-cell">
                                            <b className="visible-xs"> orneyDegrees.cerneDegree.name </b>

                                            {jorneyGalery.orneyDegrees_cerneDegree_name}
                                        </td>

                                        <td id="jorneyGaleryType-cell">
                                            <b className="visible-xs"> Tipo de seção da galeria de jornada </b>

                                            {jorneyGalery.jorneyGaleryType ? <Translate t={context.t} contentKey={`jorneyGalery.JorneyGaleryType.${jorneyGalery.jorneyGaleryType}`} /> : <> </>}
                                        </td>

                                        <td id="jorneyDegrees-cell" role="many-to-one">
                                            <b className="visible-xs">
                                                {' '}
                                                <Translate t={context.t} contentKey="jorneyGalery.jorneyDegrees" />{' '}
                                            </b>

                                            {showFieldsSelectAsync(jorneyGalery, 'jorneyDegrees.id', null).map((v: any, ikey: any) => (
                                                <span key={ikey}> {v} </span>
                                            ))}
                                        </td>

                                        <td id="jorneyGalerySections-cell" role="one-to-many">
                                            <b className="visible-xs">
                                                {' '}
                                                <Translate t={context.t} contentKey="jorneyGalery.jorneyGalerySections" />{' '}
                                            </b>

                                            {showFieldsSelectAsync(jorneyGalery, 'jorneyGalerySections.id', null).map((v: any, ikey: any) => (
                                                <span key={ikey}> {v} </span>
                                            ))}
                                        </td>

                                        <td className="text-right">
                                            <div className="btn-group flex-btn-group-container">
                                                {hasAnyAuthority(context.props.userAccount, ['jorneyGalery'], 'view') ? (
                                                    <Link href={'#'}>
                                                        <a className={'btn btn-success btn-sm'} onClick={() => context.openUpdateModal(jorneyGalery)}>
                                                            <i className="fa fa-eye" />
                                                        </a>
                                                    </Link>
                                                ) : (
                                                    <></>
                                                )}{' '}
                                                {hasAnyAuthority(context.props.userAccount, ['jorneyGalery'], 'canDelete') ? (
                                                    <Link href={'#'}>
                                                        <a className={'btn btn-danger btn-sm'} onClick={() => context.deleteEntityModal(jorneyGalery)}>
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
                        <div className={context.jorneyGaleryList && context.jorneyGaleryList.length > 0 ? '' : 'd-none'}>
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
                    <Translate t={context.t} contentKey="jorneyGalery.home.notFound">
                        No Galeria Jornadas found
                    </Translate>
                </div>
            ) : (
                <div />
            )}
        </>
    );
};

const handleSyncList = (context: IJorneyGaleryProps) => {
    context.sortEntities();
};

export const returnFunction = (context: IJorneyGaleryProps) => {
    return (
        <div>
            <h4 id="jorney-galery-heading" data-cy="JorneyGaleryHeading">
                <Translate t={context.t} contentKey="jorneyGalery.home.title">
                    Galeria Jornadas
                </Translate>
                <div className="d-flex mr-4 justify-content-end">
                    <Button
                        onClick={() =>
                            context.setState({
                                ...context.state,
                                showModalForm: true,
                                idFormValue: null,
                                nameFormValue: null,
                                canEditFormValue: null,
                                isInsideSubjectFormValue: null,
                                jorneyDegrees_jorney_nameFormValue: null,
                                orneyDegrees_theme_nameFormValue: null,
                                orneyDegrees_cerneDegree_nameFormValue: null,
                                jorneyGaleryTypeFormValue: null,

                                jorneyDegreesStartSelectOptions: undefined,
                                jorneyDegreesFormValue: null,

                                jorneyGalerySectionsStartSelectOptions: undefined,
                                jorneyGalerySectionsFormValue: null,
                                isNew: true,
                            })
                        }
                        color="primary"
                        className="btn btn-primary float-right jh-create-entity"
                    >
                        <Translate t={context.t} contentKey="jorneyGalery.home.createLabel">
                            Create a new Galeria Jornada
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

export const getJorneyGaleryState = (context: IJorneyGaleryProps, location: any) => {
    const _urlBase = new URL(`http://localhost${location}`); // using a dummy url for parsing
    const extraFilters = jsonParse(_urlBase.searchParams.get('extraFilters') || '{}');
    const baseFilters = _urlBase.searchParams.get('baseFilters') || '';
    const offset: any = _urlBase.searchParams.get('offset') || 0;
    const activePage: any = _urlBase.searchParams.get('page') || 0;
    const itemsPerPage: any = _urlBase.searchParams.get('size') || 20;
    const sortOrder: any = (_urlBase.searchParams.get('sort') || 'id,asc').split(',');

    const id = _urlBase.searchParams.get('id') || '';
    const name = _urlBase.searchParams.get('name') || '';
    const canEdit = _urlBase.searchParams.get('canEdit') || '';
    const isInsideSubject = _urlBase.searchParams.get('isInsideSubject') || '';
    const jorneyDegrees_jorney_name = _urlBase.searchParams.get('jorneyDegrees_jorney_name') || '';
    const orneyDegrees_theme_name = _urlBase.searchParams.get('orneyDegrees_theme_name') || '';
    const orneyDegrees_cerneDegree_name = _urlBase.searchParams.get('orneyDegrees_cerneDegree_name') || '';
    const jorneyGaleryType = _urlBase.searchParams.get('jorneyGaleryType') || '';
    const jorneyDegreesId = _urlBase.searchParams.get('jorneyDegrees') || '';
    const jorneyGalerySectionsId = _urlBase.searchParams.get('jorneyGalerySections') || '';
    return {
        activePage,
        itemsPerPage,
        sort: sortOrder[0] ? sortOrder[0] : 'id',
        order: sortOrder[1] ? sortOrder[1] : 'asc',
        baseFilters,
        extraFilters,
        offset,
        id,
        name,
        canEdit,
        isInsideSubject,
        jorneyDegrees_jorney_name,
        orneyDegrees_theme_name,
        orneyDegrees_cerneDegree_name,
        jorneyGaleryType,
        jorneyDegreesId: jorneyDegreesId ? jorneyDegreesId.split(',').map((v) => ({ value: v.split('<->')[0], label: v.split('<->')[1] })) : [],
        jorneyGalerySectionsId: jorneyGalerySectionsId ? jorneyGalerySectionsId.split(',').map((v) => ({ value: v.split('<->')[0], label: v.split('<->')[1] })) : [],
    };
};

export const getEntitiesFetch = async (
    context: IJorneyGaleryProps,
    id: any,
    name: any,
    canEdit: any,
    isInsideSubject: any,
    jorneyDegrees_jorney_name: any,
    orneyDegrees_theme_name: any,
    orneyDegrees_cerneDegree_name: any,
    jorneyGaleryType: any,
    jorneyDegreesId: any,
    jorneyGalerySectionsId: any,
    extraFilters: any,
    page: any,
    size: any,
    sort: any,
    selectFields = '',
    authorizationBearer = '',
    getAccount = false,
) => {
    const apiUrl = BASE_API_VERSION_PATH + 'api/jorney-galeries';
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
    const nameRequest = name ? (Array.isArray(status) ? `name.in=${name.join(',')}&` : `name.contains=${name}&`) : '';
    const canEditRequest = canEdit !== '' ? `canEdit.equals=${canEdit}&` : '';
    const isInsideSubjectRequest = isInsideSubject !== '' ? `isInsideSubject.equals=${isInsideSubject}&` : '';
    const jorneyDegrees_jorney_nameRequest = jorneyDegrees_jorney_name
        ? Array.isArray(status)
            ? `jorneyDegrees_jorney_name.in=${jorneyDegrees_jorney_name.join(',')}&`
            : `jorneyDegrees_jorney_name.contains=${jorneyDegrees_jorney_name}&`
        : '';
    const orneyDegrees_theme_nameRequest = orneyDegrees_theme_name
        ? Array.isArray(status)
            ? `orneyDegrees_theme_name.in=${orneyDegrees_theme_name.join(',')}&`
            : `orneyDegrees_theme_name.contains=${orneyDegrees_theme_name}&`
        : '';
    const orneyDegrees_cerneDegree_nameRequest = orneyDegrees_cerneDegree_name
        ? Array.isArray(status)
            ? `orneyDegrees_cerneDegree_name.in=${orneyDegrees_cerneDegree_name.join(',')}&`
            : `orneyDegrees_cerneDegree_name.contains=${orneyDegrees_cerneDegree_name}&`
        : '';
    const jorneyGaleryTypeRequest = jorneyGaleryType ? (Array.isArray(status) ? `jorneyGaleryType.in=${jorneyGaleryType.join(',')}&` : `jorneyGaleryType.equals=${jorneyGaleryType}&`) : '';
    const jorneyDegreesRequest = jorneyDegreesId ? `jorneyDegrees.id.in=${jorneyDegreesId}&` : '';
    const jorneyGalerySectionsRequest = jorneyGalerySectionsId ? `jorneyGalerySections.id.in=${jorneyGalerySectionsId}&` : '';

    const requestUrl = `${apiUrl}?${extraFiltersRequest}${idRequest}${nameRequest}${canEditRequest}${isInsideSubjectRequest}${jorneyDegrees_jorney_nameRequest}${orneyDegrees_theme_nameRequest}${orneyDegrees_cerneDegree_nameRequest}${jorneyGaleryTypeRequest}${jorneyDegreesRequest}${jorneyGalerySectionsRequest}${
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

export const JorneyGalery = (props: IJorneyGaleryProps) => {
    const { t } = useTranslation();
    const _router = useRouter();
    const [activeTab, setActiveTab] = useState(0);
    const [jorneyGaleryList, setJorneyGaleryList] = useState(props.jorneyGaleryList ? props.jorneyGaleryList : ([] as any));
    const [jorneyGaleryEntity, setJorneyGaleryEntity] = useState(props.jorneyGaleryEntity ? props.jorneyGaleryEntity : ({} as any));

    const { loading, totalItems } = props;

    const [state, setState] = useState({
        id: props.id ? props.id : '',
        name: props.name ? props.name : '',
        canEdit: props.canEdit ? props.canEdit : '',
        isInsideSubject: props.isInsideSubject ? props.isInsideSubject : '',
        jorneyDegrees_jorney_name: props.jorneyDegrees_jorney_name ? props.jorneyDegrees_jorney_name : '',
        orneyDegrees_theme_name: props.orneyDegrees_theme_name ? props.orneyDegrees_theme_name : '',
        orneyDegrees_cerneDegree_name: props.orneyDegrees_cerneDegree_name ? props.orneyDegrees_cerneDegree_name : '',
        jorneyGaleryType: props.jorneyGaleryType ? props.jorneyGaleryType : '',
        jorneyDegreesId: props.jorneyDegreesId ? props.jorneyDegreesId : null,
        jorneyGalerySectionsId: props.jorneyGalerySectionsId ? props.jorneyGalerySectionsId : null,
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
        jorneyGaleryList: jorneyGaleryList,
        setJorneyGaleryList: setJorneyGaleryList,
        jorneyGaleryEntity: jorneyGaleryEntity,
        setJorneyGaleryEntity: setJorneyGaleryEntity,

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
            ? (_jorneyGaleryEntity: any, isNew: any) => props['renderBodyUpdate'](context, _jorneyGaleryEntity, isNew)
            : (_jorneyGaleryEntity: any, isNew: any) => renderBodyUpdate(context, _jorneyGaleryEntity, isNew),
        renderUpdateModal: props['renderUpdateModal'] ? () => props['renderUpdateModal'](context) : () => renderUpdateModal(context),
        renderNewModal: props['renderNewModal'] ? () => props['renderNewModal'](context) : () => renderNewModal(context),

        renderHeaderUpdate: props['renderHeaderUpdate'] ? (isNew) => props['renderHeaderUpdate'](context, isNew) : (isNew) => renderHeaderUpdate(context, isNew),
        renderTable: props['renderTable'] ? () => props['renderTable'](context) : () => renderTable(context),
        handleSyncList: props['handleSyncList'] ? () => props['handleSyncList'](context) : () => handleSyncList(context),
        getEntitiesFetch: props['getEntitiesFetch']
            ? (
                  id: any,
                  name: any,
                  canEdit: any,
                  isInsideSubject: any,
                  jorneyDegrees_jorney_name: any,
                  orneyDegrees_theme_name: any,
                  orneyDegrees_cerneDegree_name: any,
                  jorneyGaleryType: any,
                  jorneyDegreesId: any,
                  jorneyGalerySectionsId: any,
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
                      name,
                      canEdit,
                      isInsideSubject,
                      jorneyDegrees_jorney_name,
                      orneyDegrees_theme_name,
                      orneyDegrees_cerneDegree_name,
                      jorneyGaleryType,
                      jorneyDegreesId,
                      jorneyGalerySectionsId,
                      extraFilters,
                      page,
                      size,
                      sort,
                      selectFields,
                      authorizationBearer,
                  )
            : (
                  id: any,
                  name: any,
                  canEdit: any,
                  isInsideSubject: any,
                  jorneyDegrees_jorney_name: any,
                  orneyDegrees_theme_name: any,
                  orneyDegrees_cerneDegree_name: any,
                  jorneyGaleryType: any,
                  jorneyDegreesId: any,
                  jorneyGalerySectionsId: any,
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
                      name,
                      canEdit,
                      isInsideSubject,
                      jorneyDegrees_jorney_name,
                      orneyDegrees_theme_name,
                      orneyDegrees_cerneDegree_name,
                      jorneyGaleryType,
                      jorneyDegreesId,
                      jorneyGalerySectionsId,
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

        getJorneyGaleryState: props['getJorneyGaleryState'] ? (location) => props['getJorneyGaleryState'](context, location) : (location) => getJorneyGaleryState(context, location),
        getEntityFiltersURL: props['getEntityFiltersURL'] ? () => props['getEntityFiltersURL'](context) : () => getEntityFiltersURL(context),
        return: props['returnFunction'] ? () => props['returnFunction'](context) : () => returnFunction(context),
    };

    return context;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const q = nextCookie(ctx);
    const _fieldsBase = getJorneyGaleryState(null, ctx.resolvedUrl);
    const apiUrl = BASE_API_VERSION_PATH + 'api/jorney-galeries';

    const res = await getEntitiesFetch(
        null,
        _fieldsBase.id,
        _fieldsBase.name,
        _fieldsBase.canEdit,
        _fieldsBase.isInsideSubject,
        _fieldsBase.jorneyDegrees_jorney_name,
        _fieldsBase.orneyDegrees_theme_name,
        _fieldsBase.orneyDegrees_cerneDegree_name,
        _fieldsBase.jorneyGaleryType,
        _fieldsBase.jorneyDegreesId.map((v) => v.value).join(','),
        _fieldsBase.jorneyGalerySectionsId.map((v) => v.value).join(','),
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
            jorneyGaleryList: await res.json(),
            ...(await serverSideTranslations('pt', ['adminTranslations', 'global', 'jorneyGalery'])),
        },
    };
};

export default JorneyGalery;
