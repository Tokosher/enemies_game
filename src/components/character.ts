import { Constants, PositionData } from '../utils/utils';
import * as PIXI from 'pixi.js';
import { BaseVisualElement } from './base-visual-element';
// todo дать возможность задать анимку разную по скорости для каждого перса и скейл добавить тоже для перса

export type Directions = 'forward' | 'right' | 'back' | 'left';

export interface CharacterData {
    name: 'boss' | 'enemy',
    direction: Directions,
    movingRange: number,
    scale: number, // for both: x and y
    animationSpeed: number,
    animationDuration: number;
    position: PositionData
}

export abstract class Character extends BaseVisualElement {
    protected forwardMotionAnimationPack: PIXI.Texture[] = [];
    protected rightMotionAnimationPack: PIXI.Texture[] = [];
    protected backMotionAnimationPack: PIXI.Texture[] = [];
    protected leftMotionAnimationPack: PIXI.Texture[] = [];

    protected character: PIXI.AnimatedSprite;

    /**
     * Creating character and using forward animation by default
     * @param data
     * @protected
     */
    protected createCharacter (data: CharacterData): void {
        const { name: prefix, animationSpeed, scale } = data;

        for (let i = 0; i < Constants.ANIMATION_STEP_AMOUNT; i++) {
            this.forwardMotionAnimationPack.push(PIXI.Texture.from(`${prefix}-forward-step${i+1}.png`))
            this.rightMotionAnimationPack.push(PIXI.Texture.from(`${prefix}-right-step${i+1}.png`))
            this.leftMotionAnimationPack.push(PIXI.Texture.from(`${prefix}-left-step${i+1}.png`))
            this.backMotionAnimationPack.push(PIXI.Texture.from(`${prefix}-back-step${i+1}.png`))
        }

        this.character = new PIXI.AnimatedSprite(this.forwardMotionAnimationPack); // we should add any pack for success creating AnimatedSprite
        this.character.scale.set(scale, scale);
        this.addChild(this.character);

        this.character.animationSpeed = animationSpeed;
    }
}
