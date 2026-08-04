---
layout: home
title: React calendar & date picker
description: calara docs — zero-dependency React calendar with day/week/month boards, scrubber, mini calendar, drawers, and a local date core. MIT. React peers only.
head:
  - - meta
    - name: keywords
      content: calara, react calendar, react date picker, zero dependency, day week month, scheduler, Persian Studio
hero:
  name: calara
  text: Calendars for React
  tagline: Day · week · month boards · date picker · scrubber · local date core. Zero runtime dependencies. MIT. React peers only.
  image:
    src: /logo.svg
    alt: calara
  actions:
    - theme: brand
      text: Get started
      link: /guide/getting-started
    - theme: alt
      text: Open live showcase
      link: https://persianstudio.github.io/calara/showcase/
    - theme: alt
      text: API reference
      link: /api/overview
features:
  - title: Zero runtime deps
    details: Only React and ReactDOM as peers. No MUI, moment, date-fns, or react-datepicker — date math and UI ship inside the package.
  - title: Presentational boards
    details: You own fetching and state. Pass events as minutes-from-midnight; boards render day, week, and month grids.
  - title: Built-in date picker
    details: Field, inline text, and time-only modes with a local popover — same CSS language as the calendar.
  - title: Ready to customize later
    details: Functional HTML/CSS today with clear class prefixes. Full visual theming is planned without locking you into a design system.
---

<script setup>
const showcaseUrl = 'https://persianstudio.github.io/calara/showcase/'
</script>

## Try the live showcase

Open the interactive demo first — full calendar, filters, scrubber, meeting details, and date picker variants. No install required.

<a class="showcase-card" :href="showcaseUrl" rel="noopener">
  <div class="showcase-card__badge">Live demo</div>
  <div class="showcase-card__title">calara showcase</div>
  <p class="showcase-card__body">
    Day / week / month boards with sample ICE calls, in-person meetings, tasks, and reminders.
    Sidebar mini calendar, time scrubber, drawers, and the local date picker.
  </p>
  <span class="showcase-card__cta">Open showcase →</span>
</a>

<div class="seo-blurb">

### What is calara?

**calara** (`@persianstudio/calara`) is an open-source **React calendar** and **date picker** for product UIs that need scheduling boards without pulling a heavy date stack. Events store **minutes from midnight**; every label and pixel offset is derived so the UI cannot disagree with the data.

Install it, import the CSS once, compose `DsCalendar` + `DsCalendarBoard`, and wire your API into the event types.

</div>
