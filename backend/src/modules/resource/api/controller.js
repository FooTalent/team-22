import CustomController from "../../../libraries/customs/controller.js";
import Service from "../logic/service.js";

export default class Controller extends CustomController {
  constructor() {
    super(new Service);
  }

  get    = async (req, res, next) => {
    try {
      const filter = {};

      const { level, type } = req.query;
      if (level){
        filter.level = level
      }
      if (type){
        filter.type = type
      }
      // if (isTemplate) filter.isTemplate = isTemplate === "true";

      const element = await this.service.get(filter);
      res.sendSuccessOrNotFound(element);
    } catch (error) {
      next(error);
    }
  }
}