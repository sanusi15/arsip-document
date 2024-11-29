import { useEffect, useState } from "react";
import { MdFolder, MdArrowRight, MdArrowDropDown } from "react-icons/md";
import "../../assets/css/sidebar.css";
import axios from "axios";

const ListFolder = () => {
  const [listFolder, setListFolder] = useState([]);
  const [openedFolders, setOpenedFolders] = useState([]);

  // const dataFolder = [
  //   {
  //     id: 1,
  //     parentId: null,
  //     folderName: "Folder 1",
  //     path: "/Folder 1",
  //     property: {
  //       type: "folder",
  //       size: "1MB",
  //       created_at: "2023-06-01"
  //     },
  //     userAccess: [
  //       {
  //         user_id: 1,
  //         access: ["read", "write", "delete"]
  //       },
  //       {
  //         user_id: 2,
  //         access: ["read", "write"]
  //       }
  //     ]
  //   },
  //   {
  //     id: 2,
  //     parentId: null,
  //     folderName: "Folder 2",
  //     path: "/Folder 2",
  //     property: {
  //       type: "folder",
  //       size: "1MB",
  //       created_at: "2023-06-01"
  //     },
  //     userAccess: [
  //       {
  //         user_id: 1,
  //         access: ["read", "write", "delete"]
  //       },
  //       {
  //         user_id: 2,
  //         access: ["read", "write"]
  //       }
  //     ]
  //   },
  //   {
  //     id: 3,
  //     parentId: 2,
  //     folderName: "Folder 2.1",
  //     path: "/Folder 2/Folder 2.1",
  //     property: {
  //       type: "folder",
  //       size: "1MB",
  //       created_at: "2023-06-01"
  //     },
  //     userAccess: [
  //       {
  //         user_id: 1,
  //         access: ["read", "write", "delete"]
  //       },
  //       {
  //         user_id: 2,
  //         access: ["read", "write"]
  //       }
  //     ]
  //   }
  // ];

  const getFolders = async () => {
    const response = await axios.get("http://localhost:3000/folders");
    setListFolder(response.data.data);
  };

  const toggleFolder = (folderId) => {
    setOpenedFolders((prevOpened) =>
      prevOpened.includes(folderId)
        ? prevOpened.filter((id) => id !== folderId)
        : [...prevOpened, folderId]
    );
  };

  const renderFolders = (folders, parentId = null) => {
    return folders
      .filter((folder) => folder.parentId === parentId)
      .map((folder) => (
        <div key={folder.id} className="mt-0">
          <div className="w-full h-full flex items-center justify-start gap-2 p-2 border-b border-slate-200 hover:bg-slate-200 hover:rounded-md">
            {openedFolders.includes(folder.id) ? (
              <MdArrowDropDown
                className="w-5 h-5 text-slate-500 cursor-pointer"
                onClick={() => toggleFolder(folder.id)}
              />
            ) : (
              <MdArrowRight
                className="w-5 h-5 text-slate-500 cursor-pointer"
                onClick={() => toggleFolder(folder.id)}
              />
            )}
            <div className="w-full h-full flex items-center justify-start gap-2 cursor-pointer">
              <MdFolder className="w-4 h-4 text-slate-500" />
              <p className="font-normal text-xs text-slate-500 ">
                {folder.folderName}
              </p>
            </div>
          </div>
          {openedFolders.includes(folder.id) && (
            <div
              className={`folder-content ${
                openedFolders.includes(folder.id) ? "open" : ""
              } pl-2`}
            >
              {renderFolders(folders, folder.id)}
            </div>
          )}
        </div>
      ));
  };

  useEffect(() => {
    // const listFolder = dataFolder.filter((folder) => folder.parentId === null);
    // setListFolder(listFolder);
    getFolders();
  }, []);

  return (
    <div className="w-full h-full overflow-x-scroll">
      {listFolder.length === 0 ? (
        <div className="w-full h-full flex items-center justify-center">
          <p className="font-semibold text-sm text-slate-500">
            No folder found
          </p>
        </div>
      ) : (
        renderFolders(listFolder)
      )}
    </div>
  );
};

export default ListFolder;
