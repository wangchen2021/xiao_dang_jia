// 2. 定义具体的颜色变量（贴合你的做饭软件风格）
export const theme = {
    colors: {
        // 笔记本纸张色系（柔和不刺眼，适配实物照片）
        notebookPaper: '#f8f5e6',
        notebookLine: '#e0d8b0',
        notebookBorder: '#f0e8c8',
        // 功能色（温暖的美食系配色）
        primary: '#68b0ab',
        primaryHover: '#589e99',
        secondary: '#f09d51',
        secondaryHover: '#e88a3c',
        success: "#59cac3",
        successHover:"#6de2da",
        danger:"#f5222d",
        warning:"#faad14",
        info:"#1890ff",
        // 文本色（保证可读性）
        textPrimary: '#333333',
        textSecondary: '#666666',
        // 卡片背景（半透明白，突出食物照片）
        cardBg: 'rgba(255, 255, 255, 0.85)',
        bgText:"#ffb798",
    },
};

export type ThemeType = typeof theme