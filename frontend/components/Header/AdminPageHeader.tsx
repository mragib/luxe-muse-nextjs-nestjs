import React from "react";

export const AdminPageHeader = ({
  children,
  heading,
}: {
  children: React.ReactNode;
  heading: string;
}) => {
  return (
    <div className="flex justify-between items-center my-4">
      <h1 className="text-xl md:text-2xl font-semibold leading-4 pb-2 md:pb-4">
        {heading}
      </h1>
      {children}
    </div>
  );
};
