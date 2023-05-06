interface Props {
    id?: string;
    align?: "inline-end" | "inline-start" | "left" | "none" | "right" | undefined;
    onClick?: Function;
    className?: string;
    children?: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
}

const TableHeadCell = (props: Props) => {
    return (
        <th id={props.id} className={props.className + ' p-sortable-column '} tabIndex={0} role="columnheader" aria-sort="none" style={{ minWidth: '15rem' }}>
            <div className="p-column-header-content" style={{float: (props.align ? props.align : 'left')}}>
                <span className="p-column-title">{props.children}</span>
                {/* <span className="p-sortable-column-icon pi pi-fw pi-sort-alt"></span> */}
            </div>
        </th>
    );
};

export default TableHeadCell;
