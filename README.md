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

   Run the application: After everything is set up, you can start the project using Expo:

   ```bash
   expo start
   ```

   Open the app on your device:

   Use the Expo Go app available on the iOS App Store or Google Play Store to scan the QR code displayed in your terminal or browser.
   Alternatively, you can run the app in an Android or iOS emulator if you have them set up.

## Usage

Once the application is running, you can use the following features:

Add Items: Take a picture of an item to recognize it and save it to the database automatically.
Barcode/QR Code Scanning: Use your device's camera to scan barcodes or QR codes for easy item entry.
View Items: Browse through the list of saved items stored in the Firebase database.

Contributing
Contributions are welcome! Please follow these steps:

Fork the project.
Create your feature branch (git checkout -b feature/AmazingFeature).
Commit your changes (git commit -m 'Add some AmazingFeature').
Push to the branch (git push origin feature/AmazingFeature).
Open a Pull Request.
License
Distributed under the MIT License. See LICENSE for more information.

Acknowledgments
Expo for the framework.
Firebase for backend services.
