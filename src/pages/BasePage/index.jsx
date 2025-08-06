import React from "react";
import { Outlet } from "react-router-dom";
import { styled } from "styled-components";
import Header from "../../components/Header";
import VideoProvider from "../../context/VideoContext";
import Footer from "../../components/Footer";

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #191919;
`;

const MainContainer = styled.main`
  flex: 1;
  width: 100%;
`;

function BasePage() {
  return (
    <PageContainer>
      <Header />
      <VideoProvider>
        <MainContainer>
          <Outlet />
        </MainContainer>
      </VideoProvider>
      <Footer />
    </PageContainer>
  );
}

export default BasePage;
