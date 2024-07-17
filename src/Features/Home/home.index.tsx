import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Checkbox,
  Collapse,
  CollapseProps,
  Divider,
  Layout,
  Space,
  notification,
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
  CheckOutlined,
  RestFilled,
  ReloadOutlined,
} from "@ant-design/icons";
import Logo from "Assets/images/Logo.png";

import "./home.index.css";
import HeaderLayout from "Layout/Header/header.index";
import axios from "axios";
import FormData from "form-data";
import { useAppDispatch } from "Store/hooks";
import { setSummaryState, setTranscriptState } from "Features/Auth/redux/slice";
import { NotificationPlacement } from "antd/es/notification/interface";
import { authenticateUser } from "Utilities/authenticate";
import  RefreshIcon from "Assets/images/Refresh.png"
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
          justifyContent: "center",
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <div>
          <img
            src={Logo}
            alt=""
            height={70}
            style={{ marginTop: "1.5rem", marginBottom: "-40px" }}
          />
        </div>
      </div>
    </>
  );
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [api, contextHolder] = notification.useNotification();
  const [mediaRecorder, setMediaRecorder] = useState<any>(null);
  const [audioChunks, setAudioChunks] = useState<any>([]);
  const [isRecording, setIsRecording] = useState<any>(false);
  const [timer, setTimer] = useState<any>(0);
  const [isNewRecording, setIsNewRecording] = useState(true);
  const [audioFile, setAudioFile] = useState<any>(null);
  const [isFile, setIsFile] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [audioUrl, setAudioUrl] = useState<any>("");
  const [disableGenerate, setDisableGenerate] = useState(true);
  const fileInputRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const openNotification = (placement: NotificationPlacement) => {
    api.info({
      message: "Error",
      description: "AI Assistant is unable to generate results",
      placement,
      type: "error",
    });
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
      setDisableGenerate(false);
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
    setDisableGenerate(true);
    setAudioFile(null);
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      setTimer(0);
      setAudioChunks([]);
    }
  };

  const doneRecording = () => {
    setIsNewRecording(true);
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      setTimer(0);
    }
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
        setIsNewRecording(true);
      if (mediaRecorder) {
        mediaRecorder.stop();
        setIsRecording(false);
        setTimer(0);
      }
        const mergedBlob = new Blob(audioChunks, { type: "audio/mp3" });
        formData.append("file", mergedBlob);
      }

      setIsLoading(true);
      setIsDone(false);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        maxBodyLength: Infinity,
        withCredentials: false,
      };

      const response = await axios.post(
        "https://backend-demo.rumilabs.ai/upload/",
        formData,
        config
      );
      if (response.data.summary !== null) {
        dispatch(setTranscriptState(response.data.transcript));
        dispatch(setSummaryState(response.data.summary));

        setIsLoading(false);
        setIsDone(true);

        setTimeout(() => {
          navigate("/result");
        }, 2000);
      } else {
        setIsLoading(false);
        setIsDone(false);
        openNotification("topRight");
      }
    } catch (err: any) {
      setIsLoading(false);
      setIsDone(false);
      openNotification("topRight");
    }
  };
  const ContentRenderer = () => {
    return (
      <>
        {contextHolder}
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
              height: "180px",
              width: "180px",
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
          <div
            style={{
              cursor:"pointer",
              backgroundColor: "#383c3d",
              borderRadius: "50%",
              height: "50px",
              width: "50px",
              marginRight: "1.5rem",
              marginLeft: "1.5rem",
            }}
          >
            <img src={RefreshIcon} alt="" height={40} style={{marginBottom:'19px'}}               onClick={stopRecording}/>
          </div>
          {isRecording ? (
            <PauseCircleFilled
              style={{
                cursor: "pointer",
                fontSize: "50px",
                marginRight: "1.5rem",
                // marginLeft : "1.5rem"
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
                // marginLeft : "1.5rem"
              }}
            />
          )}
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
              width: "220px",
              fontSize: "16px",
              backgroundColor: "#e93139",
              fontWeight: "500",
              border: "1px solid #e93139",
            }}
            type="primary"
            disabled={!audioFile && disableGenerate}
            onClick={() => {
              handleGenerateSummary();
            }}
          >
            {!isLoading && !isDone ? (
              <span style={{ marginLeft: "10px" }}>Generate Summary</span>
            ) : isDone && !isLoading ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span>
                  <CheckOutlined style={{ color: "white", fontSize: "20px" }} />
                </span>{" "}
                <span style={{ marginLeft: "10px" }}>Summary Generated</span>
              </div>
            ) : null}
          </Button>
          <div style={{ width: "220px" }}>
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

  useEffect(() => {
    try {
      const decodedString = atob(localStorage.getItem("token") ?? "");
      const decodedObj = JSON.parse(decodedString);
      if (!authenticateUser(decodedObj)) navigate("/");
    } catch (e: any) {
      navigate("/");
    }
    setIsDone(false);
  }, []);
  return (
    <Space
      direction="vertical"
      style={{ height: "100vh", width: "100%" }}
      size={[0, 48]}
    >
      <Layout style={{ height: "100vh" }}>
        
      <HeaderLayout />
        <Layout>
          <Sider
          breakpoint="lg"
          collapsedWidth="0"
          width={"300px"}
          style={siderStyle}
        >
          {SiderRenderer()}
        </Sider>
          <Content style={contentStyle}>{ContentRenderer()}</Content>
        </Layout>
      </Layout>
    </Space>
  );
};

export default Home;
