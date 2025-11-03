import { Character } from "./Character.model"
import { Comment } from "./Comment.model"
import { Favorite } from "./Favorite.model"

// Database relations between Models

Character.hasOne(Favorite, {
  foreignKey: 'characterId',
  as: 'isFavorite',
})

Character.hasMany(Comment, {
  foreignKey: 'characterId',
  as: 'comments',
})

Comment.belongsTo(Character, {
  foreignKey: 'characterId',
  as: 'character',
})

Favorite.belongsTo(Character, {
  foreignKey: 'characterId',
  as: 'character',
})

export {
    Character,
    Favorite,
    Comment
}