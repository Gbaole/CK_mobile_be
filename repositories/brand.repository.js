import BaseRepository from "./base.repository.js";
import Brand from "../models/brand.model.js";

class BrandRepository extends BaseRepository {
  constructor() {
    super(Brand);
  }
}

export default new BrandRepository();
