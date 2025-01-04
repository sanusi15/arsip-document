import { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/main.css";

import ListFolder from "../../components/sidebar/listFolder";
import ListContent from "../../components/content/listContent";
import LoadingBall from "../../components/LoadingBall";
import Propile from "../../components/sidebar/profile";
import NavbarDirectory from "../../components/content/navbarDirectory";
import ActionBarDirectory from "../../components/content/actionBarDirectory";
import MyAlert from "../../components/myAlert";
import ModalAert from "../../components/ModalAert";


const Dashboard = () => {
  const [urlPathFoder, setUrlPathFoder] = useState();
  const [idPathFolder, setIdPathFolder] = useState(null);
  
  const [loading, setLoading] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [showModal, setShowModal] = useState(false)
  const [dataModal, setDataModal] = useState({})

  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);

  const apiUrl = import.meta.env.VITE_API_URL;

  const [dataFile, setDataFile] = useState([])
  const [dataFolder, setDataFolder] = useState([])
  const [folderExist, setFolderExist] = useState(null)

  const fetchParentFolder = async () => {
    try {
      const result = await axios.get(apiUrl+'folder/getParent')
      return result.data.data;
    } catch (error) {
      console.log('Error in Fetch Parent Folder : \n'+error)
    }
  }

  const fetchValueFolderById = async (folder) => {
    setLoading(true)
    try {
      const responseFolder = await axios.get(apiUrl+'folder/getSubById/'+folder._id)
      if(responseFolder.status == 200){
        setDataFolder(responseFolder.data.data)
      }
      const responseFile = await axios.get(apiUrl+'file/getByParentPath/'+folder._id)
      if(responseFile.status == 200){
        setDataFile(responseFile.data.data)
        setFolderExist(folder)
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
        setDataFolder(dataResponse.folders)
        setDataFile(dataResponse.files)
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
      const response = await axios.post(apiUrl+'folder/create', {
        name: 'Buana Laminar',
        // parentPath: folderExist._id,
        routePath: '/Buana Laminar',
        slugPath: '/buana_laminar',
      })
      if(response.status == 200){
        console.log(response.data)
        fetchParentFolder()
      }
    } catch (error) {
      console.log('Error in create folder : '+error)
    } finally{
      setLoading(false)
    }
  }

  // const uploadFile = async (e) => {
  //   try {
  //     const files = e.target.files;
  //     if (!files.length) return;
  //     const formData = new FormData();
  //     for (const item of files) {
  //       formData.append("file", item);
  //     }
  //     formData.append("path", urlPathFoder);
  //     formData.append("pathId", idPathFolder);
  //     setShowProgress(true);
  //     const response = await axios.post(apiUrl + "upload", formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data"
  //       },
  //       onUploadProgress: (progressEvent) => {
  //         const percentCompleted = Math.round(
  //           (progressEvent.loaded * 100) / progressEvent.total
  //         );
  //         setProgress(percentCompleted);
  //       }
  //     });
  //     if (response.status === 200) {
  //       setShowProgress(false);
  //       setAlertMessage(response.data.message);
  //       setShowAlert(true);
  //       fetchValueFolder(dataFolder, "folderId");
  //       setShowAlert(false);
  //     }
  //   } catch (error) {
  //     setShowProgress(false);
  //     if (error.response) {
  //       console.log(error.response.data);
  //     } else {
  //       console.log(error.message);
  //     }
  //   }
  // };


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
            onFetchParentFolder={fetchParentFolder}
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
            folderId={idPathFolder}
            onUpload={(e) => uploadFile(e)}
            onCreateFolder={createFolder}
          />
          {/* end action bar directory */}

          {/* start list directory */}
          {loading && <LoadingBall />}
          <ListContent
            dataFolder={dataFolder}
            dataFile={dataFile}
            onFolderClick={(folder) => fetchValueFolderById(folder, "folderId")}
          />

          {showAlert && <MyAlert message={alertMessage} />}
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
