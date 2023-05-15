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

  public get enemyAmount () {
    return this.enemies.length;
  }

  protected addInteractivityToEnemies (): void {
    this.enemies.forEach(enemy => {
      enemy.interactive = true;
      enemy.on('pointerdown', this.onEnemyClick.bind(this, enemy))
    })
  }

  protected onEnemyClick (enemy: Enemy): void {
    enemy.kill();
    this.removeChildFromStage(enemy)

    const enemyIndex = this.enemies.indexOf(enemy);
    this.enemies.splice(enemyIndex, 1);

    this.onEnemyKill();
  }

  // protected createEnemiesCounter (): void {
  //   this.enemiesCounterText = new PIXI.BitmapText(`${this.textPrefix}${this.enemies.length.toString()}`, Constants.TEXT_STYLE);
  //   this.enemiesCounterText.x = Constants.WIDTH - this.enemiesCounterText.width;
  //   this.addChildToStage(this.enemiesCounterText);
  // }
  //
  // protected updateEnemiesCountText () {
  //   this.enemiesCounterText.text = `${this.textPrefix}${this.enemies.length.toString()}`;
  // }

  addChildToStage(child): void {
    this.app.stage.addChild(child);
  }

  removeChildFromStage(child): void {
    this.app.stage.removeChild(child);
  }
}
