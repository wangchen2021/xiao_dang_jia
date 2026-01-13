import {
    memo,
    useCallback,
    useEffect,
    useState,
    forwardRef,
    type ChangeEvent,
    type ForwardedRef,
    useImperativeHandle,
    useRef
} from 'react';
import {
    FormContainer,
    FormItemWrapper,
    FormLabelWrapper,
    RequiredMark,
    FormContentWrapper,
    FormControl,
    UploadImgArea,
    UploadImgText,
    StarArea,
} from './styles';
import { Input, Textarea } from '@/styles/common.styles';
import { useCosUpload } from '@/hooks/useCosUpload';
import Star, { type scoreType } from '../Star';
import message from '../Message';

export const FormItemTypes = {
    INPUT: "input",
    UPLOAD_IMG: "upload img",
    STAR: "star",
    TEXTAREA: "textarea"
} as const;

export type FormItemType = typeof FormItemTypes[keyof typeof FormItemTypes];

export interface FormPropsItem {
    label: string;
    key: string;
    value: any;
    type?: FormItemType;
    require?: boolean;
}

interface FormProps {
    data: FormPropsItem[];
    onChange?: (data: Record<string | symbol, any>) => void
}

export interface FormExposedMethods {
    submit: () => Record<string, any> | null;
}

type FormRef = FormExposedMethods;

const generateInitFormData = (data: FormPropsItem[]) => {
    let res: Record<string, any> = {}
    for (let item of data) {
        res[item.key] = item.value
    }
    return res
}

const Form = memo(
    forwardRef<FormRef, FormProps>(
        ({ data, onChange }, ref: ForwardedRef<FormRef>) => {
            const { uploadFile } = useCosUpload()
            const [formData, setFormData] = useState(generateInitFormData(data))
            const containerRef = useRef<HTMLDivElement>(null);

            const submit = useCallback((): Record<string, any> | null => {
                for (const item of data) {
                    const { key, require } = item;
                    const value = formData[key];
                    if (require) {
                        if (value === null || value === undefined || value === '') {
                            const errMsg = `必填项【${item.label}】未填写`
                            console.warn(errMsg);
                            message.warning(errMsg, 3000)
                            return null;
                        }
                        if (item.type === FormItemTypes.UPLOAD_IMG && !value) {
                            const errMsg = `必填项【${item.label}】未上传图片`
                            console.warn(errMsg, 3000);
                            message.warning(errMsg)
                            return null;
                        }
                    }
                }
                return formData;
            }, [data, formData]);

            useImperativeHandle(
                ref,
                () => ({
                    submit,
                }),
                [submit]
            );

            const changeValue = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, key: string) => {
                setFormData(prev => ({
                    ...prev,
                    [key]: e.target.value
                }));
            }

            const handleFileChange = useCallback(async (e: ChangeEvent<HTMLInputElement>, key: string | symbol) => {
                const file = e.target.files ? e.target.files[0] : null
                if (!file) return
                const url = await uploadFile(file)
                setFormData(prev => ({
                    ...prev,
                    [key]: url
                }));
            }, [uploadFile])

            const handleStarChange = (value: scoreType, key: string | symbol) => {
                setFormData(prev => ({
                    ...prev,
                    [key]: value
                }));
            }

            const renderFormItem = useCallback((item: FormPropsItem) => {
                const { label, key, type = FormItemTypes.INPUT, require = false } = item;
                const value = formData[key]

                const renderContent = () => {
                    switch (type) {
                        case FormItemTypes.INPUT:
                            return (
                                <FormControl>
                                    <Input
                                        value={value || ''}
                                        placeholder={`请输入${label}`}
                                        autoComplete="off"
                                        onChange={(e) => changeValue(e, key)}
                                    />
                                </FormControl>
                            );
                        case FormItemTypes.TEXTAREA:
                            return (
                                <FormControl>
                                    <Textarea
                                        value={value || ''}
                                        placeholder={`请输入${label}`}
                                        autoComplete="off"
                                        onChange={(e) => changeValue(e, key)}
                                    />
                                </FormControl>
                            );
                        case FormItemTypes.UPLOAD_IMG:
                            return (
                                <UploadImgArea>
                                    {
                                        value ?
                                            <>
                                                <img className='img' src={value} alt={label}></img>
                                            </>
                                            :
                                            <>
                                                <span>📸</span>
                                                <UploadImgText>点击上传{label}</UploadImgText>
                                            </>
                                    }
                                    <input multiple={false} onChange={(e) => handleFileChange(e, key)} accept='image/*' type='file' style={{ display: "none" }}></input>
                                </UploadImgArea>
                            );
                        case FormItemTypes.STAR:
                            return (
                                <StarArea>
                                    <Star onChange={(value) => handleStarChange(value, key)} value={value as scoreType}></Star>
                                </StarArea>
                            );
                        default:
                            return (
                                <FormControl>
                                    <Input value={value || ''} placeholder={`请输入${label}`} autoComplete="off" />
                                </FormControl>
                            );
                    }
                };

                return (
                    <FormItemWrapper key={key}>
                        <FormLabelWrapper>
                            {require && <RequiredMark>*</RequiredMark>}
                            {label}
                        </FormLabelWrapper>
                        <FormContentWrapper>
                            {renderContent()}
                        </FormContentWrapper>
                    </FormItemWrapper>
                );
            }, [formData, handleFileChange])

            useEffect(() => {
                onChange && onChange(formData)
            }, [formData, onChange])

            return (
                <FormContainer ref={containerRef}>
                    {data.map(renderFormItem)}
                </FormContainer>
            );
        }
    )
);

export default Form;