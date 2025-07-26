class FactorController {
  //create-------------------------------------------------------------------
  async create(req, res) {
    console.log(req.body);

    return res.json(req.body);
  }

  //getAll-------------------------------------------------------------------
  async getAll(req, res) {
    return res.json("factors");
  }
}

export const factorController = new FactorController();
