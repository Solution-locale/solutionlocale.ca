# Changelog

# Next
- Added telescope (gated to admin only) to better debug.
- Moved validation of new places into its own `FormRequest`. We now validate URL, email, phone number, required fields and conditional required fields based on other fields.

# 1.5.0 (2020-03-22)
- Divided js and css resources in two parts (frontend and backend), and extracted vendor files.
- Can filter region listing by categories.

# 1.4.1 (2020-03-21)
- Moved to a Github organization for publicly announced open sourcing of the project, so we cleaned up our readme, changelog and contributing guildelines.

# 1.4.0 (2020-03-21)
- Can delete a place from the moderation queue, if admin
- Can delete from the page details, if admin
- Permission checks in route middleware AND controller
- Moved algolia app id and api key in config and env

# 1.3.1 (2020-03-21)
- Fixed cases where a place could be duplicate with same slug

# 1.3.0 (2020-03-21)
- Added city with region in places cards
- Added daily logs for ease of consultations

# 1.2.1 (2020-03-20)
- Corrections de français

# 1.2.0 (2020-03-20)
- Removed subregion display as it's inconsistent
- Added notice on categories for places to be shown
- Image for social sharing
- Lots of small fixes and UI tweaks

## 1.1.0 (2020-03-20)
- Changed footer
- Added link to public home page on logo
- Added notice to contact on Facebook for changes
- Added Facebook to social media links

## 1.0.2 (2020-03-20)
- Typo

## 1.0.1 (2020-03-20)
- UI Tweaks

## 1.0.0 (2020-03-20)
- First usable version. We'll build on this!