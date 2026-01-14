// src/pages/CreateFood/PrepareStep/SelectModal/styles.ts
import styled, { keyframes } from 'styled-components';

// 复用做饭主题色
const themeColors = {
  primary: '#e87425', // 暖橙
  secondary: '#6fb27c', // 清新绿
  accent: '#f9c851', // 暖黄
  bgLight: '#fff9f5',
  bgWhite: '#ffffff',
  textDark: '#3a2e23',
  textLight: '#7a6b5d',
  border: '#f0d4b9',
  overlay: 'rgba(58, 46, 35, 0.7)', // 遮罩层
};

// 淡入动画
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

// 滑入动画
const slideUp = keyframes`
  from { transform: translateY(50px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

// 卡片hover动画
const scaleUp = keyframes`
  from { transform: scale(0.95); }
  to { transform: scale(1); }
`;

// 遮罩层
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${themeColors.overlay};
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${fadeIn} 0.3s ease;
  padding: 20px;
`;

// 全屏选择容器
export const SelectContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 90vh;
  background-color: ${themeColors.bgWhite};
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(232, 116, 37, 0.2);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  animation: ${slideUp} 0.3s ease;

  @media (max-width: 768px) {
    height: 95vh;
    border-radius: 15px;
  }
`;

// 头部（标题+搜索框）
export const SelectHeader = styled.div`
  padding: 25px 30px;
  background-color: ${themeColors.bgLight};
  border-bottom: 1px solid ${themeColors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    padding: 20px 15px;
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
`;

// 标题
export const SelectTitle = styled.h2<{ $color?: string }>`
  color: ${props => props.$color || themeColors.primary};
  font-size: 22px;
  font-weight: 700;
  margin: 0;
  display: flex;
  align-items: center;

  > span.icon {
    font-size: 26px;
    margin-right: 10px;
  }

  @media (max-width: 768px) {
    font-size: 18px;

    > span.icon {
      font-size: 22px;
    }
  }
`;

// 搜索框容器
export const SearchWrapper = styled.div`
  flex: 0 0 400px;
  position: relative;

  @media (max-width: 768px) {
    flex: none;
    width: 100%;
  }
`;

// 搜索框
export const SearchInput = styled.input`
  width: 100%;
  padding: 12px 15px 12px 40px;
  border: 1px solid ${themeColors.border};
  border-radius: 10px;
  background-color: ${themeColors.bgWhite};
  color: ${themeColors.textDark};
  font-size: 14px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${themeColors.primary};
    box-shadow: 0 0 0 2px rgba(232, 116, 37, 0.1);
  }

  &::placeholder {
    color: ${themeColors.textLight};
    font-style: italic;
  }

  @media (max-width: 768px) {
    padding: 10px 12px 10px 35px;
    font-size: 13px;
  }
`;

// 搜索图标
export const SearchIcon = styled.span`
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: ${themeColors.textLight};
  font-size: 18px;

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

// 内容区域（卡片列表）
export const SelectContent = styled.div`
  flex: 1;
  padding: 30px;
  overflow-y: auto;
  background-color: ${themeColors.bgWhite};

  // 滚动条美化
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: ${themeColors.bgLight};
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${themeColors.border};
    border-radius: 4px;
    &:hover {
      background: ${themeColors.primary};
    }
  }

  @media (max-width: 768px) {
    padding: 20px 15px;
  }
`;

// 已选中列表容器
export const SelectedListWrapper = styled.div`
  background-color: ${themeColors.bgLight};
  border-radius: 12px;
  padding: 15px;
  margin-bottom: 20px;
  border: 1px solid ${themeColors.border};
`;

// 已选中项
export const SelectedItem = styled.div<{ $color?: string }>`
  padding: 8px 12px;
  background-color: ${themeColors.bgWhite};
  border: 1px solid ${props => props.$color || themeColors.border};
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${props => props.$color || themeColors.primary};
    background-color: rgba(232, 116, 37, 0.05);
  }
`;

// 移除选中项按钮
export const RemoveSelectedBtn = styled.button`
  background: transparent;
  border: none;
  color: ${themeColors.textLight};
  font-size: 14px;
  cursor: pointer;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;

  &:hover {
    background-color: #f5f5f5;
    color: ${themeColors.primary};
  }
`;

// 卡片网格布局
export const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
  margin-top: 30px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
    margin-bottom: 20px;
  }
`;

// 选项卡片
export const OptionCard = styled.div<{ $color?: string }>`
  background-color: ${themeColors.bgLight};
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(232, 116, 37, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
  display: flex;
  flex-direction: column;
  align-items: center;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(232, 116, 37, 0.15);
    animation: ${scaleUp} 0.3s ease;
    border-color: ${props => props.$color || themeColors.primary};
  }

  &.active {
    border-color: ${props => props.$color || themeColors.primary};
    background-color: rgba(232, 116, 37, 0.05);
  }

  @media (max-width: 768px) {
    border-radius: 12px;
  }
`;

// 卡片图片
export const CardImage = styled.img`
  width: 70%;
  height: 120px;
  object-fit: contain;
  background-color: white;
  margin-top: 20px;
  border-radius: 12px;

  @media (max-width: 768px) {
    height: 100px;
  }
`;

// 卡片名称
export const CardName = styled.div`
  padding: 15px;
  text-align: center;
  color: ${themeColors.textDark};
  font-size: 15px;
  font-weight: 500;

  @media (max-width: 768px) {
    padding: 12px;
    font-size: 14px;
  }
`;

// 用量配置区域
export const AmountConfigWrapper = styled.div`
  background-color: ${themeColors.bgLight};
  border-radius: 12px;
  padding: 20px;
  margin-top: 20px;
  border: 1px solid ${themeColors.border};
`;

// 用量标签
export const AmountLabel = styled.div`
  color: ${themeColors.textDark};
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 15px;
`;

// 用量输入框
export const AmountInput = styled.input`
  flex: 1;
  padding: 10px 15px;
  border: 1px solid ${themeColors.border};
  border-radius: 8px;
  background-color: ${themeColors.bgWhite};
  color: ${themeColors.textDark};
  font-size: 14px;
  min-width: 100px;

  &:focus {
    outline: none;
    border-color: ${themeColors.primary};
  }
`;

// 单位选择框
export const UnitSelect = styled.select`
  padding: 10px 15px;
  border: 1px solid ${themeColors.border};
  border-radius: 8px;
  background-color: ${themeColors.bgWhite};
  color: ${themeColors.textDark};
  font-size: 14px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: ${themeColors.primary};
  }
`;

// 底部操作栏
export const SelectFooter = styled.div`
  padding: 20px 30px;
  background-color: ${themeColors.bgLight};
  border-top: 1px solid ${themeColors.border};
  display: flex;
  justify-content: flex-end;
  gap: 15px;

  @media (max-width: 768px) {
    padding: 15px;
    justify-content: space-between;
  }
`;

// 按钮样式
export const ActionButton = styled.button<{ $color?: string }>`
  padding: 12px 25px;
  border-radius: 10px;
  border: none;
  font-size: 15px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;

  &.cancel {
    background-color: ${themeColors.bgWhite};
    color: ${themeColors.textLight};
    border: 1px solid ${themeColors.border};

    &:hover {
      background-color: ${themeColors.bgLight};
      color: ${themeColors.textDark};
    }
  }

  &.confirm {
    background-color: ${props => props.$color || themeColors.primary};
    color: white;

    &:hover {
      background-color: ${props => {
        const colorMap = {
          '#e87425': '#d4681f', // 橙
          '#6fb27c': '#61a06e', // 绿
          '#f9c851': '#e9b841', // 黄
        };
        return colorMap[props.$color as keyof typeof colorMap] || '#d4681f';
      }};
      transform: translateY(-2px);
    }
  }

  @media (max-width: 768px) {
    padding: 10px 20px;
    font-size: 14px;
  }
`;