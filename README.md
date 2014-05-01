Provides an "Editable" object, which takes an ID-indexed collection.
The editable instance can accept the following transformable operations:
* identity(id)
* insert(id)
* delete(id)
* incrementState(id)

Any non-transformable operations will be passed on to the underlying collection.
