import { useRouter } from 'next/router'
import { Button as PrimeButton } from 'primereact/button';

interface Props {
    isLink?: boolean;
    href?: string;
    onClick?: ()=>any;
    icon?: string;
    color?: string;
    size?: string;
    className?: string;
    children?: string;
}

const Button = (props: Props) => {
    const router = useRouter()
    return <PrimeButton  type="button" label={props.children} icon={props.icon ? `pi pi-${props.icon}` : undefined} onClick={()=>{
        props.onClick && props.onClick();
        if(props.isLink){
            router.push(props.href || "")
        }
    }} className={`${props.className || ''} mr-2`} />;
};

export default Button;
