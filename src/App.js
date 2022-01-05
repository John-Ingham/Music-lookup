import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  useEffect(() => {
    axios
      .get(
        //'https://musicbrainz.org/ws/2/recording/b9ad642e-b012-41c7-b72a-42cf4911f9ff?inc=artist-credits+isrcs+releases',
        'http://musicbrainz.org/ws/2/artist/b10bbbfc-cf9e-42e0-be17-e2c3e1d2600d?inc=release',
        // 'https://www.stands4.com/services/v2/lyrics.php?uid=1001&tokenid=tk324324&term=songs&artist=the%20beatles&format=json',
      )
      .then(({ data }) => {
        console.log(data)
        // setSongList(data)
      })
  }, [])

  const [songList, setSongList] = useState('')

  return (
    <div className="App">
      <p> application</p>
    </div>
  )
}

export default App
