// src/styles/styled.d.ts
import 'styled-components';
import { ThemeType } from './theme';

// 扩展styled-components的默认主题类型
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeType {}
}