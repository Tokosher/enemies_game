import { Container } from 'pixi.js';
import { CharacterData } from './character';
export declare abstract class BaseVisualElement extends Container {
    protected onPosition(position: CharacterData["position"]): void;
}
