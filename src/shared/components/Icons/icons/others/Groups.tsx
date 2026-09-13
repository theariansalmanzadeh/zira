import * as React from "react";
import { cn } from "@shared/libs/utils";
export interface IconProps extends React.SVGProps<SVGSVGElement> {
  styles?: React.CSSProperties;
  className?: string;
  fill?: string;
  size?: number;
}
const Groups = ({
  styles,
  className,
  fill = "currentColor",
  size = 24,
  ...props
}: IconProps) => {
  return React.cloneElement(<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}><mask id="prefix__a" width={24} height={24} x={0} y={0} maskUnits="userSpaceOnUse" style={{
    maskType: "alpha"
  }}><path fill="#D9D9D9" d="M0 0h24v24H0z" /></mask><g mask="url(#prefix__a)"><path fill="#787878" d="M.5 17.848v-1.22q0-.997 1.042-1.639 1.043-.64 2.718-.641.276 0 .557.017.28.018.566.067a3.73 3.73 0 0 0-.575 2.002v1.414zm6 0v-1.375q0-.702.394-1.284t1.137-1.014 1.754-.65a10.6 10.6 0 0 1 2.211-.216q1.223 0 2.235.217 1.011.216 1.754.649.742.432 1.128 1.014.387.582.387 1.284v1.375zm12.692 0v-1.41q0-.565-.133-1.064a3.6 3.6 0 0 0-.401-.942q.294-.05.562-.067.27-.017.53-.017 1.675 0 2.712.634 1.038.633 1.038 1.647v1.219zm-11.115-1.5h7.861v-.106q-.153-.605-1.277-1.02Q13.54 14.81 12 14.81t-2.661.414q-1.125.413-1.262 1.02zm-3.82-2.971q-.707 0-1.208-.503a1.65 1.65 0 0 1-.501-1.209q0-.716.503-1.208a1.66 1.66 0 0 1 1.209-.494q.715 0 1.213.494.498.493.498 1.211 0 .697-.493 1.203a1.64 1.64 0 0 1-1.221.506m15.493 0q-.7 0-1.206-.506a1.64 1.64 0 0 1-.506-1.203q.001-.718.506-1.211a1.67 1.67 0 0 1 1.208-.494q.723 0 1.216.494.494.493.494 1.208 0 .706-.492 1.209a1.64 1.64 0 0 1-1.22.503m-7.746-.818a2.5 2.5 0 0 1-1.84-.757 2.5 2.5 0 0 1-.76-1.839q0-1.103.757-1.85A2.52 2.52 0 0 1 12 7.368q1.103 0 1.85.746.746.745.746 1.847a2.53 2.53 0 0 1-.745 1.84q-.745.76-1.848.76m0-1.5q.46 0 .776-.32a1.07 1.07 0 0 0 .316-.78q0-.46-.315-.776T12 8.867q-.454 0-.775.315a1.05 1.05 0 0 0-.321.781q0 .454.321.775t.78.321" /></g></svg>, {
    className: cn(className),
    style: styles,
    width: size,
    height: size,
    fill,
    ...props
  });
};
export default Groups;