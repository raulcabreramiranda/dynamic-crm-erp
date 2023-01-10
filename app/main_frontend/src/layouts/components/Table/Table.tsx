import getConfig from 'next/config';
import { Button } from 'primereact/button';
import { Column, ColumnBodyType } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { InputNumber, InputNumberValueChangeParams } from 'primereact/inputnumber';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { Rating } from 'primereact/rating';
import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';
import { ProductService } from '../../../../demo/service/ProductService';

interface Props {
    className?: string;
    children: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
}

const Table = (props: Props) => {
    return (
        <>
            <div className="p-datatable p-component p-datatable-selectable p-datatable-responsive-scroll datatable-responsive">
                <div className="p-datatable-wrapper">
                    <table className="p-datatable-table" role="table">
                        {props.children}
                    </table>
                </div>
            </div>
        </>
    );
};

export default Table;
