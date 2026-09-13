module.exports = function template(variables, { tpl }) {
  const { componentName, jsx } = variables;

  return tpl`
import * as React from "react";
import { cn } from "@/lib/utils/cn";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  styles?: React.CSSProperties;
  className?: string;
  fill?: string;
  size?: number;
}

const ${componentName} = ({
  styles,
  className,
  fill = "currentColor",
  size = 24,
  ...props
}: IconProps) => {
  return React.cloneElement(${jsx}, {
    className: cn(className),
    style: styles,
    width: size,
    height: size,
    fill,
    ...props,
  });
};

export default ${componentName};
`;
};
