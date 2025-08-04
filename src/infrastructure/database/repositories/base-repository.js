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

  findPage({ page = 1, take = 10, ids }) {
    const query = {
      skip: (page - 1) * take,
      take,
      orderBy: { id: "desc" },
    };

    if (ids && ids.length > 0) {
      query.where = {
        id: {
          in: ids,
        },
      };
    }

    return this.#rep.findMany(query);
  }

  findAll({ ids }) {
    const query = {
      orderBy: { id: "desc" },
    };

    if (ids && ids.length > 0) {
      query.where = {
        id: {
          in: ids,
        },
      };
    }

    return this.#rep.findMany(query);
  }

  count() {
    return this.#rep.count();
  }
}
