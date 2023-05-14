import { Container } from 'pixi.js';
import { CharacterData } from './character';

export abstract class BaseVisualElement extends Container {
  protected onPosition (position: CharacterData["position"]): void {
    const { x, y } = position;

    if (x || x === 0) {
      this.x = x;
    }
    if (y || y === 0) {
      this.y = y;
    }
  }
}
