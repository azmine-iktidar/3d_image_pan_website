import { redirect } from "next/navigation";

const page = () => {
  redirect("/1");
  return <div />;
};

export default page;
