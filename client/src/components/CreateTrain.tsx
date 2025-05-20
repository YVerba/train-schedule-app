"use client";

import { createTrain } from "@/lib/api";
import { useState } from "react";
import { useTrainStore } from "@/store/trainStore";

const CreateTrain = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { fetchTrains } = useTrainStore();

  const handleCreateTrain = async () => {
    setSubmitting(true);
    try {
      await createTrain(from, to, departureTime, arrivalTime);
      await fetchTrains();

      setFrom("");
      setTo("");
      setDepartureTime("");
      setArrivalTime("");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-[350px] space-y-4 border p-4 rounded-md shadow">
      <h3 className="text-lg font-semibold">Create New Train</h3>
      <input
        type="text"
        placeholder="From"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="To"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="datetime-local"
        value={departureTime}
        onChange={(e) => setDepartureTime(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="datetime-local"
        value={arrivalTime}
        onChange={(e) => setArrivalTime(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button
        onClick={handleCreateTrain}
        disabled={submitting}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {submitting ? "Creating..." : "Create Train"}
      </button>
    </div>
  );
};

export default CreateTrain;
