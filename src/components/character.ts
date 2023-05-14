import { Constants, PositionData } from '../utils/utils';
import * as PIXI from 'pixi.js';
import { BaseVisualElement } from './base-visual-element';
// todo дать возможность задать анимку разную по скорости для каждого перса и скейл добавить тоже для перса
export interface CharacterData {
    name: 'boss' | 'enemy',
    components: Array<CharacterComponentData>,
    movingRange: number,
    position: PositionData
}

type CharacterComponentData = {
    name: string,
    value: string | number
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
        const prefix = data.name;

        for (let i = 0; i < Constants.ANIMATION_STEP_AMOUNT; i++) {
            this.forwardMotionAnimationPack.push(PIXI.Texture.from(`${prefix}-forward-step${i+1}.png`))
            this.rightMotionAnimationPack.push(PIXI.Texture.from(`${prefix}-right-step${i+1}.png`))
            this.leftMotionAnimationPack.push(PIXI.Texture.from(`${prefix}-left-step${i+1}.png`))
            this.backMotionAnimationPack.push(PIXI.Texture.from(`${prefix}-back-step${i+1}.png`))
        }

        this.character = new PIXI.AnimatedSprite(this.forwardMotionAnimationPack); // we should add any pack for success creating AnimatedSprite
        this.addChild(this.character);

        this.character.animationSpeed = Constants.ANIMATION_SPEED;
    }
}
