import clsx from "clsx";
import React, { ReactNode } from "react";

type GridProps = {
  children: ReactNode;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export function Grid({ children, className, ...rest }: GridProps) {
  return (
    <div
      className={clsx(
        className,
        "relative grid gap-x-4 grid-cols-4  max-w-7xl md:grid-cols-8 lg:grid-cols-12"
      )}
    >
      {children}
    </div>
  );
}
 export default Grid;