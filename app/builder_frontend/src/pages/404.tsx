import React from 'react';
import NotFound from './notfound/index';

const Custom404 = () => {
    return <NotFound />;
};

Custom404.getLayout = function getLayout(page: any) {
    return page;
};

export default Custom404;
