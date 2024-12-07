import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef(null);
  const seekBg = useRef();
  const seekBar = useRef();

  const url = "http://localhost:4000";

  const [songsData, setSongsData] = useState([]);
  const [albumsData, setAlbumsData] = useState([]);
  const [playlists, setPlaylists] = useState([]); // Added playlists state
  const [track, setTrack] = useState(null);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      second: 0,
      minute: 0,
    },
    totalTime: {
      second: 0,
      minute: 0,
    },
  });

  // Function to play the current track
  const play = async () => {
    if (audioRef.current) {
      try {
        await audioRef.current.play();
        setPlayStatus(true);
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    }
  };

  // Function to pause the current track
  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPlayStatus(false);
    }
  };

  // Function to play a specific track by ID
  const playWithId = (id) => {
    const selectedTrack = songsData.find((item) => item._id === id);
    if (selectedTrack) {
      setTrack(selectedTrack);
    }
  };

  // Function to play the previous track
  const previous = () => {
    const currentIndex = songsData.findIndex((item) => item._id === track._id);
    if (currentIndex > 0) {
      setTrack(songsData[currentIndex - 1]);
    }
  };

  // Function to play the next track
  const next = () => {
    const currentIndex = songsData.findIndex((item) => item._id === track._id);
    if (currentIndex < songsData.length - 1) {
      setTrack(songsData[currentIndex + 1]);
    }
  };

  // Seek to a specific position in the current track
  const seekSong = (e) => {
    if (audioRef.current) {
      audioRef.current.currentTime =
        (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
        audioRef.current.duration;
    }
  };

  // Fetch songs data from the server
  const getSongsData = async () => {
    try {
      const response = await axios.get(`${url}/api/song/list`);
      if (response.data && response.data.songs) {
        setSongsData(response.data.songs);
        if (response.data.songs.length > 0) {
          setTrack(response.data.songs[0]);
        }
      }
    } catch (error) {
      console.log("Error fetching songs:", error);
    }
  };

  // Fetch albums data from the server
  const getAlbumsData = async () => {
    try {
      const response = await axios.get(`${url}/api/album/list`);
      setAlbumsData(response.data.albums);
    } catch (error) {
      console.log("Error fetching albums:", error);
    }
  };

  // Fetch playlists from the server
  const getPlaylists = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${url}/api/playlists/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setPlaylists(response.data.playlists);
      }
    } catch (error) {
      console.error("Error fetching playlists:", error);
    }
  };

  // Handle time update in the audio player
  useEffect(() => {
    if (audioRef.current) {
      const handleTimeUpdate = () => {
        if (audioRef.current) {
          seekBar.current.style.width =
            Math.floor(
              (audioRef.current.currentTime / audioRef.current.duration) * 100
            ) + "%";
          setTime({
            currentTime: {
              second: Math.floor(audioRef.current.currentTime % 60),
              minute: Math.floor(audioRef.current.currentTime / 60),
            },
            totalTime: {
              second: Math.floor(audioRef.current.duration % 60),
              minute: Math.floor(audioRef.current.duration / 60),
            },
          });
        }
      };

      audioRef.current.ontimeupdate = handleTimeUpdate;
    }
  }, [track]);

  // Fetch data on component mount
  useEffect(() => {
    getSongsData();
    getAlbumsData();
    getPlaylists(); // Fetch playlists
  }, []);

  // Automatically play the new track when it changes, if initiated by user action
  useEffect(() => {
    if (track && audioRef.current && playStatus) {
      audioRef.current.src = track.file;
      play(); // Attempt to play the track
    }
  }, [track]);

  const contextValue = {
    audioRef,
    seekBg,
    seekBar,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
    songsData,
    albumsData,
    playlists, // Provide playlists
    setPlaylists, // Provide setPlaylists
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {props.children}
      <audio ref={audioRef} preload="auto" className="hidden"></audio>
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
