import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable()
export class Html5Audio {
    @Output()
    ended = new EventEmitter();

    private pad2(number) { (number < 10 ? '0' : '') + number; }

    audioPlayer: any;
    time: string;
    @Output()
    isPlaying = false;
    readyStateInterval = null;
    url: string;

    public play(url: string) {
        if (this.audioPlayer) {
            this.stop();
        }
        this.url = url;
        this.audioPlayer = new Audio(this.url);
        this.isPlaying = true;
        this.audioPlayer.play();

        this.audioPlayer.addEventListener("timeupdate", () => {
            if (this.audioPlayer) {
                var s = this.audioPlayer.currentTime % 60;
                var m = (this.audioPlayer.currentTime / 60) % 60;
                var h = ((this.audioPlayer.currentTime / 60) / 60) % 60;
                if (this.isPlaying && this.audioPlayer.currentTime > 0) {
                    this.time = this.pad2(h) + ':' + this.pad2(m) + ':' + this.pad2(s);
                }
            }
        }, false);
        this.audioPlayer.addEventListener("error", (ex) => {
            console.error(ex);
        }, false);
        this.audioPlayer.addEventListener("canplay", () => {
            console.log('CAN PLAY');
        }, false);
        this.audioPlayer.addEventListener("waiting", () => {
            this.isPlaying = false;
        }, false);
        this.audioPlayer.addEventListener("playing", () => {
            this.isPlaying = true;
        }, false);
        this.audioPlayer.addEventListener("ended", () => {
            this.stop();
            this.ended.emit();
        }, false);
    }

    pause() {
        this.isPlaying = false;
        this.audioPlayer.pause();
    }

    stop() {
        this.isPlaying = false;
        this.audioPlayer.pause();
        this.audioPlayer = null;
    }
}