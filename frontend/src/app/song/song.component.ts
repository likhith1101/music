import { Component, OnInit } from '@angular/core';
import { SongService } from '../song.service';
import { Song } from '../song.model';
 

 
@Component({
  selector: 'app-song-list',
  templateUrl: './song.component.html',
  styleUrls: ['./song.component.css'],
})

export class SongComponent implements OnInit {
  songList: Song[] = [];
   
  newSong: Song = { id: 0, title: '', artist: [''], musicDirector:' ' ,genre: '' };
 
  constructor(private songService: SongService) {}

  ngOnInit(): void {
      this.loadSongList();
  }

  loadSongList(): void {
      this.songService.getAllSong().subscribe((song) => {
          this.songList = song;
      });
  }
  

   
   
 
}
