# NYC Clinic — WordPress CMS

Headless WordPress at **cms.nyc-clinic.com**. Editors use wp-admin; the public
site is the Next.js app. Design: `nyc-clinic-wp-admin-architecture.md` (v2).

```
cms/
└ mu-plugins/
  ├ nyc-clinic-core.php            loader (WordPress loads top-level files only)
  └ nyc-clinic-core/
    ├ config/pods.json             the whole content model (12 pods, 142 fields)
    ├ inc/pods.php                 loads pods.json into Pods as a file config
    ├ inc/headless.php             front-end → 301 to the site, no XML-RPC/comments, hide /wp/v2/users
    ├ inc/admin.php                Page Manage menu, menu order, Clinic Editor role, dashboard guide
    ├ inc/posts.php                article needs ≥1 complete language; language column
    ├ inc/repeater.php             Quick facts / Results showcase / Credentials
    ├ inc/rest.php                 image + boolean shapes, ?orderby=menu_order, GET /nyc/v1/site
    ├ inc/revalidate.php           on save → POST tags to Next.js /api/revalidate
    └ assets/repeater.{js,css}
```

Tested on WordPress 7.0.1, Pods 3.3.9, Simple Custom Post Order 2.8, PHP 8.3.
Live server: WordPress 7.1.4, PHP 8.3.36.

---

## 1. Server setup (Plesk, once)

### 1.1 Domain and SSL
1. **Cloudflare DNS:** add an `A` record `cms` → the server IP.
2. **Plesk → Websites & Domains → Add Subdomain:** `cms.nyc-clinic.com`.
3. **SSL:** use the domain's *SSL/TLS Certificates* page to issue a Let's Encrypt
   certificate. In Cloudflare, set SSL/TLS mode to **Full (strict)**.

### 1.2 PHP
In the subdomain's **PHP** settings:
- PHP **8.3** (8.2 is the minimum; Pods 3.4 will need 8.0+), served by FPM
- `memory_limit` 256M · `upload_max_filesize` 32M · `post_max_size` 32M · `max_execution_time` 120

### 1.3 Install WordPress
Install with **WP Toolkit**:
- Admin username: **not** `admin`. Use a strong password.
- Language: English
- Afterwards, delete the plugins and themes WP Toolkit adds. Keep one default
  theme active (WordPress needs one, even though it renders nothing).

### 1.4 wp-config.php
Add these above `/* That's all, stop editing! */`:

```php
define( 'NYC_FRONTEND_URL', 'https://nyc-clinic.com' );
// Next.js revalidate endpoint. Same server → call it locally:
define( 'NYC_REVALIDATE_URL', 'http://127.0.0.1:3000/api/revalidate' );
// Long random string; the SAME value goes in Next.js as REVALIDATE_SECRET.
// Generate: openssl rand -hex 32
define( 'NYC_REVALIDATE_SECRET', 'paste-generated-secret-here' );

define( 'DISALLOW_FILE_EDIT', true );   // no theme/plugin code editor in wp-admin
define( 'WP_POST_REVISIONS', 20 );
define( 'WP_ENVIRONMENT_TYPE', 'production' );
```

> While the frontend still runs on Vercel, point `NYC_REVALIDATE_URL` at
> `https://<vercel-domain>/api/revalidate` instead. Until the Next.js route
> exists, leave the two `NYC_REVALIDATE_*` lines out and nothing is sent.

### 1.5 Plugins
Install and activate from **Plugins → Add New**:

| Plugin | Notes |
|---|---|
| **Pods – Custom Content Types and Fields** | Required |
| **Simple Custom Post Order** (Colorlib) | Required. Configured by the mu-plugin; leave its settings alone. |
| **Wordfence Security** | Turn on 2FA for administrator accounts |
| **UpdraftPlus** | Daily DB + weekly uploads backups to Google Drive |

Delete Akismet and Hello Dolly.

### 1.6 Deploy the mu-plugin
Copy the **contents** of `cms/mu-plugins/` into `wp-content/mu-plugins/`
(create the folder if it isn't there). The CMS is its own webspace, so the
folder is `/var/www/vhosts/cms.nyc-clinic.com/httpdocs/wp-content/mu-plugins/`.

**Easiest — Plesk File Manager:** zip the two items (`nyc-clinic-core.php` and
the `nyc-clinic-core/` folder), upload the zip into `mu-plugins`, use the row
menu → **Extract Files**, then delete the zip. Files extracted this way get the
right owner automatically.

**Or rsync over SSH**, from the repo root:

```bash
rsync -av --delete cms/mu-plugins/ \
  root@server1.nyc-clinic.com:/var/www/vhosts/cms.nyc-clinic.com/httpdocs/wp-content/mu-plugins/
```

then fix ownership so PHP can read them (Plesk's *Repair*, or
`chown -R nycftpuser:psacln` on that folder).

After the first deploy, the Plugins screen shows **Must-Use → NYC Clinic — Core**.
On the next page load it creates the Clinic Editor role, the Guides / Tips / News
categories and the drag-sort settings.

### 1.7 WordPress settings
- **Settings → General:** Timezone **Bangkok**.
- **Settings → Permalinks:** **Post name** (gives `/wp-json/...` URLs).
- **Settings → Reading:** tick **Discourage search engines** (the CMS isn't the public site).
- **Posts:** delete "Hello world!". **Pages:** delete "Sample Page".

### 1.8 Block XML-RPC at the server
**Apache & nginx Settings → Additional nginx directives:**

```nginx
location = /xmlrpc.php { deny all; }
```

### 1.9 Editor accounts
**Users → Add New**, role **Clinic Editor**, one account per person on the
marketing team. Don't share an account between people.

---

## 2. Check it works

```bash
curl -s https://cms.nyc-clinic.com/wp-json/nyc/v1/site | head -c 300
curl -s "https://cms.nyc-clinic.com/wp-json/wp/v2/service?orderby=menu_order&order=asc" | head -c 300
curl -sI https://cms.nyc-clinic.com/        # → 301 to https://nyc-clinic.com/
```

In wp-admin you should see **Page Manage** (Site Settings, Home, About), then
Blog, Promotions, Services, Doctors, Awards, Cases, Reveals and FAQ.
**Pods Admin → Edit Pods** lists 12 pods, marked as coming from `pods.json`.

If Cloudflare challenges the server's own requests to `/wp-json/` (for example
with Bot Fight Mode), add a WAF skip rule for `cms.nyc-clinic.com/wp-json/*`.

---

## 3. What editors see

| Menu | What it is |
|---|---|
| **Page Manage → Site Settings** | Phone, LINE, address, hours, map, socials (everywhere on the site) |
| **Page Manage → Home** | Hero slides, Trust Bar numbers, clinic intro block |
| **Page Manage → About** | Story text, facility photos |
| **Blog** | Articles: Thai editor and English editor; either language alone is fine |
| **Promotions** | Drag to order; the first live one is the homepage banner |
| **Services** | Parent = category; set a Parent to make a treatment page |
| **Doctors · Awards** | Drag to order |
| **Cases · Reveals** | Before & after; categories under Cases → Categories (drag to order) |
| **FAQ** | Drag to order. Tick services to show a question on those pages; untick "Show on FAQ page" for service-only questions. A question needs a **Category** to appear on /faq |

The title box at the top of every item is the **internal name in English**. It
makes the web address (slug), so keep it short and English. The real Thai and
English titles are the fields below it.

---

## 3a. ⚠ Content warnings — read before editing Services

The service copy was rebuilt from the old site in Sept–Oct 2026, and some of
the old copy was **left out on purpose**. Don't restore it from nycclinic.net
without checking with the clinic: Thai rules on advertising medical facilities
forbid claims to treat diseases and outcome guarantees.

**Claims deliberately removed**
- **Placenta:** the old page claimed help with autoimmune disease, HIV/AIDS,
  tuberculosis, diabetes complications, osteoporosis, dementia, migraine,
  menopause/andropause symptoms and erectile dysfunction. Only the skin
  benefits were kept. These must not come back.
- **Botox:** migraine and office-syndrome treatment (therapeutic claims).
- **Vitamin drip:** preventing colds and allergies; nourishing brain, nerves,
  eyes and liver.
- **Blepharoplasty:** "crease lasts 3+ years, no drop, no revision" and a
  quality guarantee.
- **SMAS-X:** a "30% lift" figure and an absolute "no pain, no swelling, no
  redness".

**Still to resolve with the clinic before launch**
- **SMAS-X vs HIFU:** the supplied copy describes a Japanese HIFU machine,
  while the service says SMAS-X uses Spanish technology.
- **Nose thread figures:** the old site gives the procedure time as 15–30
  minutes and results as anything from 1 to 5 years. The site uses the most
  conservative values (about 20 minutes, 2 years or more) until Dr. Jing
  confirms.
- **Dr. Jing's experience:** three different sets of numbers across the old site.
- **Prices:** none yet.
- **English text:** drafted, not yet reviewed by a fluent speaker.

The full notes are at the top of `src/data/mock/services.ts`.

### Possible duplicate questions (for marketing)
The import kept every question as it was. These service questions are close
to a general FAQ but have **different answers**. Decide whether to merge them:
in that case delete the service copy, then on the general question tick the
service under **Services**.

| Service question | Similar general question |
|---|---|
| Nose thread — "ร้อยไหมจมูกเจ็บไหม" | "ร้อยไหมจมูกเจ็บไหม? ต้องพักฟื้นกี่วัน?" |
| Nose thread — "ต้องพักฟื้นไหม" | "การร้อยไหมจมูกต้องพักฟื้นไหม?" |
| Facial thread — "ร้อยไหมอันตรายไหม" | "ร้อยไหมอันตรายไหม? ปลอดภัยหรือไม่?" |

## 3b. One-time imports (Nov 2026)

`cms/tools/import-content.php` moves content that used to be in the code into
WordPress. It runs from a package built from the codebase: the script,
`import.json` and the images. A package holds only some sections, and sections
it doesn't hold are left alone.

| Package | Sections |
|---|---|
| `nyc-import.zip` | 19 services, 54 FAQs |
| `nyc-import-doctors.zip` | 4 doctors (linked to services, so import Services first), 6 awards |
| `nyc-import-cases.zip` | Categories: Nose Thread Lift + 3 draft sub-categories; 9 cases, 1 reveal (all Dr. Jing, so import Doctors first) |
| `nyc-import-about.zip` | Page Manage → About: story (3 paragraphs TH + EN) and 6 facility photos. Skipped if the story already has text. |
| `nyc-import-hero.zip` | Hero Slides: the 2 current banners (desktop only), and the intro video (re-encoded to H.264) on Page Manage → Home. |

1. Upload the zip to the CMS webspace's **home folder** (one level above
   `httpdocs`, so it's never reachable from the web) and extract it there. Each
   package extracts to a folder named `nyc-import`; delete the previous one first.
2. Plesk → WordPress → **WP-CLI**: `eval-file ../nyc-import/import.php`
3. Check wp-admin, then delete the `nyc-import` folder.

Running it again is safe: entries that already exist (same slug) are skipped,
so edits made in wp-admin are kept. `eval-file ../nyc-import/import.php update`
overwrites them with the imported content instead.

### Hero rules (for marketing)

- **Hero Slides** (own menu, drag to order): desktop image 1920 × 1080 (16:9),
  required; mobile image 1080 × 1920 (9:16), optional. Below 1024px wide the
  mobile image is used; without one, phones crop the desktop image. Keep faces
  and details in the middle — the logo and buttons sit over the centre.
- Used by the homepage hero and the service page headers.
- **Intro video** (Page Manage → Home, optional): MP4 in **H.264** (not HEVC —
  Firefox and many Windows PCs can't play HEVC), 1920 × 1080, no sound,
  5–10 seconds, under 5 MB. Desktop only, plays once, then the slides.

### Before & After rules (for marketing)

- Only real photos of the treatment named. The import holds Nose Thread Lift
  only; other treatments stay off Before & After until their own photos exist.
- **Categories**: a top-level category is a treatment and its slug must equal
  the service's slug (`nose-thread-lift`), or its cases show nowhere. Child
  categories are sub-categories; drag to order. A case's first sub-category
  decides its group; cases with none collect under "More cases".
- The sub-categories Natural look / European look / Tip extension are drafts —
  replace with the clinic's real list.
- **Reveals** need two single shots of one patient, same framing and light.
  Tick "Featured" on the one for the homepage (several ticked → newest wins).

## 4. Changing the content model

1. Edit `config/pods.json`. Pods Admin can't edit file-based pods: they are
   read-only there on purpose, so nobody can delete a field the frontend reads.
2. Deploy the folder again (§1.6).
3. **Pods Admin → Settings → Clear Pods Cache.**
4. If you renamed or removed a field, update the matching fetcher in `src/data/`.

When `NYC_CORE_VERSION` in `nyc-clinic-core.php` changes, the role, categories
and drag-sort settings are re-applied on the next load.

## 5. Next.js environment

```
WP_API_URL=https://cms.nyc-clinic.com/wp-json
REVALIDATE_SECRET=<same value as NYC_REVALIDATE_SECRET in wp-config.php>
```

Without `WP_API_URL` the site runs on its built-in defaults (local development
without the CMS). With it, a fetch failure throws, so ISR keeps serving the
last good page rather than an empty one.

## 6. Revalidation contract (for the Next.js side)

On every relevant save the CMS sends one request:

```
POST {NYC_REVALIDATE_URL}
x-revalidate-secret: {NYC_REVALIDATE_SECRET}
{"tags": ["service", ...]}
```

| Tag | Sent when |
|---|---|
| `post` `page` `faq` `promotion` `doctor` `award` `service` `case` `reveal` | that type is published, updated, unpublished or deleted, or reordered by drag |
| `case`, `reveal` | a Before & After category changes or is reordered |
| `post` | a blog category changes |
| `site` | Site Settings, Home or About is saved |
| all of the above | an image's details change in Media |

The call doesn't wait for a reply. If Next.js is down, the save still succeeds
and the hourly `revalidate` catches up.
