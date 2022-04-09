import articles from "../models/articles.js";

const getArticles = async (req, res) => {
  try {
    const { page= 1, limit = 2 } = req.query;

    const allArticles = await articles
      .find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ year: -1, })
      .exec();

    const count = await articles.countDocuments();


    if(allArticles.length === 0){
      throw {
        code: 204,
        message: "Data kosong",
      };
    }

    // Jika tidak ada data
    if (!articles) {
      throw {
        code: 404,
        message: "Data tidak ditemukan",
      };
    }

    // Jika berhasil mengambil data
    res.status(200).json({
      status: true,
      data: allArticles,
      totalPage: Math.ceil(count / limit),
      currentPage: page,
      totalData: count
    });
  } catch (err) {
    // Catch error
    return res.status(err.code).json({
      status: false,
      message: err.message,
    });
  }
}

const getOneArticle = async (req, res) => {
  try{
    const { id } = req.params;

    const getOneArticle = await articles.findOne({
      id: id,
    })


    if(!getOneArticle || getOneArticle.length === 0){
      throw {
        code: 404,
        message: "Data tidak ditemukan",
      };
    }

    // Jika berhasil mengambil data
    res.status(200).json({
      status: true,
      message: "Berhasil mengambil data artikel",
      data: getOneArticle,
    });
  }catch (err){
    // Catch error
    return res.status(err.code).json({
      status: false,
      message: err.message,
    });
  }
}

const addArticle = async (req, res) => {
  try{
    const { title, content, author, link, year } = req.body;

    // Validasi Input
    if (!title || !content || !author || !link || !year) {
      throw {
        code: 428,
        message: "Data wajib diisi",
      };
    }

    // Simpan Data
    const newArticle = {
      title: title,
      content: content,
      author: author,
      link: link,
      year: year,
    }

    const addNewArticle = await articles.create(newArticle)

    if(!addNewArticle){
      throw {
        code: 500,
        message: "Gagal menyimpan data artikel",
      };
    }

    // Jika berhasil menyimpan data
    res.status(200).json({
      status: true,
      message: "Berhasil menyimpan data artikel",
      data: addNewArticle,
    });

  }catch(err){
    // Catch error
    return res.status(err.code).json({
      status: false,
      message: err.message,
    });
  }
}

const editArticle = async (req, res) => {
  try{
    const { id } = req.params;
    const { title, content, author, link, year } = req.body;

    // Validasi Input
    if (!title || !content || !author || !link || !year) {
      throw {
        code: 428,
        message: "Data wajib diisi",
      };
    }

    // Simpan Data
    const updatedArticle = {
      title: title,
      content: content,
      author: author,
      link: link,
      year: year,
    }

    const editArticle = await articles.findOneAndUpdate({
      id: id,
    }, updatedArticle)

    if(!editArticle){
      throw {
        code: 500,
        message: "Gagal menyimpan data artikel",
      };
    }

    // Jika berhasil menyimpan data
    res.status(200).json({
      status: true,
      message: "Berhasil menyimpan data artikel",
      data: editArticle,
    });
  }catch (err){
    // Catch error
    return res.status(err.code).json({
      status: false,
      message: err.message,
    });
  }
}

const deleteArticle = async (req, res) => {
  try{
    const { id } = req.params;

    const deleteArticle = await articles.findOneAndDelete({
      id: id,
    })

    if(!deleteArticle){
      throw {
        code: 404,
        message: "Data tidak ditemukan",
      };
    }

    // Jika berhasil menghapus data
    res.status(200).json({
      status: true,
      message: "Berhasil menghapus data artikel",
      data: deleteArticle,
    });
  }catch (err){
    // Catch error
    return res.status(err.code).json({
      status: false,
      message: err.message,
    });
  }
}

const searchArticle = async (req, res) => {
  try{
    const { keyword } = req.params;

    const searchArticle = await articles.find({
      $or: [
        { title: { $regex: keyword, $options: 'i' } },
        { author: { $regex: keyword, $options: 'i' } },
      ]
    })
    .sort({ year: -1, })

    if(!searchArticle || searchArticle.length === 0){
      throw {
        code: 204,
        message: "Data tidak ditemukan",
      };
    }

    // Jika berhasil mengambil data
    res.status(200).json({
      status: true,
      message: "Berhasil mengambil data artikel",
      data: searchArticle,
    });
  }catch (err){
    // Catch error
    return res.status(err.code).json({
      status: false,
      message: err.message,
    });
  }
}

export { getArticles, addArticle, editArticle, getOneArticle, deleteArticle, searchArticle };