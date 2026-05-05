import React from "react";

const List = ({ list, handleDelete }) => {
  return (
    <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-6 hover:shadow-xl transition duration-300 hover:-translate-y-1">
      {/* Task Title */}
      <div className="mb-4">
        <h2 className="text-2xl font-bold text-gray-800 capitalize">
          {list.name}
        </h2>
        <p className="text-sm text-gray-400 mt-1">Your personal task item</p>
      </div>

      {/* Description */}
      <div className="mb-6">
        <p className="text-gray-600 leading-relaxed text-sm">
          {list.description}
        </p>
      </div>

      {/* Footer Buttons */}
      <div className="flex gap-4">
        <button className="flex-1 py-3 rounded-xl bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-500 transition duration-300">
          Update
        </button>

        <button
          onClick={() => handleDelete(list._id)}
          className="flex-1 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 transition duration-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default List;
