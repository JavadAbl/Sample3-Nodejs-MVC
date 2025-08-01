class AppConfigs {
  constructor() {
    this.ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

    this.REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
  }
}

export const appConfigs = new AppConfigs();
