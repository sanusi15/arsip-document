import React, { useState } from "react";
import axios from "axios";
import "../../assets/css/main.css";

const apiUrl = import.meta.env.VITE_API_URL;

import ListFolder from "../../components/sidebar/listFolder";
import ListContent from "../../components/content/listContent";
import LoadingBall from "../../components/LoadingBall";
import Propile from "../../components/sidebar/profile";
import NavbarDirectory from "../../components/content/navbarDirectory";
import ActionBarDirectory from "../../components/content/actionBarDirectory";
import MyAlert from "../../components/myAlert";

const Dashboard = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [dataContent, setDataContent] = useState({});
  const [urlPathFoder, setUrlPathFoder] = useState("/");
  const [idPathFolder, setIdPathFolder] = useState(null);
  const [dataFolder, setDataFolder] = useState();
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showProgress, setShowProgress] = useState(false);
  const [progress, setProgress] = useState(0);

  const fetchValueFolder = async (data, type) => {
    setLoading(true);
    try {
      if (type === "folderId") {
        setDataFolder(data);
        const response = await axios.get(apiUrl + "getContentsByFolderId", {
          params: {
            folderId: data._id
          }
        });
        setLoading(false);
        if (response.status === 200) {
          setDataContent(response.data.data);
          setUrlPathFoder(data.pathShow);
          setIdPathFolder(data._id);
        } else {
          setDataContent();
        }
      } else {
        const response = await axios.get(apiUrl + "getContentsByPath", {
          params: {
            path: data
          }
        });
        setLoading(false);
        if (response.status === 200) {
          setDataContent(response.data.data);
          setUrlPathFoder(data.path);
          setIdPathFolder(data._id);
        } else {
          setDataContent();
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const uploadFile = async (e) => {
    try {
      const files = e.target.files;
      if (!files.length) return;
      const formData = new FormData();
      for (const item of files) {
        formData.append("file", item);
      }
      formData.append("path", urlPathFoder);
      formData.append("pathId", idPathFolder);
      setShowProgress(true);
      const response = await axios.post(apiUrl + "upload", formData, {
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
        setAlertMessage(response.data.message);
        setShowAlert(true);
        fetchValueFolder(dataFolder, "folderId");
        setShowAlert(false);
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

  return (
    <div className="h-screen p-5 m-0 bg-slate-200 select-none">
      <div className="w-full h-full rounded-md overflow-hidden bg-blue-100 flex">
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
            onFolderClick={(folder) => fetchValueFolder(folder, "folderId")}
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
            onEnterPress={(url) => fetchValueFolder(url, "path")}
          />
          {/* end navbar directory */}

          {/* start action bar directory */}
          <ActionBarDirectory
            folderId={idPathFolder}
            onUpload={(e) => uploadFile(e)}
          />
          {/* end action bar directory */}

          {/* start list directory */}
          {loading && <LoadingBall />}
          <ListContent
            items={dataContent}
            onFolderClick={(folder) => fetchValueFolder(folder, "folderId")}
          />
          {showAlert && <MyAlert message={alertMessage} />}
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
