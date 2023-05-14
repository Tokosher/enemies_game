import gsap from 'gsap';
import { Character, CharacterData } from './character';
import { Constants } from '../utils/utils';

type Directions = 'forward' | 'right' | 'back' | 'left';

export class Enemy extends Character {
    protected currentDirection: Directions;
    protected movingRange: number;
    protected tween: gsap.core.Tween;

    constructor(data: CharacterData) {
        super();
        const { position, movingRange } = data;

        this.movingRange = movingRange;
        this.onPosition(position);
        this.createCharacter(data);
    }

    public kill (): void {
        this.forwardMotionAnimationPack = null;
        this.rightMotionAnimationPack = null;
        this.backMotionAnimationPack = null;
        this.leftMotionAnimationPack = null;
        this.character = null;
        this.tween.kill();
        this.tween = null;
    }

    protected createCharacter (data: CharacterData): void {
        super.createCharacter(data);

        data.components.forEach(property => {
            switch (property.name) {
                case 'direction':
                    this.makeDirectionAnimation(property.value as Directions);
                    break;
            }
        })
    }

    protected makeDirectionAnimation (value: Directions): void {
        this.changeDirection(value);

        switch (value) {
            case 'forward':
                this.tween = gsap.to(this, {
                    y: this.y -  this.movingRange,
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
                this.tween = gsap.to(this, {
                    x: this.x + this.movingRange,
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
                this.tween = gsap.to(this, {
                    y: this.y + this.movingRange,
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
                this.tween = gsap.to(this, {
                    x: this.x - this.movingRange,
                    duration: Constants.ANIMATION_DURATION,
                    ease: "none",
                    repeat: -1,
                    yoyo: true,
                    onRepeat: () => {
                        this.changeDirection(this.currentDirection === 'right' ? 'left': 'right')
                    }
                })
                break;
        }

        this.character.play();
    }

    protected changeDirection (direction: Directions): void {
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
