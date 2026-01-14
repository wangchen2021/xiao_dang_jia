// src/pages/CreateFood/PrepareStep/SelectModal/components/CustomSelect.tsx
import { useState, useEffect, useRef, memo } from 'react';

// 组件Props类型定义
interface CustomSelectProps {
  /** 当前选中值 */
  value: string;
  /** 选项列表 */
  options: string[];
  /** 选中变化回调 */
  onChange: (value: string) => void;
  /** 主题色（默认使用你的橙色调） */
  themeColor?: string;
  /** 宽度（默认适配数量输入框） */
  width?: string;
  /** 禁用状态 */
  disabled?: boolean;
}

const Select = memo((props: CustomSelectProps) => {
  const {
    value,
    options,
    onChange,
    themeColor = '#e87425', // 你的主色调
    width = '100px',
    disabled = false
  } = props;

  // 下拉展开状态
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  // 点击外部关闭下拉
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  // 点击选项
  const handleOptionClick = (option: string) => {
    if (disabled) return;
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div
      ref={selectRef}
      style={{
        position: 'relative',
        width,
        zIndex: 10,
        opacity: disabled ? 0.7 : 1,
        pointerEvents: disabled ? 'none' : 'auto'
      }}
    >
      {/* 下拉头部（选中值展示）- 贴合原有样式 */}
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        style={{
          padding: '8px 12px',
          borderRadius: '4px', // 和你原有按钮/输入框一致的圆角
          border: `1px solid ${themeColor}33`, // 主色调浅透
          backgroundColor: 'white',
          cursor: disabled ? 'not-allowed' : 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '14px', // 和你原有文字大小一致
          color: '#333',
          boxSizing: 'border-box'
        }}
      >
        {value || '请选择'}
        <span
          style={{
            color: themeColor,
            transition: 'transform 0.2s ease',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
            fontSize: '12px'
          }}
        >
          ▼
        </span>
      </div>

      {/* 下拉选项列表 */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: '4px',
            borderRadius: '4px',
            backgroundColor: 'white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)', // 轻阴影，贴合移动端风格
            overflow: 'hidden',
            maxHeight: '200px',
            overflowY: 'auto',
            boxSizing: 'border-box'
          }}
        >
          {options.map((option) => (
            <div
              key={option}
              onClick={() => handleOptionClick(option)}
              style={{
                padding: '8px 12px',
                cursor: 'pointer',
                fontSize: '14px',
                color: option === value ? themeColor : '#333',
                backgroundColor: option === value ? `${themeColor}10` : 'white',
                transition: 'background-color 0.2s ease'
              }}
              onMouseEnter={(e) => {
                if (option !== value) {
                  e.currentTarget.style.backgroundColor = `${themeColor}08`;
                }
              }}
              onMouseLeave={(e) => {
                if (option !== value) {
                  e.currentTarget.style.backgroundColor = 'white';
                }
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default Select;