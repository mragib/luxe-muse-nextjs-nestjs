import React, { ReactNode } from "react";

interface FormRowProps {
  label?: string;
  error?: string[];
  children: ReactNode;
  orientation?: "horizontal" | "vertical";
  htmlFor?: string; // Optional explicit id for cases where children might not have id/name
}

const FormRow: React.FC<FormRowProps> = ({
  label,
  error,
  children,
  orientation = "horizontal",
  htmlFor,
}) => {
  const baseClasses = "grid items-center py-3";
  const horizontalClasses =
    "md:grid-cols-[5fr_auto_1.2fr] md:grid-flow-row grid-cols-[1fr] grid-flow-col gap-6 border-b border-gray-100";
  const verticalClasses = "gap-2";

  const classes = `${baseClasses} ${
    orientation === "vertical" ? verticalClasses : horizontalClasses
  }`;

  // Get the id from props or extract from children
  const getLabelFor = (): string | undefined => {
    if (htmlFor) return htmlFor;

    if (React.isValidElement(children) && children.props) {
      return children.props.id || children.props.name;
    }

    return undefined;
  };

  const labelFor = getLabelFor();

  return (
    <>
      <div className={classes}>
        {label && (
          <label className="font-medium" htmlFor={labelFor}>
            {label}
          </label>
        )}
        {children}
      </div>
      {error && Array.isArray(error) && error.length > 0 && (
        <ul>
          {error.map((err, index) => (
            <li key={index} className="text-red-700 text-sm">
              {err}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default FormRow;
