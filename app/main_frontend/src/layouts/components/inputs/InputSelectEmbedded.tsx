import { useState, Context, useContext, useEffect, SyntheticEvent, ReactElement } from 'react';
import { IApiResponseProps, apiGet, showFieldsSelectAsync } from 'src/util/entity-utils';
import { MultiSelect } from 'primereact/multiselect';
import Label from 'src/layouts/components/Label';
import { Dropdown } from 'primereact/dropdown';
import TableContainer from '../Table/TableContainer';
import TablePagination from '../Table/TablePagination';
import Table from '../Table/Table';
import TableHead from '../Table/TableHead';
import TableHeadRow from '../Table/TableHeadRow';
import TableHeadCell from '../Table/TableHeadCell';
import TableBodyRow from '../Table/TableBodyRow';
import TableBodyCell from '../Table/TableBodyCell';
import TableBody from '../Table/TableBody';
import { Translate } from '../translate-component';
import Button from '../Button';
import Dialog from '../Dialog/Dialog';
import DialogTitle from '../Dialog/DialogTitle';
import DialogContent from '../Dialog/DialogContent';
import DialogActions from '../Dialog/DialogActions';
import TableText from 'src/layouts/components/inputs/TableText';
import ViewText from 'src/layouts/components/inputs/ViewText';
import InputText from 'src/layouts/components/inputs/InputText';
import { Dispatch } from 'react';
import { createContext } from 'react';
import Grid from '../Grid';

export interface IEntityListSort {
    [key: string]: 'asc' | 'desc';
}
interface Props {
    entityContext: Context<any>;
    options: any[];
    relationshipType: string;
    optionsLink: string;
    labelPos?: 'top' | 'left';
    id?: string;
    name: string;
    label: string | ReactElement;
    optionsSort: IEntityListSort;
    optionsShowFields: string[];
    formLayoutIsEmbebed: boolean;
    formLayoutEmbebedView: any;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};

const InputSelectEmbedded = ({ name, label, labelPos, entityContext: EntityContext, optionsLink, optionsSort, optionsShowFields, formLayoutEmbebedView }: Props) => {
    const { entityEdit: entityBaseEdit, setEntityEdit: setBaseEntityEdit } = useContext(EntityContext);

    console.info({formLayoutEmbebedView})

    const fieldName = typeof name !== 'undefined' ? name : '';
    const entityList = entityBaseEdit[fieldName] || [];
    const setEntityList = (_entityList: any[]) => {
        const _entityBaseEdit = { ...entityBaseEdit };
        _entityBaseEdit[fieldName] = _entityList;
        setBaseEntityEdit(_entityBaseEdit);
    };

    const [entityEdit, setEntityEdit] = useState<any>({});
    const [entityView, setEntityView] = useState<any>({});

    // const tableLayout = formLayoutEmbebedView.tableLayout;
    // const viewLayout = formLayoutEmbebedView.viewLayout;

    return (
        <EmbeddedEntityContext.Provider value={{ entityList, setEntityList, formLayoutEmbebedView, entityEdit, setEntityEdit, entityView, setEntityView }}>
            <InputSelectEmbeddedTable />
            <InputSelectEmbeddedView />
            <InputSelectEmbeddedEdit />
        </EmbeddedEntityContext.Provider>
    );
};

const InputSelectEmbeddedTable = () => {
    const { entityList, setEntityList, formLayoutEmbebedView, setEntityView, setEntityEdit } = useContext(EmbeddedEntityContext);

    const tableLayout = formLayoutEmbebedView.tableLayout;

    const openNewModal = () => {
        setEntityEdit({ id: -1 });
    };
    const openViewModal = (entity: any) => {
            setEntityView(entity || {});
    };

    const openEditModal = (entity: any) => {
            setEntityEdit(entity || {});
    };

    const removeEntity = (entity: any) => {
        const _entityList = entityList.map((v) => {
            if (v.id === entity.id) {
                return {...entity, deletedAt: Date.now()};
            }
            return v;
        });
        setEntityList(_entityList || []);
    };

    return (
        <>
            {entityList && entityList.filter && entityList.filter(v=>!v.deletedAt) ? (
                <div className="table-list">
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableHeadRow>
                                    {Object.keys(tableLayout).map((field) => {
                                        const fieldData = tableLayout[field];
                                        return (
                                            <TableHeadCell id={`th-${field.replace('.', '-')}-cell`} align={'left'}>
                                                <Translate label={{ pt: fieldData.label }} contentKey={`table-entityEmbedded.${fieldData.label}`} />
                                            </TableHeadCell>
                                        );
                                    })}
                                    <TableHeadCell align={'right'}>
                                        <Button onClick={() => openNewModal()} icon={'plus'}>
                                            Novo
                                        </Button>
                                    </TableHeadCell>
                                </TableHeadRow>
                            </TableHead>
                            <TableBody>
                                {entityList
                                    .filter((v: any) => typeof v.deletedAt === 'undefined' || v.deletedAt === null)
                                    .map((entityEmbedded: any, i: number) => (
                                        <TableBodyRow tableRowIndex={i} key={`entity-${i}`}>
                                            {Object.keys(tableLayout).map((field) => {
                                                const fieldData = tableLayout[field];
                                                return (
                                                    <TableBodyCell id={`td-${field.replace('.', '-')}-cell`} align={'left'}>
                                                        <TableText type={'number'} name={field} entityView={entityEmbedded} />
                                                    </TableBodyCell>
                                                );
                                            })}

                                            <TableBodyCell align={'right'}>
                                                <div className="btn-group flex-btn-group-container">
                                                    <Button color="success" size="small" onClick={() => openViewModal(entityEmbedded)} isLink={false} icon={'eye'}></Button>
                                                    <Button color="primary" size="small" onClick={() => openEditModal(entityEmbedded)} isLink={false} icon={'pencil'}></Button>
                                                    <Button color="danger" size="small" onClick={() => removeEntity(entityEmbedded)} isLink={false} icon={'trash'}></Button>
                                                </div>
                                            </TableBodyCell>
                                        </TableBodyRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            ) : (
                <div />
            )}
        </>
    );
};

const InputSelectEmbeddedView = () => {
    const { entityView, setEntityView, formLayoutEmbebedView } = useContext(EmbeddedEntityContext);
    const viewLayout = formLayoutEmbebedView.viewLayout;

    if (!entityView || !entityView?.id) {
        return <></>;
    }

    const handleClose = () => {
        setEntityView({});
    };

    return (
        <Dialog isOpen={true} onClose={handleClose}>
            <DialogTitle onClose={handleClose}>Detalhe do Profile</DialogTitle>
            <DialogContent>
                <form>
                    <Grid container spacing={7}>
                        {Object.keys(viewLayout).map((field) => {
                            const fieldData = viewLayout[field];
                            return (
                                <Grid item xs={12}>
                                    <div>
                                        <Grid>
                                            <ViewText
                                                id="admin-profile-name"
                                                entityContext={EmbeddedEntityContext}
                                                type="text"
                                                name={field}
                                                label={
                                                    <>
                                                        <Translate label={{ pt: fieldData.label }} contentKey={`view-entityEmbedded.${fieldData.label}`} />
                                                    </>
                                                }
                                            />
                                        </Grid>
                                    </div>
                                </Grid>
                            );
                        })}
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="secondary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

const InputSelectEmbeddedEdit = () => {
    const { entityEdit, setEntityEdit, entityList, setEntityList, formLayoutEmbebedView } = useContext(EmbeddedEntityContext);
    const formLayout = formLayoutEmbebedView.formLayout;
    if (!entityEdit || !entityEdit?.id) {
        return <></>;
    }

    const saveChanges = () => {
        const _entityList = entityList.map((v) => {
            if (v.id === entityEdit.id) {
                return entityEdit;
            }
            return v;
        });
        setEntityList(_entityList || []);
        handleClose();
    };

    const saveNewChanges = () => {
        const _entityList = [...entityList];
        const id = "new_" + Math.random().toString(16).slice(2)
        _entityList.push({...entityEdit, id})
        setEntityList(_entityList);
        handleClose();
    };

    const handleClose = () => {
        setEntityEdit({});
    };

    return (
        <Dialog isOpen={true} onClose={handleClose}>
            <DialogTitle onClose={handleClose}>Edit do Profile</DialogTitle>
            <DialogContent>
                <form>
                    <Grid container spacing={7}>
                        {Object.keys(formLayout).map((field) => {
                            const fieldData = formLayout[field];
                            
                            return (
                                <Grid item xs={12}>
                                    <div>
                                        <Grid>
                                            <InputText
                                                id="admin-profile-name"
                                                entityContext={EmbeddedEntityContext}
                                                type="text"
                                                name={field}
                                                labelPos="top"
                                                label={
                                                    <>
                                                        <Translate label={{ pt: fieldData.label }} contentKey={`view-entityEmbedded.${fieldData.label}`} />
                                                    </>
                                                }
                                            />
                                        </Grid>
                                    </div>
                                </Grid>
                            );

                            return (
                                <Grid item xs={12}>
                                    <div>
                                        <Grid>
                                            <InputText
                                                id="admin-profile-name"
                                                entityContext={EmbeddedEntityContext}
                                                type="text"
                                                name={field}
                                                labelPos="top"
                                                label={
                                                    <>
                                                        <Translate label={{ pt: fieldData.label }} contentKey={`view-entityEmbedded.${fieldData.label}`} />
                                                    </>
                                                }
                                            />
                                        </Grid>
                                    </div>
                                </Grid>
                            );
                        })}
                    </Grid>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=>{ entityEdit.id !== -1 ? saveChanges() : saveNewChanges()}} icon={'save'}>
                    Salvar
                </Button>
                <Button onClick={handleClose} color="secondary">
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export const EmbeddedEntityContext = createContext(
    {} as {
        formLayoutEmbebedView?: any;
        baseFilters?: any;
        baseEntity?: any;
        entityEdit: any;
        setEntityEdit: Dispatch<any>;
        formTabActive?: number;
        setFormTabActive?: Dispatch<number>;
        entityView: any;
        setEntityView: Dispatch<any>;
        viewTabActive?: number;
        setViewTabActive?: Dispatch<number>;
        entityFilter?: any;
        setEntityFilter?: Dispatch<any>;
        entityList: any[];
        setEntityList: Dispatch<any[]>;
        entityListPage?: number;
        setEntityListPage?: Dispatch<number>;
        entityListSize?: number;
        setEntityListSize?: Dispatch<number>;
        entityListCount?: number;
        setEntityListCount?: Dispatch<number>;
        reloadList?: (data: any) => void;
        loading?: boolean;
        setLoading?: Dispatch<boolean>;
        entityListSort?: IEntityListSort;
        setEntityListSort?: Dispatch<IEntityListSort>;
        getEntityFiltersURL?(offset?: number | null): string;
    }
);

export default InputSelectEmbedded;
