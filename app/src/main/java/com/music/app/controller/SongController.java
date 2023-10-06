package com.music.app.controller; 
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.music.app.entity.Song;
import com.music.app.entity.User;
import com.music.app.repository.FavoriteSongRepository;
import com.music.app.repository.UserRepository;
import com.music.app.service.SongService;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class SongController {
	private final SongService songService;

	@Autowired
	public SongController(SongService songService) {
		this.songService = songService;
	}
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private UserRepository userRepository;

    @Autowired
    private FavoriteSongRepository favoriteSongRepository;

	@GetMapping("/song")
	public List<Song> getAllSong() {
		return songService.getAllSong();
	}

	@PostMapping("/addSong")
	public ResponseEntity<Song> addSong(@RequestBody Song song) {
		Song addedSong = songService.addSong(song);
		return new ResponseEntity<>(addedSong, HttpStatus.CREATED);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deleteSong(@PathVariable Long id) {
		songService.deleteSong(id);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}

	 
	@GetMapping("/search")
	public List<Song> searchMusic(@RequestParam String searchTerm) {
		return songService.searchMusic(searchTerm);
	}

	@GetMapping("/sort")
	public List<Song> sortMusic(@RequestParam String sortBy) {
		return songService.sortMusic(sortBy);
	}

	@PostMapping("/addFavorite/{songId}")
    public ResponseEntity<String> addFavoriteSong(@PathVariable Long songId) {
        // Get the currently authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            Optional<User> user = userRepository.findByName(userDetails.getUsername());

            // Check if the song already exists in the user's favorites
            if (favoriteSongRepository.existsByUserAndSong_Id(user, songId)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Song already in favorites");
            }

            // Add the song to the user's favorites
            Song song = songService.getSongById(songId);
            if (song != null) {
                FavoriteSong favoriteSong = new FavoriteSong();
                favoriteSong.setUser(user);
                favoriteSong.setSong(song);
                favoriteSongRepository.save(favoriteSong);
                return ResponseEntity.ok("Song added to favorites successfully");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Song not found");
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not authenticated");
        }
    }

    @GetMapping("/favorites")
    public List<Song> getUserFavorites() {
        // Get the currently authenticated user
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication != null && authentication.getPrincipal() instanceof UserDetails) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            User user = userRepository.findByName(userDetails.getUsername());

            // Get the user's favorite songs
            List<FavoriteSong> favoriteSongs = favoriteSongRepository.findByUser(user);
            List<Song> favorites = favoriteSongs.stream().map(FavoriteSong::getSong).collect(Collectors.toList());

            return favorites;
        } else {
            return Collections.emptyList();
        }
    }


	@PostMapping("/register")
	public ResponseEntity<String> registerUser(@RequestBody User user) {

		try {

			if (userRepository.existsByName(user.getName())) {
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username already exists");
			}
			user.setPassword(passwordEncoder.encode(user.getPassword()));
			userRepository.save(user);
			return ResponseEntity.ok("User registered successfully");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Registration failed: " + e.getMessage());
		}

	}

	private boolean userMatchesPassword(User user, String password) {
		return user.getPassword().equals(password);
	}
}
