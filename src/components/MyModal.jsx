import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineDoneAll, MdOutlineWarning, MdOutlineMedicalInformation } from "react-icons/md";

const MyModal = ({data, onCloseModal}) => {

    const RenderIcon = () => {
        if(data.status == 'success'){
            return(
                <div className='flex justify-center'>
                    <div className='p-1 bg-green-50 ring-1 ring-green-300 rounded-full'>
                        <div className='p-1 bg-green-50 ring-1 ring-green-300 rounded-full'>
                            <MdOutlineDoneAll className='text-green-500 text-[20px]' />
                        </div>
                    </div>
                </div>
            )
        }else if(data.status == 'warning'){
            return (
                <div className='flex justify-center'>
                    <div className='p-1 bg-yellow-50 ring-1 ring-yellow-300 rounded-full'>
                        <div className='p-1 bg-yellow-50 ring-1 ring-yellow-300 rounded-full'>
                            <MdOutlineMedicalInformation className='text-yellow-500 text-[20px]' />
                        </div>
                    </div>
                </div>
            )
        }else{
            return (
                <div className='flex justify-center'>
                    <div className='p-1 bg-red-50 ring-1 ring-red-300 rounded-full'>
                        <div className='p-1 bg-red-50 ring-1 ring-red-300 rounded-full'>
                            <MdOutlineWarning className='text-red-500 text-[20px]' />
                        </div>
                    </div>
                </div>
            )
        }
    }

  return (
    <div className='absolute top-0 left-0 w-full h-full bg-slate-400/20'>
        <div className='flex justify-center items-center flex-col gap-0 h-full -translate-y-40'>
            <div className='w-3/12 p-2 bg-zinc-50  rounded-t-md shadow-md'>
                <div className='flex justify-end'>
                    <button onClick={onCloseModal} className='p-1 bg-zinc-50 ring-1 ring-slate-200 rounded-md hover:bg-zinc-100'>
                        <AiOutlineClose className='text-slate-500' />
                    </button>
                </div>
                <RenderIcon />
                <div className='p-1 text-center mt-5'>
                    <p className='text-sm text-slate-700'>{data.title}</p>
                </div>
                <div className='p-1 text-center mt-2'>
                    <p className='text-sm text-slate-500'>{data.message}</p>
                </div>
            </div>
            <div className='w-3/12 p-3 text-center bg-zinc-100 rounded-b-md'>
                <div className='flex justify-center gap-2'></div>
                <button onClick={onCloseModal} className='w-full py-2 px-4 rounded-sm bg-blue-500 text-slate-50 text-xs font-normal hover:bg-blue-600'>confirm</button>
            </div>               
        </div>
    </div>
  )
}

export default MyModal
