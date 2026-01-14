import { 
  useState, 
  forwardRef, 
  useImperativeHandle, 
  type ForwardedRef, 
  memo,
  type ChangeEvent
} from 'react';
import {
  PrepareContainer,
  StepTitle,
  CategoryCard,
  CategoryTitle,
  FormRow,
  FormLabel,
  SelectTrigger,
} from './styles';
import message from '@/components/Message';
// 引入选择弹窗（更新类型）
import SelectModal, { type SelectedOption, type SelectOption } from '../SelectModal';
// 引入预设数据
import { equipmentOptions, ingredientOptions, seasoningOptions } from '../SelectModal/data';
import { StyledInput, StyledTextarea } from '@/styles/common.styles';

// 扩展表单字段类型
interface PrepareFormField {
  key: string;
  label: string;
  type: 'input' | 'textarea' | 'select'; 
  required: boolean;
  placeholder: string;
  selectConfig?: {
    title: string;
    icon: string;
    color: string;
    options: SelectOption[];
    searchPlaceholder: string;
  };
}

// 分类配置
const categoryConfig = [
  {
    title: '器材准备',
    color: '#e87425',
    icon: '🔪',
    fields: [
      { 
        key: 'equipment', 
        label: '器材名称', 
        type: 'select', 
        required: true, 
        placeholder: '点击选择器材',
        selectConfig: {
          title: '选择器材',
          icon: '🔪',
          color: '#e87425',
          options: equipmentOptions,
          searchPlaceholder: '搜索器材（如：炒锅、电饭煲...）'
        }
      },
      { 
        key: 'equipmentDesc', 
        label: '器材说明', 
        type: 'textarea', 
        required: false, 
        placeholder: '例如：建议使用不粘锅，受热更均匀...' 
      },
    ] as PrepareFormField[],
  },
  {
    title: '食材准备',
    color: '#6fb27c',
    icon: '🥕',
    fields: [
      { 
        key: 'mainIngredient', 
        label: '主要食材', 
        type: 'select', 
        required: true, 
        placeholder: '点击选择食材',
        selectConfig: {
          title: '选择食材',
          icon: '🥕',
          color: '#6fb27c',
          options: ingredientOptions,
          searchPlaceholder: '搜索食材（如：五花肉、土豆...）'
        }
      },
      { 
        key: 'ingredientDesc', 
        label: '食材备注', 
        type: 'textarea', 
        required: false, 
        placeholder: '例如：土豆建议选黄心的，口感更绵密...' 
      },
    ] as PrepareFormField[],
  },
  {
    title: '调味料准备',
    color: '#f9c851',
    icon: '🧂',
    fields: [
      { 
        key: 'mainSeasoning', 
        label: '主要调味料', 
        type: 'select', 
        required: true, 
        placeholder: '点击选择调味料',
        selectConfig: {
          title: '选择调味料',
          icon: '🧂',
          color: '#f9c851',
          options: seasoningOptions,
          searchPlaceholder: '搜索调味料（如：盐、生抽...）'
        }
      },
      { 
        key: 'seasoningDesc', 
        label: '调味料备注', 
        type: 'textarea', 
        required: false, 
        placeholder: '例如：生抽建议用酿造酱油，味道更鲜...' 
      },
    ] as PrepareFormField[],
  },
];

// 暴露给父组件的方法
export interface PrepareFormExposedMethods {
  submit: () => Record<string, any> | null;
  reset: () => void;
}
type PrepareStepRef = PrepareFormExposedMethods;

// 初始化表单数据
const initFormData = () => {
  let data: Record<string, any> = {};
  categoryConfig.forEach(category => {
    category.fields.forEach(field => {
      data[field.key] = '';
      if (field.type === 'select') {
        data[`${field.key}_detail`] = null; // 存储已选的原始数组
      }
    });
  });
  return data;
};

interface PrepareStepProps {
  initialValues?: Record<string, any>;
}

const PrepareStep = memo(
  forwardRef<PrepareStepRef, PrepareStepProps>(
    ({ initialValues = {} }, ref: ForwardedRef<PrepareStepRef>) => {
      const [formData, setFormData] = useState<Record<string, any>>(
        { ...initFormData(), ...initialValues }
      );
      const [modalVisible, setModalVisible] = useState(false);
      const [activeSelectConfig, setActiveSelectConfig] = useState<{
        key: string;
        config: PrepareFormField['selectConfig'];
      } | null>(null);

      // 输入值变更处理
      const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, key: string) => {
        setFormData(prev => ({
          ...prev,
          [key]: e.target.value,
        }));
      };

      // 打开选择弹窗（核心：记录当前操作的key，并传递已选数据）
      const openSelectModal = (key: string, config: PrepareFormField['selectConfig']) => {
        if (!config) return;
        setActiveSelectConfig({ key, config });
        setModalVisible(true);
      };

      // 确认选择回调
      const handleSelectConfirm = (selectedList: SelectedOption[] | null) => {
        if (!activeSelectConfig || !selectedList || selectedList.length === 0) return;
        const { key } = activeSelectConfig;
        
        // 拼接显示文本
        const fullText = selectedList.map(item => `${item.name}（${item.num}${item.unit}）`).join('、');
        
        // 存储：显示文本 + 原始已选数组（关键：用于下次弹窗回显）
        setFormData(prev => ({
          ...prev,
          [key]: fullText,
          [`${key}_detail`]: selectedList, // 保存原始数组
        }));
      };

      // 表单提交校验
      const submit = () => {
        for (const category of categoryConfig) {
          for (const field of category.fields) {
            if (field.required && !formData[field.key]) {
              const errMsg = `「${category.title}」中的「${field.label}」为必填项哦～`;
              message.warning(errMsg, 3000);
              return null;
            }
          }
        }
        console.log('最终提交的完整数据：', formData);
        return { ...formData };
      };

      // 重置表单
      const reset = () => {
        setFormData(initFormData());
      };

      // 暴露方法给父组件
      useImperativeHandle(
        ref,
        () => ({
          submit,
          reset,
        }),
        [formData]
      );

      // 渲染单个表单项
      const renderFormField = (field: PrepareFormField, categoryColor: string) => {
        switch (field.type) {
          case 'select':
            return (
              <SelectTrigger
                $color={categoryColor}
                $value={formData[field.key]}
                onClick={() => openSelectModal(field.key, field.selectConfig)}
              >
                {formData[field.key] || field.placeholder}
              </SelectTrigger>
            );
          case 'input':
            return (
              <StyledInput
                type="text"
                value={formData[field.key] || ''}
                placeholder={field.placeholder}
                onChange={(e) => handleInputChange(e, field.key)}
              />
            );
          case 'textarea':
            return (
              <StyledTextarea
                value={formData[field.key] || ''}
                placeholder={field.placeholder}
                onChange={(e) => handleInputChange(e, field.key)}
              />
            );
          default:
            return null;
        }
      };

      // 渲染单个分类
      const renderCategory = (category: (typeof categoryConfig)[0]) => {
        return (
          <CategoryCard key={category.title} $color={category.color}>
            <CategoryTitle $color={category.color}>
              <span className="icon">{category.icon}</span>
              {category.title}
            </CategoryTitle>
            {category.fields.map(field => (
              <FormRow key={field.key}>
                <FormLabel className={field.required ? 'required' : ''}>
                  {field.label}
                </FormLabel>
                {renderFormField(field, category.color)}
              </FormRow>
            ))}
          </CategoryCard>
        );
      };

      return (
        <>
          <PrepareContainer>
            <StepTitle>🥘 预先准备</StepTitle>
            {categoryConfig.map(renderCategory)}
          </PrepareContainer>

          {/* 选择弹窗（核心：传递已选原始数组 selectedList） */}
          {activeSelectConfig && (
            <SelectModal
              visible={modalVisible}
              title={activeSelectConfig.config?.title || '选择内容'}
              icon={activeSelectConfig.config?.icon || '📌'}
              color={activeSelectConfig.config?.color || '#e87425'}
              options={activeSelectConfig.config?.options || []}
              value={formData[activeSelectConfig.key]}
              selectedList={formData[`${activeSelectConfig.key}_detail`]} // 传递已选原始数组
              onClose={() => setModalVisible(false)}
              onConfirm={handleSelectConfirm}
              placeholder={activeSelectConfig.config?.searchPlaceholder || '搜索...'}
            />
          )}
        </>
      );
    }
  )
);

export default PrepareStep;