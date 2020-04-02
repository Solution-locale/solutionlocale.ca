# Changelog

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