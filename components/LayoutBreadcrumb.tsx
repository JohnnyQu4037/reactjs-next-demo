import { Breadcrumb } from "antd";
import { useRouter } from "next/router";

type breadcrumbItems = {
  title: string | undefined;
};

export default function LayoutBreadcrumb() {
  const router = useRouter();
  const remainingPath = router.pathname.split("/").slice(1);
  const breadcrumbItems = () => {
    let extra: breadcrumbItems[] = [
      {
        title: "Risk Hub",
      },
    ];
    remainingPath.map((item) => {
      extra.push({
        title: item.slice(0,1).toUpperCase()+item.slice(1)
      });
    });
    return extra;
  };

  return <Breadcrumb items={breadcrumbItems()} style={{padding: "16px 16px 0px 16px" }}></Breadcrumb>;
}
