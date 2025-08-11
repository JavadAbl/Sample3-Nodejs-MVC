import { AppError } from "#utils/error-utils/app-error.js";

export class BaseRepository {
  #rep;

  constructor(rep) {
    this.#rep = rep;
  }

  findUnique(column, value) {
    return this.#rep.findUnique({
      where: {
        [column]: value,
      },
    });
  }

  findOne(column, value) {
    return this.#rep.findOne({
      where: {
        [column]: value,
      },
    });
  }

  create(data) {
    return this.#rep.create({ data });
  }

  find({ page, take, ids, includes, where, orderBy, select } = {}) {
    const include = includes?.reduce((acc, include) => {
      acc[include] = true;
      return acc;
    }, {});

    const query = {};

    if (page && take) {
      query.skip = (page - 1) * take;
      query.take = take;
    }
    if (orderBy) query.orderBy = orderBy;
    else query.orderBy = { id: "desc" };

    if (include) query.include = include;

    const whereClause = {};
    if (ids && ids.length > 0) {
      whereClause.id = { in: ids };
    }
    if (where) {
      Object.assign(whereClause, where);
      query.where = whereClause;
    }

    if (select) query.select = select;

    return this.#rep.findMany(query);
  }

  findAll(criteria = {}) {
    return this.#rep.findMany(criteria);
  }

  count(criteria = {}) {
    return this.#rep.count(criteria);
  }

  /**
   * Partially update an entity by its ID
   * @param {string|number} id - The ID of the entity to update
   * @param {object} data - An object containing the fields to update with their values
   * @returns {Promise<object>} The updated entity
   * @throws {Error} If the entity is not found or if the ID is not provided
   */
  async patch(id, data) {
    // Validate that ID is provided
    if (!id) {
      throw new AppError("ID is required for patch operation", 400);
    }

    // Create an update object with only the fields that are provided in the data
    const updateData = { ...data };

    try {
      // Perform the update operation using Prisma
      const updatedEntity = await this.#rep.update({
        where: { id },
        data: updateData,
      });

      return updatedEntity;
    } catch (error) {
      // Handle the case where the entity with the given ID doesn't exist
      if (error.code === "P2025") {
        throw new AppError(`Entity with ID ${id} not found`, 404);
      }
      // Re-throw other errors
      throw error;
    }
  }
}
