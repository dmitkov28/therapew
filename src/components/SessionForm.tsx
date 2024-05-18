import { DatePicker } from "./DatePicker";

export default function SessionForm({
  sessionInput,
  setSessionInput,
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
}) {
  return (
    <form className="space-y-4">
      <DatePicker
        sessionInput={sessionInput}
        setSessionInput={setSessionInput}
      />
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
    </form>
  );
}
