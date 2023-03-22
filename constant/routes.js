import {
  DashboardOutlined,
  // DeploymentUnitOutlined,
  // EditOutlined,
  // FileAddOutlined,
  // MessageOutlined,
  // ProjectOutlined,
  // ReadOutlined,
  // SolutionOutlined,
  // TeamOutlined,
} from "@ant-design/icons";
import React from "react";

const overview = {
  path: "overview",
  label: "Overview",
  icon: <DashboardOutlined />,
};

const test = {
  path: "test",
  label: "Test",
  icon: <DashboardOutlined />,
};


export const routes = [overview,test]
