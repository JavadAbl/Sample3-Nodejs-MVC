import { factorService } from "#services/factor-service.js";
import { generatePagination } from "#utils/app-utils/app-utils.js";

class FactorController {
  //index----------------------------------------------------------
  async index(req, res) {
    const page = req.page || 1;
    const pageSize = 10;

    const [factors, count] = await Promise.all([
      factorService.getPageFactors(page, pageSize),
      factorService.getFactorsCount(),
    ]);

    const totalPages = Math.ceil(count / pageSize);

    res.render("factors", {
      factors,
      currentPage: page,
      totalPages,
      pagination: generatePagination(page, totalPages),
    });
  }
}

export const factorController = new FactorController();
