interface Props {
    className?: string;
    children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
}

const Link = (props: Props) => {
    return (
        <div className={`Link ${props.className || ""}`}>
           {props.children}
        </div>
    );
};

export default Link;
