import { Character, CharacterData, Directions } from './character';
export declare class Enemy extends Character {
    protected currentDirection: Directions;
    protected tween: gsap.core.Tween;
    constructor(data: CharacterData);
    kill(): void;
    protected createCharacter(data: CharacterData): void;
    protected makeDirectionAnimation(characterData: CharacterData): void;
    protected changeDirection(direction: Directions): void;
}
