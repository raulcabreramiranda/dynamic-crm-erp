interface Props {
    className?: string;
    children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
}

const TableHead = (props: Props) => {
    return <thead className="p-datatable-thead">{props.children}</thead>;
};

export default TableHead;
