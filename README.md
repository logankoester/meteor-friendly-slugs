URL Friendly slugs for Meteor
------------------------
This package has two main purposes:

1. Make it easy to create a sanitized and URL friendly slug based off of an existing field
2. Auto-increment the slug if needed to ensure each item has a unique URL

Features
------------------------
- Automatically assign a URL friendly slug based on a field of your specification. The slug will be sanitized following these rules:
  - Uses all lowercase letters
  - Replace spaces with -
  - Remove all non-word chars
  - Replace multiple - with single -
  - Trim - from start of text
  - Trim - from end of text
- Checks other items in the collection for the same slug, adds an auto-incrementing index to the end if needed. For example if a slug is based of a field who's value is "Foo Bar" and there is another item with the same value, the new slug will be 'foo-bar-1'.
- Can create slugs for multiple fields.
- Can optionally create a slug without the auto-incrementing index.
- Can optionally update a slug when the field it is based from is updated.

Usage
------------------------

After you define your collection with something like:
```
Collection = new Mongo.Collection("collection");
```

You can call the friendlySlugs function a few different ways:

#### No options
```
Collection.friendlySlugs();
```
This will look for a field named 'name' and create a slug field named 'slug'

#### Specify field only
```
Collection.friendlySlugs('name');
```
This will create a 'slug' field based off of the field you specify

#### Include any options
```
Collection.friendlySlugs(
  {
    slugFrom: 'name',
    slugField: 'slug',
    distinct: true,
    updateSlug: true
  }
);
```
These are the default values, include what you would like to change

#### Slug Multiple Fields
```
Collection.friendlySlugs([
  {
    slugFrom: 'name',
    slugField: 'slug',
  },
  {
    slugFrom: 'anotherField',
    slugField: 'slug2',
  }
]);
```
Each field specified will create a slug to the slug field specified.

#### Iron Router
This package does not extend iron router, you can select your items using normal means by querying the slugField. Here is an example in coffeescript:
```
@route "/collection/:slug",
  name:'collection'
  waitOn: ->
    @subscribe 'collection', @params.slug
  data: ->
    return Collection.findOne({slug:@params.slug})
```

Options
------------------------

Option | Default | Description
--- | --- | ---
slugFrom | 'name' | Name of field you want to base the slug from. *String*
slugField | 'slug' | Name of field you want the slug to be stored to. *String* 
distinct | true |  True = Slugs are unique, if 'foo' is already a stored slug for another item, the new item's slug will be 'foo-1' False = Slugs will not be unique, items can have the same slug as another item in the same collection. *Boolean*
updateSlug | true | True = Update the item's slug if the slugField's content changes in an update. False = Slugs do not change when the slugField changes. *Boolean*

Wishlist
------------------------
- Register a 301 redirect for old URLs when the slug has changed.
  *Anyone have any ideas on how this could be accomplished?*
- Create 1 slug based off of 2 fields.
- Let me know if you think anything else would be beneficial.

Feedback / Bugs / Fixes
------------------------
This is the first version of this package, I don't have any error reporting in place yet. Let me know if something isn't working for your use case.

Feedback and PRs are welcome. 

