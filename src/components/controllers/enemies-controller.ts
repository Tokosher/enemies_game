import * as PIXI from 'pixi.js';
import { Enemy } from '../enemy';

interface EnemiesControllerInterface {
  app: PIXI.Application,
  enemies: Enemy[],
  onEnemyKill: () => void
}

export class EnemiesController {
  protected app: PIXI.Application;
  protected enemies: Enemy[];

  protected onEnemyKill: EnemiesControllerInterface['onEnemyKill'];

  constructor(data: EnemiesControllerInterface) {
    const { app, enemies, onEnemyKill } = data;
    this.app = app;
    this.enemies = enemies;
    this.onEnemyKill = onEnemyKill;

    this.addInteractivityToEnemies();
  }

  public get enemyAmount() {
    return this.enemies.length;
  }

  protected addInteractivityToEnemies(): void {
    this.enemies.forEach(enemy => {
      enemy.interactive = true;
      enemy.on('pointerdown', this.onEnemyClick.bind(this, enemy))
    })
  }

  protected onEnemyClick(enemy: Enemy): void {
    enemy.kill();
    this.removeChildFromStage(enemy)

    const enemyIndex = this.enemies.indexOf(enemy);
    this.enemies.splice(enemyIndex, 1);

    this.onEnemyKill();
  }

  removeChildFromStage(child): void {
    this.app.stage.removeChild(child);
  }
}
