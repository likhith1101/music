package com.music.app.repository;

import com.music.app.entity.FavoriteSong;
import com.music.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface FavoriteSongRepository extends JpaRepository<FavoriteSong, Long> {

    // Check if a user has added a specific song to their favorites
    boolean existsByUserAndSong_Id(User user, Long songId);

    // Find all favorite songs for a specific user
    List<FavoriteSong> findByUser(User user);

    boolean existsByUserAndSong_Id(User user, Long songId);
}
