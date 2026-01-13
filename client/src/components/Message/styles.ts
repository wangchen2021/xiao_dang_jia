import styled, { keyframes, css } from 'styled-components'; // 新增导入 css 辅助函数
import type { MessageType } from '@/types/message';

export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

export const MessageContainer = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 500px;
  pointer-events: none;
`;

export const MessageItem = styled.div<{ type: MessageType; $isClosing: boolean }>`
  padding: 16px 16px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: 1;
  ${() => css`
    animation: ${fadeIn} 0.3s ease forwards;
  `}
  pointer-events: auto;

  ${({ $isClosing }) => $isClosing && css`
    animation: ${fadeOut} 0.3s ease forwards;
  `}

  ${({ type, theme }) => {
    switch (type) {
      case 'success':
        return `border-left: 4px solid ${theme.colors.success};`;
      case 'error':
        return `border-left: 4px solid ${theme.colors.danger};`;
      case 'warning':
        return `border-left: 4px solid ${theme.colors.warning};`;
      case 'info':
        return `border-left: 4px solid ${theme.colors.info};`;
      case 'loading':
        return `border-left: 4px solid ${theme.colors.info};`;
      default:
        return `${theme.colors.info}`;
    }
  }}
`;

export const LoadingIcon = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid #1890ff;
  border-top-color: transparent;
  border-radius: 50%;
  ${() => css`
    animation: spin 1s linear infinite;
  `}

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

export const Icon = styled.span<{ type: MessageType }>`
  font-size: 16px;

  ${({ type }) => {
    switch (type) {
      case 'success':
        return `color: #52c41a; content: '✓';`;
      case 'error':
        return `color: #f5222d; content: '✕';`;
      case 'warning':
        return `color: #faad14; content: '!';`;
      case 'info':
        return `color: #1890ff; content: 'i';`;
      default:
        return '';
    }
  }}
`;

export const Content = styled.span`
  flex: 1;
  font-size: 14px;
  color: rgba(0, 0, 0, 0.85);
`;