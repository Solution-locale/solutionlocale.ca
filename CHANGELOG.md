# Changelog

# NEXT
- Fixed RCM not being selected back on validation errors.
- RCM are now editable in places edit.

# 2.14.0 (2020-04-16)
- Place rejection workflow.

# 2.13.0 (2020-04-15)
- Logging activities on place model.

# 2.12.0 (2020-04-15)
- Users can be notifiable.
- Schedule moderator queue email.
- Schedules are executed in local timezone.

# 2.11.0 (2020-04-14)
- Work on graphs for stats.
- Admin can see stats for daily new places.

# 2.10.1 (2020-04-14)
- Corrected typos.

# 2.10.0 (2020-04-12)
- Command to send moderator a reminder for moderation.
- Can link users to regions.
- Changed error message for URLs so the dot is farther away than something they can copy paste.
- Ajout d'une liste des commerces qui sont fermés afin de les réouvrir en modération.

# 2.9.1 (2020-04-09)
- Cache count of places for index to 5 minutes.
- Added a link to backend when connected.
- Fix place count in home page counting unapproved plaecs.

# 2.9.0 (2020-04-08)
- Changed icon for close and show place.
- Moved about text to its own page.
- Changed header bar, moved search to it.
- Refactored indexes template.
- Doesn't show all categories in listing pages.
- Added total count to home page.

# 2.8.0 (2020-04-07)
- Fixed page title in social share meta.
- Can import data from UPA file.

# 2.7.2 (2020-04-06)
- Added an option for different social media images in public template.
- Changed social media image for team page.

# 2.7.1 (2020-04-06)
- Tweaks in team member page.

# 2.7.0 (2020-04-06)
- Forces at least one mean of contact for places (by @PierrePaul).
- Work on opening / closing places (by @rachids).
- Added a team page.

# 2.6.0 (2020-04-03)
- Added possibility of 3rd level category when adding and editing places.
- Fixed limit option on command to normalize with Google API.

# 2.5.0 (2020-04-02)
- Shows facebook link on place page.
- Added link to corresponding elements of place page.
- Added a command to normalize data with Google's Geocoding API.

# 2.4.0 (2020-04-02)
- Added a field for Facebook URL.
- Raised the password reset link validation token lifetime to 24h.
- Added a command to normalize with Google Geocoding API.

# 2.3.1 (2020-04-02)
- Fixed wrong link for deletion in compact list.
- Fixed delete button not working in compact.

# 2.3.0 (2020-04-01)
- Added RCM selection on place submission. 
- Super admins can edit places' geolocalisation information manually.

# 2.2.1 (2020-04-01)
- Moved default listing view to config file.
- Fixed old categories returning `500`. Now redirects to index with a `308` code.
- Fixed link on business name in compact view.
- Refactored permissions and gate checks (by @alex-okidoo).
- Fixed categories display in place edit.

# 2.2.0 (2020-03-31)
- Refactored permissions based on `spatie/permissions` (by @alex-okidoo).
- Added possibility to add user from the interface, and send them a password reset link (by @alex-okidoo).
- Fixed typos.
- Added other view options (by @carpentierma).
- Added print button.

# 2.1.0 (2020-03-31)
- Added a command to change categories (associate new to old when some change is decided).
- Added filter to places list (by carpentierma).
- Added search (by carpentierma).
- Added map control and title to map page (by desjarlaisdumaishugo).

# 2.0.0 (2020-03-30)
- Added maps! (by @desjarlaisdumaishugo)
- Added an artisan command to loop through database to geocode address.
- Added an observer event to geocode newly added or updated place.
- Added Horizon to manage queues.
- Categories multiple level (by @onathanlaf).