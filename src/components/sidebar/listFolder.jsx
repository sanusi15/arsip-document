import { useState } from "react";
import { MdFolder, MdArrowRight, MdArrowDropDown } from "react-icons/md";
import "../../assets/css/sidebar.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setContentAcitve } from "../../redux/slices/folderSlice";


const ListFolder = ({ onFolderClick }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch()
  const [listFolder, setListFolder] = useState([]);
  const [openedFolders, setOpenedFolders] = useState([]);
  const [activeFolder, setActiveFolder] = useState(null);
  const ListData = useSelector((state) => state.folder.data.parentFolder)
  const contentOnCutOrCopy = useSelector((state) => state.folder.data.contentCutOrCopy)

  const fetchSubFolder = async (parentPathId) => {
    try {
      const result = await axios.get(apiUrl+'folder/getSubById/'+parentPathId)
      return result.data.data
    } catch (error) {
      console.log('Error in Fetch Sub Folder : \n'+error)
    }
  };

  const toggleFolder = async (folderId) => {
    if(contentOnCutOrCopy.contentId != folderId){
      if (openedFolders.includes(folderId)) {
        setOpenedFolders((prev) => prev.filter((id) => id !== folderId));
      } else {
        const childFolders = await fetchSubFolder(folderId);
        setListFolder((prev) => ({ ...prev, [folderId]: childFolders }));
        setOpenedFolders((prev) => [...prev, folderId]);
      }
    }
  };

  const renderFolders = (folders) => {
    return folders.map((folder) => (
      <div key={folder._id} className="mt-0">
        <div
          className={`group w-full h-full flex items-center jutify-center gap-2 p-2 rounded-md cursor-pointer  active:bg-blue-500 ${
            activeFolder === folder._id ? "bg-blue-500" : "hover:bg-slate-200"
          }`}
          onClick={() => {
            if(contentOnCutOrCopy.contentId != folder._id){
              console.log(folder._id)
              const id = folder._id
              const type = 'folder'
              onFolderClick(folder);
              setActiveFolder(id);
              dispatch(setContentAcitve({id, type}))
            }
          }}
        >
          {openedFolders.includes(folder._id) ? (
            <MdArrowDropDown
              className={`w-5 h-5 group-active:text-slate-50 ${
                activeFolder === folder._id ? "text-slate-50" : "text-slate-500"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                toggleFolder(folder._id);
              }}
            />
          ) : (
            <MdArrowRight
              className={`w-5 h-5 group-active:text-slate-50 ${
                activeFolder === folder._id ? "text-slate-50" : "text-slate-500"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                toggleFolder(folder._id);
              }}
            />
          )}
          <div className="w-full h-full flex items-center justify-start gap-2 cursor-pointer">
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
              {folder.name}
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

  return (
    <div className="w-full h-full bg-stone-50 pl-2 pt-2">
      <div className="w-full h-full overflow-x-scroll">
        {
          ListData.length === 0 ? (
            <p>Kosong</p>
          ) : (
            renderFolders(ListData)
          ) 
        }
      </div>
    </div>
  );
};

export default ListFolder;
