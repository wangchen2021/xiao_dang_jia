// styles.ts
import styled from 'styled-components';

// 复用项目主色调，统一视觉风格
const themeColors = {
    primary: '#f98e71', // 项目主色（标签文字）
    primaryLight: 'rgba(249, 142, 113, 0.1)', // 主色浅背景
    border: '#f98e71', // 边框色（呼应主色）
    borderLight: '#f0e0dc', // 浅边框
    star: '#fadb14', // 星级颜色
    text: '#333', // 主文本
    textLight: '#666', // 次要文本
    danger: '#ff4d4f', // 必填标记
    uploadHover: '#f98e71', // 上传区域hover
};

// 表单容器样式（优化间距和背景）
export const FormContainer = styled.div`
  margin-top: 30px;
  height: auto;
  background-color: #fff;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 4px 20px rgba(249, 142, 113, 0.08);
`;

// 单个表单项容器（优化间距、背景、圆角）
export const FormItemWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 30px;
  gap: 16px;
  padding: 16px;
  background-color: ${themeColors.primaryLight};
  border-radius: 12px;
  transition: all 0.2s ease;

  &:last-child {
    margin-bottom: 0;
  }

  &:hover {
    box-shadow: 0 2px 10px rgba(249, 142, 113, 0.12);
  }

  // 响应式适配
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
    margin-bottom: 20px;
  }
`;

// 表单项标签容器（优化字体、间距、对齐）
export const FormLabelWrapper = styled.label`
  flex: 0 0 100px;
  font-size: 16px;
  font-weight: 600;
  color: ${themeColors.primary};
  padding-top: 6px;
  text-align: right;
  line-height: 1.4;

  @media (max-width: 768px) {
    flex: none;
    text-align: left;
    padding-top: 0;
    margin-bottom: 4px;
  }
`;

// 必填项标记（优化位置和大小）
export const RequiredMark = styled.span`
  color: ${themeColors.danger};
  margin-right: 4px;
  font-size: 18px;
  font-weight: bold;
`;

// 表单项内容区域（核心修改：整体居中）
export const FormContentWrapper = styled.div`
  flex: 1;
  min-width: 0; /* 解决flex子元素溢出问题 */
  display: flex;
  justify-content: center; // 水平居中
  align-items: center;     // 垂直居中
  min-height: 60px;       // 保证最小高度，居中更协调

  // 响应式下保持居中
  @media (max-width: 768px) {
    width: 100%;
    min-height: 50px;
  }
`;

// 控件容器（移除多余padding，优化适配 + 居中）
export const FormControl = styled.div`
  width: 80%; // 控制输入框宽度，避免太宽，居中更美观
  font-size: 14px;
  border-radius: 4px;
  box-sizing: border-box;
  transition: all 0.2s ease;
  text-align: center;

  // 给Input/Textarea增加focus效果
  &:focus-within {
    > input, > textarea {
      border-color: ${themeColors.primary};
      box-shadow: 0 0 0 2px rgba(249, 142, 113, 0.1);
    }
  }

  // 响应式下宽度自适应
  @media (max-width: 768px) {
    width: 100%;
  }
`;

// 图片上传区域样式（美化上传框，贴合菜谱风格 + 居中适配）
export const UploadImgArea = styled.label`
  border: 2px dashed ${themeColors.borderLight};
  border-radius: 12px;
  padding: 15px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  background-color: #fff;
  width: 80%; // 和输入框宽度统一
  height: 170px;

  .img{
    position: relative;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &:hover {
    border-color: ${themeColors.uploadHover};
    background-color: ${themeColors.primaryLight};
    transform: translateY(-2px);
  }

  // 上传图标美化
  > span {
    font-size: 40px;
    color: ${themeColors.primary};
    display: block;
    margin-bottom: 12px;
  }

  @media (max-width: 768px) {
    width: 70%;
  }
`;

// 上传区域文本（优化字体和颜色）
export const UploadImgText = styled.p`
  color: ${themeColors.textLight};
  font-size: 15px;
  margin-top: 8px;
  margin-bottom: 0;
  line-height: 1.5;

  &::after {
    content: '（支持jpg/png格式，大小不超过10MB）';
    display: block;
    font-size: 12px;
    margin-top: 4px;
    color: #999;
  }
`;

// 星级评分区域样式（优化间距和交互 + 居中）
export const StarArea = styled.div`
  padding: 8px 0;
  display: flex;
  gap: 8px;
  justify-content: center; // 星级本身也居中
`;
