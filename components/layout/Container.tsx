import React from "react";

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="mx-auto max-w-[1280px] px-4 sm:px-10 md:px-18 lg:px-42">{children}</div>;
};

export default Container;
