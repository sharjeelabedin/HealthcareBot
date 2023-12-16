import "./resultantText.index.css";
import { useEffect, useState } from "react";
import { Button, Input, Modal } from "antd";
import HeaderLayout from "Layout/Header/header.index";
import { useAppSelector } from "Store/hooks";
import { selectSummary, selectTranscript } from "Features/Auth/redux/selectors";

const ResultantText = () => {
  const summary = useAppSelector(selectSummary)
  const transcript = useAppSelector(selectTranscript)
  const [displayText, setDisplayText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  const formatText = (text:string) => {
    let formattedText = text.replace(/\*\*(.*?)\*\*/g,"<strong>$1</strong>");
    formattedText = formattedText.replace(/\n/g,"<br>");
    return formattedText;
  }
  useEffect(() => {
    let currentIndex = 0;
    let formattedText = formatText(summary);
    const interval = setInterval(() => {
      if (currentIndex <= formattedText.length) {
        setDisplayText(formattedText.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 10); // Adjust the interval for speed control

    return () => clearInterval(interval);
  }, [summary]);
  const headerStyle: React.CSSProperties = {
    textAlign: "center",
    color: "#fff",
    height: 64,
    paddingInline: 50,
    lineHeight: "64px",
    backgroundColor: "#393d3e",
  };

  return (
    <>
      <HeaderLayout />
      <div style={{ padding: "30px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <div className="HistoryHeading">History</div>
            <div className="HistoryDescription">
              This is your History Portal
            </div>
          </div>
          <div>
            <Button style={{ marginTop: "8px" }} onClick={showModal}>
              Create Notes
            </Button>
          </div>
        </div>
        <div className="HistoryBox">
          <div className="HistoryBoxHeader">
            <div className="HistoryBoxHeaderHeading">Summary</div>
            <div
              className="HistoryBoxHeaderHeading"
              style={{ marginRight: "15px" }}
            >
              Actions
            </div>
          </div>
          <div className="HistoryBoxContent">
            <div className="HistoryBoxContentText" dangerouslySetInnerHTML={{__html:displayText}}></div>
            <div style={{ display: "flex" }}>
              <div className="HistoryBoxAction" style={{ marginTop: "0.8rem" }}>
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
                {/* <FontAwesomeIcon icon={faPencilAlt} /> */}
              </div>
              <div
                className="HistoryBoxAction"
                style={{ marginTop: "0.8rem", marginLeft: "-10px" }}
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
        <br />
        {/* <div className="HistoryHeading">Assessment Plan</div>
        <div className="HistoryDescription">This is your Assessment Portal</div> */}
        {/* <div className="AssessmentBox">
          <div className="HistoryBoxHeader">
            <div className="HistoryBoxHeaderHeading">Title</div>
            <div className="HistoryBoxHeaderHeading" style={{marginRight:'15px'}}>Actions</div>
          </div>
          <div className="HistoryBoxContent">
            <div className="HistoryBoxContentText">{displayText}</div>
            <div style={{display:'flex'}}>
            <div className="HistoryBoxAction" style={{ marginTop: "0.8rem" }}>
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
            <div className="HistoryBoxAction" style={{ marginTop: "0.8rem",marginLeft:'-10px' }}>
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
          <div className="SubmitButtonDiv">
            <Button className="SubmitButton">Submit</Button>
          </div>
        </div> */}
        <br />
        <Modal
          title="Create Notes"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <div className="HistoryBox">
            <div className="HistoryBoxHeader">
              <div className="HistoryBoxHeaderHeading">NOTES</div>
              <div
                className="HistoryBoxHeaderHeading"
                style={{ marginRight: "15px" }}
              >
                Actions
              </div>
            </div>
            <div className="HistoryBoxContent">
              <Input.TextArea
                rows={10}
                style={{
                  border: "none", 
                  resize: "none", 
                  boxShadow: "none"
                }}
                placeholder="Type your notes ..."
              />
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default ResultantText;
