import React, { useCallback, useState } from "react";
import { Layout, Menu, Avatar, Dropdown } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
import { logout } from "../pages/api/api-service";
import LayoutBreadcrumb from "./LayoutBreadcrumb";
import { routes } from "../constant/routes";

const { Header, Sider } = Layout;
const { SubMenu } = Menu;

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

const StyledContent = styled.div`
  margin: 16px;
  background-color: rgb(255, 255, 255);
  padding: 16px;
  min-height: auto;
  flex:auto
`;

const AvatarContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
`;

const StyledHeader = styled(Header)`
  top: 0;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  padding: 0 10px;
  z-index: 10;
`;

const findKeys = (remainingPath) => {
  let data = routes;
  let open = [];
  let select = "";
  if (remainingPath.length === 0) {
    const result = data.filter((item) => item?.path === "");
    select = result[0]?.label;
  } else {
    remainingPath.map((item) => {
      const currentData = data.filter((i) => i.path === item)[0];
      if (currentData?.subNav) {
        open.push(currentData.label);
        select = currentData.subNav.filter((i) => i.path === "")[0]?.label;
        data = currentData?.subNav;
      } else {
        if (currentData?.label !== undefined) {
          select = currentData?.label;
        }
      }
    });
  }
  return { openKeys: open, selectKeys: select };
};

export default function AppLayout({ children }) {
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  const { openKeys, selectKeys } = findKeys(
    router.pathname.split("/").slice(2)
  );

  const renderMenuItems = useCallback((data, parent) => {
    return data.map((item) => {
      if (item.subNav) {
        return (
          <SubMenu key={item.label} title={item.label} icon={item.icon}>
            {renderMenuItems(item.subNav, item.path)}
          </SubMenu>
        );
      } else {
        return (
          <Menu.Item key={item.label} title={item.label} icon={item.icon}>
            <Link
              href={["/dashboard", parent, item.path]
                .filter((item) => !!item)
                .join("/")}
            >
              {item.label}
            </Link>
          </Menu.Item>
        );
      }
    });
  }, []);

  const menuItems = renderMenuItems(routes);

  const logoutPopup = (
    <Menu>
      <Menu.Item key="logout_0" onClick={logOut}>
        <a>Logout</a>
      </Menu.Item>
    </Menu>
  );

  function logOut() {
    logout()
      .then(() => {
        router.push("/");
      })
      .catch(() => router.push("/"));
  }

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={() => {
          setCollapsed(!collapsed);
        }}
      >
        <Logo>Risk Hub</Logo>
        <Menu
          theme="dark"
          defaultOpenKeys={openKeys}
          defaultSelectedKeys={[selectKeys]}
          mode="inline"
        >
          {menuItems}
        </Menu>
      </Sider>

      <Layout
        id="contentLayout"
        style={{
          overflow: "auto",
        }}
      >
        <StyledHeader className="site-layout-background">
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => {
                setCollapsed(!collapsed);
              },
              style: { color: "white" },
            }
          )}
          <AvatarContainer>
            <Dropdown menu={logoutPopup}>
              <Avatar icon={<UserOutlined />} />
            </Dropdown>
          </AvatarContainer>
        </StyledHeader>

        <LayoutBreadcrumb />

        <StyledContent>{children}</StyledContent>
      </Layout>
    </Layout>
  );
}

