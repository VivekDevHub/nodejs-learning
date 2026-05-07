const ListModel = require("../models/list.model");

const createListController = async (req, res) => {
  try {
    let { taskName, description } = req.body;

    if (!taskName || !description) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    let newList = await ListModel.create({
      taskName: taskName,
      description,
    });

    return res.status(201).json({
      message: "List Created Successfully",
      list: newList,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const getAllListsController = async (req, res) => {
  try {
    let allLists = await ListModel.find();

    if (!allLists.length) {
      return res.status(204).json({
        message: "List fetched successfully",
        lists: allLists,
      });
    }

    return res.status(200).json({
      message: "List Fetched Successfully",
      lists: allLists,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const updateListController = async (req, res) => {
  try {
    let listId = req.params.id;
    if (!listId) {
      return res.status(400).json({
        message: "Id not found",
      });
    }

    let { taskName, description } = req.body;
console.log(req.body,"server me hai -===-=-=-=")

    if (!taskName || !description) {
      return res.status(400).json({
        message: "All fields required",
      });
    }

    let updatedList = await ListModel.findByIdAndUpdate(
      listId,
      {
        taskName: taskName,
        description,
      },
      {
        new: true,
      },
    );
    if(!updatedList){
      return res.status(404).json({
        message:"List not Found -=-=-="
      })
    }
    return res.status(200).json({
      message: "List updated successfully",
      list: updatedList,
    });
  } catch (error) {    
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const deleteListController = async (req, res) => {
  try {
    let listId = req.params.id;

    if (!listId) {
      return res.status(404).json({
        message: "Id not found",
      });
    }

    await ListModel.findByIdAndDelete(listId);

    return res.status(200).json({
      message: "list deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  createListController,
  getAllListsController,
  updateListController,
  deleteListController,
};
