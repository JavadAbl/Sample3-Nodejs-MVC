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

  findAll() {
    return this.#rep.findMany();
  }
}
