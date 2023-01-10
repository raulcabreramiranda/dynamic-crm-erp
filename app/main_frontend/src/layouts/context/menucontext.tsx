import React, { useState } from 'react';

export interface IMenuContext {
    activeMenu: string;
    setActiveMenu: React.Dispatch<React.SetStateAction<string>>;
}

export const MenuContext = React.createContext({} as IMenuContext);

export interface IMenuProvider { children: string | number | boolean | React.ReactFragment | React.ReactPortal | React.ReactElement<any, string | React.JSXElementConstructor<any>> | null | undefined; }
export const MenuProvider = (props: IMenuProvider) => {
    const [activeMenu, setActiveMenu] = useState('');

    const value = {
        activeMenu,
        setActiveMenu
    };

    return <MenuContext.Provider value={value}>{props.children}</MenuContext.Provider>;
};
