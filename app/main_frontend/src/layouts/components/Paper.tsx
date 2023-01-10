interface Props {
    className?: string;
    children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
}

const Paper = (props: Props) => {
    return (
        <div className={`Paper ${props.className || ""}`}>
           {props.children}
        </div>
    );
};

export default Paper;
