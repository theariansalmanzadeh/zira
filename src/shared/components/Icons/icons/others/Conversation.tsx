import * as React from "react";
import { cn } from "@shared/libs/utils";
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  styles?: React.CSSProperties;
  className?: string;
  fill?: string;
  size?: number;
}
const Conversation = ({
  styles,
  className,
  fill = "currentColor",
  size = 24,
  ...props
}: IconProps) => {
  return React.cloneElement(<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}><mask id="prefix__a" width={24} height={24} x={0} y={0} maskUnits="userSpaceOnUse" style={{
    maskType: "alpha"
  }}><path fill="#D9D9D9" d="M0 0h24v24H0z" /></mask><g mask="url(#prefix__a)"><path fill="#787878" d="m21.6 20.857-3.539-3.539H8.292q-.73 0-1.25-.52a1.7 1.7 0 0 1-.52-1.249v-.615h10.886a1.74 1.74 0 0 0 1.276-.531 1.74 1.74 0 0 0 .531-1.277V6.203h.616q.73 0 1.25.52.519.52.519 1.25zM4.484 12.849 5.9 11.434h9.508a.3.3 0 0 0 .22-.087.3.3 0 0 0 .087-.22V4.51a.3.3 0 0 0-.086-.221.3.3 0 0 0-.221-.087H4.792a.3.3 0 0 0-.221.087.3.3 0 0 0-.087.22zm-1.5 3.623V4.511q0-.746.531-1.277a1.74 1.74 0 0 1 1.277-.53h10.616q.745 0 1.276.53.531.531.531 1.277v6.615q0 .746-.53 1.277a1.74 1.74 0 0 1-1.277.53H6.523z" /></g></svg>, {
    className: cn(className),
    style: styles,
    width: size,
    height: size,
    fill,
    ...props
  });
};
export default Conversation;