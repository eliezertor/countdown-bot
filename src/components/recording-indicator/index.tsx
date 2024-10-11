import React from "react";
import { RecordingIndicatorProps } from "@hypercontext/types/recording";
/**
 * The RecordingMarker component is used to display a recording indicator on the screen.
 * @param {Object} props - The props of the component.
 * @param {boolean} props.recording - A boolean value indicating whether the recording is active.
 * @returns {JSX.Element} - The JSX element to be rendered.
 */
function RecordingIndicator({
  isRecording = false,
}: RecordingIndicatorProps): React.JSX.Element {
  return (
    <section
      className={`recording-indicator ${
        isRecording ? "recording-indicator--live" : " "
      }`}
    >
      <div className="recording-indicator__container">
        <div className="recording-indicator__outer-circle">
          <span className="recording-indicator__inner-circle"></span>
        </div>
        <p className="recording-indicator__recoding-text">Recording</p>
      </div>
    </section>
  );
}

export default RecordingIndicator;
