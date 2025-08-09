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

  findPage({ page = 1, take = 10, ids, includes = [] } = {}) {
    const include = includes.reduce((acc, include) => {
      acc[include] = true;
      return acc;
    }, {});

    const query = {
      skip: (page - 1) * take,
      take,
      orderBy: { id: "desc" },
      include,
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

  findAll({ ids, includes = [] } = {}) {
    const include = includes.reduce((acc, include) => {
      acc[include] = true;
      return acc;
    }, {});

    const query = {
      orderBy: { id: "desc" },
      include,
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

  patch() {}
}
