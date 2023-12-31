import "./resultantText.index.css";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Input, Modal, Row, Switch } from "antd";
import HeaderLayout from "Layout/Header/header.index";
import { useAppSelector } from "Store/hooks";
import { selectSummary } from "Features/Auth/redux/selectors";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { CheckOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const ResultantText = () => {
  const navigate = useNavigate();
  const summary = useAppSelector(selectSummary);
  const historyBoxRef = useRef<any>(null);
  const [displayText, setDisplayText] = useState("");
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState("");
  const [isEdit, setEdit] = useState(false);
  const [editText, setEditText] = useState("");
  const [textDone, setTextDone] = useState(false);

  const formatText = (text: string) => {
    let formattedText = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    formattedText = formattedText.replace(/\n/g, "<br>");
    return formattedText;
  };
  useEffect(() => {
    if (!summary) return;
    let currentIndex = 0;
    let formattedText = formatText(summary);
    setEditText(formattedText);
    const interval = setInterval(() => {
      if (currentIndex <= formattedText.length) {
        setTextDone(false);
        setDisplayText(formattedText.substring(0, currentIndex));
        currentIndex++;
      } else {
        setTextDone(true);
        clearInterval(interval);
      }
    }, 1);

    return () => clearInterval(interval);
  }, [summary]);

  const scrollToBottom = () => {
    if (historyBoxRef.current) {
      const { current } = historyBoxRef;
      current.scrollTop = current.scrollHeight - current.clientHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [displayText]);

  const onChangeSwitch = (e: any) => {
    setShowNotes(e);
  };

  const onChangeNotes = (e: any) => {
    setNotes(e);
  };
  return (
    <>
      <HeaderLayout />
      <div style={{ padding: "30px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div className="HistoryHeading">Summary Notes</div>
            <div className="HistoryDescription">
              <span
                onClick={() => {
                  navigate("/Home");
                }}
                style={{
                  cursor: "pointer",
                  fontWeight: "600",
                  paddingRight: "5px",
                  color: "green",
                }}
              >
                {"<"}
              </span>
              <span
                onClick={() => {
                  navigate("/Home");
                }}
                style={{
                  cursor: "pointer",
                  fontWeight: "600",
                  marginRight: "15px",
                  color: "green",
                }}
              >
                {"Back"}
              </span>
              AI Assisstant Output
            </div>
          </div>
          <div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Switch
                style={{ marginRight: "12px", height: "23.5px" }}
                checkedChildren="Notes"
                onChange={onChangeSwitch}
                unCheckedChildren="Notes"
                checked={showNotes}
              />
              <Button type="primary" danger style={{ width: "80px" }}>
                Publish
              </Button>
            </div>
          </div>
        </div>
        {!showNotes && (
          <div className="HistoryBox">
            <div className="HistoryBoxHeader">
              <div className="HistoryBoxHeaderHeading">Summary</div>
              <div
                className="HistoryBoxHeaderHeading"
                style={{ marginRight: "15px" }}
              ></div>
            </div>
            <div className="HistoryBoxContent" ref={historyBoxRef}>
              {isEdit ? (
                <ReactQuill
                  theme="snow"
                  onChange={(e: any) => {
                    setEditText(e);
                    setDisplayText(e.replace(/<\/p><p>/g, "<br>"));
                  }}
                  value={editText}
                  style={{
                    width: "100%",
                    minHeight: "60vh",
                    borderRight: "none",
                    paddingLeft: !showNotes ? "10rem" : "2rem",
                  }}
                />
              ) : (
                <div
                  style={{ paddingLeft: !showNotes ? "10rem" : "2rem" }}
                  className="HistoryBoxContentText"
                  dangerouslySetInnerHTML={{
                    __html: displayText,
                  }}
                ></div>
              )}

              <div
                style={{
                  paddingRight: !showNotes ? "10rem" : "2rem",
                  display: "flex",
                }}
              >
                {isEdit ? (
                  <div
                    className="HistoryBoxAction"
                    style={{ marginTop: "0.8rem", cursor: "pointer" }}
                    onClick={() => {
                      let tempEditText = editText;
                      tempEditText = tempEditText.replace(/<\/p><p>/g, "<br>");
                      setDisplayText(tempEditText);
                      setEdit(false);
                    }}
                  >
                    <CheckOutlined
                      style={{ fontSize: "18px", color: "green" }}
                    />
                  </div>
                ) : (
                  <div
                    className="HistoryBoxAction"
                    title={
                      !textDone
                        ? "Please wait untile the AI assistant write the complete result"
                        : ""
                    }
                    style={{
                      marginTop: "0.8rem",
                      cursor: textDone ? "pointer" : "not-allowed",
                      opacity: textDone ? 1 : 0.5,
                    }}
                    onClick={() => {
                      if (textDone) setEdit(true);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="23"
                      height="23"
                      viewBox="0 0 23 23"
                      fill="none"
                    >
                      <path
                        opacity="0.3"
                        d="M5.39355 17.1593V17.9923H6.22648L14.429 9.78972L13.5961 8.95679L5.39355 17.1593Z"
                        fill="#0061F4"
                      />
                      <path
                        d="M19.6169 7.164C19.97 6.81091 19.97 6.24053 19.6169 5.88744L17.4984 3.7689C17.3173 3.58783 17.091 3.50635 16.8556 3.50635C16.6202 3.50635 16.3938 3.59688 16.2218 3.7689L14.565 5.42571L17.9601 8.8208L19.6169 7.164ZM3.58301 16.4077V19.8028H6.9781L16.9914 9.78953L13.5963 6.39444L3.58301 16.4077ZM6.22665 17.9921H5.39372V17.1592L13.5963 8.95661L14.4292 9.78953L6.22665 17.9921Z"
                        fill="#1A75FF"
                      />
                    </svg>
                  </div>
                )}

                <div
                  className="HistoryBoxAction"
                  style={{
                    marginTop: "0.8rem",
                    marginLeft: "-10px",
                    cursor: "pointer",
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="23"
                    height="23"
                    viewBox="0 0 23 23"
                    fill="none"
                  >
                    <path
                      opacity="0.3"
                      d="M8.19116 8.93848H15.434V17.9921H8.19116V8.93848Z"
                      fill="#F4002C"
                    />
                    <path
                      d="M14.9814 4.41171L14.076 3.50635H9.54921L8.64385 4.41171H5.4751V6.22242H18.1501V4.41171H14.9814ZM6.38046 17.9921C6.38046 18.988 7.19528 19.8028 8.19117 19.8028H15.434C16.4299 19.8028 17.2448 18.988 17.2448 17.9921V7.12778H6.38046V17.9921ZM8.19117 8.9385H15.434V17.9921H8.19117V8.9385Z"
                      fill="#FF1A43"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}
        {showNotes && (
          <Row gutter={40}>
            <Col lg={16} xs={24} sm={12}>
              <div className="HistoryBox">
                <div className="HistoryBoxHeader">
                  <div className="HistoryBoxHeaderHeading">Summary</div>
                  <div
                    className="HistoryBoxHeaderHeading"
                    style={{ marginRight: "15px" }}
                  ></div>
                </div>
                <div className="HistoryBoxContent" ref={historyBoxRef}>
                  {isEdit ? (
                    <ReactQuill
                      theme="snow"
                      onChange={(e: any) => {
                        setEditText(e);
                        setDisplayText(e.replace(/<\/p><p>/g, "<br>"));
                      }}
                      value={editText}
                      style={{
                        width: "100%",
                        minHeight: "60vh",
                        borderRight: "none",
                      }}
                    />
                  ) : (
                    <div
                      style={{ paddingLeft: !showNotes ? "10rem" : "2rem" }}
                      className="HistoryBoxContentText"
                      ref={historyBoxRef}
                      dangerouslySetInnerHTML={{
                        __html: displayText,
                      }}
                    ></div>
                  )}

                  <div
                    style={{
                      paddingRight: !showNotes ? "10rem" : "2rem",
                      display: "flex",
                    }}
                  >
                    {isEdit ? (
                      <div
                        className="HistoryBoxAction"
                        style={{ marginTop: "0.8rem", cursor: "pointer" }}
                        onClick={() => {
                          let tempEditText = editText;
                          tempEditText = tempEditText.replace(/<\/p><p>/g, "<br>");
                          setDisplayText(tempEditText);
                          setEdit(false);
                        }}
                      >
                        <CheckOutlined
                          style={{ fontSize: "18px", color: "green" }}
                        />
                      </div>
                    ) : (
                      <div
                        className="HistoryBoxAction"
                        title={
                          !textDone
                            ? "Please wait untile the AI assistant write the complete result"
                            : ""
                        }
                        style={{
                          marginTop: "0.8rem",
                          cursor: textDone ? "pointer" : "not-allowed",
                          opacity: textDone ? 1 : 0.5,
                        }}
                        onClick={() => {
                          if (textDone) setEdit(true);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="23"
                          height="23"
                          viewBox="0 0 23 23"
                          fill="none"
                        >
                          <path
                            opacity="0.3"
                            d="M5.39355 17.1593V17.9923H6.22648L14.429 9.78972L13.5961 8.95679L5.39355 17.1593Z"
                            fill="#0061F4"
                          />
                          <path
                            d="M19.6169 7.164C19.97 6.81091 19.97 6.24053 19.6169 5.88744L17.4984 3.7689C17.3173 3.58783 17.091 3.50635 16.8556 3.50635C16.6202 3.50635 16.3938 3.59688 16.2218 3.7689L14.565 5.42571L17.9601 8.8208L19.6169 7.164ZM3.58301 16.4077V19.8028H6.9781L16.9914 9.78953L13.5963 6.39444L3.58301 16.4077ZM6.22665 17.9921H5.39372V17.1592L13.5963 8.95661L14.4292 9.78953L6.22665 17.9921Z"
                            fill="#1A75FF"
                          />
                        </svg>
                      </div>
                    )}

                    <div
                      className="HistoryBoxAction"
                      style={{
                        marginTop: "0.8rem",
                        marginLeft: "-10px",
                        cursor: "pointer",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="23"
                        height="23"
                        viewBox="0 0 23 23"
                        fill="none"
                      >
                        <path
                          opacity="0.3"
                          d="M8.19116 8.93848H15.434V17.9921H8.19116V8.93848Z"
                          fill="#F4002C"
                        />
                        <path
                          d="M14.9814 4.41171L14.076 3.50635H9.54921L8.64385 4.41171H5.4751V6.22242H18.1501V4.41171H14.9814ZM6.38046 17.9921C6.38046 18.988 7.19528 19.8028 8.19117 19.8028H15.434C16.4299 19.8028 17.2448 18.988 17.2448 17.9921V7.12778H6.38046V17.9921ZM8.19117 8.9385H15.434V17.9921H8.19117V8.9385Z"
                          fill="#FF1A43"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={8} xs={24} sm={12}>
              <div className="HistoryBox">
                <div className="HistoryBoxHeader">
                  <div className="HistoryBoxHeaderHeading">Notes</div>
                  <div
                    className="HistoryBoxHeaderHeading"
                    style={{ marginRight: "15px" }}
                  ></div>
                </div>
                <div className="HistoryBoxContent">
                  <ReactQuill
                    theme="snow"
                    value={notes}
                    onChange={onChangeNotes}
                    placeholder="Click to type notes ..."
                    style={{
                      width: "100%",
                      minHeight: "60vh",
                      borderRight: "none",
                    }}
                  />
                </div>
              </div>
            </Col>
          </Row>
        )}
      </div>
    </>
  );
};

export default ResultantText;
