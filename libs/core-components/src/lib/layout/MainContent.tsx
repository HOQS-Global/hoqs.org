import { Outlet } from "@tanstack/react-router";
import BackgroundEffect from "./BackgroundEffect";
import PageContainer from "./PageContainer";

export const MainContent = ({children}:{children?: React.ReactNode}) => 
  <div className="min-w-screen flex relative items-center flex-col pt-5">
    <PageContainer>
      {children}
      <BackgroundEffect/>
    </PageContainer>
  </div>