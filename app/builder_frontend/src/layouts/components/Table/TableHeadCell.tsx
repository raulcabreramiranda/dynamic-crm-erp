interface Props {
    id?: string;
    align?: string;
    onClick?: Function;
    className?: string;
    children?: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
}

const TableHeadCell = (props: Props) => {
    return (
        <th className="p-sortable-column" tabIndex={0} role="columnheader" aria-sort="none" style={{minWidth: "15rem"}}>
            <div className="p-column-header-content">
                <span className="p-column-title">{props.children}</span>
                {/* <span className="p-sortable-column-icon pi pi-fw pi-sort-alt"></span> */}
            </div>
        </th>
    );
    
};

export default TableHeadCell;
