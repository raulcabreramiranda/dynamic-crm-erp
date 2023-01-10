interface Props {
    className?: string;
    children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
}

const TableHeadRow = (props: Props) => {
    return (
        <tr role="row">
            {props.children}
        </tr>
    );
};

export default TableHeadRow;
