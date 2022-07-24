import React, { Component } from 'react';
import './app.css';
import { Spin, Space, Modal, Button, Avatar, Image, Menu, Dropdown, notification } from "antd";
import io from "socket.io-client";
import { useEffect, useState } from "react";
import useSound from 'use-sound';
import { uuid } from 'uuidv4';

// Images
import ReactImage from './tesla-model-3-screen-mockup-promo.jpg';
// Prepared AI Response List
import sound_1_Welcome from '../../public/speechAudios/1_Welcome_to_deictic_interface.mp3';
import sound_2_Gesture from '../../public/speechAudios/2_Gesture_Recognizing.mp3';
import sound_3_Edbcastle from '../../public/speechAudios/3_5_stars_Edinburgh_Castle.mp3';
import sound_4_Save from '../../public/speechAudios/4_Save_locations.mp3';
import sound_5_Rest1 from '../../public/speechAudios/5_4.6_stars_Petit_Paris.mp3';
import sound_6_Saved from '../../public/speechAudios/6_Location_saved.mp3';
import sound_7_Ok from '../../public/speechAudios/7_Alright.mp3';

// Socket.io connection
const socket = io.connect("http://localhost:8080");

function App() {
  //Room State
  const [room, setRoom] = useState("");
  const [projName, setProjName] = useState('');

  // Messages States
  const [message, setMessage] = useState("");
  const [soundIdSent, setSoundIdSent] = useState("");
  const [logo, setLogo] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [soundIdReceived, setSoundIdReceived] = useState("");

  // Audio resource mapping
  const soundsMap = {
    "1_Welcome": sound_1_Welcome,
    "2_Gesture": sound_2_Gesture,
    "3_Edbcastle": sound_3_Edbcastle,
    "4_Save": sound_4_Save,
    "5_Rest1": sound_5_Rest1,
    "6_Saved": sound_6_Saved,
    "7_Ok": sound_7_Ok,
  }

  // Use audio by url
  // const useAudio = (soundId) => {
  //   console.log(soundIdReceived)
  //   // check current received soundID
  //   if (soundId == null || soundId == "") {
  //     console.log('received error')
  //     return [() => { }, () => { }];
  //   }
  //   let _url = soundsMap[soundId];
  //   const [playing, setPlaying] = useState(false);
  //   const [audio, SetAudio] = useState(new Audio(_url));

  //   let toggle = () => {
  //     setPlaying(!playing);
  //     console.log(`remotive audio trigger - ${_url}`)
  //   }

  //   useEffect(() => {
  //     playing ? audio.play() : audio.pause();
  //   },
  //     [playing]
  //   );

  //   useEffect(() => {
  //     audio.addEventListener('ended', () => setPlaying(false));
  //     return () => {
  //       audio.removeEventListener('ended', () => setPlaying(false));
  //     };
  //   }, []);

  //   useEffect(() => {
  //     SetAudio(new Audio(_url));
  //   }, [soundIdReceived]);

  //   return [playing, toggle];
  // };

  // Set join room 
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  // Send text message
  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  // Send audio ID
  const sendSoundId = (inputSoundId = null) => {
    // if (soundIdSent !== "") {
    //   let soundId = soundIdSent;
    //   socket.emit("send_soundid", { soundId, room });
    // }
    if (inputSoundId && inputSoundId !== null) {
      let soundId = inputSoundId;
      socket.emit("send_soundid", { soundId, room });
      console.log('send sound id:' + inputSoundId)
    }
  };

  // test
  const Playit = (soundId) => {
    let _url = soundsMap[soundId]
    let audio = new Audio(_url);
    audio.play();
    console.log(soundId);
  }

  // Listen socket.IO
  useEffect(() => {
    fetch('/api/getProjName')
      .then(res => res.json())
      .then(proj => setProjName(proj && proj.name));
    // Message Receive
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
    // AI Speech Assistant Audio Receive
    socket.on("receive_speech", (data) => {
      setSoundIdReceived(data.soundId);
      // Toggle audio playing by reveived audio id
      // useAudio(data.soundId);
      Playit(data.soundId);
    });
  }, [socket]);

  const buttonList = Object.keys(soundsMap)
  // const audListItems = buttonList.map((name, index) => 
  //   <Button onClick={sendSoundId(name)}>{name}</Button>
  // );

  return (
    <>
      <div>
        {/* {projName ? <h1>{`Hello ${projName}`}</h1> : <h1>Loading.. please wait!</h1>} */}
        <img
          width={330}
          // style={{display: 'block'}}
          src={ReactImage}
        />
      </div>
      <div>
        {buttonList.map((name, index) =>
          <button key={index} onClick={() => sendSoundId(name)}>{name}</button>
        )}
      </div>
      <div className="App">
        <div>
          <input
            placeholder="Room Number..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}> Join Room</button>
        </div>
        <div>
          <input
            placeholder="Message..."
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          />
          <button onClick={sendMessage}> Send Message</button>
        </div>
        <div>
          <input
            placeholder="Sound ID..."
            onChange={(event) => {
              setSoundIdSent(event.target.value);
            }}
          />
          <button onClick={sendSoundId}> Trigger Sound</button>
        </div>
        <h1> Message:</h1>
        {messageReceived}
        {soundIdReceived}
      </div>
    </>

  );
}

export default App;