import Job from "../models/JobModule.js";
import { StatusCodes } from "http-status-codes";
import day from "dayjs";
import mongoose, { mongo } from "mongoose";

export const getAlljobs = async (req, res) => {
  const { search } = req.query;

  const queryObj = {
    createdBy: req.user.userId,
  };

  if (search) {
    queryObj.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ];
  }
  const jobs = await Job.find(queryObj);
  res.status(StatusCodes.OK).json({ jobs });
};
import { NotFoundError, UnauthorizedError } from "../errors/customErrors.js";

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({ job });
};

export const getAJob = async (req, res) => {
  const { id } = req.params;

  const job = await Job.findById(id);

  if (!job) {
    throw new NotFoundError({ msy: `no job with id ${id}` });
  }

  res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req, res) => {
  const { id } = req.params;

  const job = await Job.findById(id);

  if (!job) throw new NotFoundError(`no job with this id ${id}`);

  const isAdmin = req.user.role === "admin";
  const isOwner = req.user.userId === job.createdBy.toString();

  if (!isAdmin && !isOwner)
    throw new UnauthorizedError("not authorize to access this router");

  try {
    const job = await Job.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!job) {
      throw new NotFoundError({ msy: `no job with id ${id}` });
    }

    res.status(StatusCodes.OK).json({ msy: "job modify", job });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteJob = async (req, res) => {
  const { id } = req.params;

  const job = await Job.findById(id);
  if (!job) throw new NotFoundError(`no job with this id ${id}`);

  const isAdmin = req.user.role === "admin";
  const isOwner = req.user.userId === job.createdBy.toString();

  if (!isAdmin && !isOwner)
    throw new UnauthorizedError("not authorize to access this router");

  try {
    const job = await Job.findByIdAndDelete(id);
    if (!job) {
      throw new NotFoundError({ msy: `no job with id ${id}` });
    }

    res.status(StatusCodes.OK).json({ msy: "delete job ", job });
  } catch (error) {
    res.status(500).json(error);
  }
};

export const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  console.log(stats);
  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };
  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
