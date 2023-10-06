package com.music.app.service;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.music.app.entity.Song;
import com.music.app.repository.SongRepository;

@Service
public class SongService {
	private final SongRepository songRepository;

	@Autowired
	public SongService(SongRepository songRepository) {
		this.songRepository = songRepository;
	}

	public List<Song> getAllSong() {
		return songRepository.findAll();
	}

	public Song addSong(Song song) {
		//	 song.setDateAdded(LocalDateTime.now());
		return songRepository.save(song);
	}

	public void deleteSong(Long id) {
		songRepository.deleteById(id);
	}

	public Song editSong(Long id, Song updatedSong) {
		Song existingSong = songRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Music not found"));

		existingSong.setTitle(updatedSong.getTitle());
		// existingSong.setArtist(updatedSong.getArtist());
		existingSong.setGenre(updatedSong.getGenre());

		return songRepository.save(existingSong);
	}


	public List<Song> searchMusic(String searchTerm) {
		return songRepository.findByTitleContainingIgnoreCaseOrArtistContainingIgnoreCaseOrMusicDirectorContainingIgnoreCase(searchTerm, searchTerm, searchTerm);
	}

	public List<Song> sortMusic(String sortBy) {
		if (sortBy.equals("title")) {
			return songRepository.findAllByOrderByTitle();
		} else if (sortBy.equals("artist")) {
			return songRepository.findAllByOrderByArtist();
		}
		return getAllSong();
	}

    public Song getSongById(Long songId) {
        return songRepository.findById(songId).orElse(null);
    }
}
