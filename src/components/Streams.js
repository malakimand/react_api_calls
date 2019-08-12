import React, {useEffect, useState} from 'react'
import api from "../api";

function Streams() {
	const [channels, setChannels] = useState([])

	useEffect(()=> {
		const fetchData = async () => {
		const result = await api.get("https://api.twitch.tv/helix/streams")
		let dataArray = result.data.data
		
		let gameIDs = dataArray.map(streams => {
			return streams.game_id
		})

		let baseURL = 'https://api.twitch.tv/helix/games?'
		let queryparams = ""
		gameIDs.map(id => {
			return (queryparams = queryparams + `id=${id}&`)
		})

		let finalURL = baseURL + queryparams;
		let gameNames = await api.get(finalURL);
		let gameNameArray = gameNames.data.data;
		let finalArray = dataArray.map(stream => {
			stream.gameName = '';
			gameNameArray.map(name => {
				if(stream.game_id === name.id) {
					return stream.gameName = name.name;
				}
			})
			let newUrl = stream.thumbnail_url
        .replace('{width}', '300')
        .replace('{height}', '300');

        stream.thumbnail_url = newUrl;
        return stream;
		})
		setChannels(finalArray);
		
	}
	fetchData();
	}, [])


  return(
     <div>
      <h1 className="text-center">Most Popular Live Streams</h1>
      <div className="row">
      {channels.map(channel => (
        <div className="col-lg-4 col-md-6 col-sm-12 mt-5">
          <div className="card">
            <img className="card-img-top" src={channel.thumbnail_url} />
              <div className="card-body">
                <h3 className="card-title">{channel.user_name}</h3>
                <h5 className="card-text"> {channel.gameName}</h5>
                <div className="card-text"> {channel.viewer_count} live viewers </div>
                <button className="btn btn-success">
                <a
                    className="link"
                    href={"https://twitch.tv/" + channel.user_name}
                    target="_blank"
                    > watch {channel.user_name}s channel
                </a>
              </button>
            </div>
          </div>
        </div>
        ))}
    </div>
    </div>
  )
}

export default Streams;
