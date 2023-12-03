import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SoundService {
  private audioElements: Map<string, HTMLAudioElement> = new Map();
  private loopInterval: number | undefined;
  inited = false;

  constructor() {
    this.preloadSound('bg', '/assets/sound/bg.mp3');
    this.preloadSound('fx1', '/assets/sound/fx1.wav');
    this.preloadSound('fx2', '/assets/sound/fx2.wav');
    this.preloadSound('fx3', '/assets/sound/fx3.wav');
    this.preloadSound('fx4', '/assets/sound/fx4.wav');
    this.preloadSound('fx5', '/assets/sound/fx5.wav');
    this.preloadSound('fx6', '/assets/sound/fx6.wav');
    this.preloadSound('fx7', '/assets/sound/fx7.wav');
  }

  preloadSound(soundName: string, filePath: string): void {
    const audio = new Audio(filePath);
    this.audioElements.set(soundName, audio);
  }

  play(soundName: string): void {
    this.inited = true;
    const audio = this.audioElements.get(soundName);

    if (audio && audio.fastSeek) {
      audio.fastSeek(0);
      audio.play();
    } else {
      console.error(`Sound not preloaded: ${soundName}`);
    }
  }

  playLoop(soundName: string): void {
    this.inited = true;
    const audio = this.audioElements.get(soundName);

    if (audio) {
      audio.loop = true;
      audio.play();
    } else {
      console.error(`Sound not preloaded: ${soundName}`);
    }
  }

  stopLoop(): void {
    if (this.loopInterval) {
      clearInterval(this.loopInterval);
    }
  }
}
