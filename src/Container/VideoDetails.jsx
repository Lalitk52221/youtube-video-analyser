import { API_KEY } from "../Apikey";
import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./VideoDetails.css";
import { FaComment, FaEye, FaThumbsUp } from "react-icons/fa";
import RelatedVideos from "./RelatedVideos";
import UserContext from "./UserContext";

const VideoDetails = () => {
  
// const UserContext = createContext();
  const [vdata, setVData] = useState(null);
  const [cdata, setCData] = useState(null);
  const [channelId, setChannelId] = useState(null);
  const [relatedVideo, setRelatedVideo] = useState(null);
  const [relatedVideoId, setRelatedVideoId] = useState([]);
  const param = useParams();

  const fetchVideoData = async () => {
    try {
      const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${param.vdID}&key=${API_KEY}`
      );
      const resdata = await response.json();
      setVData(resdata.items[0]);
      const chId = resdata.items[0].snippet.channelId;
      setChannelId(chId);
      // console.log(resdata)
    } catch (error) {
      console.log("Error in Youtube video Url Fetching data", error);
    }
  };

  const fetchChannelData = async () => {
    try {
      const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&key=${API_KEY}`
      );
      const resdata = await response.json();
      setCData(resdata.items[0]);
      console.log(resdata)
    } catch (error) {
      console.log("Error in channel data Fetching data", error);
    }
  };
  const fetchRelatedVideo = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${channelId}&part=snippet,id&order=date&maxResults=2`
      );
      const resdata = await response.json();
      setRelatedVideo(resdata);
      const a = resdata.items.map((videoId) => videoId.id.videoId);
      // console.log(a, "videoId");
      setRelatedVideoId(a)
    } catch (error) {
      console.log("Error Fetching data", error);
    }
  };

  useEffect(() => {
    if (param.vdID) {
      fetchVideoData();
    }
  }, [param.vdID]);

  useEffect(() => {
    if (channelId) {
      fetchChannelData();
      fetchRelatedVideo();
    }
  }, [channelId]);

  const subscriber = cdata?.statistics?.subscriberCount;
  const view = vdata?.statistics?.viewCount;
  const comment = vdata?.statistics?.commentCount;
  const like = vdata?.statistics?.likeCount;

  const price = Math.min(view, subscriber) + 10 * comment + 5 * like;
  const formattedPrice = price.toLocaleString("en-IN");
  return (
    <div className="videoDetails">
      {vdata ? (
        <div className="data">
          <img src={vdata?.snippet?.thumbnails?.high?.url} alt="" />
          <div className="details">
            <p className="viewCount"> {vdata?.snippet?.channelTitle}</p>
            <p className="viewCount">
              <FaEye /> {vdata?.statistics?.viewCount}
            </p>
            <p className="like">
              <FaThumbsUp /> {like}
            </p>
            <p className="comment">
              <FaComment />
              {comment}
            </p>
          </div>
          <div className="price">
            {vdata ? <p>₹ {formattedPrice}.00</p> : "Loading..."}
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <UserContext.Provider value={{relatedVideoId, subscriber}}>
      <RelatedVideos />
      </UserContext.Provider>
    </div>
  );
};
export default VideoDetails;
