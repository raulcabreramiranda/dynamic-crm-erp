import getConfig from 'next/config';

export class IconService {
    icons: any[];
    selectedIcon: any;
    contextPath: any;

    constructor() {
        this.icons = [];
        this.selectedIcon = null;
        this.contextPath = getConfig().publicRuntimeConfig.contextPath;
    }

    getIcons() {
        return fetch(this.contextPath + '/demo/data/icons.json', { headers: { 'Cache-Control': 'no-cache' } })
            .then((res) => res.json())
            .then((d) => d.icons);
    }

    getIcon(id: string) {
        if (this.icons) {
            this.selectedIcon = this.icons.find((x) => x.properties.id === id);
            return this.selectedIcon;
        }
    }
}
