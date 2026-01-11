import styled from "styled-components";

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