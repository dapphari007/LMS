import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import config from "../../config";
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import Alert from "../../components/ui/Alert";

interface Position {
  id: string;
  name: string;
  description: string;
  level: number;
  departmentId: string;
  department?: {
    id: string;
    name: string;
  };
  departmentName?: string;
}

const PositionsPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [positionsData, setPositionsData] = useState<Position[]>([]);

  const fetchPositions = async () => {
    try {
      console.log("Fetching positions from:", `${config.apiUrl}/positions`);
      console.log("Auth token:", localStorage.getItem("token") ? "Token exists" : "No token found");
      
      const response = await axios.get(`${config.apiUrl}/positions`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      // Log the response data for debugging
      console.log("Positions API Response:", response.data);
      console.log("Response status:", response.status);
      console.log("Response headers:", response.headers);

      // Ensure we have an array of positions
      let positions = response.data;
      console.log("Positions data type:", Array.isArray(positions) ? "Array" : typeof positions);
      
      // Check if the response has a positions property (API returns { positions: [...], count: n })
      if (positions && positions.positions && Array.isArray(positions.positions)) {
        console.log("Found positions array in response.data.positions");
        positions = positions.positions;
      } else if (!Array.isArray(positions)) {
        if (positions && typeof positions === "object") {
          // If it's an object, try to extract an array from it
          console.log("Converting object to array");
          positions = Object.values(positions);
        } else {
          console.log("Setting positions to empty array");
          positions = [];
        }
      }

      console.log("Positions after conversion:", positions);

      // Validate each position has required fields
      positions = positions.filter((pos: any) => {
        const isValid = pos &&
          typeof pos === "object" &&
          pos.id &&
          pos.name &&
          typeof pos.level === "number";
          
        if (!isValid) {
          console.log("Filtering out invalid position:", pos);
        }
        return isValid;
      });
      
      console.log("Positions after validation:", positions);
      
      // Map department objects to departmentName for display
      positions = positions.map((pos: any) => {
        console.log("Processing position:", pos.id, pos.name);
        console.log("Department info:", pos.department);
        
        return {
          ...pos,
          departmentName: pos.department && pos.department.name ? pos.department.name : 'N/A'
        };
      });

      console.log("Final positions data:", positions);
      return positions;
    } catch (err: any) {
      console.error("Error fetching positions:", err);
      console.error("Error details:", err.response ? {
        status: err.response.status,
        data: err.response.data,
        headers: err.response.headers
      } : "No response");
      
      setError(`Failed to fetch positions: ${err.message}`);
      throw new Error(`Failed to fetch positions: ${err.message}`);
    }
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["positions"],
    queryFn: fetchPositions,
  });

  useEffect(() => {
    if (data) {
      setPositionsData(Array.isArray(data) ? data : []);
    }
  }, [data]);

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this position?")) {
      try {
        await axios.delete(`${config.apiUrl}/positions/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setSuccess("Position deleted successfully");
        refetch();
      } catch (err) {
        setError("Failed to delete position");
      }
    }
  };

  const getLevelLabel = (level: number) => {
    switch (level) {
      case 1:
        return "Entry Level";
      case 2:
        return "Senior/Specialist";
      case 3:
        return "Manager";
      case 4:
        return "Director";
      default:
        return "Unknown Level";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          Positions Management
        </h1>
        <Button
          variant="primary"
          onClick={() => (window.location.href = "/positions/create")}
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Create Position
        </Button>
      </div>

      {error && (
        <Alert type="error" message={error} onClose={() => setError(null)} />
      )}
      {success && (
        <Alert
          type="success"
          message={success}
          onClose={() => setSuccess(null)}
        />
      )}

      <Card>
        {isLoading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700"></div>
          </div>
        ) : positionsData.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No positions found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {positionsData.map((position: Position) => (
                  <tr key={position.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {position.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {position.departmentName || 'No Department'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {getLevelLabel(position.level)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">
                        {position.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            (window.location.href = `/positions/edit/${position.id}`)
                          }
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(position.id)}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default PositionsPage;
