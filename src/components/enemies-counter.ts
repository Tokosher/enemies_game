import * as PIXI from 'pixi.js';
import { Constants } from '../utils/utils';
import { BaseVisualElement } from './base-visual-element';

export type CounterPosition = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

interface CounterDataInterface {
  amount: number;
  prefix: string;
  position: CounterPosition;
}

export class Counter extends BaseVisualElement {
  protected prefix: CounterDataInterface['prefix'];

  protected enemiesCounterText: PIXI.BitmapText;

  constructor(counterData: CounterDataInterface) {
    super();
    const { amount, prefix, position } = counterData;
    this.prefix = prefix;

    this.drawCounter(amount);
    this.positionCounter(position);
  }

  public set textAmount (newAmount: number) {
    this.enemiesCounterText.text = `${this.prefix}${newAmount.toString()}`;
  }


  protected drawCounter (amount: CounterDataInterface['amount']): void {
    this.enemiesCounterText = new PIXI.BitmapText(`${this.prefix}${amount.toString()}`, Constants.TEXT_STYLE);
    this.enemiesCounterText.x = Constants.WIDTH - this.enemiesCounterText.width;
    this.addChild(this.enemiesCounterText);
  }

  protected positionCounter (position: CounterPosition): void {
    let x: number;
    let y: number;

    switch (position) {
      case 'topLeft':
        x = 0;
        y = 0;
        break;

      case 'topRight':
        x = Constants.WIDTH - this.width;
        y = 0;
        break;

      case 'bottomLeft':
        x = 0;
        y = Constants.HEIGHT - this.height;
        break;

      case 'bottomRight':
        x = Constants.WIDTH - this.width;
        y = Constants.HEIGHT - this.height;
        break;
    }

    this.onPosition({ x, y })
  }
}
