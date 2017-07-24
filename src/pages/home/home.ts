import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Html5Audio } from "../../providers/html5audio";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  stations = [
    {
      name: "Dance",
      url: "http://stream.dancewave.online:8080/dance.mp3"
    },
    {
      name: "GrindFM",
      url: "http://radio.goha.ru:8000/grindfm.ogg"
    },
    {
      name: "Nashe",
      url: "http://nashe1.hostingradio.ru:80/nashe-128.mp3"
    }
  ];

  constructor(public navCtrl: NavController, private player: Html5Audio) {
  }

  ionViewDidEnter() {
    this.player = new Html5Audio();
  }

  play(url: string) {
    this.player.play(url);
  }

  stop() {
    this.player.stop();
  }

}
