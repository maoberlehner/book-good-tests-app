# Basic Shopping List (#111)

> As a Grocery Shopper
> I want to keep a list of groceries I need
> so that I have them ready for my next shopping trip.

## Acceptance Criteria:

- It should be possible to add items to the list.
- It should be possible to remove items.

## Additional Information:

- For now, items should only have a `title`. We might add additional fields (e.g., `quantity`) later.
- For the proof of concept, we decided that we don't need a database, so we'll use `localStorage` to store the list.
- We decided that, at least for the first iteration, we don't need a dedicated functionality for checking off items, but users can use the `remove` functionality instead.
