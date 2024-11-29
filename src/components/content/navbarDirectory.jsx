import {
  MdComputer,
  MdArrowForwardIos,
  MdArrowBackIos,
  MdRefresh,
  MdSearch
} from "react-icons/md";
const NavbarDirectory = ({ url, onEnterPress, onUrlChange }) => {
  const changeFormatUrl = (url) => {
    const [firstPart, ...restParts] = url.split("/"); // Pisahkan bagian pertama
    return [firstPart, ...restParts.join("/").replace(/\//g, " > ")].join("");
  };
  return (
    <div className="w-full h-10 bg-stone-50 border-b border-slate-200 p-1 flex items-center justify-center gap-2">
      <div className="flex items-center justify-start gap-2 ">
        <div className="w-6 h-6 p-0 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:cursor-pointer">
          <MdArrowBackIos className="text-slate-500 text-xs ml-1" />
        </div>
        <div className="w-6 h-6 p-0 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:cursor-pointer">
          <MdArrowForwardIos className="text-slate-500 text-xs " />
        </div>
        <div className="w-6 h-6 p-0 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:cursor-pointer">
          <MdRefresh className="text-slate-500 text-sm " />
        </div>
      </div>
      <div className="w-full h-full bg-white border border-slate-200 rounded-md flex items-center justify-start gap-2 p-2 divide-x">
        <MdComputer className="w-4 h-4 text-slate-500" />
        <input
          type="text"
          value={changeFormatUrl(url)}
          onChange={(e) => onUrlChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onEnterPress(e.target.value)}
          className="w-full h-full bg-transparent outline-none border-none font-normal text-xs text-slate-500 focus:outline-none focus:ring-0 placeholder:text-xs"
        />
      </div>
      <div className="w-2/12 h-full bg-white border border-slate-200 rounded-md flex items-center justify-start gap-1 p-2">
        <MdSearch className="w-4 h-4 text-slate-500" />
        <input
          type="text"
          placeholder="Search"
          className="w-full h-full bg-transparent outline-none border-none font-normal text-xs text-slate-500 focus:outline-none focus:ring-0 placeholder:text-xs placeholder:text-slate-400"
        />
      </div>
    </div>
  );
};

export default NavbarDirectory;