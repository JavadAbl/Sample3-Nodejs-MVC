class AppConfigs {
  constructor() {
    this.ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

    this.REFERESH_TOKEN_SECRET = process.env.REFERESH_TOKEN_SECRET;
  }
}

export const appConfigs = new AppConfigs();
