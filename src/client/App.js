import React, { Component } from 'react';
import './app.css';
import 'antd/dist/antd.css';
import { Spin, Space, Modal, Button, Avatar, Image, Menu, Dropdown, notification, Divider } from "antd";
import { SettingOutlined } from '@ant-design/icons';
import { Cascader, Input, InputNumber, Select } from 'antd';
import { Col, Row } from 'antd';
import io from "socket.io-client";
import { useEffect, useState } from "react";
import useSound from 'use-sound';
import { uuid } from 'uuidv4';

// Images
import ReactImage from './tesla-model-3-screen-mockup-promo.jpg';
import VoiceGIF from '../../public/speechAudios/voice.gif';
// Prepared AI Response List
// import wrongspeech_07 from '../../public/speechAudios/wrongspeech_07.mp3';
// import wrongspeech_06 from '../../public/speechAudios/wrongspeech_06.mp3';
// import wrongspeech_05 from '../../public/speechAudios/wrongspeech_05.mp3';
// import wrongspeech_04 from '../../public/speechAudios/wrongspeech_04.mp3';
// import wrongspeech_03 from '../../public/speechAudios/wrongspeech_03.mp3';
// import wrongspeech_02 from '../../public/speechAudios/wrongspeech_02.mp3';
// import wrongspeech_01 from '../../public/speechAudios/wrongspeech_01.mp3';

// normal long speech
import sorry_03 from '../../public/speechAudios/sorry_03.mp3';
import sorry_02 from '../../public/speechAudios/sorry_02.mp3';
import sorry_01 from '../../public/speechAudios/sorry_01.mp3';
import shop_10_47 from '../../public/speechAudios/shop_10_4-7.mp3';
import shop_09_50 from '../../public/speechAudios/shop_09_5-0.mp3';
import shop_08_45 from '../../public/speechAudios/shop_08_4-5.mp3';
import shop_07_40 from '../../public/speechAudios/shop_07_4-0.mp3';
import shop_06_41 from '../../public/speechAudios/shop_06_4-1.mp3';
import shop_05_44 from '../../public/speechAudios/shop_05_4-4.mp3';
import shop_04_48 from '../../public/speechAudios/shop_04_4-8.mp3';
import shop_03_40 from '../../public/speechAudios/shop_03_4-0.mp3';
import shop_02_00 from '../../public/speechAudios/shop_02_0-0.mp3';
import shop_01_43 from '../../public/speechAudios/shop_01_4-3.mp3';
import service_02 from '../../public/speechAudios/service_02.mp3';
import service_01 from '../../public/speechAudios/service_01.mp3';
import save_01 from '../../public/speechAudios/save_01.mp3';
import rest_10_46 from '../../public/speechAudios/rest_10_4-6.mp3';
import rest_09_46 from '../../public/speechAudios/rest_09_4-6.mp3';
import rest_08_46 from '../../public/speechAudios/rest_08_4-6.mp3';
import rest_07_37 from '../../public/speechAudios/rest_07_3-7.mp3';
import rest_06_41 from '../../public/speechAudios/rest_06_4-1.mp3';
import rest_05_38 from '../../public/speechAudios/rest_05_3-8.mp3';
import rest_04_43 from '../../public/speechAudios/rest_04_4-3.mp3';
import rest_03_46 from '../../public/speechAudios/rest_03_4-6.mp3';
import rest_02_43 from '../../public/speechAudios/rest_02_4-3.mp3';
import rest_01_45 from '../../public/speechAudios/rest_01_4-5.mp3';
import notsave_01 from '../../public/speechAudios/notsave_01.mp3';
import church_03 from '../../public/speechAudios/church_03.mp3';
import church_02 from '../../public/speechAudios/church_02.mp3';
import church_01 from '../../public/speechAudios/church_01.mp3';
import castle from '../../public/speechAudios/castle.mp3';

// normal short speech
import sorry_03_s from '../../public/speechAudios/sorry_03_s.mp3';
import sorry_02_s from '../../public/speechAudios/sorry_02_s.mp3';
import sorry_01_s from '../../public/speechAudios/sorry_01_s.mp3';
import shop_10_47_s from '../../public/speechAudios/shop_10_s.mp3';
import shop_09_50_s from '../../public/speechAudios/shop_09_s.mp3';
import shop_08_45_s from '../../public/speechAudios/shop_08_s.mp3';
import shop_07_40_s from '../../public/speechAudios/shop_07_s.mp3';
import shop_06_41_s from '../../public/speechAudios/shop_06_s.mp3';
import shop_05_44_s from '../../public/speechAudios/shop_05_s.mp3';
import shop_04_48_s from '../../public/speechAudios/shop_04_s.mp3';
import shop_03_40_s from '../../public/speechAudios/shop_03_s.mp3';
import shop_02_00_s from '../../public/speechAudios/shop_02_s.mp3';
import shop_01_43_s from '../../public/speechAudios/shop_01_s.mp3';
import service_02_s from '../../public/speechAudios/service_02_s.mp3';
import service_01_s from '../../public/speechAudios/service_01_s.mp3';
import rest_10_46_s from '../../public/speechAudios/rest_10_s.mp3';
import rest_09_46_s from '../../public/speechAudios/rest_09_s.mp3';
import rest_08_46_s from '../../public/speechAudios/rest_08_s.mp3';
import rest_07_37_s from '../../public/speechAudios/rest_07_s.mp3';
import rest_06_41_s from '../../public/speechAudios/rest_06_s.mp3';
import rest_05_38_s from '../../public/speechAudios/rest_05_s.mp3';
import rest_04_43_s from '../../public/speechAudios/rest_04_s.mp3';
import rest_03_46_s from '../../public/speechAudios/rest_03_s.mp3';
import rest_02_43_s from '../../public/speechAudios/rest_02_s.mp3';
import rest_01_45_s from '../../public/speechAudios/rest_01_s.mp3';
import church_03_s from '../../public/speechAudios/church_03_s.mp3';
import church_02_s from '../../public/speechAudios/church_02_s.mp3';
import church_01_s from '../../public/speechAudios/church_01_s.mp3';
import castle_s from '../../public/speechAudios/castle_s.mp3';

// welcome and to go
import go from '../../public/speechAudios/0_3go.mp3';
import tips from '../../public/speechAudios/0_2tips.mp3';
import welcome from '../../public/speechAudios/0_1welcome.mp3';

// Ant Layout
const { Option, OptGroup } = Select;
const selectBefore = (
  <Select
    defaultValue="add"
    style={{
      width: 60,
    }}
  >
    <Option value="add">+</Option>
    <Option value="minus">-</Option>
  </Select>
);

// Socket.io connection
// const socket = io.connect("http://localhost:8080");
const socket = io.connect("http://121.37.234.166");

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
  const [speechType, setSpeechType] = useState("short");

  // Experiemntal States
  const [trialType, settrialType] = useState("SSAP");

  // Audio resource mapping
  const soundsMap = {
    // "1_Welcome": sound_1_Welcome,
    // "2_Gesture": sound_2_Gesture,
    // "3_Edbcastle": sound_3_Edbcastle,
    // "4_Save": sound_4_Save,
    // "5_Rest1": sound_5_Rest1,
    // "6_Saved": sound_6_Saved,
    // "7_Ok": sound_7_Ok,
    // 'wrongspeech_07': wrongspeech_07,
    // 'wrongspeech_06': wrongspeech_06,
    // 'wrongspeech_05': wrongspeech_05,
    // 'wrongspeech_04': wrongspeech_04,
    // 'wrongspeech_03': wrongspeech_03,
    // 'wrongspeech_02': wrongspeech_02,
    // 'wrongspeech_01': wrongspeech_01,
    // short response
    'shop_10_s': shop_10_47_s,
    'shop_09_s': shop_09_50_s,
    'shop_08_s': shop_08_45_s,
    'shop_07_s': shop_07_40_s,
    'shop_06_s': shop_06_41_s,
    'shop_05_s': shop_05_44_s,
    'shop_04_s': shop_04_48_s,
    'shop_03_s': shop_03_40_s,
    'shop_02_s': shop_02_00_s,
    'shop_01_s': shop_01_43_s,
    'service_02_s': service_02_s,
    'service_01_s': service_01_s,
    'rest_10_s': rest_10_46_s,
    'rest_09_s': rest_09_46_s,
    'rest_08_s': rest_08_46_s,
    'rest_07_s': rest_07_37_s,
    'rest_06_s': rest_06_41_s,
    'rest_05_s': rest_05_38_s,
    'rest_04_s': rest_04_43_s,
    'rest_03_s': rest_03_46_s,
    'rest_02_s': rest_02_43_s,
    'rest_01_s': rest_01_45_s,
    'church_03_s': church_03_s,
    'church_02_s': church_02_s,
    'church_01_s': church_01_s,
    'sorry_03_s': sorry_03_s,
    'sorry_02_s': sorry_02_s,
    'sorry_01_s': sorry_01_s,
    'castle_s': castle_s,
    // long response
    'shop_10_4-7': shop_10_47,
    'shop_09_5-0': shop_09_50,
    'shop_08_4-5': shop_08_45,
    'shop_07_4-0': shop_07_40,
    'shop_06_4-1': shop_06_41,
    'shop_05_4-4': shop_05_44,
    'shop_04_4-8': shop_04_48,
    'shop_03_4-0': shop_03_40,
    'shop_02_0-0': shop_02_00,
    'shop_01_4-3': shop_01_43,
    'service_02': service_02,
    'service_01': service_01,
    'rest_10_4-6': rest_10_46,
    'rest_09_4-6': rest_09_46,
    'rest_08_4-6': rest_08_46,
    'rest_07_3-7': rest_07_37,
    'rest_06_4-1': rest_06_41,
    'rest_05_3-8': rest_05_38,
    'rest_04_4-3': rest_04_43,
    'rest_03_4-6': rest_03_46,
    'rest_02_4-3': rest_02_43,
    'rest_01_4-5': rest_01_45,
    'church_03': church_03,
    'church_02': church_02,
    'church_01': church_01,
    'sorry_03': sorry_03,
    'sorry_02': sorry_02,
    'sorry_01': sorry_01,
    'save_01': save_01,
    'notsave_01': notsave_01,
    'castle': castle,
    'go': go,
    'tips': tips,
    'welcome': welcome,
  }

  // Audio categories
  const audioTypeMap = {
    "common": ['welcome', 'tips', 'go'],
    "shop": ['shop_01_4-3', 'shop_02_0-0', 'shop_03_4-0', 'shop_04_4-8', 'shop_05_4-4', 'shop_06_4-1', 'shop_07_4-0', 'shop_08_4-5', 'shop_09_5-0', 'shop_10_4-7'], //67 - 10
    "restaurant": ['rest_01_4-5', 'rest_02_4-3', 'rest_03_4-6', 'rest_04_4-3', 'rest_05_3-8', 'rest_06_4-1', 'rest_07_3-7', 'rest_08_4-6', 'rest_09_4-6', 'rest_10_4-6'], //86 - 10
    "service": ['service_01', 'service_02'], //34 -5
    "church": ['church_01', 'church_02', 'church_03'], //4 - 4
    "castle": ['castle'], //1 - 1
    "private_house": ['sorry_01', 'sorry_02', 'sorry_03'], //9 - 3
    // "wrongspeech": ['wrongspeech_01', 'wrongspeech_02', 'wrongspeech_03', 'wrongspeech_04', 'wrongspeech_05', 'wrongspeech_06', 'wrongspeech_07'], //wrong objects, guidance
    "wrongspeech": [], //wrong objects, guidance
    "shop_s": ['shop_01_s', 'shop_02_s', 'shop_03_s', 'shop_04_s', 'shop_05_s', 'shop_06_s', 'shop_07_s', 'shop_08_s', 'shop_09_s', 'shop_10_s'], //67 - 10
    "restaurant_s": ['rest_01_s', 'rest_02_s', 'rest_03_s', 'rest_04_s', 'rest_05_s', 'rest_06_s', 'rest_07_s', 'rest_08_s', 'rest_09_s', 'rest_10_s'], //86 - 10
    "service_s": ['service_01_s', 'service_02_s'], //34 -5
    "church_s": ['church_01_s', 'church_02_s', 'church_03_s'], //4 - 4
    "castle_s": ['castle_s'], //1 - 1
    "private_house_s": ['sorry_01_s', 'sorry_02_s', 'sorry_03_s'], //9 - 3
  }

  // Manipulate Faults
  const faultType = {
    "0_straightline_trial": {},
    "1_normal_trial": {},
    "2_no_cursor_trial": {}, // no cursor at all
    "3_wrong_cursor_trial": {},// 50% each, correct speech, manally one right one wrong side
    "4_wrong_speech_trial": {},// 50% each, 50% wrong objects
    "5_wrong_detection_trial": {} // normal, wrong side objects
  }

  // if the driver point at something I can't see it, then

  // if the driver point one thing then he change it immediately

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

  // Trigger sounds based on button (landmark type)
  const sendSoundandomBy = (audioType = null) => {
    if (!audioType) return;
    let audioArray = audioTypeMap[audioType]
    if (!audioArray || audioArray.length == 0) {
      console.log('no commands found');
    }
    let audioIdWillSent = audioArray[Math.floor(Math.random() * audioArray.length)];
    sendSoundId(audioIdWillSent);
  }

  // Voice Image/gif
  const [isVoicePlay, setIsVoicePlay] = useState(false);
  const toggleVoiceImage = () => {
    setIsVoicePlay(!isVoicePlay);
  }

  var audio = null;

  useEffect(() => {
    if (audio) {
      isVoicePlay ? audio.play() : audio.pause();
    }
  },
    [isVoicePlay]
  );

  // Play audio by trigger
  const Playit = (soundId) => {
    let _url = soundsMap[soundId]
    if (audio) audio.pause();
    audio = new Audio(_url);
    audio.addEventListener('ended', () => setIsVoicePlay(false));
    audio.play();
    toggleVoiceImage();
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

  // Modal of Buttons Triggers
  const [isModalVisible, setIsModalVisible] = useState(false);
  const buttonList = Object.keys(soundsMap)

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // Fault Tyoe Control
  const handleChange = (value) => {
    settrialType(value);
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    if (trialType == "SSAP" || trialType == "SSSP") {
      setSpeechType("short");
    } else {
      setSpeechType("long");
    }
  },
    [trialType]
  );

  // preload all audios
  let loaded = 0;
  const loadedAudio = () => {
    loaded++;
    if (loaded == buttonList.length) {
      setMessageReceived('Preload succeed');
    }

  }
  const preloadAudios = (url) => {
    let _audio = new Audio(url);
    _audio.addEventListener('canplaythrough', loadedAudio, false);
    _audio.src = url;
  }

  preloadAudios(sorry_03);
  preloadAudios(sorry_02);
  preloadAudios(sorry_01);
  preloadAudios(shop_10_47);
  preloadAudios(shop_09_50);
  preloadAudios(shop_08_45);
  preloadAudios(shop_07_40);
  preloadAudios(shop_06_41);
  preloadAudios(shop_05_44);
  preloadAudios(shop_04_48);
  preloadAudios(shop_03_40);
  preloadAudios(shop_02_00);
  preloadAudios(shop_01_43);
  preloadAudios(service_02);
  preloadAudios(service_01);
  preloadAudios(save_01);
  preloadAudios(rest_10_46);
  preloadAudios(rest_09_46);
  preloadAudios(rest_08_46);
  preloadAudios(rest_07_37);
  preloadAudios(rest_06_41);
  preloadAudios(rest_05_38);
  preloadAudios(rest_04_43);
  preloadAudios(rest_03_46);
  preloadAudios(rest_02_43);
  preloadAudios(rest_01_45);
  preloadAudios(notsave_01);
  preloadAudios(church_03);
  preloadAudios(church_02);
  preloadAudios(church_01);
  preloadAudios(castle);
  preloadAudios(sorry_03_s);
  preloadAudios(sorry_02_s);
  preloadAudios(sorry_01_s);
  preloadAudios(shop_10_47_s);
  preloadAudios(shop_09_50_s);
  preloadAudios(shop_08_45_s);
  preloadAudios(shop_07_40_s);
  preloadAudios(shop_06_41_s);
  preloadAudios(shop_05_44_s);
  preloadAudios(shop_04_48_s);
  preloadAudios(shop_03_40_s);
  preloadAudios(shop_02_00_s);
  preloadAudios(shop_01_43_s);
  preloadAudios(service_02_s);
  preloadAudios(service_01_s);
  preloadAudios(rest_10_46_s);
  preloadAudios(rest_09_46_s);
  preloadAudios(rest_08_46_s);
  preloadAudios(rest_07_37_s);
  preloadAudios(rest_06_41_s);
  preloadAudios(rest_05_38_s);
  preloadAudios(rest_04_43_s);
  preloadAudios(rest_03_46_s);
  preloadAudios(rest_02_43_s);
  preloadAudios(rest_01_45_s);
  preloadAudios(church_03_s);
  preloadAudios(church_02_s);
  preloadAudios(church_01_s);
  preloadAudios(castle_s);
  preloadAudios(go);
  preloadAudios(tips);
  preloadAudios(welcome);

  // buttonList.map((name, index) => {
  //   let _url = soundsMap[name];
  //   new Audio(_url);
  //   console.log('preload successed');
  //   setMessageReceived('Preload succeed');
  // })

  return (
    <>
      <div>
        {/* {projName ? <h1>{`Hello ${projName}`}</h1> : <h1>Loading.. please wait!</h1>} */}
        <br /><br />
        {!isVoicePlay ? <Image
          style={{
            maxWidth: "100vw",
            top: 0,
            paddingBottom: 0
          }}
          width="100vw"
          // style={{display: 'block'}}
          src={ReactImage}
        /> : null}
        {isVoicePlay ? <Image
          style={{
            maxWidth: "100vw",
            top: 0,
            paddingBottom: 0
          }}
          width="100vw"
          // style={{display: 'block'}}
          src={VoiceGIF}
        /> : null}
      </div>
      <div className="App" id="container">
        <div>
          {/* <br/><br/> */}
          <input
            placeholder="Room Number..."
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}> Join Room</button>
        </div>
        {/* -------------------- HIDDEN ------------------------------------ */}
        <div>
          <input hidden
            placeholder="Message..."
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          />
          <button hidden onClick={sendMessage}> Send Message</button>
        </div>
        <div hidden>
          <input
            placeholder="Sound ID..."
            onChange={(event) => {
              setSoundIdSent(event.target.value);
            }}
          />
          <button onClick={sendSoundId}> Trigger Sound</button>
        </div>
        {/* --------------------------- HIDDEN -------------------------*/}
        <h1> Message:</h1>
        {messageReceived}
        {soundIdReceived}
      </div>
      <Button type="primary" onClick={showModal}>
        Speech Control
      </Button>
      <Modal
        title="Speech Control"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        style={{
          maxWidth: "100vw",
          top: 0,
          paddingBottom: 0
        }}
        bodyStyle={{
          height: "calc(100vh - 55px - 53px)",
          overflowY: "auto"
        }}
        width="100vw">
        <div>
          <Divider>Basic Info</Divider>
          <Row>
            <Col span={12}>
              <Input addonBefore="Participant ID" defaultValue="XXX" />
            </Col>
            <Col span={12}>
              <InputNumber addonBefore="trial" defaultValue={1} />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              Fault Type: <Select
                defaultValue="SSAP"
                // style={{
                //   width: 200,
                // }}
                onChange={handleChange}
              >
                {/* <OptGroup label="Pure Test">
                  <Option value="0_straightline_trial"></Option>
                </OptGroup> */}
                <OptGroup label="Short Speech">
                  <Option value="SSAP">Short Speech Arrow Pointer (SSAP)</Option>
                  <Option value="SSSP">Short Speech Square Pointer (SSSP)</Option>
                </OptGroup>
                <OptGroup label="Long Speech">
                  <Option value="LSAP">Long Speech Arrow Pointer (LSAP)</Option>
                  <Option value="LSSP">Long Speech Square Pointer (LSSP)</Option>
                </OptGroup>
              </Select>
            </Col>
          </Row>

          <Divider>Welcome & Start</Divider>
          <Row>
            <Col span={7} offset={1}>
              <Button type="primary" block onClick={() => sendSoundId('welcome')}>
                1.Welcome
              </Button>
            </Col>
            <Col span={7} offset={1}><Button type="primary" block onClick={() => sendSoundId('tips')}>
              2. Tips
            </Button></Col>
            <Col span={7} offset={1}><Button type="primary" block onClick={() => sendSoundId('go')}>
              3.GO
            </Button></Col>
          </Row>

          {speechType == "long" ? <div>
            <Divider>Normal Detection (Long Speech)</Divider>
            <Row>
              <Col span={7} offset={1}>
                <Button type="primary" style={{ background: "black", color: "white", borderColor: "white" }} block onClick={() => sendSoundandomBy('shop')}>
                  GROCERY
                </Button>
              </Col>
              <Col span={7} offset={1}>
                <Button type="primary" style={{ background: "#a34652", color: "yellow", borderColor: "#ae7333" }} block onClick={() => sendSoundandomBy('restaurant')}>
                  RESTAUR
                </Button></Col>
              <Col span={7} offset={1}>
                <Button type="primary" block onClick={() => sendSoundandomBy('service')}>
                  SERVICE
                </Button>
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={7} offset={1}>
                <Button type="default" style={{ background: "#dfd0ba", color: "#white" }} block onClick={() => sendSoundandomBy('church')}>
                  CHURCH
                </Button>
              </Col>
              <Col span={7} offset={1}>
                <Button type="default" block onClick={() => sendSoundandomBy('castle')}>
                  CASTLE
                </Button></Col>
              <Col span={7} offset={1}>
                <Button type="default" block onClick={() => sendSoundandomBy('private_house')}>
                  PRIVATE
                </Button></Col>
            </Row>
          </div> : null}

          {speechType == "short" ? <div>
            <Divider>Normal Detection (Short Speech)</Divider>
            <Row>
              <Col span={7} offset={1}>
                <Button type="primary" style={{ background: "black", color: "white", borderColor: "white" }} block onClick={() => sendSoundandomBy('shop_s')}>
                  GROCERY
                </Button>
              </Col>
              <Col span={7} offset={1}>
                <Button type="primary" style={{ background: "#a34652", color: "yellow", borderColor: "#ae7333" }} block onClick={() => sendSoundandomBy('restaurant_s')}>
                  RESTAUR
                </Button></Col>
              <Col span={7} offset={1}>
                <Button type="primary" block onClick={() => sendSoundandomBy('service_s')}>
                  SERVICE
                </Button>
              </Col>
            </Row>
            <br />
            <Row>
              <Col span={7} offset={1}>
                <Button type="default" style={{ background: "#dfd0ba", color: "#white" }} block onClick={() => sendSoundandomBy('church_s')}>
                  CHURCH
                </Button>
              </Col>
              <Col span={7} offset={1}>
                <Button type="default" block onClick={() => sendSoundandomBy('castle_s')}>
                  CASTLE
                </Button></Col>
              <Col span={7} offset={1}>
                <Button type="default" block onClick={() => sendSoundandomBy('private_house_s')}>
                  PRIVATE
                </Button></Col>
            </Row>
          </div> : null}

          <Divider>Location Saved/not</Divider>
          <Row>
            <Col span={10} offset={2}>
              <Button type="primary" danger block onClick={() => sendSoundId('save_01')}>
                -SAVE-
              </Button>
            </Col>
            <Col span={10} offset={2}>
              <Button type="primary" danger block onClick={() => sendSoundId('notsave_01')}>
                NOT SAVE
              </Button></Col>
          </Row>



          <Divider hidden>Speech Faults</Divider>
          <Row hidden>
            <Col span={24}>
              <Button type="primary" color="#52c41a" block onClick={() => sendSoundandomBy('wrongspeech')}>
                Irrelevant
              </Button>
            </Col>
          </Row>

          {/* {buttonList.map((name, index) =>
            <button key={index} onClick={() => sendSoundId(name)}>{name}</button>
          )} */}
        </div>
      </Modal>
    </>

  );
}

export default App;