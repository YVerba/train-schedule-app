"use client";

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useTrainStore } from "@/store/trainStore";
import { useRouter } from "next/navigation";
import CreateTrain from "./CreateTrain";

const TrainsList = () => {
  const { trains, loading, error, fetchTrains } = useTrainStore();
  const { token } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    fetchTrains();
  }, [fetchTrains]);

  return (
    <div className="max-w-2xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">Train Schedule</h2>
      <ul className="space-y-4">
        {trains.map((train) => (
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
