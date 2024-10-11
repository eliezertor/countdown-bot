// All base types are defined here
export type TimerWheelProps = {
  totalTime: number;
  isDisplayedInQuarters: boolean;
  children: React.ReactNode;
  size?: number;
  gradientStart?: string;
  gradientEnd?: string;
  gradientAtThreeQuartersStart?: string;
  gradientAtThreeQuartersEnd?: string;
  gradientAtCompletionStart?: string;
  gradientAtCompletionEnd?: string;
  className?: string;
};

export type TimerProps = {
  expiryDateTime: Date;
  onIsExpired?: Function;
  IsExpired?: boolean;
  addStopWatch?: boolean;
};
