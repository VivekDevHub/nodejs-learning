import axios from "axios";

const BASE_URL = "http://localhost:3000/api/lists";

// Get all lists
const fetchAllLists = async () => {
  try {
    const res = await axios.get(BASE_URL);
    return res.data.lists;
  } catch (error) {
    console.log("Error in fetching lists:", error.message);
  }
};

// Create new list
const createNewList = async (data) => {
  try {
    const res = await axios.post(`${BASE_URL}/create`, data);
    return res.data;
  } catch (error) {
    console.log("Error in creating list:", error.message);
  }
};

// Delete list
const deleteList = async (id) => {
  try {
    const res = await axios.delete(`${BASE_URL}/delete/${id}`);
    alert("List deleted successfully");
    return res.data;
  } catch (error) {
    console.log("Error in deleting list:", error.message);
  }
};

export { fetchAllLists, createNewList, deleteList };
