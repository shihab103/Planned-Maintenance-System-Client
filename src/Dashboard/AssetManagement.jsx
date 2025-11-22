import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import DBUser from "../Sheare/DBUser";

export default function AssetManagement() {
  const { role } = DBUser(); // role from your auth context
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    equipmentName: "",
    category: "",
    location: "",
    serialNo: "",
    customFields: {},
  });

  // Fetch assets
  const fetchAssets = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("http://localhost:3000/assets");
      setAssets(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add Asset
  const handleAddAsset = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:3000/assets",
        form,
        { headers: { role } } // pass role in headers
      );
      if (data.insertedId) {
        Swal.fire("Added!", "Asset added successfully.", "success");
        setForm({ equipmentName: "", category: "", location: "", serialNo: "", customFields: {} });
        fetchAssets();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to add asset.", "error");
    }
  };

  // Delete Asset
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Asset?",
      text: "This will remove the asset permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      const { data } = await axios.delete(`http://localhost:3000/assets/${id}`, {
        headers: { role },
      });
      if (data.deletedCount > 0) {
        Swal.fire("Deleted!", "Asset removed.", "success");
        fetchAssets();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to delete asset.", "error");
    }
  };

  if (loading) return <div className="p-5 text-center font-semibold">Loading Assets...</div>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Asset Register</h2>

      {(role === "admin" || role === "management") && (
        <div className="mb-5 p-4 bg-white shadow rounded">
          <h3 className="font-semibold mb-2">Add New Asset</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              name="equipmentName"
              placeholder="Equipment Name"
              value={form.equipmentName}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={form.category}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            <input
              type="text"
              name="serialNo"
              placeholder="Serial No"
              value={form.serialNo}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
          <button
            onClick={handleAddAsset}
            className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Asset
          </button>
        </div>
      )}

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="table-auto w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Location</th>
              <th className="p-3">Serial No</th>
              {(role === "admin" || role === "management") && <th className="p-3 text-center">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset._id} className="border-b hover:bg-gray-100 transition">
                <td className="p-3">{asset.equipmentName}</td>
                <td className="p-3">{asset.category}</td>
                <td className="p-3">{asset.location}</td>
                <td className="p-3">{asset.serialNo}</td>
                {(role === "admin" || role === "management") && (
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleDelete(asset._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
            {assets.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center p-5 text-gray-500">
                  No assets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
