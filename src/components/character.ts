import {Container} from "pixi.js";
import { Constants } from '../utils/utils';
import * as PIXI from 'pixi.js';

interface PositionData {
    x: number,
    y: number
}

export interface CharacterData {
    name: 'boss' | 'enemy',
    components: Array<EnemyComponentData>,
    movingRange: number,
    position: PositionData
}

export type EnemyComponentData = {
    name: string,
    value: string | number
}

export abstract class Character extends Container {
    protected forwardMotionAnimationPack: PIXI.Texture[] = [];
    protected rightMotionAnimationPack: PIXI.Texture[] = [];
    protected backMotionAnimationPack: PIXI.Texture[] = [];
    protected leftMotionAnimationPack: PIXI.Texture[] = [];

    protected character: PIXI.AnimatedSprite;

    protected positionCharacter (position: CharacterData["position"]) {
        const { x, y } = position;
        this.x = x;
        this.y = y;
    }

    // todo не нравится, что тут текстур фром кастомные имена вручную пишутся, передать префикс лучше и тут будет основная часть
    protected createCharacter (data: CharacterData) {
        const prefix = data.name;

        for (let i = 0; i < Constants.ANIMATION_STEP_AMOUNT; i++) {
            this.forwardMotionAnimationPack.push(PIXI.Texture.from(`${prefix}-forward-step${i+1}.png`))
            this.rightMotionAnimationPack.push(PIXI.Texture.from(`${prefix}-right-step${i+1}.png`))
            this.leftMotionAnimationPack.push(PIXI.Texture.from(`${prefix}-left-step${i+1}.png`))
            this.backMotionAnimationPack.push(PIXI.Texture.from(`${prefix}-back-step${i+1}.png`))
        }

        this.character = new PIXI.AnimatedSprite(this.forwardMotionAnimationPack); // we should add any pack
        this.character.scale.set(2, 2); // todo remove
        this.addChild(this.character);

        this.character.animationSpeed = Constants.ANIMATION_SPEED;
    }
}
