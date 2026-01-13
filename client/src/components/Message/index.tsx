import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    MessageContainer,
    MessageItem,
    LoadingIcon,
    Icon,
    Content
} from './styles';
import type { MessageType, MessageConfig, MessageInstance } from '@/types/message';
import { ThemeProvider } from 'styled-components';
import { theme } from '@/styles/theme';

const generateId = () => `message_${Date.now()}_${Math.random().toString(36).slice(2)}`;

class MessageManager {
    private instances: MessageInstance[] = [];
    private portalRoot: HTMLElement | null = null;
    private root: ReactDOM.Root | null = null;

    constructor() {
        this.createContainer();
    }

    private createContainer() {
        this.portalRoot = document.createElement('div');
        this.portalRoot.id = 'message-portal-root';
        document.body.appendChild(this.portalRoot);

        if (this.portalRoot) {
            this.root = ReactDOM.createRoot(this.portalRoot);
        }
    }

    // 添加消息
    public add(config: MessageConfig): MessageInstance {
        const id = config.id || generateId();
        const defaultConfig: MessageConfig = {
            content: '',
            duration: 3000,
            type: 'info',
            id,
        };
        const mergedConfig = { ...defaultConfig, ...config };

        // 定义关闭方法
        const close = () => {
            this.remove(id);
        };

        const instance: MessageInstance = {
            ...mergedConfig,
            close,
        };

        // 添加到队列
        this.instances = [...this.instances, instance];
        // 渲染组件
        this.render();
        // 自动关闭
        if (mergedConfig.duration && mergedConfig.duration > 0) {
            setTimeout(() => {
                close();
            }, mergedConfig.duration);
        }

        return instance;
    }

    // 移除消息
    private remove(id: string) {
        const instance = this.instances.find(item => item.id === id);
        if (!instance) return;

        const closingInstance = { ...instance, isClosing: true };
        this.instances = this.instances.map(item => item.id === id ? closingInstance : item);
        this.render();

        setTimeout(() => {
            this.instances = this.instances.filter(item => item.id !== id);
            this.render();
            instance.onClose?.();
        }, 300);
    }

    private render() {
        if (!this.root) return;

        this.root.render(
            <ThemeProvider theme={theme}>
                <MessageContainer>
                    {this.instances.map((instance) => (
                        <MessageItem
                            key={instance.id}
                            type={instance.type || 'info'}
                            $isClosing={!!instance.isClosing}
                        >
                            {instance.type === 'loading' ? (
                                <LoadingIcon />
                            ) : (
                                <Icon type={instance.type || 'info'} />
                            )}
                            <Content>{instance.content}</Content>
                        </MessageItem>
                    ))}
                </MessageContainer>
            </ThemeProvider>
        );
    }

    // 清空所有消息
    public clear() {
        this.instances.forEach(instance => instance.close());
    }

    // 快捷方法
    public success(content: React.ReactNode, duration?: number) {
        return this.add({ type: 'success', content, duration });
    }

    public error(content: React.ReactNode, duration?: number) {
        return this.add({ type: 'error', content, duration });
    }

    public warning(content: React.ReactNode, duration?: number) {
        return this.add({ type: 'warning', content, duration });
    }

    public info(content: React.ReactNode, duration?: number) {
        return this.add({ type: 'info', content, duration });
    }

    public loading(content: React.ReactNode, duration?: number) {
        return this.add({ type: 'loading', content, duration: duration || 0 });
    }
}


const messageManager = new MessageManager();

export const message = {
    success: messageManager.success.bind(messageManager),
    error: messageManager.error.bind(messageManager),
    warning: messageManager.warning.bind(messageManager),
    info: messageManager.info.bind(messageManager),
    loading: messageManager.loading.bind(messageManager),
    clear: messageManager.clear.bind(messageManager),
    add: messageManager.add.bind(messageManager),
};

export default message;
export type { MessageType, MessageConfig };