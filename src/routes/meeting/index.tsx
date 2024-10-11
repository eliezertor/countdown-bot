import React from "react";
import background from "@hypercontext/images/background.jpg";
import bot from "@hypercontext/svg/bot.svg";
import hyperLogo from "@hypercontext/svg/hypercontext-logo.svg";
import RecordingIndicator from "@hypercontext/components/recording-indicator/index";

function Meeting() {
  return (
    <div className="recording-route">
      <img
        className="recording-route__background-img"
        src={background}
        alt="space background"
      />
      <img
        src={bot}
        className="recording-route__bot-img"
        alt="Hypercontext bot"
      />

      <section className="recording-route__section-container">
        <div className="recording-route__content-container">
          <img
            className="recording-route__hyper-logo"
            src={hyperLogo}
            alt="Hypercontext bot"
          />
        </div>
      </section>
      <RecordingIndicator isRecording={true} />
    </div>
  );
}

export default Meeting;
