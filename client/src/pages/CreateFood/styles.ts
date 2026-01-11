import { Container } from "@/styles/common.styles";
import styled from "styled-components";

export const CFContainer = styled(Container)`
    .title{
        color: ${props => props.theme.colors.bgText};
        margin-top: 20px;
        margin-bottom: 30px;
    }
    .submit-btn{
        display: block;
        margin: 0 auto;
        margin-top: 30px;
        width: 150px;
        height: 45px;
    }
`