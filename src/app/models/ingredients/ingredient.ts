import { Deserializable } from '../../interfaces';

export class Ingredient implements Deserializable {
  name: string;
  quantity: number;
  unit: 'Gr' | 'Ml';

  constructor(jsonIngredient?: Ingredient) {
    if (jsonIngredient) this.deserialize(jsonIngredient);
  }

  deserialize(input: Ingredient): this {
    Object.assign(this, input);
    return this;
  }
}
