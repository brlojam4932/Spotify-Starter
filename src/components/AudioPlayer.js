import React from 'react';
import "./AudioPlayer.css";
import { Slider, Switch } from 'antd';
import { SoundOutlined, StepBackwardOutlined, StepForwardOutlined, PlayCircleFilled, PauseCircleFilled } from '@ant-design/icons';
import { useIPFS } from "../hooks/useIPFS";

function AudioPlayer({ nftAlbum }) {
  const { resolveLink } = useIPFS();
  return (
    <div className="buttons" style={{ width: "300px", justifyContent: "start" }}>
      <img className="cover" src={resolveLink(JSON.parse(nftAlbum[0].metadata).image)} alt="currentCover" />
      <div>
        <div className="songTitle">{JSON.parse(nftAlbum[0].metadata).name}</div>
        <div className="songAlbum">{nftAlbum[0].name}</div>
      </div>
    </div>
  )
}

export default AudioPlayer;