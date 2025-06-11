import Image from "next/image";
import { useState } from "react";
import nurseRates from "@/data/nurseRates.json";

const classifications = Object.keys(nurseRates.classifications);

type Shift = {
  classification: string;
  payPoint: string;
  date: string;
  startTime: string;
  endTime: string;
  isNight: boolean;
  isPublicHoliday: boolean;
};

export default function Home() {
  const [classification, setClassification] = useState("");
  const [payPoint, setPayPoint] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isNight, setIsNight] = useState(false);
  const [isPublicHoliday, setIsPublicHoliday] = useState(false);
  const [shifts, setShifts] = useState<Shift[]>([]);

  // Get pay points/grades for selected classification
  const payPoints = classification
    ? Object.keys((nurseRates.classifications as any)[classification])
    : [];

  const handleAddShift = (e: React.FormEvent) => {
    e.preventDefault();
    if (!classification || !payPoint || !date || !startTime || !endTime) return;
    setShifts([
      ...shifts,
      {
        classification,
        payPoint,
        date,
        startTime,
        endTime,
        isNight,
        isPublicHoliday,
      },
    ]);
    // Reset form
    setClassification("");
    setPayPoint("");
    setDate("");
    setStartTime("");
    setEndTime("");
    setIsNight(false);
    setIsPublicHoliday(false);
  };

  const handleRemoveShift = (index: number) => {
    setShifts(shifts.filter((_, i) => i !== index));
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-sm/6 text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-[family-name:var(--font-geist-mono)] font-semibold">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">
            Save and see your changes instantly.
          </li>
        </ol>

        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Deploy now
          </a>
          <a
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read our docs
          </a>
        </div>

        <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
          <h1 className="text-2xl font-bold mb-4">NSW Nurse Pay Calculator</h1>
          <form className="space-y-4" onSubmit={handleAddShift}>
            <div>
              <label className="block mb-1 font-medium">Classification</label>
              <select
                className="w-full border rounded px-3 py-2"
                value={classification}
                onChange={e => {
                  setClassification(e.target.value);
                  setPayPoint("");
                }}
                required
              >
                <option value="">Select classification</option>
                {classifications.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            {classification && (
              <div>
                <label className="block mb-1 font-medium">Pay Point / Grade</label>
                <select
                  className="w-full border rounded px-3 py-2"
                  value={payPoint}
                  onChange={e => setPayPoint(e.target.value)}
                  required
                >
                  <option value="">Select pay point/grade</option>
                  {payPoints.map((pp) => (
                    <option key={pp} value={pp}>{pp}</option>
                  ))}
                </select>
              </div>
            )}
            <div>
              <label className="block mb-1 font-medium">Shift Date</label>
              <input
                type="date"
                className="w-full border rounded px-3 py-2"
                value={date}
                onChange={e => setDate(e.target.value)}
                required
              />
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block mb-1 font-medium">Start Time</label>
                <input
                  type="time"
                  className="w-full border rounded px-3 py-2"
                  value={startTime}
                  onChange={e => setStartTime(e.target.value)}
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block mb-1 font-medium">End Time</label>
                <input
                  type="time"
                  className="w-full border rounded px-3 py-2"
                  value={endTime}
                  onChange={e => setEndTime(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isNight}
                  onChange={e => setIsNight(e.target.checked)}
                />
                Night Shift
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={isPublicHoliday}
                  onChange={e => setIsPublicHoliday(e.target.checked)}
                />
                Public Holiday
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              disabled={
                !classification || !payPoint || !date || !startTime || !endTime
              }
            >
              Add Shift
            </button>
          </form>
        </div>
        {shifts.length > 0 && (
          <div className="w-full max-w-2xl bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Shift Summary</h2>
            <table className="w-full text-sm border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 border">Classification</th>
                  <th className="p-2 border">Pay Point/Grade</th>
                  <th className="p-2 border">Date</th>
                  <th className="p-2 border">Start</th>
                  <th className="p-2 border">End</th>
                  <th className="p-2 border">Night</th>
                  <th className="p-2 border">Public Holiday</th>
                  <th className="p-2 border">Remove</th>
                </tr>
              </thead>
              <tbody>
                {shifts.map((shift, idx) => (
                  <tr key={idx}>
                    <td className="p-2 border">{shift.classification}</td>
                    <td className="p-2 border">{shift.payPoint}</td>
                    <td className="p-2 border">{shift.date}</td>
                    <td className="p-2 border">{shift.startTime}</td>
                    <td className="p-2 border">{shift.endTime}</td>
                    <td className="p-2 border text-center">{shift.isNight ? "✔️" : ""}</td>
                    <td className="p-2 border text-center">{shift.isPublicHoliday ? "✔️" : ""}</td>
                    <td className="p-2 border text-center">
                      <button
                        className="text-red-600 hover:underline"
                        onClick={() => handleRemoveShift(idx)}
                        type="button"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
