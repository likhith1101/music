package com.music.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.music.app.entity.Song;

public interface SongRepository extends JpaRepository< Song, Long> {
	List<Song> findByTitleContainingIgnoreCaseOrArtistContainingIgnoreCaseOrMusicDirectorContainingIgnoreCase(String title, String artist, String musicDirector);

    List<Song> findAllByOrderByTitle();

    List<Song> findAllByOrderByArtist();
}
