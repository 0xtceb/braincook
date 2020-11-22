import { Ingredient } from '../../models/ingredients/ingredient';
import { Deserializable } from '../../interfaces';

export class Recipe implements Deserializable {
  key: string;
  name: string;
  ingredients: Ingredient[];
  description: string;

  constructor(jsonRecipe?: Recipe) {
    if (jsonRecipe) this.deserialize(jsonRecipe);
  }

  deserialize(input: Recipe): this {
    Object.assign(this, input);
    if (input.ingredients) this.ingredients = input.ingredients.map((ingredient) => new Ingredient(ingredient));
    return this;
  }
}
