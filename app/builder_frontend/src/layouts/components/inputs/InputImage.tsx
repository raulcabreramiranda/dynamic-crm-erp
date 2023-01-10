import { useState, ElementType, ChangeEvent, useRef } from 'react';
import { ReactElement } from 'react';
import { Context, useContext } from 'react';
import { assestBasePath } from 'src/util/entity-utils';
import { FileUpload, FileUploadSelectParams, FileUploadUploadParams } from 'primereact/fileupload';
import Label from '../Label';
import Button from '../Button';

interface Props {
    entityContext: Context<any>;
    id?: string;
    name: string;
    labelPos?: 'top' | 'left';
    label: string | ReactElement;
    widthPreview: string;
    heightPreview: string;
}

const InputImage = ({ labelPos, label, name, widthPreview, heightPreview, entityContext: EntityContext }: Props) => {
    const { entityEdit, setEntityEdit } = useContext(EntityContext);
    const fieldName = typeof name !== 'undefined' ? name : '';
    const inputFile: any = useRef(null);

    const baseImage = entityEdit[fieldName] ? assestBasePath(entityEdit[fieldName]) : '/images/avatars/1.png';
    const [imgSrc, setImgSrc] = useState<string>(baseImage);

    const onChange = (file: ChangeEvent) => {
        const reader = new FileReader();
        const { files } = file.target as HTMLInputElement;
        if (files && files.length !== 0) {
            reader.onload = () => handleChange(reader.result as string, files[0].name);

            reader.readAsDataURL(files[0]);
        }
    };

    const onSelectFile = async (event: FileUploadSelectParams) => {
        // convert file to base64 encoded
        const file: any = event.files[0];
        const reader = new FileReader();
        let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url
        reader.readAsDataURL(blob);
        reader.onloadend = function () {
            const base64data = reader.result;
            console.info(file);
            handleChange(`${base64data}`, file.name);
            inputFile.current.clear();
        };
    };

    const handleChange = (base64: string, fileName: string) => {
        const _entityEdit = { ...entityEdit };
        _entityEdit[`${fieldName}Base64`] = base64;
        _entityEdit[`${fieldName}FileName`] = fileName;
        setEntityEdit(_entityEdit);
        setImgSrc(base64);
    };

    const chooseOptions = { label: 'Choose', icon: 'pi' };

    return (
        <div className={labelPos === 'top' ? `` : ``}>
            <div className="flex flex-column gap-4">
                <Label htmlFor={`input-multiselect-${fieldName}`}>{label}</Label>
                <div className="flex">
                    <img style={{maxWidth: "100%", height:"auto"}} src={entityEdit[`${fieldName}Base64`] || baseImage} />
                </div>
                <div className="flex gap-3">
                    <FileUpload className="flex-1 flex " ref={inputFile} chooseOptions={chooseOptions} mode="basic" name="demo[]" customUpload accept="image/*" maxFileSize={1000000} onSelect={onSelectFile} />
                    <Button className="flex-1 flex" onClick={() => handleChange("", "")}>
                        Reset
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default InputImage;
