const Propile = () => (
  <div className="w-full h-16 bg-stone-50 border-b border-slate-200 flex items-center justify-between gap-2 px-2">
    <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden shrink-0">
      <img
        src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
        alt="profile"
        className="w-full h-full object-cover"
      />
    </div>
    <div className="w-full h-full flex flex-row items-center justify-start gap-2">
      <p className="font-semibold text-sm">Christiano Ronaldo</p>
      <p className="font-normal text-xs text-slate-500">Admin</p>
    </div>
  </div>
);

export default Propile;
