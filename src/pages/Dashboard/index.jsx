import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../assets/css/main.css";

import ListFolder from "../../components/sidebar/listFolder";
import ListContent from "../../components/content/listContent";
import LoadingBall from "../../components/LoadingBall";
import Propile from "../../components/sidebar/profile";
import NavbarDirectory from "../../components/content/navbarDirectory";
import ActionBarDirectory from "../../components/content/actionBarDirectory";
const Dashboard = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [dataContent, setDataContent] = useState({});
  const [urlPathFoder, setUrlPathFoder] = useState("/");
  const [idPathFolder, setIdPathFolder] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchFolderContent = async (data, type) => {
    setLoading(true);
    try {
      if (type === "folderId") {
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
            onFolderClick={(folder) => fetchFolderContent(folder, "folderId")}
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
            onEnterPress={(url) => fetchFolderContent(url, "path")}
          />
          {/* end navbar directory */}

          {/* start action bar directory */}
          <ActionBarDirectory path={urlPathFoder} folderId={idPathFolder} />
          {/* end action bar directory */}

          {/* start list directory */}
          {loading && <LoadingBall />}
          <ListContent
            items={dataContent}
            onFolderClick={(folder) => fetchFolderContent(folder, "folderId")}
          />
          {/* end list directory */}
        </div>
        {/* end content */}
      </div>
    </div>
  );
};

export default Dashboard;
