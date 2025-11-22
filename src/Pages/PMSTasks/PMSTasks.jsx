import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import DBUser from "../../Sheare/DBUser";

export default function PMSTasks() {
  const { role } = DBUser(); // you can keep it or remove if not using
  const [tasks, setTasks] = useState([]);
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  // Add/Edit form
  const [form, setForm] = useState({
    assetId: "",
    jobDescription: "",
    cycle: "Monthly",
    lastDoneDate: "",
    lastDoneRunningHour: 0,
    assignedTo: "",
  });

  const [editId, setEditId] = useState(null); // For update mode

  // Fetch Assets
  const fetchAssets = async () => {
    const { data } = await axios.get("http://localhost:3000/assets");
    setAssets(data);
  };

  // Fetch Tasks
  const fetchTasks = async () => {
    setLoading(true);
    const { data } = await axios.get("http://localhost:3000/tasks");
    setTasks(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchAssets();
    fetchTasks();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Create or Update Task
  const handleSubmit = async () => {
    try {
      if (editId) {
        // UPDATE TASK
        await axios.patch(`http://localhost:3000/tasks/${editId}`, form);
        Swal.fire("Updated!", "Task updated successfully.", "success");
      } else {
        // ADD TASK
        const { data } = await axios.post("http://localhost:3000/tasks", form);
        if (data.insertedId) {
          Swal.fire("Added!", "Task added successfully.", "success");
        }
      }

      // Reset form
      setForm({
        assetId: "",
        jobDescription: "",
        cycle: "Monthly",
        lastDoneDate: "",
        lastDoneRunningHour: 0,
        assignedTo: "",
      });
      setEditId(null);
      fetchTasks();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Operation failed.", "error");
    }
  };

  // Load task data for editing
  const loadEditTask = (task) => {
    setEditId(task._id);
    setForm({
      assetId: task.assetId,
      jobDescription: task.jobDescription,
      cycle: task.cycle,
      lastDoneDate: task.lastDoneDate?.slice(0, 10),
      lastDoneRunningHour: task.lastDoneRunningHour,
      assignedTo: task.assignedTo,
    });
  };

  // Delete task
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Delete Task?",
      text: "This will remove the task permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:3000/tasks/${id}`);
      Swal.fire("Deleted!", "Task removed.", "success");
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-5 text-center font-semibold">Loading Tasks...</div>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">PMS Tasks</h2>

      {/* Add / Edit Task Form */}
      <div className="mb-5 p-4 bg-white shadow rounded">
        <h3 className="font-semibold mb-2">{editId ? "Update Task" : "Add New Task"}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

          {/* Asset Dropdown */}
          <select
            name="assetId"
            value={form.assetId}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select Asset</option>
            {assets.map((a) => (
              <option key={a._id} value={a._id}>
                {a.equipmentName}
              </option>
            ))}
          </select>

          {/* Job Description */}
          <input
            type="text"
            name="jobDescription"
            placeholder="Job Description"
            value={form.jobDescription}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          {/* Cycle */}
          <select
            name="cycle"
            value={form.cycle}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Yearly">Yearly</option>
            <option value="RunningHour">Running Hour</option>
          </select>

          {/* Date */}
          <input
            type="date"
            name="lastDoneDate"
            value={form.lastDoneDate}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          {/* Running Hour */}
          <input
            type="number"
            name="lastDoneRunningHour"
            value={form.lastDoneRunningHour}
            onChange={handleChange}
            placeholder="Running Hour"
            className="border p-2 rounded"
          />

          {/* Assigned To */}
          <input
            type="text"
            name="assignedTo"
            value={form.assignedTo}
            onChange={handleChange}
            placeholder="Assigned To (email)"
            className="border p-2 rounded"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {editId ? "Update Task" : "Add Task"}
        </button>
      </div>

      {/* Tasks Table */}
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="table-auto w-full text-left">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3">Asset</th>
              <th className="p-3">Job Description</th>
              <th className="p-3">Cycle</th>
              <th className="p-3">Last Done</th>
              <th className="p-3">Next Due</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tasks.map((task) => (
              <tr key={task._id} className="border-b hover:bg-gray-100 transition">
                <td className="p-3">{task.asset?.[0]?.equipmentName || "N/A"}</td>
                <td className="p-3">{task.jobDescription}</td>
                <td className="p-3">{task.cycle}</td>
                <td className="p-3">{task.lastDoneDate?.slice(0, 10)}</td>
                <td className="p-3">{task.nextDueDate?.slice(0, 10)}</td>
                <td className="p-3">{task.status}</td>

                <td className="p-3 flex gap-2 justify-center">
                  <button
                    onClick={() => loadEditTask(task)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(task._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {tasks.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center p-5 text-gray-500">
                  No tasks found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
