interface Props {
    className?: string;
    children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
}

const TableContainer = (props: Props) => {
    return (
        <div className={`TableContainer ${props.className || ""}`}>
           {props.children}
        </div>
    );
};

export default TableContainer;
