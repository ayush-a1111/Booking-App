import { Logger } from '../config/index.js';
import { STATUS_CODES } from '../constants/index.js';
import { paginate } from '../utils/common/index.js';
import { AppError } from '../utils/errors/app-error.js';

class CrudRepository {
    constructor(model) {
        this.model = model;
    }

    create = async (data) => {
        Logger.info(data);
        const response = await this.model.create(data);
        return response;
    };

    getAll = async (data) => {
        let { page, pageSize } = data;
        const response = await this.model.findAll(
            paginate(
                {
                    where: {},
                },
                { page, pageSize }
            )
        );
        return response;
    };

    get = async (filter) => {
        Logger.info(filter);
        console.log(filter);
        const response = await this.model.findOne({
            where: filter,
        });

        if (!response) {
            throw new AppError(
                'No such event is present',
                STATUS_CODES.NO_DATA_FOUND
            );
        }

        return response;
    };

    getByPK = async (data) => {
        Logger.info(data);
        const response = await this.model.findByPk(data);
        return response;
    };

    update = async (payload) => {
        let { filter, updateObj } = payload;
        Logger.info(payload);
        const response = await this.model.update(updateObj, {
            where: filter,
        });

        return response;
    };

    delete = async (filter) => {
        Logger.info(filter);
        const response = await this.model.destroy({
            where: filter,
        });

        if (!response) {
            throw new AppError(
                'Unable to delete the resource as it is not found',
                STATUS_CODES.NO_DATA_FOUND
            );
        }

        return response;
    };
}

export { CrudRepository };
