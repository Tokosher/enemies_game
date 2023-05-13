import * as PIXI from 'pixi.js';
import gsap from 'gsap';
import {Character, CharacterData, EnemyComponentData} from "./character";
import {Constants} from "../utils/utils";

// todo review all function return values

type Directions = 'forward' | 'right' | 'back' | 'left';

export class Enemy extends Character {
    protected forwardMotionAnimationPack: PIXI.Texture[] = [];
    protected rightMotionAnimationPack: PIXI.Texture[] = [];
    protected backMotionAnimationPack: PIXI.Texture[] = [];
    protected leftMotionAnimationPack: PIXI.Texture[] = [];

    protected character: PIXI.AnimatedSprite;
    protected currentDirection: Directions;

    constructor(data: CharacterData) {
        super();
        const { components, position } = data;

        this.createCharacter(components);
        this.positionCharacter(position);
    }

    // todo не нравится, что тут текстур фром кастомные имена вручную пишутся, передать префикс лучше и тут будет основная часть
    // todo подумать может вынести в класс Керектер
    protected createCharacter (data: CharacterData["components"]) {
        for (let i = 0; i < Constants.ANIMATION_STEP_AMOUNT; i++) {
            this.forwardMotionAnimationPack.push(PIXI.Texture.from(`forward-step${i+1}.png`))
            this.rightMotionAnimationPack.push(PIXI.Texture.from(`right-step${i+1}.png`))
            this.leftMotionAnimationPack.push(PIXI.Texture.from(`left-step${i+1}.png`))
            this.backMotionAnimationPack.push(PIXI.Texture.from(`back-step${i+1}.png`))
        }

        this.character = new PIXI.AnimatedSprite(this.forwardMotionAnimationPack); // we should add any pack
        this.character.scale.set(2, 2); // todo remove
        this.addChild(this.character);

        this.character.animationSpeed = Constants.ANIMATION_SPEED;

        data.forEach(property => {
            switch (property.name) {
                case 'direction':
                    this.makeDirectionAnimation(property.value as Directions);
                    break;
            }
        })
    }

    protected makeDirectionAnimation (value: Directions) {
        this.changeDirection(value);

        switch (value) {
            case 'forward':
                gsap.to(this, {
                    y: 100, // todo add animation movement data to json
                    duration: Constants.ANIMATION_DURATION,
                    ease: "none",
                    repeat: -1,
                    yoyo: true,
                    onRepeat: () => {
                        this.changeDirection(this.currentDirection === 'forward' ? 'back': 'forward')
                    }
                })
                break;

            case 'right':
                gsap.to(this, {
                    x: 100, // todo add animation movement data to json
                    duration: Constants.ANIMATION_DURATION,
                    ease: "none",
                    repeat: -1,
                    yoyo: true,
                    onRepeat: () => {
                        this.changeDirection(this.currentDirection === 'right' ? 'left': 'right')
                    }
                })
                break;

            case 'back':
                gsap.to(this, {
                    y: 500, // todo add animation movement data to json
                    duration: Constants.ANIMATION_DURATION,
                    ease: "none",
                    repeat: -1,
                    yoyo: true,
                    onRepeat: () => {
                        this.changeDirection(this.currentDirection === 'forward' ? 'back': 'forward')
                    }
                })
                break;

            case 'left':
                gsap.to(this, {
                    x: 0, // todo add animation movement data to json
                    duration: Constants.ANIMATION_DURATION,
                    ease: "none",
                    repeat: -1,
                    yoyo: true,
                    onRepeat: () => {
                        this.changeDirection(this.currentDirection === 'right' ? 'left': 'right')
                    }
                })
                break;

                // todo add circle
                // add radius of circle animation to json data
            // case 'circle':

        }

        this.character.play();
    }

    protected changeDirection (direction: Directions) {
        if (this.currentDirection === direction) {
            return
        }
        this.currentDirection = direction;

        switch (direction) {
            case 'forward':
                this.character.textures = this.forwardMotionAnimationPack;
                break;

            case 'right':
                this.character.textures = this.rightMotionAnimationPack;
                break;

            case 'back':
                this.character.textures = this.backMotionAnimationPack;
                break;

            case 'left':
                this.character.textures = this.leftMotionAnimationPack;
                break;

        }

        this.character.play();
    }

}
