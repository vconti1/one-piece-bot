# 🏴 One Piece Chapter Release Bot

A Discord bot that automatically posts when a **new English chapter** is released on **MangaDex** for a specified series.  
Built with **Node.js 20+** and **discord.js v14**.

This bot is currently configured to pull the latest One Piece chapter via the MangaDex API. If you'd like to use this bot 
for other manga, simply initialize the mangadex_id field with a manga ID provided by MangaDex.

For more information, visit [the MangaDex API docs.](https://api.mangadex.org/docs/)

---

##  Features

-  Polls MangaDex’s feed for a single manga ID
-  Language filter (default: English)
-  Deterministic **latest** chapter via `order[readableAt]=desc&limit=1`
-  Posts an **embed** to a target channel with title, chapter number, and link
-  **Persistent state** (`state.json`) so it won’t repost the same chapter after restarts
-  Configurable poll interval & “first-boot announce” behavior

---

##  Requirements

- **Node.js 18+** (tested on 20+)
- A **Discord bot token**
- The MangaDex **manga ID** for the series you want to track
- Bot permissions: `Send Messages` in the target channel


