import getConfig from 'next/config';
import React, { ReactElement, useContext } from 'react';
import AppMenuitem from './AppMenuitem';
import { LayoutContext } from './context/layoutcontext';
import { MenuProvider } from './context/menucontext';
import Link from 'next/link';

interface IModelItem {
    label: string | ReactElement;
    icon: string;
    to?: string;
    badge?: string;
    url?: string;
    class?: string;
    target?: string;
    preventExact?: boolean;
    items?: IModelItem[];
}
interface IModel {
    label: string | ReactElement;
    icon?: string;
    to?: string;
    class?: undefined;
    preventExact?: undefined;
    seperator?: boolean;
    items: IModelItem[];
}
const AppMenu = () => {
    const { layoutConfig } = useContext(LayoutContext);
    const contextPath = getConfig().publicRuntimeConfig.contextPath;
    const model: IModel[] = [
        {
            label: 'Home',
            items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }]
        },
        {
            label: 'Usuarios',
            items: [
                { label: 'audit-entities', icon: 'pi pi-fw pi-home', to: '/admin/audit-entities' },
                { label: 'authorities', icon: 'pi pi-fw pi-home', to: '/admin/authorities' },
                { label: 'permission-profiles', icon: 'pi pi-fw pi-home', to: '/admin/permission-profiles' },
                { label: 'permissions', icon: 'pi pi-fw pi-home', to: '/admin/permissions' },
                { label: 'permission-users', icon: 'pi pi-fw pi-home', to: '/admin/permission-users' },
                { label: 'profiles', icon: 'pi pi-fw pi-home', to: '/admin/profiles' },
                { label: 'users', icon: 'pi pi-fw pi-home', to: '/admin/users' },
                { label: 'white-labels', icon: 'pi pi-fw pi-home', to: '/admin/white-labels' }
            ]
        }
    ];

    return (
        <MenuProvider>
            <ul className="layout-menu">
                {model.map((item, i) => {
                    return !item.seperator ? <AppMenuitem item={item} root={true} index={`${i}`} key={i} /> : <li className="menu-separator"></li>;
                })}
            </ul>
        </MenuProvider>
    );
};

export default AppMenu;
