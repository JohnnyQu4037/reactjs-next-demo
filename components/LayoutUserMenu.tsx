import React from "react";
import { Dropdown } from "antd";
import { SettingOutlined, TeamOutlined, UserOutlined, PoweroffOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import type { MenuProps } from "antd";

export default function AppLayoutUserMenu() {
  const router = useRouter();
  const items: MenuProps["items"] = [
    {
      label: <a onClick={() => redirect("/account/management")}>Management</a>,
      key: "management",
      icon: <TeamOutlined />,
    },
    {
      label: <a onClick={() => redirect("/account/permission")}>Permission</a>,
      key: "permission",
      icon: <SettingOutlined />,
    },
    {
      type: "divider",
    },
    {
      label: <a onClick={() => redirect("/")}>Logout</a>,
      key: "logout",
      icon: <PoweroffOutlined />,
    },
  ];

  const redirect = (url: string) => {
    if (url === "/") {
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("access_token");
      router.push(url);
    } else {
      router.push(url);
    }
  };

  return (
    <Dropdown menu={{ items }} trigger={["click", "hover"]}>
      <div>
        Hi, someone <UserOutlined style={{ fontSize: "20px" }} />
      </div>
    </Dropdown>
  );
}
