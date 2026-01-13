// 定义消息类型
export type MessageType = 'success' | 'error' | 'warning' | 'info' | 'loading';

// 单个消息的配置项
export interface MessageConfig {
  content: React.ReactNode; // 提示内容
  duration?: number; // 自动关闭时长（毫秒），0 表示不自动关闭
  onClose?: () => void; // 关闭回调
  type?: MessageType; // 提示类型
  id?: string; // 唯一标识
}

export interface MessageInstance extends MessageConfig {
  close: () => void; // 手动关闭方法
  isClosing?: boolean; // 是否正在关闭（用于动画）
}