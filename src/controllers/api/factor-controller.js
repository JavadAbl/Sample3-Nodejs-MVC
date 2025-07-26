class FactorController {
  //create-------------------------------------------------------------------
  async create(req, res) {
    return res.json(req.files);
  }

  //getAll-------------------------------------------------------------------
  async getAll(req, res) {
    return res.json("factors");
  }
}

export const factorController = new FactorController();
