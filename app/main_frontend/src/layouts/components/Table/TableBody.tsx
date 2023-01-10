interface Props {
    className?: string;
    children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
}

const TableBody = (props: Props) => {
    return <tbody className="p-datatable-tbody">{props.children}</tbody>;
};

export default TableBody;
