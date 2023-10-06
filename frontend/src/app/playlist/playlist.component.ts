 
import { Component, OnInit } from '@angular/core';
import { Playlist } from '/home/likhith/music-angular/Music-App/frontend/src/app/playlist.model';
import { PlaylistService } from '/home/likhith/music-angular/Music-App/frontend/src/app/playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {
  playlists: Playlist[] = [];
  selectedPlaylist: Playlist | undefined;
  newPlaylist: Playlist = { name: '' };

  constructor(private playlistService: PlaylistService) {}

  ngOnInit(): void {
    this.loadPlaylists();
  }

  loadPlaylists(): void {
    this.playlistService.getAllPlaylists().subscribe(playlists => {
      this.playlists = playlists;
    });
  }

  onSelect(playlist: Playlist): void {
    this.selectedPlaylist = playlist;
  }

  createPlaylist(): void {
    this.playlistService.createPlaylist(this.newPlaylist).subscribe(() => {
      this.loadPlaylists();
      this.newPlaylist = { name: '' };
    });
  }

  updatePlaylist(): void {
    if (this.selectedPlaylist) {
      this.playlistService.updatePlaylist(this.selectedPlaylist.id!, this.selectedPlaylist).subscribe(() => {
        this.loadPlaylists();
        this.selectedPlaylist = undefined;
      });
    }
  }

  deletePlaylist(): void {
    if (this.selectedPlaylist) {
      this.playlistService.deletePlaylist(this.selectedPlaylist.id!).subscribe(() => {
        this.loadPlaylists();
        this.selectedPlaylist = undefined;
      });
    }
  }
}

