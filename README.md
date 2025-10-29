# Genesis
*A private, offline shopping list app built for simplicity and speed.*

**Genesis** is an offline-first shopping list manager built with **React**, **TypeScript**, and **Vite**.  
It leverages **Dexie.js** for IndexedDB storage, enabling smooth offline usage and data persistence.  
With Genesis, users can create and manage multiple customizable shopping lists that work entirely on the client-side — no backend required.

---

## Features

- **Fully offline support:** Store data locally with Dexie.js and use PWA caching to ensure the app works without an internet connection.  
- **Customizable lists:** Create, edit, and organize multiple shopping lists to suit different needs and occasions.  
- **Data export:** Export or download shopping lists as files for easy sharing and backup.  
- **Client-side only:** Everything runs in the browser (no server or backend needed).  

---

## Installation

Before getting started, ensure you have the following installed:

- **Node.js** v18 or higher  
- **npm** (comes with Node.js)

Then clone the repository and install the dependencies:

```bash
git clone https://github.com/philosophjolly24/genesis.git
cd genesis
npm install
npm run dev
```

After running the dev server, open your browser at: ``` http://localhost:5173 ``` (or the URL shown in your terminal) to use the app.

---

## Tech Stack

- **React**: A library for building user interfaces

- **TypeScript**: A statically typed superset of JavaScript

- **Vite**: A fast build tool and development server

- **Dexie.js**: A minimal wrapper for IndexedDB, providing offline data storage
  
- **Tailwind CSS**: A utility-first CSS framework for modern, responsive styling
  
---

## Future Plans

- **Cloud sync**: Integrate optional cloud synchronization for syncing lists across devices

- **Mobile improvements**: Enhance mobile support and responsive design for smaller screens

- **Enhanced exports**: Add more export formats (e.g., CSV or JSON) and import functionality

- **UI/UX enhancements**: Improve styling, animations, and overall user experience based on feedback
