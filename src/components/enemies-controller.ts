// будет показывать врагов в счетчике
// отвечает а килл врагов

import * as PIXI from 'pixi.js';
import { Enemy } from './enemy';
import { Constants } from '../utils/utils';

interface EnemiesControllerInterface {
  app: PIXI.Application,
  enemies: Enemy[]
}

export class EnemiesController {
  protected app: PIXI.Application;
  protected enemies: Enemy[];

  protected textPrefix: string = 'Enemies amount: ';
  protected enemiesCounterText: PIXI.BitmapText;


  constructor(data: EnemiesControllerInterface) {
    const { app, enemies } = data;
    this.app = app;
    this.enemies = enemies;

    this.addInteractivityToEnemies();
    this.createEnemiesCounter();
  }

  protected addInteractivityToEnemies () {
    this.enemies.forEach(enemy => {
      enemy.interactive = true;
      enemy.on('click', this.onEnemyClick.bind(this, enemy))
    })
  }

  protected onEnemyClick (enemy) {
    enemy.kill();
    this.removeChild(enemy)

    const enemyIndex = this.enemies.indexOf(enemy);
    this.enemies.splice(enemyIndex, 1);

    this.updateEnemiesCountText();
  }

  protected createEnemiesCounter () {
    this.enemiesCounterText = new PIXI.BitmapText(`${this.textPrefix}${this.enemies.length.toString()}`, Constants.TEXT_STYLE);
    this.enemiesCounterText.x = Constants.WIDTH - this.enemiesCounterText.width;
    this.addChild(this.enemiesCounterText);
  }

  protected updateEnemiesCountText () {
    this.enemiesCounterText.text = `${this.textPrefix}${this.enemies.length.toString()}`;
  }

  // TODO добавить класс BaseVisualElement и сгрузить туда позиционирование и добавление детей и удалление детей
  addChild(child) {
    this.app.stage.addChild(child);
  }

  removeChild(child) {
    this.app.stage.removeChild(child);
  }
}
