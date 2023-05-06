interface Props {
    id?: string;
    align?: string;
    role?: string;
    className?: string;
    children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
}

const TableBodyCell = (props: Props) => {
    return (
        <td id={props.id} className={props.className} role="cell">
            {props.children}
        </td>
    );
};

export default TableBodyCell;
