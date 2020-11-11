import { Ingredient } from '../../models/ingredients/ingredient';
import { Deserializable } from '../../interfaces';

export class Recipe implements Deserializable {
  name: string;
  ingredients: Ingredient[];

  constructor(jsonRecipe?: Recipe) {
    if (jsonRecipe) {
      this.deserialize(jsonRecipe);
      this.ingredients = jsonRecipe.ingredients.map((ingredient) => new Ingredient(ingredient));
    }
  }

  deserialize(input: Recipe): this {
    Object.apply(this, input);
    return this;
  }
}
