
import React, { useEffect, useRef, useState } from "react";
import List from "./components/List";
import {
  createNewList,
  deleteList,
  fetchAllLists,
  updateList,
} from "./api/listApis";

const App = () => {
  const listRef = useRef({});
  const [lists, setLists] = useState([]);
  const [editId, setEditId] = useState(null);

  // Fetch all tasks
  const getAllList = async () => {
    const res = await fetchAllLists();
    setLists(res || []);
  };

  useEffect(() => {
    getAllList();
  }, []);

  // Create + Update Task
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const obj = {
      taskName: listRef.current.taskName.value,
      description: listRef.current.description.value,
    };
    console.log(obj,"oobj ==-=-=-=-=-=");
    

    if (!obj.taskName || !obj.description) {
      alert("All fields are required");
      return;
    }

    if (editId) {
      // UPDATE MODE
      await updateList(editId, obj);
      setEditId(null);
    } else {
      // CREATE MODE
      await createNewList({
        taskName : obj.taskName,
        description: obj.description,
      });
    }

    await getAllList();

    e.target.reset();
  };

  // Delete task
  const handleDelete = async (id) => {
    await deleteList(id);
    await getAllList();
  };

  // Fill form for update
  const handleUpdate = (list) => {
    console.log(list,'LIST_+_+_+_');
    
    setEditId(list._id);

    listRef.current.taskName.value = list.taskName;
    listRef.current.description.value = list.description;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-10 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800">
            Todo List Manager
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Manage your daily work with a clean and modern UI
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left Side Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl p-8 sticky top-10">

              <h2 className="text-2xl font-bold text-gray-700 mb-6">
                {editId ? "Update Task" : "Add New Task"}
              </h2>

              <form
                onSubmit={handleFormSubmit}
                className="flex flex-col gap-5"
              >
                <input
                  ref={(e) => (listRef.current.taskName = e)}
                  type="text"
                  placeholder="Task Name"
                  className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <textarea
                  ref={(e) => (listRef.current.description = e)}
                  rows="5"
                  placeholder="Task Description"
                  className="p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  type="submit"
                  className="bg-blue-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition duration-300"
                >
                  {editId ? "Update Task" : "Create Task"}
                </button>
              </form>
            </div>
          </div>

          {/* Right Side Cards */}
          <div className="lg:col-span-2">
            {lists?.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {lists.map((elem) => (
                  <List
                    key={elem._id}
                    list={elem}
                    handleDelete={handleDelete}
                    handleUpdate={handleUpdate}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-md p-10 text-center">
                <h3 className="text-2xl font-semibold text-gray-700">
                  No Tasks Found
                </h3>

                <p className="text-gray-500 mt-2">
                  Create your first task to get started 🚀
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default App;