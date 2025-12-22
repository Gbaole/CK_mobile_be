import ResponseHandler from "../utils/response.handler.js";

export default class BaseController {
  constructor(service) {
    this.service = service;
    this.response = ResponseHandler;
  }

  create = async (req, res) => {
    try {
      const data = await this.service.create(req.body);
      this.response.success(res, data, "Created successfully", 201);
    } catch (err) {
      this.response.error(res, err.message);
    }
  };

  getAll = async (req, res) => {
    try {
      const data = await this.service.findAll(req.query || {});
      this.response.success(res, data);
    } catch (err) {
      this.response.error(res, err.message);
    }
  };

  getById = async (req, res) => {
    try {
      const { id } = req.params;
      const data = await this.service.findById(id);
      if (!data) return this.response.error(res, "Not found", 404);
      this.response.success(res, data);
    } catch (err) {
      this.response.error(res, err.message);
    }
  };

  updateById = async (req, res) => {
    try {
      const { id } = req.params;
      const data = await this.service.updateById(id, req.body);
      if (!data) return this.response.error(res, "Not found", 404);
      this.response.success(res, data, "Updated successfully");
    } catch (err) {
      this.response.error(res, err.message);
    }
  };

  deleteById = async (req, res) => {
    try {
      const { id } = req.params;
      const data = await this.service.deleteById(id);
      if (!data) return this.response.error(res, "Not found", 404);
      this.response.success(res, null, "Deleted successfully");
    } catch (err) {
      this.response.error(res, err.message);
    }
  };
}
