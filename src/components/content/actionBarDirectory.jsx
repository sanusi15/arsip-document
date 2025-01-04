import { useRef, useState } from "react";
import {
  MdArrowDropDown,
  MdOutlineDashboard,
  MdOutlineFilterList,
  MdUploadFile,
} from "react-icons/md";
import { BsFillFolderFill } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

const ActionBarDirectory = ({ onUpload, onCreateFolder }) => {
  const [showModalCreate, setShowModalCreate] = useState(false)
  const [isValidInput, setIsValidInput] = useState(true)

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
      setShowModalCreate(false)
    }else{
      setIsValidInput(false)
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
                        id="validated-input"
                        type="text"
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
          className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-max dark:bg-gray-700"
          id="dropdownUpload"
        >
          <ul className="py-2" aria-labelledby="dropdownDefaultButton">
            <li>
              <button
                className="flex items-center justify-start gap-2 px-4 py-1 text-xs text-slate-500 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.multiple = true;
                  input.click();
                  input.onchange = onUpload;
                }}
              >
                <MdUploadFile className="text-lg" /> Upload File
              </button>
            </li>
          </ul>
        </div>
        {/* End dropdown upload */}
        {/* Start dropdown create */}
        <div
          className="flex items-center justify-between border border-slate-200 divide-x cursor-pointer hover:bg-slate-100"
          // data-dropdown-toggle="dropdownCreate"
        >
          <div className="py-1 px-2">
            <p className="text-xs text-slate-500" onClick={() => setShowModalCreate(true)}>Create</p>
          </div>
          <div className="py-1 px-2">
            <MdArrowDropDown className="text-md text-slate-500" />
          </div>
        </div>
        {/* <div
          className="z-10 hidden bg-white divide-y divide-gray-100 rounded-md shadow w-max dark:bg-gray-700"
          id="dropdownCreate"
        >
          <ul className="py-2" aria-labelledby="dropdownDefaultButton">
            <li className="">
              <button
                onClick={() => setShowModalCreate(true)}
                className="flex items-center justify-start gap-2 px-4 py-1 text-xs text-slate-500 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <MdOutlineCreateNewFolder className="text-lg" /> Folder
              </button>
            </li>
          </ul>
        </div> */}
        {/* End dropdown create */}
        <div className="flex items-center justify-between border border-slate-200 divide-x cursor-pointer hover:bg-slate-100">
          <div className="py-1 px-2">
            <p className="text-xs text-slate-500">Action</p>
          </div>
          <div className="py-1 px-2">
            <MdArrowDropDown className="text-md text-slate-500" />
          </div>
        </div>
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

export default ActionBarDirectory;
