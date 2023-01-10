interface Props {
    className?: string;
    children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
}

const TablePagination = (props: Props) => {
    return (
        <div className={`TablePagination ${props.className || ""}`}>
           {props.children}
        </div>
    );
};

export default TablePagination;
