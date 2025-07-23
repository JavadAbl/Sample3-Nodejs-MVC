class FactorController {
  //getAll-------------------------------------------------------------------
  async getAll(req, res) {
    return res.json("factors");
  }
}

export const factorController = new FactorController();
