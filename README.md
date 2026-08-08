# HowsDaWeather - a free UK weather forecast app that tells you the truth

**Live app: [howsdaweather.netlify.app](https://howsdaweather.netlify.app/)** - free, no ads, no accounts, no tracking. Works on any phone or laptop, installs as an app (PWA).

HowsDaWeather is a **UK weather forecast** app built around one idea: a forecast you can actually rely on, told in plain (and occasionally cheeky) British English. It blends **~156 ensemble forecasts from five national weather centres** - including the UK Met Office's own model - checks itself against **real rain gauges**, reads the **shape of the land around your exact postcode**, and then answers the questions you actually have: *Can I hang the washing out? Will the school run stay dry? Is it BBQ weather?*

---

## Why this app exists

Most weather apps give you a number and walk away. We wanted:

- **A more reliable rain forecast for the UK** - built from many independent forecast models, not one, and weighted by how good each model has proven to be.
- **Honest uncertainty** - a confidence score that means something, explains itself, and is checked against what actually fell out of the sky.
- **Hyper-local weather** - a forecast for *your valley*, *your hilltop*, *your postcode*, not just your nearest city.
- **Fun** - a "Word for the day" (STUNNER, DREICH, TOSS-UP, SCORCHIO), punny activity advice, and release notes that admit it when we got something wrong.
- **Free for everyone, forever** - zero operating cost by design, so it never needs ads, subscriptions or your data.

## How the forecast is made more reliable

Everything below runs in your browser against free, open data. There is no server.

### 1. Five forecasting centres, properly weighted
Every rain percentage comes from a **~156-member ensemble**: ECMWF (51), ICON (39), US GEFS (30), Canadian GEM (20) and the UK Met Office's MOGREPS (17), via [Open-Meteo](https://open-meteo.com/). Centres are weighted by decades of published verification skill - ECMWF and the Met Office carry the most weight, GFS the least - so one noisy model cannot shout over the good ones.

### 2. Rain that means rain
The headline "% rain" is the chance of **rain you would actually notice (0.5 mm or more)**, not the chance of a single 0.1 mm droplet. Hover any part of the day to see the expected amount in millimetres. (Older versions headlined the trace probability; a bone-dry sunny day could read "45% rain". We fixed it and said so in the release notes.)

### 3. Confidence that earns its name
The confidence score combines four things: how strongly the ensemble members agree, how far ahead the day is (forecast skill genuinely decays with range), how steady the forecast has been across recent model runs (flip-flopping forecasts are flagged *before* they betray you), and a **reality check against real tipping-bucket rain gauges** - the Environment Agency network in England and SEPA in Scotland. If the models have been getting rain wrong near you lately, confidence is marked down and the app tells you why.

### 4. Terrain: your valley is not the same as the next town
The app reads the **shape of the land** around your exact spot - 24 elevation samples in rings at 1, 2 and 5 km - and classifies it: valley floor, deep glen, narrow valley, sheltered hollow, exposed hilltop, or flat. Then, only when the physics applies:

- **Frost-hollow nights**: clear, calm nights in a valley are nudged colder (cold air genuinely drains downhill and pools).
- **Wind shelter and funnelling**: gusts read lower when the wind blows across your valley, a touch higher when it howls straight along it, and higher again on an exposed top.
- **Valley fog**: a clear, calm, damp night in a valley raises a fog heads-up the area forecast would miss.

Tested on the real thing: it spots Glencoe as a deep glen, Hebden Bridge as a narrow valley, Shaftesbury as a hilltop - and Bath as a bowl (locals will nod).

### 5. Postcode-level accuracy
Search accepts **full UK postcodes** (e.g. `LL55 4TY`) and pins the forecast to within about 100 m - which matters in the hills, where the next street can be 100 m higher. Place search covers every UK town and village via postcodes.io and OpenStreetMap.

### 6. Honesty as a feature
- Weather icons can never contradict the number printed next to them.
- Correctly predicting a dry day earns the models no credit in our scoring - only getting *rain* right counts, so a dry spell cannot fake a good track record.
- Rain gauge readings are taken as the median of several stations, never one (gauges break; we caught one reporting 15 mm in a single 15-minute burst while all its neighbours sat bone dry).
- Where the data cannot support a claim - gentle lowland hollows, sparse gauge regions - the app says nothing rather than guessing.

## The fun bits

- **Word for the day**: one big, honest, funny word per day - GLORIOUS, DREICH, BALTIC, SCORCHIO, and TOSS-UP when the models genuinely cannot agree.
- **Activity decisions**: 20 customisable British-life cards - washing on the line, cycle to work, dog walk, BBQ, beer garden, school run, stargazing, long drive - each weather-aware, hazard-aware and gently sarcastic.
- **Weather icons with magnitudes**: three strengths of rain and wind (breeze / windy / gale), hot and scorching suns, frost, blizzard, mist and fog - whichever condition dominates your day wins the icon.
- **Confession-style release notes**: when we get a formula wrong, the release note says so, plainly and with a laugh.

## Architecture (zero cost, by design)

A single static page. Your browser calls free, CORS-open public APIs directly - Open-Meteo forecasts and ensembles, Environment Agency and SEPA rain gauges, postcodes.io geocoding - so there is no backend, no API keys, no per-user cost, and nothing to track you with. Progressive loading paints the forecast fast, then sharpens it as the heavier data lands. Installable as a PWA with an offline shell.

## Run it yourself

It is one folder of static files - no build step, no dependencies, no API keys.

- **Locally**: serve the folder with any static server and open `index.html`.
- **Netlify Drop** (no account needed): drag the folder onto [app.netlify.com/drop](https://app.netlify.com/drop).
- **Cloudflare Pages / GitHub Pages**: upload the folder as-is.

HTTPS hosting also enables the "Locate me" button (browsers require a secure page for geolocation).

## Data sources and credits

| Source | Used for | Licence |
|---|---|---|
| [Open-Meteo](https://open-meteo.com/) | Forecast models, ensembles, previous runs, elevation | CC-BY 4.0, free for non-commercial use |
| [Environment Agency flood-monitoring API](https://environment.data.gov.uk/flood-monitoring/doc/reference) | Rain gauges + flood alerts (England) | Open Government Licence v3 |
| [SEPA rainfall](https://www2.sepa.org.uk/rainfall/) | Rain gauges (Scotland) | Open Government Licence |
| [postcodes.io](https://postcodes.io/) | UK postcode + place search | OGL / MIT |
| [OpenStreetMap Nominatim](https://nominatim.org/) | Landmark search fallback | ODbL |
| Fredoka typeface | Branding font | SIL Open Font Licence 1.1 |

**Disclaimer**: advisories in the app are derived from forecast data and are **not** official Met Office warnings - always check the Met Office for safety-critical decisions. Flood alerts shown are official Environment Agency alerts (England only). HowsDaWeather is an independent project, not affiliated with the Met Office.

## Licence

[PolyForm Noncommercial 1.0.0](LICENSE.md) - you are free to use, copy, modify and share this software **for any non-commercial purpose**: run it, learn from it, self-host it for your family, fork it for your village. Commercial use of the code requires separate permission from the copyright holder. This keeps the app what it was built to be - free for everyone, funded by no one.

Required Notice: Copyright (c) 2026 HowsDaWeather (https://howsdaweather.netlify.app/)

The **HowsDaWeather name and logo are not licensed** - forks should use their own name and branding. Note also that Open-Meteo's free API tier is itself for non-commercial use, and the Fredoka font remains under the SIL Open Font Licence 1.1.
