import React, { useState } from "react";
import { Layout, Menu, MenuProps } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { useRouter } from "next/router";
import LayoutBreadcrumb from "./LayoutBreadcrumb";
import AppLayoutContent from "./LayoutContent";
import AppLayoutUserMenu from "./LayoutUserMenu";
import { DashboardOutlined, ProjectOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { layout, setCollapseStatus } from "@/store/layoutSlice";

const { Header, Sider } = Layout;

const Logo = styled.div`
  height: 60px;
  display: inline-flex;
  width: 100%;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  font-size: 24px;
  color: rgb(255, 255, 255);
  text-shadow: 5px 1px 5px;
  transform: rotateX(45deg);
  font-family: monospace;
`;

const StyledHeader = styled(Header)`
  top: 0;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  padding: 0 22px;
  z-index: 10;
  background: white;
`;

const AppLayout = ({ children }: any) => {
  const dispatch = useDispatch();
  const layoutState = useSelector(layout);

  const router = useRouter();
  const sideMenuRoutes: MenuProps["items"] = [
    {
      label: <a onClick={() => redirect("/watch-list")}>Watch List</a>,
      key: "watch-list",
      icon: <DashboardOutlined />,
    },
    {
      label: <a onClick={() => redirect("/work-space")}>Work Space</a>,
      key: "work-space",
      icon: <ProjectOutlined />,
    },
  ];
  const redirect = (url: string) => {
    router.push(url);
  };

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        collapsible
        collapsed={layoutState.isCollapsed}
        onCollapse={() => {
          dispatch(setCollapseStatus(!layoutState.isCollapsed));
        }}
      >
        <Logo>Risk Hub</Logo>
        <Menu theme="dark" items={sideMenuRoutes} mode="inline"></Menu>
      </Sider>

      <Layout
        id="contentLayout"
        style={{
          overflow: "auto",
        }}
      >
        <StyledHeader>
          {React.createElement(layoutState.isCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: "trigger",
            onClick: () => {
              dispatch(setCollapseStatus(!layoutState.isCollapsed));
            },
            style: { fontSize: "20px" },
          })}

          <AppLayoutUserMenu />
        </StyledHeader>

        <LayoutBreadcrumb />

        <AppLayoutContent>{children}</AppLayoutContent>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
