import { Breadcrumb } from "antd";
import { useRouter } from "next/router";
import Link from "next/link";
import { routes } from "../constant/routes";
import { Fragment } from "react";

export default function LayoutBreadcrumb() {
  const router = useRouter();
  const path = router.pathname;
  const paths = path.split("/").slice(1);
  const root = "/" + paths.slice(0, 2).join("/");
  const remainingPath = paths.slice(2);
  console.log(path, paths, root, remainingPath);

  const data = routes;

  const generateBreadCrumbList = (pathList) => {
    let possiblePaths = data;
    pathList.map((item, index) => {
      const currentBC = possiblePaths.filter((i) => i.path === pathList[index])[0];
      if (currentBC?.subNav) {
        pathList[index] = {
          main: currentBC.label,
          sub: currentBC.subNav.filter((i) => i.path === "")[0].label,
          link: currentBC.path,
        };
        possiblePaths = currentBC.subNav;
      } else {
        if (item === "[id]") {
          pathList[index] = "Detail";
        } else {
          if (index !== 0) {
            pathList[index - 1] = pathList[index - 1].main;
          }
          pathList[index] = currentBC.label;
        }
      }
    });
    return pathList;
  };

  const extraBreadcrumbItems = () => {
    if (remainingPath.length === 0) {
      return <Breadcrumb.Item key="root">Overview</Breadcrumb.Item>;
    } else {
      const translatedBCList = generateBreadCrumbList(remainingPath);
      return translatedBCList.map((item, index) => {
        if (typeof item === "object" && index === translatedBCList.length - 1) {
          return (
            <Fragment key={item.main}>
              <Breadcrumb.Item>{item.main}</Breadcrumb.Item>
              <Breadcrumb.Item>{item.sub}</Breadcrumb.Item>
            </Fragment>
          );
        } else {
          if (typeof item === "object") {
            return (
              <Fragment key={item.main}>
                <Breadcrumb.Item>{item.main}</Breadcrumb.Item>
                <Breadcrumb.Item>
                  <Link href={root + "/" + item.link}>{item.sub}</Link>
                </Breadcrumb.Item>
              </Fragment>
            );
          } else {
            return <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>;
          }
        }
      });
    }
  };

  const breadcrumbItems = [
    <Breadcrumb.Item key="CMS System">
      <Link href={root}>{`CMS SYSTEM`}</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems());

  return (
    // <Breadcrumb key={root}  items={breadcrumbItems} style={{ margin: "0 16px", padding: 16 }}>

    // </Breadcrumb>
    null
  );
}

// import React from 'react';
// import { Alert, Breadcrumb } from 'antd';
// import { HashRouter, Link, Route, Routes, useLocation } from 'react-router-dom';

// const Apps = () => (
//   <ul className="app-list">
//     <li>
//       <Link to="/apps/1">Application1</Link>：<Link to="/apps/1/detail">Detail</Link>
//     </li>
//     <li>
//       <Link to="/apps/2">Application2</Link>：<Link to="/apps/2/detail">Detail</Link>
//     </li>
//   </ul>
// );

// const breadcrumbNameMap: Record<string, string> = {
//   '/apps': 'Application List',
//   '/apps/1': 'Application1',
//   '/apps/2': 'Application2',
//   '/apps/1/detail': 'Detail',
//   '/apps/2/detail': 'Detail',
// };

// const Home = () => {
//   const location = useLocation();
//   const pathSnippets = location.pathname.split('/').filter((i) => i);

//   const extraBreadcrumbItems = pathSnippets.map((_, index) => {
//     const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
//     return {
//       key: url,
//       title: <Link to={url}>{breadcrumbNameMap[url]}</Link>,
//     };
//   });

//   const breadcrumbItems = [
//     {
//       title: <Link to="/">Home</Link>,
//       key: 'home',
//     },
//   ].concat(extraBreadcrumbItems);

//   return (
//     <div className="demo">
//       <div className="demo-nav">
//         <Link to="/">Home</Link>
//         <Link to="/">Application List</Link>
//       </div>
//       <Routes>
//         <Route path="/" element={<Apps />} />
//         <Route path="*" element={<span>Home Page</span>} />
//       </Routes>
//       <Alert style={{ margin: '16px 0' }} message="Click the navigation above to switch:" />
//       <Breadcrumb items={breadcrumbItems} />
//     </div>
//   );
// };

// const App: React.FC = () => (
//   <HashRouter>
//     <Home />
//   </HashRouter>
// );

// export default App;
