const DashbordModel = require("../../models/Dashbord");

const Dashbord = {
    lstData: (req, res) => {
        const { page = 1, limit = 5 } = req.query;

        DashbordModel.getLatest(Number(page), Number(limit), (err, data) => {
            if (err) {
                return res
                    .status(500)
                    .json({ message: "Data get Unsuccessfully.", error: err });
            }
            return res.status(200).json({
                message: "Data get Successfully.",
                result: data.result,
                total: data.total,
            });
        });
    },
    dasDatums: (req, res) => {
        const { page = 1, limit = 20 } = req.query;
        DashbordModel.dasBox(page, limit, (err, result) => {
            if (err) {
                return res
                    .status(500)
                    .json({ message: "Data get Unsuccessfully.", error: err });
            }
            return res
                .status(201)
                .json({ message: "Data get Successfully.", result });
        });
    },
};

module.exports = Dashbord;
