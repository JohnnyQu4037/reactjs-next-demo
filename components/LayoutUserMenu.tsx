import React, { useEffect, useState } from "react";
import { Dropdown } from "antd";
import { SettingOutlined, TeamOutlined, UserOutlined, PoweroffOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import type { MenuProps } from "antd";
import storage from "store";

const AppLayoutUserMenu = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
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
      storage.clearAll();
      router.push(url);
    } else {
      router.push(url);
    }
  };
  useEffect(() => {
    setUsername(storage.get("username"));
  }, []);

  return (
    <Dropdown menu={{ items }} trigger={["click", "hover"]}>
      <div>
        Hi, {username} <UserOutlined style={{ fontSize: "20px" }} />
      </div>
    </Dropdown>
  );
};

export default AppLayoutUserMenu;
