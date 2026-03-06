<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=&color=C0213A,F4A07A,FDDBC9&height=220&section=header&text=🍒%20Kintrest&fontSize=72&fontColor=ffffff&fontAlignY=42&desc=Discover.%20Save.%20Inspire.&descAlignY=65&descSize=18&fontStyle=italic" width="100%"/>

<br/>

[![Live Site](https://img.shields.io/badge/🌐%20Live%20Site-kintrests.netlify.app-C0213A?style=for-the-badge&logoColor=white)](https://kintrests.netlify.app)
&nbsp;
![Built With](https://img.shields.io/badge/Built%20With-HTML%20CSS%20JS-F4A07A?style=for-the-badge)
&nbsp;
![Powered By](https://img.shields.io/badge/Images-Unsplash%20API-FDDBC9?style=for-the-badge&labelColor=C0213A&color=FDDBC9)
&nbsp;
![Payments](https://img.shields.io/badge/Payments-Paystack-8B0F24?style=for-the-badge)

<br/>

<img src="https://images.unsplash.com/photo-1490750967868-88df5691cc7d?w=1200&q=80" width="85%" style="border-radius:16px"/>

<br/><br/>

> *A Pinterest-inspired visual discovery platform —*
> *where beautiful ideas find a beautiful home.* 🍑

<br/>

</div>

---

## 🍒 What is Kintrest?

**Kintrest** is a visual discovery and idea-saving platform built with pure **HTML, CSS & JavaScript** — no frameworks, no fuss. Users can explore stunning imagery across curated categories, save pins to their personal board, follow creators, and unlock premium features through **Paystack-powered subscriptions** that settle directly to a **Moniepoint** business account.

Think Pinterest — but make it 🍒.

---

## ✨ Features

| 🍒 Feature | Description |
|---|---|
| 🖼️ **Dynamic Image Feed** | Real photos pulled live from the Unsplash API — hundreds of results per search |
| 🔍 **Live Search** | Type anything — flowers, travel, art, food — results appear instantly |
| 📌 **Save Pins** | Bookmark your favourite pins to your personal board |
| 💬 **Comments** | Live comment system on every single pin |
| 👥 **Follow Creators** | Follow and unfollow pin authors |
| 🗂️ **Category Filters** | Aesthetic · Food · Home · Fashion · Art · Travel · Nature · DIY |
| 🏷️ **Tag Search** | Click any tag to discover related content |
| ➕ **Create Pins** | Upload and publish your own pins to the feed |
| 💳 **Paystack Payments** | Card, Bank Transfer & USSD — funds auto-settle to Moniepoint |
| 🔔 **Notifications** | Dropdown alerts with mark-as-read |
| 🎯 **Custom Cursor** | Cherry & peach animated cursor throughout |
| 📱 **Fully Responsive** | Looks stunning on desktop, tablet and mobile |

---

## 📁 Project Structure

```
🍒 kintrest/
│
├── 📄 index.html       ← Landing page — hero, pricing, paywall, auth
├── 📄 app.html         ← Main app — feed, search, create, modals
├── 📄 README.md        ← You're reading it ✨
└── 📄 LICENSE          ← MIT License
```

---

## 🚀 Deploying to GitHub Pages

### Step 1 — Create your repository

1. Go to [github.com](https://github.com) and sign in
2. Click **+** → **New repository**
3. Name it `kintrest`
4. Set visibility to **Public**
5. ✅ Check **"Add a README file"** — you'll swap it for this one
6. Click **Create repository**

### Step 2 — Upload your files

**Option A — Drag & Drop *(easiest)*:**
```
1. Open your new repo on GitHub
2. Click  Add file → Upload files
3. Drag in: index.html, app.html, README.md
4. Write a commit message like:  🍒 Initial launch
5. Click  Commit changes
```

**Option B — Git CLI:**
```bash
git clone https://github.com/YOUR_USERNAME/kintrest.git
cd kintrest

# copy your project files in, then:
git add .
git commit -m "🍒 Launch Kintrest v1.0"
git push origin main
```

### Step 3 — Enable GitHub Pages

```
1. Go to your repo → Settings (top tab)
2. Scroll to  Pages  in the left sidebar
3. Source → Deploy from a branch
4. Branch: main  |  Folder: / (root)
5. Click Save
6. Wait ~60 seconds, then visit:
   https://YOUR_USERNAME.github.io/kintrest
```

---

## 💳 Setting Up Real Payments (Paystack → Moniepoint)

### Step 1 — Create a Paystack account
1. Go to [dashboard.paystack.com](https://dashboard.paystack.com)
2. Sign up with your business email
3. Complete KYC (BVN + ID)

### Step 2 — Grab your API key
```
Dashboard → Settings → API Keys & Webhooks
Copy your Public Key  (pk_live_... for live  |  pk_test_... for testing)
```

### Step 3 — Drop your key into the code

Open `index.html`, find this line (~line 355):
```javascript
const PAYSTACK_KEY = 'pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
```
Replace with your real key:
```javascript
const PAYSTACK_KEY = 'pk_live_yourrealpublickeyhere';
```

### Step 4 — Link your Moniepoint account
```
Paystack Dashboard → Settings → Bank Account → Add Bank Account
Bank: Moniepoint Microfinance Bank
Account Number: 7036095566
✅ Paystack verifies & links it — payments auto-settle daily
```

### Step 5 — Create subscription plans *(optional but 💅)*
```
Paystack → Products → Plans
  • Kintrest Pro      →  ₦8,000 / month
  • Kintrest Creator  →  ₦19,200 / month
```

> 🔐 **Never** put your Paystack **Secret Key** in frontend code. Only the **Public Key** is safe to expose.

---

## 🔑 API Keys Reference

| Service | Where to Get It | Where It Goes | Required? |
|---|---|---|---|
| 🍒 **Paystack Public Key** | [dashboard.paystack.com](https://dashboard.paystack.com) → Settings → API Keys | `index.html` ~line 355 | ✅ Yes |
| 📷 **Unsplash Access Key** | [unsplash.com/developers](https://unsplash.com/developers) → New App | `app.html` ~line 15 | ⚠️ Optional |

### Getting your own Unsplash key

The default key is rate-limited to 50 req/hour. For a live site, get your own free key:

```
1. unsplash.com/developers → Register as a developer
2. New Application → Name it "Kintrest"
3. Accept API guidelines
4. Copy your Access Key
5. In app.html ~line 15:
```
```javascript
const UNSPLASH_KEY = 'your_unsplash_access_key_here';
```
> Free tier gives you **5,000 requests/hour** — more than enough. 🎉

---

## 🎨 Colour Palette

<div align="center">

| Swatch | Name | Hex | Used For |
|---|---|---|---|
| 🟥 | **Cherry** | `#C0213A` | Primary — logo, buttons, main accents |
| 🟫 | **Cherry Deep** | `#8B0F24` | Hover states, dark gradients |
| 🟧 | **Peach** | `#F4A07A` | Secondary accents, cursor ring |
| 🔶 | **Peach Light** | `#FDDBC9` | Borders, soft backgrounds |
| 🟤 | **Warm Sand** | `#F2E4D8` | Input backgrounds, chips |
| 🤍 | **Cream** | `#FFF6F0` | Page background |
| 🖤 | **Charcoal** | `#2B1F1F` | Text, dark elements |

</div>

---

## 🛠 Tech Stack

<div align="center">

![HTML5](https://img.shields.io/badge/HTML5-C0213A?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-F4A07A?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-FDDBC9?style=for-the-badge&logo=javascript&logoColor=2B1F1F)
![Unsplash](https://img.shields.io/badge/Unsplash_API-F2E4D8?style=for-the-badge&logo=unsplash&logoColor=2B1F1F)
![Paystack](https://img.shields.io/badge/Paystack-8B0F24?style=for-the-badge&logoColor=white)
![Netlify](https://img.shields.io/badge/Netlify-C0213A?style=for-the-badge&logo=netlify&logoColor=white)
![Google Fonts](https://img.shields.io/badge/Google_Fonts-FDDBC9?style=for-the-badge&logo=google&logoColor=2B1F1F)
![Zero Deps](https://img.shields.io/badge/Dependencies-Zero%20🍒-F4A07A?style=for-the-badge)

</div>

| Layer | Technology |
|---|---|
| **Frontend** | HTML5, CSS3, Vanilla JavaScript |
| **Fonts** | Playfair Display + DM Sans (Google Fonts) |
| **Images** | Unsplash API (free tier) |
| **Payments** | Paystack Inline JS |
| **Hosting** | Netlify / GitHub Pages |
| **Build Tools** | None — zero dependencies |

---

## 📋 Repo Setup Checklist

```
🍒 When setting up your GitHub repo, check these off:
```

- [ ] **Repository name:** `kintrest`
- [ ] **Description:** `🍒 Kintrest — A visual discovery platform to save, share and explore beautiful ideas. Built with HTML/CSS/JS, Unsplash API & Paystack payments.`
- [ ] **Website URL** added in repo About section
- [ ] **Topics added:** `pinterest-clone` `visual-discovery` `html` `css` `javascript` `paystack` `unsplash-api` `nigeria` `web-app`
- [ ] **Issues tab** enabled (for feedback & bug reports)
- [ ] **GitHub Pages** turned on in Settings → Pages
- [ ] **Paystack key** swapped in `index.html`
- [ ] **Moniepoint account** linked in Paystack dashboard
- [ ] **Unsplash key** added in `app.html` (optional but recommended)

> To add topics: repo page → ⚙️ gear icon next to **About** → type each topic and hit enter

---

## 📄 License

This project is licensed under the **MIT License** — free to use, modify and share.

```
MIT License  ©  2025  Kintrest

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software to deal in the Software without restriction — including the
rights to use, copy, modify, merge, publish, distribute and sell copies —
subject to the above copyright notice appearing in all copies.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND.
```

---

## 🙋 Support

Having trouble setting up? Open an **Issue** on this repo and include:
- Which step you're stuck on
- What error you're seeing (copy & paste it)
- Your browser and OS

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=C0213A,F4A07A,FDDBC9&height=130&section=footer" width="100%"/>

Made with 🍒 & 🍑 by **Kintrest**

*Discover. Save. Inspire.*

[![Live Site](https://img.shields.io/badge/🌐%20Visit%20Kintrest-kintrests.netlify.app-C0213A?style=for-the-badge)](https://kintrests.netlify.app)

</div>
