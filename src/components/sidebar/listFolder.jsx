import { useEffect, useState } from "react";
import { MdFolder, MdArrowRight, MdArrowDropDown } from "react-icons/md";
import "../../assets/css/sidebar.css";
import axios from "axios";

const ListFolder = ({ onFolderClick }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [listFolder, setListFolder] = useState([]);
  const [openedFolders, setOpenedFolders] = useState([]);
  const [activeFolder, setActiveFolder] = useState(null);
  const fetchFolders = async (folderId = null) => {
    try {
      const response = await axios.get(apiUrl + "folders", {
        params: {
          folderId
        }
      });
      return response.data.data;
    } catch (error) {
      return [];
    }
  };

  const toggleFolder = async (folderId) => {
    if (openedFolders.includes(folderId)) {
      setOpenedFolders((prev) => prev.filter((id) => id !== folderId));
    } else {
      const childFolders = await fetchFolders(folderId);
      setListFolder((prev) => ({ ...prev, [folderId]: childFolders }));
      setOpenedFolders((prev) => [...prev, folderId]);
    }
  };

  const renderFolders = (folders) => {
    return folders.map((folder) => (
      <div key={folder._id} className="mt-0">
        <div
          className={`group w-full h-full flex items-center jutify-center gap-2 p-2 rounded-md cursor-pointer  active:bg-blue-500 ${
            activeFolder === folder._id ? "bg-blue-500" : "hover:bg-slate-200"
          }`}
        >
          {openedFolders.includes(folder._id) ? (
            <MdArrowDropDown
              className={`w-5 h-5 group-active:text-slate-50 ${
                activeFolder === folder._id ? "text-slate-50" : "text-slate-500"
              }`}
              onClick={() => toggleFolder(folder._id)}
            />
          ) : (
            <MdArrowRight
              className={`w-5 h-5 group-active:text-slate-50 ${
                activeFolder === folder._id ? "text-slate-50" : "text-slate-500"
              }`}
              onClick={() => toggleFolder(folder._id)}
            />
          )}
          <div
            className="w-full h-full flex items-center justify-start gap-2 cursor-pointer"
            onClick={() => {
              onFolderClick(folder);
              setActiveFolder(folder._id);
            }}
          >
            <MdFolder
              className={`w-4 h-4 group-active:text-slate-50 ${
                activeFolder === folder._id ? "text-slate-50" : "text-slate-500"
              }`}
            />
            <p
              className={`font-normal text-xs group-active:text-slate-50 ${
                activeFolder === folder._id ? "text-slate-50" : "text-slate-500"
              }`}
            >
              {folder.folderName}
            </p>
          </div>
        </div>
        {openedFolders.includes(folder._id) && listFolder[folder._id] && (
          <div className="pl-2">
            {renderFolders(listFolder[folder._id], folder._id)}
          </div>
        )}
      </div>
    ));
  };

  useEffect(() => {
    const loadFolder = async () => {
      const rootFolders = await fetchFolders();
      setListFolder({ root: rootFolders });
    };
    loadFolder();
  }, []);

  return (
    <div className="w-full h-full bg-stone-50 pl-2 pt-2">
      <div className="w-full h-full overflow-x-scroll">
        {listFolder.length === 0 ? (
          <div className="w-full h-full flex items-center justify-center">
            <p className="font-semibold text-sm text-slate-500">
              No folder found
            </p>
          </div>
        ) : (
          renderFolders(listFolder.root)
        )}
      </div>
    </div>
  );
};

export default ListFolder;
