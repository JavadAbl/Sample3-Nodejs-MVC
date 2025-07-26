import * as path from "path";
import * as fs from "fs";
import Busboy from "busboy";
import { Uuid4Generator } from "@litert/uuid";

const __dirname = process.cwd();

export function formdataMiddleware(req, res, next) {
  if (
    req.method === "POST" &&
    req.headers["content-type"]?.includes("multipart/form-data")
  ) {
    const busboy = Busboy({ headers: req.headers });

    req.body = {};
    req.files = [];

    const uploadDir = path.join(__dirname, "uploads", "factors");

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    busboy.on("field", (fieldname, val) => {
      req.body[fieldname] = val;
    });

    busboy.on("file", (fieldname, file, originalFilename) => {
      const extension = path.extname(originalFilename.filename);
      const uniqueName = new Uuid4Generator().generate() + extension;

      const relativePath = path.join("uploads", "factors", uniqueName);
      const saveTo = path.join(uploadDir, uniqueName);

      const writeStream = fs.createWriteStream(saveTo);

      writeStream.on("error", (err) => {
        next(err);
        req.unpipe(busboy);
        file.resume();
      });

      file.pipe(writeStream);

      req.files.push(relativePath);
    });

    busboy.on("finish", () => {
      next();
    });

    req.pipe(busboy);
  } else {
    next();
  }
}
