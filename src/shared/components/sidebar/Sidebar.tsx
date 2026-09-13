"use client"

import IconButton from "@shared/components/ui/IconButton";
import { SIDEBAR_CONTENT, SUB_SIDEBAR_CONTENT } from "./content";
import type { IconLabel } from "@shared/types/icon";
import { cn, isPathActive, getAdminSection } from "@shared/libs/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SubSidebar from "./components/SubSidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/Tooltip";

const Sidebar = () => {
  const pathname = usePathname()
  const section = getAdminSection(pathname)
  const subSidebarContent = SUB_SIDEBAR_CONTENT[section]

  return (
    <div className="bg-surface-container-lowest hidden! lg:flex! mx-3 w-min p-lg gap-sm flex-col items-center rounded-card-lg h-full">
      <aside className="flex flex-row h-full">
        <div>
          <IconButton icon="logoMark" className="w-10 h-10! bg-primary" fill="fill-white" iconClassName="w-8! h-8!" onClick={() => { }} />
          <div className=" p-1xl rounded-container-lg grow">
            <div className="flex-col-items-start gap-lg rounded-container-lg py-1">
              {SIDEBAR_CONTENT.map((item) => {
                const pathKey = getAdminSection(item.link)
                const faLabel = SUB_SIDEBAR_CONTENT[pathKey]?.faLabel ?? item.faLabel

                return (
                  <Tooltip key={`${item.link}-${item.icon}`}>
                    <TooltipTrigger asChild>
                      <Link href={item.link}>
                        <IconButton
                          fill={isPathActive(item.link, section) ? "fill-primary" : "fill-outline"}
                          icon={item.icon as IconLabel}
                          className={cn(isPathActive(item.link, section) ? "bg-primary-focused" : "", "w-10! h-10!")}
                          variant={isPathActive(item.link, section) ? "default" : "ghost"}
                          iconClassName="w-[24px]! h-[24px]!"
                        />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      {faLabel}
                    </TooltipContent>
                  </Tooltip>
                )
              })}

            </div>
          </div>
        </div>

        {subSidebarContent && <div className="pr-lg h-full">
          <SubSidebar
            icon={subSidebarContent.headerIcon}
            header={subSidebarContent.header}
            subheader={subSidebarContent.subheader}
            itemsList={subSidebarContent.itemsList}
          />
        </div>}
      </aside>
    </div>
  );
};

export default Sidebar;
