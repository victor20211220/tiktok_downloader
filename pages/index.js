import { useState } from "react"

export default function Home() {
  const apiKey = "6aa89f4a9922a5840be3ee5da267f5751b5986810108a3c22d154474db1e7e67";
  const apiUrl = "https://tweakdoor.com/convert/wp-json/aio-dl/api/";
  const [videoUrl, setVideoUrl] = useState("");
  const [load, setLoad] = useState(false);
  const [videoData, setVideoData] = useState(null);

  const handleVideoUrlChange = (event) => { //when video url changes
    const value = event.target.value;
    setVideoUrl(value);
  };

  const requestVideoData = async () => { //when click download button, send request to REST API
    if (!videoUrl)
      return;

    const apiRequestParams = new URLSearchParams({
      url: videoUrl,
      key: apiKey,
    })
    setLoad(true);
    const response = await fetch(`${apiUrl}?${apiRequestParams.toString()}`);
    const responseJson = await response.json();
    setLoad(false);
    setVideoData(responseJson);
  }

  function VideoDataBlock() {
    if (!videoData)
      return;

    const { title, thumbnail, medias } = { ...videoData };
    console.log(videoData);
    return <div className="row text-center">
      <div className="col-12 col-md-10 offset-md-1">
        <h2 className="mb-5">{title}</h2>
        <div className="row">
          <div className="col-12 col-md-4">
            <img className="img-fluid rounded w-100" src={thumbnail} />
          </div>

          <div className="col-12 col-md-8">
            <a href="https://tweakdoor.com/convert/wp-content/plugins/aio-video-downloader/download.php?source=tiktok&amp;media=MA==" className="btn btn-warning btn-sq btn-dl text-uppercase mx-1 my-1" target="_blank">
              <strong>{medias[0].quality}</strong>
              <br />
              <i className="fas fa-video"></i>
              {medias[0].extension}<br />({medias[0].formattedSize})
            </a>
            <a href="https://tweakdoor.com/convert/wp-content/plugins/aio-video-downloader/download.php?source=tiktok&media=MQ==" className="btn btn-warning btn-sq btn-dl text-uppercase mx-1 my-1" target="_blank">
              <strong>{medias[1].quality}</strong>
              <br />
              <i className="fas fa-video"></i>
              {medias[1].extension}<br />({medias[1].formattedSize})
            </a>
            <a href="https://tweakdoor.com/convert/wp-content/plugins/aio-video-downloader/download.php?source=tiktok&media=Mg==" className="btn btn-danger btn-sq btn-dl text-uppercase mx-1 my-1" target="_blank">
              <strong>{medias[2].quality}</strong>
              <br />
              <i className="fas volume-up"></i>
              {medias[2].extension}<br />({medias[2].formattedSize})
            </a>
          </div>
        </div>
      </div>
    </div>
  }

  return (
    <div className="container mt-5 pt-5">
      { load? <p class="text-center">Loading...</p> : (videoData ? <VideoDataBlock /> :
        <div className="row">
          <div className="col-12 col-md-8 offset-md-2 text-center">
            <h4>Enter tiktok page url</h4>
            <div className="d-flex mt-5">
            <input type="url" className="form-control" value={videoUrl} onChange={handleVideoUrlChange} />
            <button onClick={requestVideoData} className="btn btn-warning ms-2 text-uppercase">Download</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
