import { Breadcrumb } from "antd";
import { useRouter } from "next/router";
import WorkSpaceButtons from "@/components/WorkSpaceButtons";

type breadcrumbItems = {
  title: string | undefined;
};

const LayoutBreadcrumb: React.FC = () => {
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
        title: item
          .split("-")
          .map((i) => (i = i.slice(0, 1).toUpperCase() + i.slice(1)))
          .join(" "),
      });
    });
    return extra;
  };

  return (
    <div>
      <Breadcrumb items={breadcrumbItems()} style={{ padding: "16px 16px 0px 16px", display: "inline-block" }}></Breadcrumb>
      {router.pathname.includes("work-space") ? (
        <WorkSpaceButtons v-if="route.path === '/work-space'" />
      ) : null}
    </div>
  );
};

export default LayoutBreadcrumb;
