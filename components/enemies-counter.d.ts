import * as PIXI from 'pixi.js';
import { BaseVisualElement } from './base-visual-element';
export declare type CounterPosition = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
interface CounterDataInterface {
    amount: number;
    prefix: string;
    position: CounterPosition;
}
export declare class Counter extends BaseVisualElement {
    protected prefix: CounterDataInterface['prefix'];
    protected enemiesCounterText: PIXI.BitmapText;
    constructor(counterData: CounterDataInterface);
    set textAmount(newAmount: number);
    protected drawCounter(amount: CounterDataInterface['amount']): void;
    protected positionCounter(position: CounterPosition): void;
}
export {};
