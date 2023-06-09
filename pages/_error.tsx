import { Result, Button } from "antd";
import { useRouter } from "next/router";
import { useEffect } from "react";

const FourOhFour = () => {
  const router = useRouter();
  useEffect(() => {
    console.log(router.pathname);
  }, []);
  return (
    <>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={() => router.push("/watch-list")}>
            Back Home
          </Button>
        }
      />
    </>
  );
};

export default FourOhFour;
