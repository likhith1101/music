import { Component } from '@angular/core';
import { SongService } from '../song.service';
import { Song } from '../song.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  songList: Song[] = [];
  searchTerm: string = '';
  sortBy: string = '';

  constructor(private songService: SongService) {}

  ngOnInit(): void {
    this.loadSongList();
}

  loadSongList(): void {
    this.songService.getAllSong().subscribe((song) => {
        this.songList = song;
    });
}

searchMusic() {
  if (this.searchTerm.trim() !== '') {
    this.songService.searchMusic(this.searchTerm).subscribe(
      (data: any) => {
        this.songList = data;
      } 
    );
  } else {
    // If the search term is empty, reload the full music list
    this.loadSongList();
  }
}

sortMusic() {
  if (this.sortBy.trim() !== '') {
    this.songService.sortMusic(this.sortBy).subscribe(
      (data: any) => {
        this.songList = data;
      } 
    );
  } else {
    // If the sort by criteria is empty, reload the full music list
    this.loadSongList();
  }
}
}