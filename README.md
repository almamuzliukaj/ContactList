# 📞 Professional Contact List App

A modern, high-contrast **Dark Mode** mobile application built with **React Native** and **Expo**. This project demonstrates efficient data handling, filtering, and advanced UI/UX patterns, including a custom contact detail modal.

---

## 🧭 Table of Contents

* [Overview](#-overview)
* [Screenshots](#-screenshots)
* [Features](#-features)
* [Technologies Used](#-technologies-used)
* [Installation](#-installation)
* [Running the Project](#-running-the-project)
* [Author](#-author)

---

## 📝 Overview

The **Contact List App** provides a seamless experience for managing and viewing a list of contacts. The design follows a professional **Minimalist Dark Mode** aesthetic, offering high contrast and readability.

Key implementation details include:

* **Custom Modal:** Replaces standard alerts with a dedicated, stylish modal view for contact details.
* **Search and Filtering:** Real-time, case-insensitive search by name or phone number.
* **Deep Linking:** Integration of the `Linking` API to enable direct **Call** and **Email** actions from the detail screen.
* **Modular Styling:** Clean separation of list styles and modal styles for maintainability.

---

## 🖼️ Screenshots

| Contact List (Dark Mode) | Search Results | Detail Modal View |
| :---------------------------: | :-------------------: | :---------------------------: |
| <img src="assets/ContactList.jfif" alt="Dark mode contact list interface" width="180"/> | <img src="assets/ContactList1.jfif" alt="Search filtering with result count" width="180"/> | <img src="assets/ContactList2.jfif" alt="Professional contact detail modal" width="180"/> |

---

## ✨ Features

✅ **Minimalist Dark Mode UI:** High-contrast color scheme (`#121212` background) for a sleek, professional look.
✅ **Real-Time Search:** Filters contacts instantly based on user input (name or phone).
✅ **Creative Detail Modal:** Dedicated, slide-up modal for viewing comprehensive contact information.
✅ **Actionable Buttons:** **Call** and **Email** buttons within the modal utilize deep linking (`Linking` API) for direct communication.
✅ **Clear Search UX:** Includes a visible clear button (`Ionicons`) to quickly reset the search filter.
✅ **External Icons:** Uses **`@expo/vector-icons`** (Ionicons) for polished UI elements.

---

## 💻 Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **React Native** | Frontend framework for mobile UI |
| **Expo** | Development & build environment |
| **`react-native-safe-area-context`** | Modern handling of device notches and safe areas (Fixes warnings) |
| **`@expo/vector-icons`** | High-quality icons (Ionicons) for a professional look |
| **`Linking` API** | Enables native phone and email actions from the app |
| **JavaScript (ES6+)** | App logic, state management, and filtering |

---

## ⚙️ Installation

Follow these steps to set up and run the project locally:

```bash
# 1️⃣ Clone the repository from GitHub
git clone [https://github.com/yourusername/ContactList.git](https://github.com/yourusername/ContactList.git)

# 2️⃣ Navigate into the project directory
cd ContactListApp

# 3️⃣ Install all dependencies, including external libraries
npm install # or yarn install

# 4️⃣ Install required external libraries (for icons and safe area fixes)
npx expo install react-native-safe-area-context @expo/vector-icons
```
> 🧩 **Note:** Make sure you have **Node.js (v18 or above)** and **npm** or **yarn** installed on your system.

If you don’t have **Expo CLI** installed, run the following command globally:
```bash
npm install -g expo-cli
```

--- ## 🚀 Running the Project
Once all dependencies are installed, start the development server using:
```bash
npx expo start
```

From there, you can:

- 📱 **Scan the QR code** using the **Expo Go** app (available on both Android & iOS)

- 🖥️ Or choose one of the following options directly in the terminal or browser:
  - Press **`a`** → Run on Android device/emulator  
  - Press **`i`** → Run on iOS simulator *(Mac only)*  
  - Press **`w`** → Run in your web browser  

> 💡 **Tip:** Expo Go provides instant reloading — any saved code changes will automatically appear in your app in real time.

---

## 👩‍💻 Author

**Alma Muzliukaj**  
💼 *Computer Science Student*  
🌐 [https://github.com/almamuzliukaj](https://github.com/almamuzliukaj)  
📧 [almamuzliukaj@gmail.com](mailto:almamuzliukaj@gmail.com)

---
