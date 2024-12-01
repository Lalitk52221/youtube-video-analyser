import { useContext, useEffect, useState } from "react";
import { API_KEY } from "../Apikey";
import UserContext from "./UserContext";

const RelatedVideos = () => {
  const { relatedVideoId, subscriber } = useContext(UserContext);
  console.log(subscriber);

  const [otherVideoDetails, setOtherVideoDetails] = useState([]);
  // const API_KEY = process.env.MY_APIKEY;
  //   console.log(relatedVideoId);
  const fetchOtherVideoDetails = async () => {
    const videoData = [];
    for (let i = 0; i < relatedVideoId.length; i++) {
      const YoutubeVideoUrl = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${relatedVideoId[i]}&key=${API_KEY}`;
      try {
        const response = await fetch(YoutubeVideoUrl);

        if (response.status === 200) {
          const resdata = await response.json();

          if (resdata.items && resdata.items.length > 0) {
            videoData.push(resdata.items[0]);
          }
        } else {
          console.log(
            `Failed to fetch video data for ID: ${relatedVideoId[i]}`
          );
        }
      } catch (error) {
        console.error("Error fetching video data:", error);
      }
    }
    setOtherVideoDetails(videoData);
    // console.log(videoData);
  };

  useEffect(() => {
    if (relatedVideoId) {
      fetchOtherVideoDetails();
    }
  }, [relatedVideoId]);

  otherVideoDetails.sort(
    (a, b) => new Date(a.snippet.publishedAt) - new Date(b.snippet.publishedAt)
  );
  //   console.log(otherVideoDetailsS)
  return (
    <div className="OthervideoDetails">
      <table>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Title</th>
            <th>Thumbnail</th>
            <th>Views</th>
            <th>Likes</th>
            <th>Comments</th>
            <th>Uploaded On</th>
            <th>Income</th>
          </tr>
        </thead>
        <tbody>
          {otherVideoDetails && otherVideoDetails.length > 0 ? (
            otherVideoDetails.map((video, index) => {
              const view = video?.statistics?.viewCount;
              const comment = video?.statistics?.commentCount;
              const like = video?.statistics?.likeCount;
              const price =
                Math.min(view, subscriber) + 10 * comment + 5 * like;
              console.log(subscriber);
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{video.snippet.title}</td>
                  <td>
                    <img
                      src={video.snippet.thumbnails.default.url}
                      alt="thumbnail"
                      style={{ width: "120px" }}
                    />
                  </td>
                  <td>{view}</td>
                  <td>{like}</td>
                  <td>{comment}</td>
                  <td>
                    {new Date(video.snippet.publishedAt).toLocaleDateString()}
                  </td>
                  <td>₹{price.toLocaleString("en-IN")}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="7">Loading...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
export default RelatedVideos;
