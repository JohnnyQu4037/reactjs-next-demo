import { Breadcrumb } from "antd";
import { useRouter } from "next/router";
import { routes } from "../constant/routes";

type breadcrumbItems = {
  title: string | undefined;
};

export default function LayoutBreadcrumb() {
  const router = useRouter();
  const remainingPath = router.pathname.split("/").slice(2);

  const breadcrumbItems = () => {
    let extra: breadcrumbItems[] = [
      {
        title: "Risk Hub",
      },
    ];
    remainingPath.map((item) => {
      extra.push({
        title: routes.find((data) => data.path === item)?.label,
      });
    });
    return extra;
  };

  return <Breadcrumb items={breadcrumbItems()} style={{padding: "16px 16px 0px 16px" }}></Breadcrumb>;
}
