# Project Title

A brief description of your project and its purpose.

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Functionality](#functionality)
- [Contributing](#contributing)
- [License](#license)

## Overview

This project is a mobile application designed to help users manage their inventory efficiently. It utilizes Firebase for user authentication and data storage, enabling seamless interactions with the database.

## Features

- **User Authentication:** Users can sign up and log in using Firebase Authentication.
- **AI Item Recognition:** Capture images of items, and the application uses AI to automatically recognize and save them to the database.
- **Barcode and QR Code Scanning:** Users can scan barcodes and QR codes to quickly add items to their inventory.
- **Real-time Data Storage:** All item data is stored in Firebase, ensuring that users have access to their inventory in real-time.

## Technologies Used

- [Firebase](https://firebase.google.com/) - For authentication and database storage.
- [React Native](https://reactnative.dev/) - For building the mobile application.
- [clip-vit-base-patch32](https://huggingface.co/openai/clip-vit-base-patch32) clip-vit-base-patch32 - For item recognition.

## Installation

To get a local copy up and running follow these steps:

1. Clone the repo

   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   ```

   navigate to the project directory:

   ```bash
   cd your-repo-name
   ```

   Install Expo CLI: If you haven’t installed Expo CLI yet, you can do so globally using npm:

   ```bash
   npm install -g expo-cli
   ```

   Install project dependencies: Run the following command to install the necessary dependencies:

   ```bash
   npm install
   ```
