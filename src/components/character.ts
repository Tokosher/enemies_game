import {Container} from "pixi.js";

export interface CharacterData {
    name: 'boss' | 'enemy' | 'hero',
    components: Array<EnemyComponentData>,
    position: {
        x: number,
        y: number
    }
}

export type EnemyComponentData = {
    name: 'health' | 'direction' | 'attack',
    value: string | number
}

export abstract class Character extends Container {
    protected positionCharacter (position: CharacterData["position"]) {
        const { x, y } = position;
        this.x = x;
        this.y = y;
    }
}
