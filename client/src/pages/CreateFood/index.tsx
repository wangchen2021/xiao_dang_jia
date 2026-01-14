import Form, { FormItemTypes, type FormExposedMethods, type FormPropsItem } from '@/components/Form'
import React, { useRef, useState } from 'react'
import { CFContainer } from './styles'
import { Button } from '@/styles/common.styles'
import PrepareStep from './components/PrepareStep'

const formData: FormPropsItem[] = [
    {
        label: "菜谱名称",
        key: "name",
        type: FormItemTypes.INPUT,
        value: null,
        require: true,
    },
    {
        label: "封面",
        key: "coverImg",
        type: FormItemTypes.UPLOAD_IMG,
        value: null,
        require: true,
    },
    {
        label: "难度系数",
        key: "level",
        type: FormItemTypes.STAR,
        value: null,
        require: true,
    },
    {
        label: "其他备注",
        key: "remark",
        type: FormItemTypes.TEXTAREA,
        value: null,
        require: false,
    }
]

const CreateFood: React.FC = () => {
    const [step, setStep] = useState(1)
    const baseData = useRef<Record<string | symbol, any>>(null)
    const formRef = useRef<FormExposedMethods>(null)
    const next = () => {
        if (step === 0) {
            const data = formRef.current?.submit()
            if (data) {
                baseData.current = data
                setStep(prev => prev + 1)
                window.scrollTo(0, 0)
            }
        }
    }
    const stepComponent = (step: number) => {
        switch (step) {
            case 0:
                return <>
                    <h1 className='title'>新建食谱</h1>
                    <Form ref={formRef} data={formData}></Form>
                </>
            case 1:
                return <>
                     <h1 className='title'>准备环节</h1>
                     <PrepareStep></PrepareStep>
                </>
        }
    }
    return (
        <CFContainer>
            {stepComponent(step)}
            <Button onClick={next} className='submit-btn'>下一步</Button>
        </CFContainer>
    )
}
export default CreateFood