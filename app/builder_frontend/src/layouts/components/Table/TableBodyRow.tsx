interface Props {
    tableRowIndex?: number;
    className?: string;
    children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
}

const TableBodyRow = (props: Props) => {
    return (
        <tr role="row" className="p-row-odd">
            {props.children}
        </tr>
    );
};

export default TableBodyRow;
