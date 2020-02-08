import File from '../models/File';

class FileController {
  async store(req, res) {
    // essa variavel req.file o multer nos dá quando chamamos a rota utilizando ele
    const { originalname: name, filename: path } = req.file;
    const file = await File.create({
      name,
      path,
    });

    return res.json(file);
  }
}
export default new FileController();
