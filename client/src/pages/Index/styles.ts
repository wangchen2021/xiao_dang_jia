// src/styles/NotebookStyles.ts
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// 笔记本背景容器（核心样式）
export const NotebookContainer = styled.div`
  /* 基础布局：全屏/适配父容器 */
  width: 100%;
  min-height: 100vh;
  padding: 2rem;
  box-sizing: border-box;
  
  /* 笔记本纸张核心纹理 */
  background-color: #f8f5e6; /* 米黄色纸张底色，贴近真实笔记本，不刺眼 */
  background-image: 
    /* 轻微的纸张纹理噪点 */
    radial-gradient(#d9d4b8 0.5px, transparent 0.5px),
    /* 笔记本横线（间距适中，颜色浅不抢镜） */
    linear-gradient(to bottom, transparent 1.5rem, #e0d8b0 1.5rem, #e0d8b0 1.6rem, transparent 1.6rem);
  background-size: 
    20px 20px, /* 纹理密度 */
    100% 2rem; /* 横线间距（2rem一行） */
  
  /* 轻微的阴影+圆角，增加质感但不夸张 */
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  
  /* 内容排版：适配食物列表 */
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

// 食物列表项组件（适配实物照片展示）
export const FoodItemCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.85); /* 半透明白底，突出照片 */
  border-radius: 12px; /* 圆润但不夸张的圆角，大众审美 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px); /* 轻微悬浮效果，增加互动感 */
  }

  /* 食物封面图容器 */
  .food-cover {
    width: 80px;
    height: 80px;
    border-radius: 8px;
    overflow: hidden;
    flex-shrink: 0;
    border: 2px solid #f0e8c8; /* 浅边框呼应笔记本风格 */
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover; /* 保证实物照片不变形 */
    }
  }

  /* 食物信息区域 */
  .food-info {
    flex: 1;
    
    h3 {
      margin: 0 0 0.4rem 0;
      font-size: 1.1rem;
      color: #333;
      font-weight: 600;
    }
    
    p {
      margin: 0;
      font-size: 0.9rem;
      color: #666;
    }
  }

  /* 上传/编辑按钮 */
  .action-btn {
    padding: 0.4rem 0.8rem;
    border: none;
    border-radius: 24px;
    background-color: #f09d51;
    color: white;
    font-size: 0.8rem;
    cursor: pointer;
    transition: background-color 0.2s ease;

    &:hover {
      background-color: #e88a3c;
    }
  }
`;

// 上传封面的按钮样式（可选）
export const UploadCoverBtn = styled(Link)`
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 24px;
  background-color: ${(props) => props.theme.colors.success};
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
  align-self: flex-start;
  transition: background-color 0.2s ease;
  text-decoration: none;

  &:hover {
    background-color: ${(props) => props.theme.colors.successHover};
  }
`;