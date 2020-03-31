# About authorization

## User roles
User can have roles that gives them access to different part of the platform. It is important to always check for permission(s), not role(s). See [here](https://docs.spatie.be/laravel-permission/v3/best-practices/roles-vs-permissions) for the full explanation.

## Permissions

- `do-admin`: This permission should be used for anything that is admin related (ex. : add categories)
- `do-moderation`: This permission should be used to give access to moderation tools.

## Roles and their permissions

`admin` role:
- `do-admin`
- `do-moderation`

`moderator` role:
- `do-moderation`

`super_admin` role:
- **Super_admin role implicitly has every possible permissions**
