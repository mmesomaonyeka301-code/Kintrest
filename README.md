# Kintrest
🍒 Kintrest — A visual discovery platform to save, share and explore beautiful ideas. Built with HTML, CSS &amp; JavaScript. Powered by Unsplash &amp; Paystack.
Can view live (https://kintrest.netlify.app)

> **A visual discovery & idea-saving platform** — built with pure HTML, CSS & JavaScript.

![Kintrest](https://images.unsplash.com/photo-1490750967868-88df5691cc7d?w=1200&q=80)

<div align="center">

[![Live Demo](https://img.shields.io/badge/🌐_Live_Site-kintrest.netlify.app-C0213A?style=for-the-badge)](https://kintrest.netlify.app)
</div>

---

## 📖 About

**Kintrest** is a Pinterest-inspired visual discovery platform where users can explore, save and share beautiful ideas across categories like Aesthetic, Food, Fashion, Art, Travel and more.

It features a **public landing page with subscription pricing**, a **full masonry image feed** powered by the Unsplash API, and **secure payments via Paystack** — deposited directly to a verified Moniepoint business account.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🖼️ **Dynamic Image Feed** | Pulls real photos from Unsplash API — any search term returns hundreds of images |
| 🔍 **Live Search** | Type anything and get real results instantly — flowers, travel, art, food, anything |
| 📌 **Save Pins** | Save your favourite pins to your personal board |
| 💬 **Comments** | Live comment system on every pin |
| 👥 **Follow Creators** | Follow and unfollow pin authors |
| 🗂️ **Category Filters** | Aesthetic, Food, Home, Fashion, Art, Travel, Nature, DIY |
| 🏷️ **Tag Search** | Click any tag on a pin to find related content |
| ➕ **Create Pins** | Upload and publish your own pins to the feed |
| 💳 **Paystack Payments** | Card, Bank Transfer & USSD — funds go to Moniepoint |
| 🔔 **Notifications** | Dropdown notifications with mark-as-read |
| 🎯 **Custom Cursor** | Cherry & peach animated cursor |
| 📱 **Fully Responsive** | Works on desktop, tablet and mobile |

---

## 📁 Project Structure

```
kintrest/
│
├── index.html          # Landing page — hero, pricing, paywall, auth
├── app.html            # Main app — feed, search, create, modals
├── README.md           # This file
└── LICENSE             # MIT License
```

---

## 🚀 Deploying to GitHub Pages

### Step 1 — Create your repository

1. Go to [github.com](https://github.com) and sign in
2. Click the **+** icon → **New repository**
3. Name it `kintrest`
4. Set visibility to **Public**
5. ✅ Check **"Add a README file"** — you'll replace it with this one
6. Click **Create repository**

### Step 2 — Upload your files

**Option A — Drag & Drop (easiest, no coding needed):**
1. Open your new repo on GitHub
2. Click **Add file → Upload files**
3. Drag in: `index.html`, `app.html`, `README.md`
4. Scroll down, write a commit message like `🌸 Initial launch`
5. Click **Commit changes**

**Option B — Git (command line):**
```bash
# Clone your new repo
git clone https://github.com/YOUR_USERNAME/kintrest.git
cd kintrest

# Copy your files in, then:
git add .
git commit -m "🌸 Launch Kintrest v1.0"
git push origin main
```

### Step 3 — Enable GitHub Pages

1. In your repo, go to **Settings** (top tab)
2. Scroll down to **Pages** in the left sidebar
3. Under **Source**, select **Deploy from a branch**
4. Set branch to **main**, folder to **/ (root)**
5. Click **Save**
6. Wait about 60 seconds, then visit:

```
(https://kintrest.netlify.app)
```

---

## 💳 Setting Up Real Payments (Paystack)

Payments are handled by **Paystack** and settle automatically to your **Moniepoint** business account.

### Step 1 — Create a Paystack account
1. Go to [dashboard.paystack.com](https://dashboard.paystack.com)
2. Sign up with your business email
3. Complete KYC verification (BVN + ID)

### Step 2 — Get your API keys
1. In your Paystack dashboard → **Settings → API Keys & Webhooks**
2. Copy your **Public Key** (starts with `pk_live_...` for live, `pk_test_...` for testing)

### Step 3 — Add your key to the code
Open `index.html` and find this line (around line 355):

```javascript
const PAYSTACK_KEY = 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
```

Replace the placeholder with your actual public key:

```javascript
const PAYSTACK_KEY = 'pk_live_yourrealpublickeyhere';
```

### Step 4 — Link your Moniepoint account
1. In Paystack dashboard → **Settings → Bank Account**
2. Click **Add Bank Account**
3. Select **Moniepoint Microfinance Bank**
4. Enter account number: `7036095566`
5. Paystack will verify and link it
6. All payments now **auto-settle** to your Moniepoint account daily

### Step 5 — Set up your plans (optional but recommended)
1. Paystack dashboard → **Products → Plans**
2. Create:
   - **Kintrest Pro** — NGN 8,000/month
   - **Kintrest Creator** — NGN 19,200/month
3. Use plan codes in the code for recurring subscriptions

---

## 🔑 API Keys You Need

| Service | Where to Get It | Where to Put It | Required? |
|---|---|---|---|
| **Paystack Public Key** | [dashboard.paystack.com](https://dashboard.paystack.com) → Settings → API Keys | `index.html` line ~355 | ✅ Yes (for live payments) |
| **Unsplash Access Key** | [unsplash.com/developers](https://unsplash.com/developers) → New App | `app.html` line ~15 | ⚠️ Optional (has fallback) |

> **Note:** Never put your Paystack **Secret Key** in the frontend code. Only the **Public Key** is safe to use in HTML/JS files.

---

## 🌐 Getting Your Own Unsplash API Key

The app uses Unsplash to load real images for every search. The default key has a rate limit of 50 requests/hour. For a live production site, get your own free key:

1. Go to [unsplash.com/developers](https://unsplash.com/developers)
2. Click **Register as a developer**
3. Click **New Application**
4. Fill in the form — name it `Kintrest`, describe it as a visual discovery platform
5. Accept the API guidelines
6. Copy your **Access Key**
7. Open `app.html` and replace on line ~15:

```javascript
const UNSPLASH_KEY = 'your_unsplash_access_key_here';
```

Free tier: **5,000 requests/hour** — more than enough.

---

## 🎨 Colour Palette

| Name | Hex | Usage |
|---|---|---|
| 🍒 Cherry | `#C0213A` | Primary — logo, buttons, accents |
| 🍒 Cherry Deep | `#8B0F24` | Hover states, gradients |
| 🍑 Peach | `#F4A07A` | Secondary accents, cursor ring |
| 🍑 Peach Light | `#FDDBC9` | Borders, soft backgrounds |
| 🟤 Warm Sand | `#F2E4D8` | Input backgrounds, chips |
| 🤍 Cream | `#FFF6F0` | Page background |
| 🖤 Charcoal | `#2B1F1F` | Text, dark elements |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Fonts** | Playfair Display + DM Sans (Google Fonts) |
| **Images** | Unsplash API (free tier) |
| **Payments** | Paystack Inline JS |
| **Hosting** | GitHub Pages (free) |
| **Build tools** | None — zero dependencies |

---

## 📋 Repo Description & Tags

When creating your GitHub repo, use these:

**Description (copy-paste this):**
```
🍒 Kintrest — A visual discovery platform to save, share and explore beautiful ideas. Built with HTML/CSS/JS, Unsplash API & Paystack payments.
```

**Topics/Tags (add these in your repo settings):**
```
pinterest-clone  visual-discovery  html  css  javascript
paystack  unsplash-api  github-pages  nigeria  web-app
```

> To add topics: go to your repo → click the ⚙️ gear icon next to **About** → add the topics above

---

## 📝 GitHub Repository Checklist

When setting up your repo, fill in / check these:

- [ ] **Repository name:** `kintrest`
- [ ] **Description:** *(paste from above)*
- [ ] **Website:** `https://YOUR_USERNAME.github.io/kintrest`
- [ ] **Topics:** *(paste from above)*
- [ ] **Include in search:** ✅ checked
- [ ] **Issues tab:** ✅ enabled (for bug reports & feedback)
- [ ] **README file:** ✅ this file
- [ ] **License:** MIT *(see below)*
- [ ] **Paystack key** replaced in `index.html`
- [ ] **Moniepoint account** linked in Paystack dashboard
- [ ] **GitHub Pages** enabled in Settings → Pages

---

## 📄 License

```
MIT License

Copyright (c) 2025 Kintrest

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## 🙋 Support & Contact

Having trouble setting up? Open an **Issue** on this repo and describe your problem — include what step you're on and what error you're seeing.

---

<div align="center">

Made with 🍒 & 🍑 by **Kintrest**

*Discover. Save. Inspire.*

</div>
