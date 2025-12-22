export default class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  // Create
  async create(data) {
    return await this.model.create(data);
  }

  // Get all (có filter)
  async findAll(filter = {}, options = {}) {
    const { populate = "", sort = { createdAt: -1 }, limit, skip } = options;

    let query = this.model.find(filter).sort(sort);

    if (populate) {
      query = query.populate(populate);
    }

    if (limit) query = query.limit(limit);
    if (skip) query = query.skip(skip);

    return await query.exec();
  }

  // Find one by ID
  async findById(id, populate = "") {
    return await this.model.findById(id).populate(populate).exec();
  }

  // Find one by condition
  async findOne(filter = {}, populate = "") {
    return await this.model.findOne(filter).populate(populate).exec();
  }

  // Update by ID
  async updateById(id, data) {
    return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  // Delete by ID
  async deleteById(id) {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
