import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const CLIENT_ID = '57b75e7d44194165ac1df0adb0823cef'
  const REDIRECT_URI = 'http://localhost:3000'
  const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
  const RESPONSE_TYPE = 'token'

  const [songList, setSongList] = useState('')
  const [token, setToken] = useState('')
  const [searchKey, setSearchKey] = useState('')
  const [artists, setArtists] = useState([])

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem('token')

    if (!token && hash) {
      token = hash
        .substring(1)
        .split('&')
        .find((elem) => elem.startsWith('access_token'))
        .split('=')[1]

      //console.log(token) - check to make sure getting token
      window.location.hash = '' // reset to empty string
      window.localStorage.setItem('token', token) //set "token" to localStorage as whatever token value is
    }
    setToken(token) // save to local state also
  }, [])

  const logout = () => {
    setToken('') // reset state to empty
    window.localStorage.removeItem('token') // remove token from localStorage
  }

  const searchArtists = async (e) => {
    e.preventDefault()
    const { data } = await axios.get('https://api.spotify.com/v1/search', {
      //'https://spotify.com/v1/artists'
      //   'https://api.spotify.com/v1/artists/{3WrFJ7ztbogyGnTHbHJFl2}/top-tracks',
      // 'https://api.spotify.com/v1/artists/3WrFJ7ztbogyGnTHbHJFl2/top-tracks'
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: 'artist',
      },
    })
    console.log(data)
    setArtists(data.artists.items)
  }

  const renderArtists = () => {
    return artists.map((artist) => (
      <div key={artist.id}>
        {artist.images.length ? (
          <img width={'100%'} src={artist.images[0].url} alt="" />
        ) : (
          <div>No image </div>
        )}
        {artist.name}
      </div>
    ))
  }

  return (
    <div className="App">
      {!token ? (
        <a
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
        >
          Login to Spotify
        </a>
      ) : (
        <button onClick={logout}> Logout</button>
      )}

      {console.log('>>>token', token)}

      {token ? (
        <form onSubmit={searchArtists}>
          {/* call function */}
          <input
            type="text"
            onChange={(e) => setSearchKey(e.target.value)}
          />{' '}
          {/* set state to  whatever is input */}
          <button type={'submit'}>Search</button>
        </form>
      ) : (
        <h2>Please login</h2>
      )}

      {/* {renderArtists()} */}
    </div>
  )
}

export default App
