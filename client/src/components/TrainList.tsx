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
    if (!sortField) return 0;
    return new Date(a[sortField]).getTime() - new Date(b[sortField]).getTime();
  });

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center tracking-tight">
        Train Schedule
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by From or To"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
        />

        <select
          value={sortField}
          onChange={(e) =>
            setSortField(e.target.value as "departureTime" | "arrivalTime" | "")
          }
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
        >
          <option value="">Sort by...</option>
          <option value="departureTime">Departure Time</option>
          <option value="arrivalTime">Arrival Time</option>
        </select>
      </div>

      <ul className="space-y-6">
        {sortedTrains.map((train) => (
          <li
            key={train.id}
            className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {train.from} → {train.to}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Departure:{" "}
                  <span className="font-medium text-gray-700">
                    {new Date(train.departureTime).toLocaleString()}
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  Arrival:{" "}
                  <span className="font-medium text-gray-700">
                    {new Date(train.arrivalTime).toLocaleString()}
                  </span>
                </p>
              </div>

              {token && (
                <button
                  className="inline-block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                  onClick={() => router.push(`/trains/${train.id}`)}
                >
                  Edit
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>

      {token && (
        <div className="mt-12">
          <CreateTrain />
        </div>
      )}
    </div>
  );
};

export default TrainsList;
