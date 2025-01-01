import { useState } from "react";
import { MdFolder } from "react-icons/md";
import {
  ImFileExcel,
  ImFileWord,
  ImFilePdf,
  ImFileEmpty,
  ImImage
} from "react-icons/im";
const ListContent = ({ dataFolder, dataFile, onFolderClick }) => {
  const [columnWidths, setColumnWidths] = useState([400, 100, 100, 200]);
  const handleMouseDown = (index, e) => {
    const startX = e.pageX;
    const startWidth = columnWidths[index];
    const handleMouseMove = (e) => {
      const newWidth = Math.max(startWidth + (e.pageX - startX), 50);
      setColumnWidths((prevWidth) => {
        const updatedWidth = [...prevWidth];
        updatedWidth[index] = newWidth;
        return updatedWidth;
      });
    };
    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const RenderFolder = (items) => {
    const folders = items.items
    if(folders.length > 0){
      return folders.map((item) => (
        <tr
          key={item._id}
          className="select-none hover:bg-blue-200"
          onDoubleClick={() => onFolderClick(item)}
        >
          <td className="font-normal text-xs text-slate-500 border-b border-slate-200 text-start px-2 py-1">
            <div className="w-full h-full flex items-center justify-start gap-2">
              <MdFolder className="w-4 h-4 text-yellow-300" />
              <p className="font-normal text-xs text-slate-500">
                {item.name}
              </p>
            </div>
          </td>
          <td className="font-normal text-xs text-slate-500 border-b border-slate-200 text-end px-2 py-1">
            {/* {item.property.size} Kb */}
          </td>
          <td className="font-normal text-xs text-slate-500 border-b border-slate-200 text-start px-2 py-1">
            {item.typeExt}
          </td>
          <td className="font-normal text-xs text-slate-500 border-b border-slate-200 text-end px-2 py-1">
            {item.created_at}
          </td>
        </tr>
      )); 
    }
  };

  const RenderFile = (items) => {
    const files = items.items
    if (files.length > 0) {
      return files.map((item) => {
        const IconFile = () => {
          if (item.fileExt == "docx") {
            return <ImFileWord className="w-4 h-4 text-blue-500" />;
          } else if (item.fileExt == "pdf") {
            return <ImFilePdf className="w-4 h-4 text-red-500" />;
          } else if (item.fileExt == "xlsx") {
            return <ImFileExcel className="w-4 h-4 text-green-500" />;
          } else if (
            item.fileExt == "jpg" ||
            item.fileExt == "jpeg" ||
            item.fileExt == "png"
          ) {
            return <ImImage className="w-4 h-4 text-blue-500" />;
          } else {
            return <ImFileEmpty className="w-4 h-4 text-slate-500" />;
          }
        };
        return (
          <tr key={item._id} className="hover:bg-blue-200">
            <td className="font-normal text-xs text-slate-500 border-b border-slate-200 text-start px-2 py-1">
              <div className="w-full h-full flex items-center justify-start gap-2">
                <IconFile />
                <p className="font-normal text-xs text-slate-500">
                  {item.title}
                </p>
              </div>
            </td>
            <td className="font-normal text-xs text-slate-500 border-b border-slate-200 text-end px-2 py-1">
              {item.size} Kb
            </td>
            <td className="font-normal text-xs text-slate-500 border-b border-slate-200 text-start px-2 py-1">
              File
            </td>
            <td className="font-normal text-xs text-slate-500 border-b border-slate-200 text-end px-2 py-1">
              {item.createdAt}
            </td>
          </tr>
        );
      });
    }
  };

  return (
    <div className="w-full h-full">
      <div className="p-4">
        <table className="w-full resizable-table">
          <thead>
            <tr>
              {["Name", "Size", "Type", "Modified Date"].map(
                (header, index) => (
                  <th
                    key={index}
                    className="font-normal text-xs text-blue-500 border border-slate-300 border-t-0 px-2 py-1 relative"
                    style={{ width: `${columnWidths[index]}px` }}
                  >
                    {header}
                    <div
                      className="resize-handle"
                      onMouseDown={(e) => handleMouseDown(index, e)}
                    />
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            <RenderFolder items={dataFolder} />
            <RenderFile items={dataFile} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListContent;
