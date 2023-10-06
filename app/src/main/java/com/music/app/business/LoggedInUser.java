package com.music.app.business;

import com.music.app.entity.User;

public class LoggedInUser {
    private User loggedInUser;

	public User getLoggedInUser() {
		return loggedInUser;
	}

	public void setLoggedInUser(User loggedInUser) {
		this.loggedInUser = loggedInUser;
	}

	}