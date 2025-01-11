import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getParentFolder, setOpenFolder, setValueContentFile, setValueContentFolder } from "../../redux/slices/folderSlice";
import "../../assets/css/main.css";

import ListFolder from "../../components/sidebar/listFolder";
import ListContent from "../../components/content/listContent";
import LoadingBall from "../../components/LoadingBall";
import Propile from "../../components/sidebar/profile";
import NavbarDirectory from "../../components/content/navbarDirectory";
import ActionBarDirectory from "../../components/content/actionBarDirectory";
import ModalAert from "../../components/ModalAert";


const Dashboard = () => {
  const dispatch = useDispatch()
  const [urlPathFoder, setUrlPathFoder] = useState();  
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false)
  const [dataModal, setDataModal] = useState({})
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);
  const apiUrl = import.meta.env.VITE_API_URL;
  const openFolder = useSelector((state) => state.folder.data.openFolder)

  const fetchParentFolder = async () => {
    try {
      const result = await axios.get(apiUrl+'folder/getParent')
      dispatch(getParentFolder(result.data.data))
    } catch (error) {
      console.log('Error in Fetch Parent Folder : \n'+error)
    }
  }

  const fetchValueFolderById = async (folder) => {
    setLoading(true)
    dispatch(setOpenFolder(folder))
    try {
      const responseFolder = await axios.get(apiUrl+'folder/getSubById/'+folder._id)
      if(responseFolder.status == 200){
        dispatch(setValueContentFolder(responseFolder.data.data))
      }
      const responseFile = await axios.get(apiUrl+'file/getByParentPath/'+folder._id)
      if(responseFile.status == 200){
        dispatch(setValueContentFile(responseFile.data.data))
      }
      setUrlPathFoder(folder.routePath)
    } catch (error) {
      console.log('Error in fetch value folder : \n' + error)
    } finally{
      setLoading(false)
    }
  }

  const fetchValueFolderByPath = async (urlPath) => {
    setLoading(true)
    try {
      const response = await axios.post(apiUrl+'main/getBySlug', {
        path: urlPath
      })
      if(response.data.success == true){
        const dataResponse = response.data
        dispatch(setValueContentFolder(dataResponse.folders))
        dispatch(setValueContentFile(dataResponse.files))
        setUrlPathFoder(dataResponse.route)
      }else{
        setDataModal({
          status: 'danger',
          title: 'Folder Not Found',
          message: 'Please check again.'
        })
        setShowModal(true)
      }
    } catch (error) {
      console.log('Error in fetch value folder by path : \n'+error)
    } finally{
      setLoading(false)
    }
  }

  const createFolder = async (data) => {
    setLoading(true)
    try {
      const name = data
      const routePath = openFolder._id ? openFolder.routePath + '/' + data : '/' + data
      const slugPath = openFolder._id ? openFolder.slugPath + '/'+ data.toLowerCase().replaceAll(' ', '_') : '/' + data.toLowerCase().replaceAll(' ', '_') 
      const parentPath = !openFolder._id ? null : openFolder._id
      const response = await axios.post(apiUrl+'folder/create', {
        name,
        parentPath,
        routePath,
        slugPath
      })
      if(response.status == 200){
        fetchParentFolder()
        fetchValueFolderById(openFolder)
      }
    } catch (error) {
      console.log('Error in create folder : '+error)
    } finally{
      setLoading(false)
    }
  }

  const uploadFile = async (e) => {
    try {
      const dataFolder = openFolder
      const files = e.target.files;
      if (!files.length) return;
      const formData = new FormData();
      for (const item of files) {
        formData.append("files[]", item);
      }
      formData.append("routePath", dataFolder.routePath);
      formData.append("id", openFolder._id);
      setShowProgress(true);
      const response = await axios.post(apiUrl + "main/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        }
      });
      if (response.status === 200) {
        setShowProgress(false);
        fetchValueFolderById(dataFolder)
      }
    } catch (error) {
      setShowProgress(false);
      if (error.response) {
        console.log(error.response.data);
      } else {
        console.log(error.message);
      }
    }
  };

  useEffect(() => {
    fetchParentFolder();
  },[])

  return (
    <div className="h-screen p-5 m-0 bg-slate-200 select-none">
      <div className="relative w-full h-full rounded-md overflow-hidden bg-blue-100 flex">
        {/* start sidebar */}
        <div className="w-2/12 h-full bg-stone-50 border-r-2 border-slate-200">
          {/* start icon 3 warna */}
          <div className="w-full h-10 bg-stone-50 border-b border-slate-200">
            <div className="w-full h-full bg-stone-50 flex items-center justify-start gap-1 p-2">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
          </div>
          {/* end icon 3 warna */}

          {/* start profile */}
          <Propile />
          {/* end profile */}

          {/* start list Folder */}
          <ListFolder
            onFolderClick={(folder) => fetchValueFolderById(folder, "folderId")}
          />
          {/* end list Folder */}
        </div>
        {/* end sidebar */}

        {/* start content */}
        <div className="w-10/12 h-full bg-stone-50">
          {/* start navbar directory */}
          <NavbarDirectory
            url={urlPathFoder}
            onUrlChange={(url) => setUrlPathFoder(url)}
            onEnterPress={(url) => fetchValueFolderByPath(url)}
          />
          {/* end navbar directory */}

          {/* start action bar directory */}
          <ActionBarDirectory
            onUpload={(e) => uploadFile(e)}
            onCreateFolder={createFolder}
          />
          {/* end action bar directory */}

          {/* start list directory */}
          {loading && <LoadingBall />}
          <ListContent
            onFolderDoubleClick={(folder) => fetchValueFolderById(folder, "folderId")}
          />

          {showModal && <ModalAert data={dataModal} onCloseModal={ () => setShowModal(false)} />}
          {showProgress === true ? (
            <div className="absolute bottom-0 right-0 w-full bg-gray-200 rounded-full dark:bg-gray-700 px-4">
              <div
                className="bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                style={{ width: progress + "%" }}
              >
                {""}
                {progress}%
              </div>
            </div>
          ) : null}

          {/* end list directory */}
        </div>
        {/* end content */}
      </div>
    </div>
  );
};

export default Dashboard;
