import uniqueString from 'unique-string';
import Validator from 'validatorjs';
import catFactsService from '../../services/catFactsService.js'
import FactModel from '../../models/fact.js'


/**
 * Create fact.
 * 
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @returns {json}  Json message.
 */
const createFacts = async (req, res) => {
  let output = {}
  let statusCode = 201
  let user = uniqueString()
  let _id = uniqueString()
  let data = {
    '_id': req.body['_id'] ?? _id,
    'user': req.body.user ?? user,
    'text': req.body.text,
    '__v': req.body['__v'] ?? 0,
    'source': req.body?.source ?? 'user',
    'type': 'cat',
    'deleted': false,
    'used': false
  }
  
  let rules = {
    text: 'required',
  };
  
  let validation = new Validator(data, rules);
  let a = validation.check();
  if (validation.fails()) {
    statusCode = 400
    output = {
      status: statusCode,
      message: validation.errors.all()
    }
    return res.status(statusCode).json(output)
  }

  try {
    await FactModel.create(data)
  } catch (error) {
    output = {
      status: 500,
      message: error.message
    }
    statusCode = 500
  }

  return res.status(statusCode).json(output)
}

/**
 * Show facts.
 * 
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @returns {json}  Json data of facts.
 */
const getFacts = async (req, res) => {
  let output = {}
  let statusCode = 200
  let per_page = req.query.per_page ?? 5
  let page = req.query.page ?? 1
  let offset = page * parseInt(per_page) - parseInt(per_page)
  let factExternalData = []

  try {
    // Source api fetch from third party api.
    let FactService = new catFactsService()
    const theResponse = await FactService.getListFromAPI('/facts')
    factExternalData = await theResponse.json()
    
    if (factExternalData.length) {
      factExternalData = factExternalData.slice(0,5)
      factExternalData?.forEach(async (item) => {
        const foundItem =  await FactModel.findOne({ where: { '_id': item['_id'] } })
        if (!foundItem) {
          await FactModel.create({
            "_id": item['_id'],
            "user": item.user,
            "status": item.status,
            "text": item.text,
            "__v": item['__v'],
            "source": item.source,
            "type": item.type,
            "deleted": item.deleted,
            "used": item.used,
          })
        }
      });
    }
  } catch (error) {
    // console.log(error)
  }
  
  try {
    let facts = await FactModel.findAndCountAll({ offset: offset, limit: per_page, where:{deleted: false}, order: [['createdAt', 'DESC']] }) 
    if (facts.rows.length) {
      output = {
        total: facts.count,
        totalPage: Math.round(facts.count / parseInt(per_page)),
        page: page,
        per_page: parseInt(per_page),
        data: facts.rows,
        from: offset + 1,
        to : offset + parseInt(per_page)
      }
    }
  } catch (error) {
    output = {
      status: error.statusCode,
      message: error.message
    }
    statusCode = 500
  }
  
  return res.status(statusCode).json(output)
}

/**
 * Get specefic fact by id.
 * 
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @returns {json}  Json data of  facts get by id.
 */
const getFactById = async (req, res) => {
  let output = {}
  let statusCode = 200
  const {factId} = req.params
  const fact = await FactModel.findOne({ where: { '_id': factId } })
  
  if (fact) {
    output = fact
  } else {
    output = {
      status: '404',
      message: "fact is not found"
    }
    statusCode = 404
  }
  return res.status(statusCode).json(output)
}

/**
 * Update specefic fact.
 * 
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @returns {json}  Json data of facts.
 */
const updateFact = async (req, res) => {
  let output = {}
  let statusCode = 200
  const { factId } = req.params

  try {
    const [updated] = await FactModel.update(req.body, {
      where: { '_id': factId },
    });
    if (updated) {
      const updatedPost = await FactModel.findOne({ where: { '_id': factId } });
      output = updatedPost
      statusCode = 200
    }
  } catch (error) {
    output = {
      status: 500,
      message: error.message
    }
    statusCode = 500
  }
  
  return res.status(statusCode).json(output)
}

/**
 * Delete specefic fact.
 * 
 * @param {object} req - express request object
 * @param {object} res - express response object
 * @returns {json}  Json data.
 */
const deleteFact = async (req, res) => {
  let output = {}
  let statusCode = 200
  try {
    const { factId } = req.params;
    // const deleted = await FactModel.destroy({ where: { '_id': factId } });

    // soft delete
    const deleted = await FactModel.update({deleted: true}, {
      where: { '_id': factId },
    });

    if (deleted) {
      statusCode = 200;
    } else {
      output = {
        status: "404",
        message: "fact is not found",
      };
      statusCode = 404;
    }
  } catch (error) {
    output = {
      status: 500,
      message: error.message
    }
    statusCode = 500
  }

  return res.status(statusCode).json(output)
}


export {
  createFacts,
  getFacts,
  getFactById,
  updateFact,
  deleteFact
}