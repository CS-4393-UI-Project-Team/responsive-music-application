import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const Player = () => {
  const {
    track,
    seekBar,
    seekBg,
    playStatus,
    play,
    pause,
    time,
    previous,
    next,
    seekSong,
  } = useContext(PlayerContext);

  return track ? (
    <div className="h-[10%] bg-[#3B3D3F] flex justify-between items-center text-white px-2 py-4">
      <div className="hidden lg:flex items-center gap-4">
        <img className="w-12" src={track.image} alt={track.name} />
        <div className="w-32">
          {" "}
          {/* Fixed width for the text container */}
          <p className="truncate">{track.name}</p>
          <p className="truncate text-sm text-gray-400">
            {track.desc.slice(0, 12)}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center gap-1">
        <div className="flex gap-4">
          <img
            className="w-4 cursor-pointer"
            src={assets.shuffle_icon}
            alt="Shuffle"
          />
          <img
            onClick={previous}
            className="w-4 cursor-pointer"
            src={assets.prev_icon}
            alt="Previous"
          />
          {playStatus ? (
            <img
              onClick={pause}
              className="w-4 cursor-pointer"
              src={assets.pause_icon}
              alt="Pause"
            />
          ) : (
            <img
              onClick={play}
              className="w-4 cursor-pointer"
              src={assets.play_icon}
              alt="Play"
            />
          )}
          <img
            onClick={next}
            className="w-4 cursor-pointer"
            src={assets.next_icon}
            alt="Next"
          />
          <img
            className="w-4 cursor-pointer"
            src={assets.loop_icon}
            alt="Loop"
          />
        </div>
        <div className="flex items-center gap-5">
          <p>
            {time.currentTime.minute}:
            {time.currentTime.second < 10
              ? "0" + time.currentTime.second
              : time.currentTime.second}
          </p>
          <div
            ref={seekBg}
            onClick={seekSong}
            className="w-[60vw] max-w-[500px] bg-slate-300 rounded-full cursor-pointer"
          >
            <hr
              ref={seekBar}
              className="h-1 border-none w-0 bg-[#06A0B5] rounded-full"
            />
          </div>
          <p>
            {time.totalTime.minute}:
            {time.totalTime.second < 10
              ? "0" + time.totalTime.second
              : time.totalTime.second}
          </p>
        </div>
      </div>
      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <img className="w-4" src={assets.plays_icon} alt="Play Icon" />
        <img className="w-4" src={assets.mic_icon} alt="Mic Icon" />
        <img className="w-4" src={assets.queue_icon} alt="Queue Icon" />
        <img className="w-4" src={assets.speaker_icon} alt="Speaker Icon" />
        <img className="w-4" src={assets.volume_icon} alt="Volume Icon" />
        <div className="w-20 bg-slate-50 h-1 rounded"></div>
        <img
          className="w-4"
          src={assets.mini_player_icon}
          alt="Mini Player Icon"
        />
        <img className="w-4" src={assets.zoom_icon} alt="Zoom Icon" />
      </div>
    </div>
  ) : null;
};

export default Player;
