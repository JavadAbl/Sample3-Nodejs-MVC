import * as path from "path";
import * as fs from "fs";
const { default: Busboy } = await import("busboy");

export function formdataMiddleware(req, res, next) {
  if (
    req.method === "POST" &&
    req.headers["content-type"]?.includes("multipart/form-data")
  ) {
    const busboy = new Busboy({ headers: req.headers });

    req.body = {};
    req.files = [];

    busboy.on("field", (fieldname, val) => {
      req.body[fieldname] = val;
    });

    busboy.on("file", (fieldname, file, filename) => {
      const saveTo = path.join(__dirname, "uploads", filename);
      file.pipe(fs.createWriteStream(saveTo));
      req.files.push({ fieldname, filename, path: saveTo });
    });

    busboy.on("finish", () => {
      next();
    });

    req.pipe(busboy);
  } else {
    next();
  }
}
