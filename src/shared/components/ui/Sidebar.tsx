import IconButton from "./IconButton";

const Sidebar = () => {
  return (
    <aside className="hidden! lg:flex! w-[80px] h-auto p-lg gap-sm flex-col-items-center">
      <IconButton icon="logo" className="w-5xl h-5xl!" onClick={() => { }} />
      <div className="bg-surface-container-lowest p-1xl rounded-container-lg grow">
        <div className="flex-col-items-start gap-lg bg-surface-container-high rounded-container-lg mx-1 px-1 my-1 py-1">
          <IconButton
            icon="dashboard"
            iconClassName="w-[24px]! h-[24px]!"
            onClick={() => { }}
          />
          <IconButton
            icon="star"
            fill="#787878"
            iconClassName="w-[24px]! h-[24px]!"
            className="bg-transparent"
            onClick={() => { }}
          />
          <IconButton
            icon="plus"
            fill="#787878"
            iconClassName="w-[24px]! h-[24px]!"
            className="bg-transparent"
            onClick={() => { }}
          />
        </div>
      </div>
      <IconButton icon="question" className="w-5xl h-5xl! text-on-surface-variant" onClick={() => { }} />
    </aside>
  );
};

export default Sidebar;
