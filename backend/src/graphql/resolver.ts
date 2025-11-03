import { Op, WhereOptions } from "sequelize"
import { Character, Comment, Favorite } from '../database/models';
import { deleteCachedDataByPrefix, getCachedData, setCachedData } from "../redis/redis";

type Filters = {
  name?: string;
  status?: string;
  species?: string;
  gender?: string;
  origin?: string;
}

const buildCacheKey = (queryName: string, args: any) => {
  return `${queryName}:${JSON.stringify(args)}`;
};

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
  getAllCharacters: async ({ filters, limit = 50, offset = 0 }: any) => {
    try {

      const cacheKey = buildCacheKey('characters', { filters, limit, offset  });
      const cachedData = await getCachedData(cacheKey);

      if (cachedData) {
        console.log('Cache HIT for characters query');
        return cachedData;
      }

      console.log('Cache MISS for characters query - Fetching from database');

      const where = buildWhereClause(filters);
      const sortBy = filters.sort === 'desc' ? 'DESC' : 'ASC'

      const charactersList = await Character.findAll({
        where,
        limit,
        offset,
        order: [['name', sortBy]],
        include: [
          {
            model: Favorite, as: 'isFavorite',
            required: false,
          },
        ],
      })

      const data = charactersList.map((char: any) => ({
        ...char.toJSON(),
        isFavorite: !!char.isFavorite,
      }));

      await setCachedData(cacheKey, data, 3600);

      return data
    } catch (error) {
      console.log('error', error)
    }
  },

  getCharacterById: async ({ id }: any) => {
    try {

      const cacheKey = buildCacheKey('character', { id });
      const cachedData = await getCachedData(cacheKey);

      if (cachedData) {
        console.log('Cache HIT for getCharacterByID query');
        return cachedData;
      }

      const character = await Character.findByPk(id, {
        include: [
          {
            model: Favorite, as: 'isFavorite',
            required: false,
          },
          {
            model: Comment, as: 'comments',
            required: false
          }
        ],
      })

      const comments = character?.toJSON().comments.map((comment: any) => ({
        ...comment,
      }));

      
      await setCachedData(cacheKey, character, 3600);

      return { ...character?.toJSON(), isFavorite: !!character?.toJSON().isFavorite, comments }
    } catch (error) {
      console.log(error)
    }
  },

  getFavorites: async ({ filters, limit = 50, offset = 0 }: any) => {
    try {
      const cacheKey = buildCacheKey('favorites', { filters, limit, offset });

      const cachedData = await getCachedData(cacheKey);
      
      if (cachedData) {
        console.log('Cache HIT for favorite characters query');
        return cachedData;
      }

      const where = buildWhereClause(filters);
      const sortBy = filters.sort === 'desc' ? 'DESC' : 'ASC'

      const charactersList = await Character.findAll({
        where,
        limit,
        offset,
        order: [['name', sortBy]],
        include: [
          {
            model: Favorite, as: 'isFavorite',
            required: true
          }
        ]
      })

      const data = charactersList.map((char: any) => ({
        ...char.toJSON(),
        isFavorite: !!char.isFavorite,
      }));
      
      await setCachedData(cacheKey, data, 3600);

      return data
    } catch (error) {
      console.log(error)
    }
  },

  createComment: async ({ characterId, user, comment }: any) => {
    try {
      const newComment = await Comment.create({
        characterId,
        user,
        comment,
      });

      return newComment.toJSON();
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  },

  handleFavorite: async ({ id }: any) => {
    try {
      const data = await Character.findByPk(id)
      const character = data?.toJSON()
      const favCharacter = await Favorite.findOne({ where: { characterId: id } })

      if (favCharacter) {
        await favCharacter.destroy()
        await deleteCachedDataByPrefix('favorites');
        await deleteCachedDataByPrefix('characters');

        return { ...character, isFavorite: false }
      }

      await Favorite.create({ characterId: id })

      await deleteCachedDataByPrefix('favorites');
      await deleteCachedDataByPrefix('characters');

      return { ...character, isFavorite: true }

    } catch (error) {
      console.log(error)
    }
  }
}

export {
  root
}