
import { Component, OnInit } from '@angular/core';
import { SongService } from '../song.service';
import { Song } from '../song.model';
 
 
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
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
  

  
  addSong(): void {
    if (this.newSong.title && this.newSong.artist && this.newSong.genre) {
      this.songService.addSong(this.newSong).subscribe((addedSong) => {
        this.songList.push(addedSong);
         
        this.newSong = { id: 0, title: '', artist: [''], musicDirector: '', genre: '' };
      });
    } else { 
      console.error('Invalid data for adding music.');
    }
  }

  deleteSong(id: number): void {
      this.songService.deleteSong(id).subscribe(() => {
          this.loadSongList();
      });
  }

   
 
}
