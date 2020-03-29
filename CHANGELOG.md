# Changelog

# 1.15.1 (2020-03-29)
- Corrected permission needed to show link to backend

# 1.15.0 (2020-03-29)
- Added a moderation panel back to places show.
- Cleaned up authorization gates and granulated permissions.

## 1.14.0 (2020-03-28)
- Display region on place.show.
- Added ability to hide address from places (by @desjarlaisdumaishugo).

## 1.13.0 (2020-03-28)
- Added docker file for devs
- Precised that "name" is the name of the place in the "add place" page, because people 🤷‍♂️

## 1.12.0 (2020-03-27)
- Added factories (PR from @rachids)
- Added a button to delete places from the card listing to compensate for lack of mod panel on show places

## 1.11.0 (2020-03-26)
- Fixed profil page for moderators throwing auth error.
- Fixed "all places" link to its own URL rather than index page.
- Streamlined moderation interface.
- Simplified menu for non super-admin.

## 1.10.0 (2020-03-26)
- Fixes `StorePlaces` requests validation.
- Removed closure based routes to facilitate route caching on production servers.
- Front page shows only a random set of 5 places to accelerate the load time.
- Sort regional and category listing alphabetically.
- Added a view count for place, counting only non admin and non logged in views.

## 1.9.0 (2020-03-25)
- Moved Slack's webhook (for backups) to the env file.
- Will throw an error if delivery zone is not empty and corresponding delivery type isn't checked.
- Form to publicly add places will correctly re-populate fields based on previous values on errors.
- Added honeypot to prevent spam abuse on public submission form.

## 1.8.1 (2020-03-25)
- Fixes backup disk to amazon s3.

## 1.8.0 (2020-03-25)
- Fixed postal code not saving since last update.
- Added notice to user when entering data in form.
- Clarified informations on what we accept when submitting a new place.
- Added daily backups of data.

## 1.7.0 (2020-03-23)
- Moved analytics ID into config and environment file.
- Moved Algolia credentials to environment file in the Mix assets.

## 1.6.0 (2020-03-23)
- Added telescope (gated to admin only) to better debug.
- Moved validation of new places into its own `FormRequest`. We now validate URL, email, phone number, required fields and conditional required fields based on other fields.

## 1.5.0 (2020-03-22)
- Divided js and css resources in two parts (frontend and backend), and extracted vendor files.
- Can filter region listing by categories.

## 1.4.1 (2020-03-21)
- Moved to a Github organization for publicly announced open sourcing of the project, so we cleaned up our readme, changelog and contributing guildelines.

## 1.4.0 (2020-03-21)
- Can delete a place from the moderation queue, if admin
- Can delete from the page details, if admin
- Permission checks in route middleware AND controller
- Moved algolia app id and api key in config and env

## 1.3.1 (2020-03-21)
- Fixed cases where a place could be duplicate with same slug

## 1.3.0 (2020-03-21)
- Added city with region in places cards
- Added daily logs for ease of consultations

## 1.2.1 (2020-03-20)
- Corrections de français

## 1.2.0 (2020-03-20)
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