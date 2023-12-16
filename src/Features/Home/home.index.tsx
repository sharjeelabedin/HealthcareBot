import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Checkbox,
  Collapse,
  CollapseProps,
  Divider,
  Layout,
  Space,
  Upload,
} from "antd";
import { useNavigate } from "react-router-dom";
import {
  PauseCircleFilled,
  PlayCircleFilled,
  CheckCircleFilled,
  CloseCircleFilled,
  AudioFilled,
  PlusCircleFilled,
  CloudUploadOutlined,
  FileOutlined,
} from "@ant-design/icons";

import "./home.index.css";
import HeaderLayout from "Layout/Header/header.index";
import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import { useAppDispatch } from "Store/hooks";
import { setSummaryState, setTranscriptState } from "Features/Auth/redux/slice";

const { Sider, Content } = Layout;

const contentStyle: React.CSSProperties = {
  textAlign: "center",
  minHeight: 120,
  lineHeight: "120px",
  color: "#383c3d",
  backgroundColor: "#f5f6fb",
};

const siderStyle: React.CSSProperties = {
  textAlign: "center",
  lineHeight: "120px",
  backgroundColor: "#ffffff",
  minWidth: "3000px",
};

const AccordionContent = () => {
  return [1, 2, 3].map(() => {
    return (
      <div
        style={{
          paddingTop: "10px",
          paddingBottom: "10px",
          borderTop: "1px solid #e5e5e5",
          color: "#383c3d",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontWeight: "500",
            textAlign: "left",
            fontSize: "12px",
            marginLeft: "1rem",
          }}
        >
          <p>11/25/23 4:07PM</p>
          <p style={{ marginTop: "-10px" }}>Paused</p>
        </div>
        <div>
          {/* <FontAwesomeIcon
            icon={faPauseCircle}
           
          /> */}
          <PauseCircleFilled style={{ marginTop: "15px", fontSize: "20px" }} />
        </div>
      </div>
    );
  });
};
const items: CollapseProps["items"] = [
  {
    key: "1",
    label: (
      <div style={{ textAlign: "left" }}>
        <Checkbox>
          <span style={{ color: "#383c3d", fontWeight: "500" }}>All Notes</span>
        </Checkbox>
      </div>
    ),
    children: <div>{AccordionContent()}</div>,
  },
];
const SiderRenderer = () => {
  const onChange = (key: string | string[]) => {
    console.log(key);
  };
  return (
    <>
      <h1
        style={{
          fontSize: "28px",
          color: "#383c3d",
          marginTop: "-20px",
          marginBottom: "-20px",
        }}
      >
        Logo
      </h1>
      <Collapse
        expandIconPosition={"end"}
        bordered={false}
        items={items}
        defaultActiveKey={["1"]}
        onChange={onChange}
      />
      <div style={{ width: "100%", padding: "5px" }}>
        <Button style={{ width: "100%" }}>
          <span style={{ marginRight: "15px" }}>
            <PlusCircleFilled />
          </span>
          Start a Visit
        </Button>
      </div>
    </>
  );
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [mediaRecorder, setMediaRecorder] = useState<any>(null);
  const [audioChunks, setAudioChunks] = useState<any>([]);
  const [isRecording, setIsRecording] = useState<any>(false);
  const [timer, setTimer] = useState<any>(0);
  const [isNewRecording, setIsNewRecording] = useState(true);
  const [audioFile, setAudioFile] = useState<any>(null);
  const [isFile, setIsFile] = useState(false);
  const [audioUrl, setAudioUrl] = useState<any>("");
  const fileInputRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: any) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setAudioChunks([]);
      setIsFile(true);
      setAudioFile(selectedFile);
    }
  };
  let audioStream: any = null;
  useEffect(() => {
    if (audioChunks.length > 0) {
      const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
    }
  }, [audioChunks]);
  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;

    if (isRecording) {
      intervalId = setInterval(() => {
        setTimer((prevTimer: any) => {
          return prevTimer + 1;
        });
      }, 1000);
    } else {
      if (intervalId) clearInterval(intervalId);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isRecording]);

  const startRecording = async () => {
    try {
      setIsFile(false);
      setIsNewRecording(false);
      setAudioChunks([]);
      audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(audioStream);

      recorder.ondataavailable = (e) => {
        setAudioChunks([...audioChunks, e.data]);
      };

      recorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      };

      setMediaRecorder(recorder);
      recorder.start();
      setIsRecording(true);
      setTimer(0);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const pauseRecording = () => {
    if (mediaRecorder && isRecording) {
      mediaRecorder.pause();
      setIsRecording(false);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorder && !isRecording) {
      mediaRecorder.resume();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    setIsNewRecording(true);
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      setTimer(0);
    }
  };

  const playRecording = () => {
    const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
    const audioUrl = URL.createObjectURL(audioBlob);
    const audio = new Audio(audioUrl);
    audio.play();
  };
  const formatTime = (totalSeconds: number): string => {
    const hours = `0${Math.floor(totalSeconds / 3600)}`.slice(-2);
    const minutes = `0${Math.floor((totalSeconds % 3600) / 60)}`.slice(-2);
    const seconds = `0${totalSeconds % 60}`.slice(-2);
    return `${hours}:${minutes}:${seconds}`;
  };

  const handleGenerateSummary = async () => {
    try {
      const formData = new FormData();
      if (isFile) {
        formData.append("file", audioFile);
      } else {
        const mergedBlob = new Blob(audioChunks, { type: "audio/mp3" });
        formData.append("file", mergedBlob);
      }

      setIsLoading(true);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        maxBodyLength: Infinity,
        withCredentials: false,
      };

      const response = await axios.post(
        "https://avicenna-service-2.onrender.com/upload/",
        formData,
        config
      );

      dispatch(setTranscriptState(response.data.transcript));
      dispatch(setSummaryState(response.data.summary));

      setIsLoading(false);
      navigate("/result");
    } catch (err: any) {
      setIsLoading(false);
      navigate("/result");
    }
  };
  const ContentRenderer = () => {
    return (
      <>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              borderRadius: "100%",
              backgroundColor: "#ea323a",
              height: "200px",
              width: "200px",
              marginTop: "3.5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                verticalAlign: "center",
              }}
            >
              <AudioFilled
                color={"white"}
                style={{ color: "white", fontSize: "75px" }}
              />
            </div>
          </div>
        </div>
        <div
          className={"Audio-Timer"}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              fontWeight: "500",
              fontSize: "35px",
              marginTop: "-18px",
              marginBottom: "-18px",
            }}
          >
            {formatTime(timer)}
          </h1>
        </div>
        <div
          className="Audio-Icons"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CloseCircleFilled
            size={40}
            height={"10000px"}
            style={{
              cursor: "pointer",
              fontSize: "40px",
              marginRight: "1.5rem",
            }}
            onClick={stopRecording}
          />
          {isRecording ? (
            <PauseCircleFilled
              style={{
                cursor: "pointer",
                fontSize: "50px",
                marginRight: "1.5rem",
              }}
              onClick={pauseRecording}
            />
          ) : (
            <PlayCircleFilled
              onClick={isNewRecording ? startRecording : resumeRecording}
              style={{
                fontSize: "50px",
                cursor: "pointer",
                marginRight: "1.5rem",
              }}
            />
          )}
          <CheckCircleFilled
            style={{ cursor: "pointer", fontSize: "40px" }}
            onClick={stopRecording}
          />
        </div>
        <div
          className="Audio-generate-button"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Button
            loading={isLoading}
            style={{
              marginTop: "1.5rem",
              height: "40px",
              width: "300px",
              fontSize: "16px",
              backgroundColor: "#e93139",
              fontWeight: "500",
              border: "1px solid #e93139",
            }}
            type="primary"
            disabled={!audioFile && audioChunks.length === 0}
            onClick={() => {
              handleGenerateSummary();
              // navigate("/result");
            }}
          >
            <span style={{ marginLeft: "10px" }}>Generate Summary</span>
          </Button>
          <div style={{ width: "300px" }}>
            <Divider style={{ borderColor: "#afafbc" }}>Or</Divider>
            <div style={{ lineHeight: 0 }}>
              <Button
                onClick={handleButtonClick}
                style={{
                  height: "40px",
                  fontWeight: "500",
                  color: "grey",
                }}
                icon={
                  <CloudUploadOutlined
                    style={{
                      cursor: "pointer",
                      fontSize: "20px",
                      color: "grey",
                    }}
                  />
                }
              >
                Upload a visit
              </Button>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              accept="audio/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
          {isFile && audioFile && (
            <div style={{ marginTop: "-27px" }}>
              <FileOutlined style={{ marginRight: "5px" }} />
              {audioFile.name}{" "}
            </div>
          )}
        </div>
      </>
    );
  };
  return (
    <Space
      direction="vertical"
      style={{ height: "100vh", width: "100%" }}
      size={[0, 48]}
    >
      <Layout style={{ height: "100vh" }}>
        <Sider width={"300px"} style={siderStyle}>
          {SiderRenderer()}
        </Sider>
        <Layout>
          <HeaderLayout />
          <Content style={contentStyle}>{ContentRenderer()}</Content>
        </Layout>
      </Layout>
    </Space>
  );
};

export default Home;
