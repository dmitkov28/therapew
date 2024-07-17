import AudioRecorder from "./AudioRecorder";
import { DatePicker } from "./DatePicker";

export default function SessionForm({
  sessionInput,
  setSessionInput,
  recordingMode,
  setRecordingMode,
}: {
  sessionInput: {
    date: Date;
    notes: string;
  };
  setSessionInput: React.Dispatch<
    React.SetStateAction<{
      date: Date;
      notes: string;
    }>
  >;
  recordingMode?: boolean;
  setRecordingMode?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <form className={!recordingMode ? "space-y-4" : "space-y-10"}>
      <DatePicker
        sessionInput={sessionInput}
        setSessionInput={setSessionInput}
      />
      {!recordingMode ? (
        <textarea
          value={sessionInput.notes}
          onChange={(e) =>
            setSessionInput((data) => ({ ...data, notes: e.target.value }))
          }
          rows={10}
          className={`w-full border rounded-md px-2 py-1`}
          placeholder="Бележки"
          name="notes"
        />
      ) : (
        <AudioRecorder
          sessionInput={sessionInput}
          setSessionInput={setSessionInput}
          setRecordingMode={setRecordingMode!}
        />
      )}
    </form>
  );
}
