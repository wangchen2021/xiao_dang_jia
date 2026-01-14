import styled, { keyframes } from "styled-components";

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

// 输入框聚焦动画
const focusPulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(232, 116, 37, 0.4); }
  70% { box-shadow: 0 0 0 8px rgba(232, 116, 37, 0); }
  100% { box-shadow: 0 0 0 0 rgba(232, 116, 37, 0); }
`;

export const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    padding: 25px;
    box-sizing: border-box;
    padding-bottom: 50px;
    overflow: auto;
`

//输入框
export const Input = styled.input`
    height: 35px;
    background-color: transparent;
    border: 1px solid ${props => props.theme.colors.secondary};
    border-radius: 20px;
    padding: 20px;
    box-sizing: border-box;
    font-size: 15px;
`

// 输入框（暖色调风格，带动画）
export const StyledInput = styled.input`
  flex: 1;
  padding: 12px 15px;
  border: 1px solid ${themeColors.border};
  border-radius: 10px;
  background-color: ${themeColors.bgLight};
  color: ${themeColors.textDark};
  font-size: 14px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${themeColors.primary};
    animation: ${focusPulse} 1.5s infinite;
    background-color: #fff;
  }

  &::placeholder {
    color: ${themeColors.textLight};
    font-style: italic;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px 12px;
    font-size: 13px;
  }
`;

// 文本域（和输入框风格统一）
export const StyledTextarea = styled.textarea`
  flex: 1;
  padding: 12px 15px;
  border: 1px solid ${themeColors.border};
  border-radius: 10px;
  background-color: ${themeColors.bgLight};
  color: ${themeColors.textDark};
  font-size: 14px;
  min-height: 80px;
  resize: vertical;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${themeColors.primary};
    animation: ${focusPulse} 1.5s infinite;
    background-color: #fff;
  }

  &::placeholder {
    color: ${themeColors.textLight};
    font-style: italic;
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 10px 12px;
    font-size: 13px;
    min-height: 60px;
  }
`;

// 文本域样式
export const Textarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  font-size: 14px;
  background: transparent;
  resize: vertical;
  line-height: 1.5;
  border-radius: 12px;
  border: 1px solid ${props => props.theme.colors.secondary};
  padding: 20px;
  font-size: 15px;
  height: auto;
  box-sizing: border-box;
`;

export const Button = styled.button`
    background-color: ${props => props.theme.colors.success};
    border: none;
    color: white;
    padding: 10px 15px;
    border-radius: 24px;
    box-shadow: 1px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);

    &:active {
        background-color: ${props => props.theme.colors.successHover}; /* 更深的主色 */
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1); /* 减小阴影，模拟按下 */
        transform: translateY(1px); /* 轻微下移，模拟按下反馈 */
        outline: none; /* 移除点击后的默认轮廓 */
    }
`