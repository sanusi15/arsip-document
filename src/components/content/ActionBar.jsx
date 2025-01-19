import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCutOrCopyContent } from "../../redux/slices/folderSlice";
import axios from "axios";
import {
  MdArrowDropDown,
  MdOutlineDashboard,
  MdOutlineFilterList,
} from "react-icons/md";
import { BsFillFolderFill } from "react-icons/bs";
import { AiOutlineClose, AiOutlineDelete } from "react-icons/ai";
import { TfiCut } from "react-icons/tfi";
import { FaRegCopy } from "react-icons/fa6";
import { CgRename } from "react-icons/cg";
import { FiUploadCloud } from "react-icons/fi";


const ActionBar = ({ onUpload, onCreateFolder, onPasteContent }) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch()
  const [showModalCreate, setShowModalCreate] = useState(false)
  const [isValidInput, setIsValidInput] = useState(true)
  const [isDropdownVisibile, setIsDropdownVisible] = useState(true)
  const contentActive = useSelector((state) => state.folder.data.contentActive)
  const contentOnCutOrCopy = useSelector((state) => state.folder.data.contentCutOrCopy)

  const handleCLoseModal = () =>{
    setShowModalCreate(false)
    setIsValidInput(true)
  }
  
  const onSubmit = () => {
    const regex = /^[a-zA-Z0-9 -]*$/
    const inputValue = document.getElementById('validated-input').value
    if(regex.test(inputValue)){
      setIsValidInput(true)
      onCreateFolder(inputValue)
      handleCLoseModal()
    }else{
      setIsValidInput(false)
    }
  }

  const onCheckInput = (e) => {
    if(e.key == 'Escape'){
      document.getElementById('validated-input').value = '' 
      handleCLoseModal()
    }else if(e.key == 'Enter'){
      onSubmit()
    }
  }

  const ModalCreateFolder = () => {
    return(
      <div className='absolute top-0 left-0 w-full h-full bg-slate-400/20'>
          <div className='flex justify-center items-center flex-col gap-0 h-full -translate-y-40'>
              <div className='w-4/12 p-2 bg-zinc-50  rounded-t-md shadow-md'>
                  <div className='flex justify-end'>
                      <button onClick={handleCLoseModal} className='p-1 bg-zinc-50 ring-1 ring-slate-200 rounded-md hover:bg-zinc-100'>
                          <AiOutlineClose className='text-slate-500' />
                      </button>
                  </div>
                  <div className='flex justify-center'>
                      <div className='p-1 bg-blue-50 ring-1 ring-blue-300 rounded-full'>
                          <div className='p-1 bg-blue-50 ring-1 ring-blue-300 rounded-full'>
                              <BsFillFolderFill className='text-blue-500 text-[20px]' />
                          </div>
                      </div>
                  </div>
                  <div className='p-1 text-center mt-5'>
                      <p className='text-sm text-slate-700'>Create New Folder</p>
                  </div>
                  <div className='p-1 text-center mt-2'>
                      <p className={`text-xs ${isValidInput ? 'text-slate-500' : 'text-red-400'}`}>
                      {`Folder names can't contain special characters such as \\ / : * ? " < >. Please use only letters, numbers, spaces, or underscores (_)
                      `}
                      </p>
                  </div>
                  <div className="p-1 mt-2">
                       <input
                        autoFocus={true}
                        id="validated-input"
                        type="text"
                        onKeyUp={(e) => onCheckInput(e)}
                        className={`w-full h-8 p-2 outline-none border-none ring-1 ${isValidInput ? 'ring-blue-200' : 'ring-red-400'} bg-zinc-50 text-xs text-slate-500`} />
                  </div>
              </div>
              <div className='w-4/12 p-3 text-center bg-zinc-100 rounded-b-md'>
                  <div className='flex justify-center gap-2'>
                    <button onClick={handleCLoseModal} className='w-full py-2 px-4 rounded-sm bg-red-500 text-slate-50 text-xs font-normal hover:bg-red-400'>cancel</button>
                    <button onClick={onSubmit}  className='w-full py-2 px-4 rounded-sm bg-blue-500 text-slate-50 text-xs font-normal hover:bg-blue-600'>confirm</button>
                  </div>
              </div>               
          </div>
      </div>
    )
  }

  return (
    <div className="w-full h-10 bg-stone-50 border-b border-slate-200 flex items-center justify-between gap-2 px-2">
      <div className="flex items-center justify-between gap-2 px-2">
        {/* Start dropdown upload */}
        <div
          className="flex items-center justify-between border border-slate-200 divide-x hover:cursor-pointer hover:bg-slate-100"
          data-dropdown-toggle="dropdownUpload"
        >
          <div className="py-1 px-2">
            <p className="text-xs text-slate-500">Upload</p>
          </div>
          <div className="py-1 px-2">
            <MdArrowDropDown className="text-md text-slate-500" />
          </div>
        </div>
        <div
          className="z-10 hidden bg-white shadow w-max dark:bg-gray-700"
          id="dropdownUpload"
        >
          <ul className="border border-gray-200 divide-y divide-gray-200">
            <li className="px-2 py-1.5 flex justify-start items-center gap-2 hover:cursor-pointer hover:bg-slate-100"
              onClick={() => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.multiple = true;
                    input.click();
                    input.onchange = onUpload;
                  }}
            >
              <div className="w-5 flex justify-center">
                <FiUploadCloud className="text-xs text-slate-700" />
              </div>
              <div className="flex justify-start border-l-2 pl-2">
                <p className="text-xs text-slate-500">Upload File</p>
              </div>
            </li>
          </ul>
        </div>
        {/* End dropdown upload */}
        {/* Start dropdown create */}
        <div
          className="flex items-center justify-between border border-slate-200 divide-x cursor-pointer hover:bg-slate-100"
        >
          <div className="py-1 px-2">
            <p className="text-xs text-slate-500" onClick={() => setShowModalCreate(true)}>Create</p>
          </div>
          <div className="py-1 px-2">
            <MdArrowDropDown className="text-md text-slate-500" />
          </div>
        </div>
        {/* End dropdown create */}
        {/* Start dropdown action */}
        <div className={`flex items-center justify-between border border-slate-200 divide-x ${contentActive != null ? 'cursor-pointer hover:bg-slate-100' : 'bg-zinc-200'}`} data-dropdown-toggle="dropdownAction">
          <div className="py-1 px-2">
            <p className="text-xs text-slate-500">Action</p>
          </div>
          <div className="py-1 px-2">
            <MdArrowDropDown className="text-md text-slate-500" />
          </div>
        </div>
        <div
          className="z-10 hidden bg-white shadow w-max dark:bg-gray-700"
          id="dropdownAction"
        >
          {
            contentActive != null && (
              <ul className="border border-gray-200 divide-y divide-gray-200">
                <li className="px-2 py-1.5 flex justify-start items-center gap-2 hover:cursor-pointer hover:bg-slate-100"
                  onClick={() => dispatch(setCutOrCopyContent({status: true, type: 'cut',contentId: contentActive.id, contentType: contentActive.type}))}
                >
                  <div className="w-5 flex justify-center">
                    <TfiCut className="text-xs text-slate-700" />
                  </div>
                  <div className="flex justify-start border-l-2 pl-2">
                    <p className="text-xs text-slate-500">Cut</p>
                  </div>
                </li>
                <li className="px-2 py-1.5 flex justify-start items-center gap-2 hover:cursor-pointer hover:bg-slate-100">
                  <div className="w-5 flex justify-center">
                    <FaRegCopy className="text-xs text-slate-700" />
                  </div>
                  <div className="flex justify-start border-l-2 pl-2">
                    <p className="text-xs text-start text-slate-500">Copy</p>
                  </div>
                </li>
                <li className="px-2 py-1.5 flex justify-start items-center gap-2 hover:cursor-pointer hover:bg-slate-100"
                  onClick={() => onPasteContent()}
                >
                  <div className="w-5 flex justify-center">
                    <FaRegCopy className="text-xs text-slate-700" />
                  </div>
                  <div className="flex justify-start border-l-2 pl-2">
                    <p className="text-xs text-start text-slate-500">Paste</p>
                  </div>
                </li>
                <li className="px-2 py-1.5 flex justify-start items-center gap-2 hover:cursor-pointer hover:bg-slate-100">
                  <div className="w-5 flex justify-center">
                    <CgRename className="text-sm text-slate-700" />
                  </div>
                  <div className="flex justify-start border-l-2 pl-2">
                    <p className="text-xs text-start text-slate-500">Rename</p>
                  </div>
                </li>
                <li className="px-2 py-1.5 flex justify-start items-center gap-2 hover:cursor-pointer hover:bg-slate-100">
                  <div className="w-5 flex justify-center">
                    <AiOutlineDelete className="text-sm text-slate-700" />
                  </div>
                  <div className="flex justify-start border-l-2 pl-2">
                    <p className="text-xs text-start text-slate-500">Delete</p>
                  </div>
                </li>
              </ul>
            ) 
          }
        </div>
        {/* End dropdown action  */}
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center justify-between border border-slate-200 divide-x">
          <div className="py-1 px-2">
            <MdOutlineDashboard className="text-md text-slate-500" />
          </div>
          <div className="py-1 px-2">
            <MdArrowDropDown className="text-md text-slate-500" />
          </div>
        </div>
        <div className="flex items-center justify-between border border-slate-200 divide-x">
          <div className="py-1 px-2">
            <MdOutlineFilterList className="text-md text-slate-500" />
          </div>
          <div className="py-1 px-2">
            <MdArrowDropDown className="text-md text-slate-500" />
          </div>
        </div>
      </div>
      {showModalCreate && <ModalCreateFolder /> }
    </div>
  );
};

export default ActionBar;
