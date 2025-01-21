import Header from "../../components/Header"
import VideoProvider from "../../context/VideoContext"
import Footer from "../../components/Footer"
import { Outlet } from "react-router-dom"
import { styled } from "styled-components";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Container = styled.div`
  flex: 1;
`;

function BasePage(){
    return(
        <PageContainer>
            <Header />
            <VideoProvider>
                <Container>
                    <Outlet/>
                </Container>
            </VideoProvider>
            <Footer />
        </PageContainer>
    )
}

export default BasePage;