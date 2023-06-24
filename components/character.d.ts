import { PositionData } from '../utils/utils';
import * as PIXI from 'pixi.js';
import { BaseVisualElement } from './base-visual-element';
export declare type Directions = 'forward' | 'right' | 'back' | 'left';
export interface CharacterData {
    name: 'boss' | 'enemy';
    direction: Directions;
    movingRange: number;
    scale: number;
    animationSpeed: number;
    animationDuration: number;
    position: PositionData;
}
export declare abstract class Character extends BaseVisualElement {
    protected forwardMotionAnimationPack: PIXI.Texture[];
    protected rightMotionAnimationPack: PIXI.Texture[];
    protected backMotionAnimationPack: PIXI.Texture[];
    protected leftMotionAnimationPack: PIXI.Texture[];
    protected character: PIXI.AnimatedSprite;
    /**
     * Creating character and using forward animation by default
     * @param data
     * @protected
     */
    protected createCharacter(data: CharacterData): void;
}
