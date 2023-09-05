import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { TabView, TabPanel } from 'primereact/tabview';
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { GenerateQueriesProvider } from './GenerateQueriesProvider';
import FromComponente from './components/FromComponente';
import SelectComponente from './components/SelectComponente';
import WhereComponente from './components/WhereComponente';
import GroupByComponente from './components/GroupByComponente';
import OrderByComponente from './components/OrderByComponente';
import LimitComponente from './components/LimitComponente';
import SelectFuntionsComponente from './components/SelectFuntionsComponente';
import LeftJoinComponente from './components/LeftJoinComponente';
import ShowQueryComponente from './components/ShowQueryComponente';

const GenerateQuery = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  let items: MenuItem[] = [
    { label: 'Relações', icon: 'pi pi-fw pi-sitemap', command: () => setActiveIndex(0) },
    { label: 'Colunas', icon: 'pi pi-fw pi-check-square', command: () => setActiveIndex(1) },
    { label: 'Filtros', icon: 'pi pi-fw pi-filter', command: () => setActiveIndex(2) },
    { label: 'Agrupar', icon: 'pi pi-fw pi-link', command: () => setActiveIndex(3) },
    { label: 'Resumir', icon: 'pi pi-fw pi-server', command: () => setActiveIndex(4) },
    { label: 'Ordem', icon: 'pi pi-fw pi-sort-amount-up', command: () => setActiveIndex(5) },
    { label: 'Limite', icon: 'pi pi-fw pi-list', command: () => setActiveIndex(6) },
  ];
  return (
    <GenerateQueriesProvider>
      <div className="grid">
        <div className="col-12">
          <div className="card">
            <h5>Splitter</h5>
            <ShowQueryComponente />

            <FromComponente />
            <div className="flex">
              <div>
                <div className="h-full flex">
                  <Menu model={items} />
                </div>
              </div>
                <div className="w-full">
                  <TabView activeIndex={activeIndex} onTabChange={(e) => setActiveIndex(e.index)}>
                    <TabPanel headerStyle={{ display: 'none' }}>
                      <LeftJoinComponente />
                    </TabPanel>
                    <TabPanel headerStyle={{ display: 'none' }}>
                      <SelectComponente />
                    </TabPanel>
                    <TabPanel headerStyle={{ display: 'none' }}>
                      <WhereComponente />
                    </TabPanel>
                    <TabPanel headerStyle={{ display: 'none' }}>
                      <GroupByComponente />
                    </TabPanel>
                    <TabPanel headerStyle={{ display: 'none' }}>
                      <SelectFuntionsComponente />
                    </TabPanel>
                    <TabPanel headerStyle={{ display: 'none' }}>
                      <OrderByComponente />
                    </TabPanel>
                    <TabPanel headerStyle={{ display: 'none' }}>
                      <LimitComponente />
                    </TabPanel>
                  </TabView>
                </div>
            </div>
          </div>
        </div>
      </div>
    </GenerateQueriesProvider>
  );
};

export default GenerateQuery;
