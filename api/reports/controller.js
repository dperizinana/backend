const Report = require("./model");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dwgubuos4",
  api_key: "748282546151426",
  api_secret: "q8XK9TnUpt8DfUuN8PWeQUv31Qc",
});
const createReport = async (req, res, next) => {
  try {
    const { no, nama_pemohon, nama_bangunan, lokasi_bangunan, kecamatan, kelurahan, jenis_bangunan, unit, lantai, no_sk, tgl_sk } = req.body;

    // Upload the file to Cloudinary
    // Upload the file to Cloudinary without auto-formatting
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "raw", // Specify "raw" resource type to keep the original format
      allowed_formats: ["pdf"], // Accept only PDF files
    });
    console.log(result)
    const newReport = new Report({
      no,
      nama_pemohon,
      nama_bangunan,
      lokasi_bangunan,
      kecamatan,
      kelurahan,
      jenis_bangunan,
      unit,
      lantai,
      no_sk,
      tgl_sk,
      file: result.public_id, // Store the Cloudinary URL of the file
      file_url: result.secure_url, // You can use this for full URL to access the file
    });

    await newReport.save();
    return res.status(200).json({
      message: "created",
      data: newReport,
    });
  } catch (error) {
    next(error);
  }
};

const getAllReport = async (req, res, next) => {
  try {
    const result = await Report.find();
    if (!result) {
      return res.status(200).json({
        message: "currently there is no data ",
        data: [],
      });
    }
    return res.status(200).json({
      message: "success get all data",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getOneReport = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await Report.findOne({ _id: id });
    if (!result) {
      return res.status(200).json({
        message: `no data found with id : ${id}`,
        data: [],
      });
    }
    return res.status(200).json({
      message: "success get data",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const updateOneReport = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { no, nama_pemohon, nama_bangunan, lokasi_bangunan, kecamatan, kelurahan, jenis_bangunan, unit, lantai, no_sk, tgl_sk } = req.body;

    const result = await Report.findOne({ _id: id });
    if (!result) {
      return res.status(200).json({
        message: `No data found with id: ${id}`,
        data: [],
      });
    }

    if (req.file) {
      // If a new file is uploaded, delete the previous file from Cloudinary
      if (result.file) {
        const publicId = result.file;
        await cloudinary.uploader.destroy(publicId, { resource_type: "raw" });
      }

      // Upload the new file to Cloudinary
      const fileResult = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "raw",
        allowed_formats: ["pdf"],
      });

      result.file = fileResult.public_id;
      result.file_url = fileResult.secure_url;
    }

    // Update other fields
    result.no = no;
    result.nama_pemohon = nama_pemohon;
    result.nama_bangunan = nama_bangunan;
    result.lokasi_bangunan = lokasi_bangunan;
    result.kecamatan = kecamatan;
    result.kelurahan = kelurahan;
    result.jenis_bangunan = jenis_bangunan;
    result.unit = unit;
    result.lantai = lantai;
    result.no_sk = no_sk;
    result.tgl_sk = tgl_sk;

    await result.save();
    return res.status(200).json({
      message: `Success update data with id: ${id}`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const deleteOneReport = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await Report.findOne({ _id: id });
    if (!result) {
      return res.status(200).json({
        message: `No data found with id: ${id}`,
        data: [],
      });
    }

    // Check if there's a file associated with the report and delete it from Cloudinary
    if (result.file) {
      // Use the public_id from the Cloudinary URL in the result
      const publicId = result.file;

      // Delete the file from Cloudinary
      const deleteResponse = await cloudinary.uploader.destroy(result.file, {
        resource_type: "raw"
      });

      if (deleteResponse.result === 'ok') {
        // Deletion successful, continue to delete the report
        await Report.deleteOne({ _id: id });
        return res.status(200).json({
          message: `Success deleted data with id: ${id}`,
          data: result,
        });
      } else {
        // Deletion from Cloudinary failed
        return res.status(500).json({
          message: `Failed to delete the file from Cloudinary`,
        });
      }
    }

    // If there's no file associated with the report, just delete the report
    await Report.deleteOne({ _id: id });

    return res.status(200).json({
      message: `Success deleted data with id: ${id}`,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};



module.exports = {
  createReport,
  getAllReport,
  updateOneReport,
  deleteOneReport,
  getOneReport
};
