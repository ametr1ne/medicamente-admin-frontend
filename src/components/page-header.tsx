import { ReactNode } from "react";

const PageHeader = ({ children }: { children: ReactNode }) => {
  return <div className='flex justify-between mb-10'>{children}</div>;
};

export default PageHeader;
