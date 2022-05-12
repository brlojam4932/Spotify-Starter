import { useState, useEffect, useRef } from 'react';
import { useIPFS } from "./useIPFS";

function useAudio(nftAlbum) {
  const { resolveLink } = useIPFS();

  const [audio, setAudio] = useState(nftAlbum);
  const [trackIndex, setTrackIndex] = useState(0);
  const [newSong, setNewSong] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);

  // current audio being played
  const audioRef = useRef(new Audio(resolveLink(JSON.parse(audio[trackIndex].metadata).animation_url)));

  const intervalRef = useRef(); // keeps track current song and increment
  const isReady = useRef(false); // move on to next song

  const { duration } = audioRef.current; // length of song


  const toPrevTrack = () => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(audio.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  };


  const toNextTrack = () => {
    if (trackIndex < audio.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  };


  useEffect(() => {
    toggle(); // 2) on/off
    setAudio(nftAlbum); // 3) set audio to new array of objects and loop throgh songs
    if (trackIndex === 0) {
      setNewSong(newSong + 1);
    } else {
      setTrackIndex(0);
    };
  }, [nftAlbum]); // 1) trigger


  const startTimer = () => { // set interval that updates each second
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(Math.round(audioRef.current.currentTime));
        // Math round to nearest second
      }
    }, [1000]);
  };


  useEffect(() => {
    if (isPlaying) { // starts playing
      audioRef.current.play(); // starts timer
      startTimer();
    } else { // clears interval
      clearInterval(intervalRef.current);
      audioRef.current.pause();
    }
  }, [isPlaying]);


  useEffect(() => { // unmount
    return () => {
      audioRef.current.pause(); // pause
      clearInterval(intervalRef.current); // clear
    };
  }, []);


  // re-initialize
  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(resolveLink(JSON.parse(audio[trackIndex].metadata).animation_url));
    audioRef.current.volume = volume;
    setTrackProgress(Math.round(audioRef.current.currentTime));
    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      isReady.current = true;
    }
  }, [trackIndex, newSong]);


  const toggle = () => setIsPlaying(!isPlaying);


  const onSearch = (value) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };


  const onSearchEnd = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  }


  const onVolume = (vol) => {
    setVolume(vol);
    audioRef.current.volume = vol;
  };


  return [
    isPlaying,
    duration,
    toggle,
    toNextTrack,
    toPrevTrack,
    trackProgress,
    onSearch,
    onSearchEnd,
    onVolume,
    trackIndex
  ];
};

export default useAudio;