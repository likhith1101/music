import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Song } from './song.model';

 
@Injectable({
  providedIn: 'root',
})
export class SongService {
  private baseUrl = 'http://localhost:8080/api'; 

  constructor(private http: HttpClient) {}
 
  getAllSong(): Observable<Song[]> {
      return this.http.get<Song[]>(`${this.baseUrl}/song`);
  }

  addSong(song: Song): Observable<Song> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    });

      return this.http.post<Song>(`${this.baseUrl}/addSong`, song);
  }

  deleteSong(id: number): Observable<void> {
      return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
 
  searchMusic(searchTerm: string): Observable<any> {
    const params = new HttpParams().set('searchTerm', searchTerm);
    return this.http.get(`${this.baseUrl}/search`, { params });
  }

  sortMusic(sortBy: string): Observable<any> {
    const params = new HttpParams().set('sortBy', sortBy);
    return this.http.get(`${this.baseUrl}/sort`, { params });
  }
 
}
