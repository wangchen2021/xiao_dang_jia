// Form.tsx
import React, { useCallback, useEffect, useState, type ChangeEvent } from 'react';
// 导入Styled Components样式
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
    StarItem
} from './styles';
import { Input, Textarea } from '@/styles/common.styles';

// 保持你原有的类型定义
export const FormItemTypes = {
    INPUT: "input",
    UPLOAD_IMG: "upload img",
    STAR: "star",
    TEXTAREA: "textarea"
} as const;

// 推导FormItemTypes的值类型
export type FormItemType = typeof FormItemTypes[keyof typeof FormItemTypes];

// 表单项属性接口
export interface FormPropsItem {
    label: string;
    key: string;
    value: any;
    type?: FormItemType;
    require?: boolean;
}

// 表单组件属性接口
interface FormProps {
    data: FormPropsItem[];
    onChange?: (data: Record<string | symbol, any>) => void
}

const generateInitFormData = (data: FormPropsItem[]) => {
    let res: Record<string, any> = {}
    for (let item of data) {
        res[item.key] = item.value
    }
    return res
}

// 表单组件核心
const Form: React.FC<FormProps> = ({ data, onChange }) => {
    const [formData, setFormData] = useState(generateInitFormData(data))
    const changeValue = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>, key: string) => {
        const newFormData = {
            ...formData, // 解构原有数据
            [key]: e.target.value // 覆盖要修改的属性（方括号实现动态key）
        };
        setFormData(newFormData)
    }
    // 渲染单个表单项的辅助函数
    const renderFormItem = useCallback((item: FormPropsItem) => {
        const { label, key, type = FormItemTypes.INPUT, require = false } = item;
        const value = formData[key]

        // 渲染表单项内容（仅样式，无业务逻辑）
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
                            <span>📸</span>
                            <UploadImgText>点击上传{label}</UploadImgText>
                        </UploadImgArea>
                    );
                case FormItemTypes.STAR:
                    return (
                        <StarArea>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <StarItem key={index}>{index < (value || 0) ? '★' : '☆'}</StarItem>
                            ))}
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
    }, [formData])

    useEffect(() => {
        onChange && onChange(formData)
    }, [formData])

    return (
        <FormContainer>
            {data.map(renderFormItem)}
        </FormContainer>
    );
};

export default Form;