"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { deleteTrain, getTrainById, updateTrain } from "@/lib/api";

export const TrainEditor = () => {
  const { id } = useParams();
  const [train, setTrain] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [arrivalTime, setArrivalTime] = useState("");
  const router = useRouter()

  useEffect(() => {
    const fetchTrain = async () => {
      try {
        const data = await getTrainById(id as string);
        setTrain(data);
        setFrom(data.from);
        setTo(data.to);
        setDepartureTime(data.departureTime.slice(0, 16));
        setArrivalTime(data.arrivalTime.slice(0, 16));
      } catch (e) {
        console.error("Failed to fetch train");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchTrain();
  }, [id]);

  const handleUpdate = async () => {
    try {
      await updateTrain(train.id, {
        from,
        to,
        departureTime,
        arrivalTime,
      });
      alert("Train updated successfully!");
    } catch (error) {
      console.error("Failed to update train:", error);
      alert("Failed to update train.");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this train?")) return;

    try {
      await deleteTrain(train.id);
      alert("Train deleted successfully!");
      router.push('/')
    } catch (error) {
      console.error("Failed to delete train:", error);
      alert("Failed to delete train.");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!train) return <div>Train not found</div>;

  return (
    <div className="max-w-[400px] mx-auto space-y-4 py-8">
      <h2 className="text-xl font-semibold">Edit Train</h2>
      <input
        className="w-full border p-2 rounded"
        value={from}
        onChange={(e) => setFrom(e.target.value)}
      />
      <input
        className="w-full border p-2 rounded"
        value={to}
        onChange={(e) => setTo(e.target.value)}
      />
      <input
        className="w-full border p-2 rounded"
        type="datetime-local"
        value={departureTime}
        onChange={(e) => setDepartureTime(e.target.value)}
      />
      <input
        className="w-full border p-2 rounded"
        type="datetime-local"
        value={arrivalTime}
        onChange={(e) => setArrivalTime(e.target.value)}
      />
      <div className="flex gap-4">
        <button
          onClick={handleUpdate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Train
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete Train
        </button>
      </div>
    </div>
  );
};
