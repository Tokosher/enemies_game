import * as PIXI from 'pixi.js';
import { Enemy } from '../enemy';
interface EnemiesControllerInterface {
    app: PIXI.Application;
    enemies: Enemy[];
    onEnemyKill: () => void;
}
export declare class EnemiesController {
    protected app: PIXI.Application;
    protected enemies: Enemy[];
    protected onEnemyKill: EnemiesControllerInterface['onEnemyKill'];
    constructor(data: EnemiesControllerInterface);
    get enemyAmount(): number;
    protected addInteractivityToEnemies(): void;
    protected onEnemyClick(enemy: Enemy): void;
    removeChildFromStage(child: any): void;
}
export {};
