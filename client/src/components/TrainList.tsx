"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useTrainStore } from "@/store/trainStore";
import { useRouter } from "next/navigation";
import CreateTrain from "./CreateTrain";

const TrainsList = () => {
  const { trains, fetchTrains } = useTrainStore();
  const { token } = useAuthStore();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<
    "departureTime" | "arrivalTime" | ""
  >("");

  useEffect(() => {
    fetchTrains();
  }, [fetchTrains]);

  const filteredTrains = trains.filter((train) =>
    `${train.from} ${train.to}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedTrains = [...filteredTrains].sort((a, b) => {
    if (!sortField) {
      return 0;
    } else {
      return (
        new Date(a[sortField]).getTime() - new Date(b[sortField]).getTime()
      );
    }
  });

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">Train Schedule</h2>

      <input
        type="text"
        placeholder="Search by From or To"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full h-[20px] p-2 border rounded"
      />

      <select
        value={sortField}
        onChange={(e) =>
          setSortField(e.target.value as "departureTime" | "arrivalTime" | "")
        }
        className="w-full h-[20px] mb-[20px] p-2 border rounded"
      >
        <option value="">Sort by...</option>
        <option value="departureTime">Departure Time</option>
        <option value="arrivalTime">Arrival Time</option>
      </select>

      <ul className="space-y-4">
        {sortedTrains.map((train) => (
          <li
            key={train.id}
            className="p-4 mb-2 border rounded-md shadow-sm flex justify-between"
            style={{ marginBottom: "8px", padding: "4px" }}
          >
            <div>
              <div>
                <strong>{train.from}</strong> → <strong>{train.to}</strong>
              </div>
              <div className="text-sm text-gray-600">
                Departure: {new Date(train.departureTime).toLocaleString()}{" "}
                <br />
                Arrival: {new Date(train.arrivalTime).toLocaleString()}
              </div>
            </div>
            {token && (
              <button
                className="text-blue-600 hover:underline"
                onClick={() => router.push(`/trains/${train.id}`)}
              >
                Edit
              </button>
            )}
          </li>
        ))}
      </ul>

      {token && <CreateTrain />}
    </div>
  );
};

export default TrainsList;
