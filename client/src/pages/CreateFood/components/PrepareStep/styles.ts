// src/pages/CreateFood/PrepareStep/styles.ts
import styled, { keyframes } from 'styled-components';

// 做饭主题色（暖色调为主，贴合美食场景）
const themeColors = {
  primary: '#e87425', // 暖橙（主色，呼应食材/烹饪）
  secondary: '#6fb27c', // 清新绿（食材/健康）
  accent: '#f9c851', // 暖黄（调味/温馨）
  bgLight: '#fff9f5', // 浅暖背景
  bgWhite: '#ffffff',
  textDark: '#3a2e23', // 深棕（主文本，贴合木质/食材）
  textLight: '#7a6b5d', // 浅棕（次要文本）
  border: '#f0d4b9', // 浅木色边框
};

// 食材/器材图标晃动动画
const shake = keyframes`
  0% { transform: rotate(0deg); }
  25% { transform: rotate(3deg); }
  50% { transform: rotate(0deg); }
  75% { transform: rotate(-3deg); }
  100% { transform: rotate(0deg); }
`;

// 容器（暖色调背景，圆角卡片，轻微阴影）
export const PrepareContainer = styled.div`
  margin-top: 30px;
  background-color: ${themeColors.bgLight};
  border-radius: 20px;
  padding: 40px 30px;
  box-shadow: 0 8px 24px rgba(232, 116, 37, 0.08);
  border: 1px solid ${themeColors.border};

  @media (max-width: 768px) {
    padding: 25px 20px;
  }
`;

// 步骤标题（做饭主题装饰）
export const StepTitle = styled.h1`
  color: ${themeColors.primary};
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin: 0 0 40px 0;
  position: relative;

  &::before, &::after {
    content: '';
    display: inline-block;
    width: 60px;
    height: 2px;
    background: linear-gradient(90deg, transparent, ${themeColors.primary}, transparent);
    margin: 0 15px;
    vertical-align: middle;
  }

  @media (max-width: 768px) {
    font-size: 20px;
    margin-bottom: 30px;

    &::before, &::after {
      width: 40px;
    }
  }
`;

// 分类卡片（食材/器材/调味料卡片）
export const CategoryCard = styled.div<{ $color?: string }>`
  background-color: ${themeColors.bgWhite};
  border-radius: 16px;
  padding: 25px;
  margin-bottom: 25px;
  box-shadow: 0 4px 12px rgba(232, 116, 37, 0.06);
  border-left: 4px solid ${props => props.$color || themeColors.primary};
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(232, 116, 37, 0.12);
  }

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    padding: 20px 15px;
    margin-bottom: 20px;
  }
`;

// 分类标题（带图标）
export const CategoryTitle = styled.h3<{ $color?: string }>`
  display: flex;
  align-items: center;
  color: ${props => props.$color || themeColors.primary};
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 20px 0;

  > span.icon {
    font-size: 24px;
    margin-right: 12px;
    animation: ${shake} 3s infinite ease-in-out;
    display: inline-block;
  }

  @media (max-width: 768px) {
    font-size: 16px;

    > span.icon {
      font-size: 20px;
      margin-right: 10px;
    }
  }
`;

// 表单行（灵活布局，贴合做饭场景）
export const FormRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 18px;
  gap: 15px;

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
    margin-bottom: 15px;
  }
`;

// 标签（手写感字体风格）
export const FormLabel = styled.label`
  flex: 0 0 100px;
  color: ${themeColors.textDark};
  font-size: 15px;
  font-weight: 500;
  position: relative;

  &.required::after {
    content: '*';
    color: ${themeColors.primary};
    position: absolute;
    right: -8px;
    top: 0;
  }

  @media (max-width: 768px) {
    flex: none;
    width: 100%;
    font-size: 14px;
  }
`;

// 自定义选择触发按钮样式
export const SelectTrigger = styled.div<{ $color?: string; $value?: string }>`
  flex: 1;
  padding: 12px 15px;
  border: 1px solid ${themeColors.border};
  border-radius: 10px;
  background-color: ${themeColors.bgLight};
  color: ${props => props.$value ? themeColors.textDark : themeColors.textLight};
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props => props.$color || themeColors.primary};
    background-color: #fff;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px 12px;
    font-size: 13px;
  }
`;