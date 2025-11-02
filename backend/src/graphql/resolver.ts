import { Op, WhereOptions } from "sequelize"
import { Character } from "../database/models/Character.model"

type Filters = {
    name?: string;
    status?: string;
    species?: string;
    gender?: string;
    origin?: string;
}

export const buildWhereClause = (filters: Partial<Filters>): WhereOptions<Filters> => {
  const where: WhereOptions<Filters> = {};
  
  if (!filters) return where;
  
  if (filters.name) {
    where.name = {
      [Op.like]: `%${filters.name}%`
    };
  }
  
  if (filters.status) {
    where.status = filters.status;
  }
  
  if (filters.species) {
    where.species = {
      [Op.like]: `%${filters.species}%`
    };
  }
  
  if (filters.gender) {
    where.gender = filters.gender;
  }
  
  if (filters.origin) {
    where.origin = {
      [Op.like]: `%${filters.origin}%`
    };
  }
  
  return where;
};

const root = {
    getAllCharacters: async ({filters, limit = 50, offset = 0}: any ) => {
        try {
            const where = buildWhereClause(filters);
            const orderDirection = filters.sort === 'desc' ? 'DESC' : 'ASC'

            const charactersList = await Character.findAll({
                where,
                limit,
                offset,
                order: [['name', orderDirection]]
            })

            const result = charactersList.map(char => char.toJSON());
            return result
        } catch (error) {
            console.log('error', error)
        }
    }
}

export {
    root
}