const mongoose = require("mongoose");
const ReportSchema = new mongoose.Schema(
  {
    no: {
      type: String,
      required: [true, "Place number must be Insert"],
    },
    nama_pemohon: {
      type: String,
      required: [true, "Place nama_pemohon must be Insert"],
    },
    nama_bangunan: {
      type: String,
      required: [true, "Place nama_bangunan must be Insert"],
    },
    lokasi_bangunan: {
      type: String,
      required: [true, "Place lokasi_bangunan must be Insert"],
    },
    kecamatan: {
      type: String,
      required: [true, "Place kecamatan must be Insert"],
    },
    kelurahan: {
      type: String,
      required: [true, "Place kelurahan must be Insert"],
    },
    jenis_bangunan: {
      type: String,
      required: [true, "Place jenis_bangunan must be Insert"],
    },
    unit: {
      type: String,
      required: [true, "Place unit must be Insert"],
    },
    lantai: {
      type: String,
      required: [true, "Place lantai must be Insert"],
    },
    no_sk: {
      type: String,
      required: [true, "Place no_sk must be Insert"],
    },
    tgl_sk: {
      type: Date,
      required: [true, "Place tgl_sk must be Insert"],
    },
    file : {
      type: String,
      default : ""
    }, 
    file_url : {
      type: String,
      default : ""
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Reports", ReportSchema);
