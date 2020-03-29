# About authorization

## User permission
User can have permissions that gives them access to different part of the platform.

- User can `do-admin` is `is_admin` is set to true on their `user` model. This permission should be used for anything that is admin related (ex. : add categories).
- User can `do-moderation` is `is_moderator` is set to true on their `user` model. This permission should be used to give user access to moderation tools.
- User can `access-backend` if `is_moderator` or `is_admin` is set to true on their `user` model. This permission is checked on the `HomeController` and in the backend routes as middleware.

If a user has `is_super_admin` set to true on their `user` model, it gives them any and all permissions possible. This is checked _after_ every other permissions in `AuthServiceProvider`.