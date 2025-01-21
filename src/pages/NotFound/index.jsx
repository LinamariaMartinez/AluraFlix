import { styled } from "styled-components";
import { Container } from "../BasePage"

const Text_error = styled.p`
    width: 100%;
    margin: 0 auto;
    height: 2em;
    font-size: 2em;
`;

const Error = styled.h2`
    margin: 0 auto;
    font-size: 12em;
    color: red;
`

function NotFound(){
    return(
        <Container>
            <Text_error>Error 404</Text_error>
            <Error>Página no encontrada</Error>
        </Container>

    )
}

export default NotFound