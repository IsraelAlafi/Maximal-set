# Maximal-set
data structure that manages a set of items with their corresponding integer values,

API:

1. add(item)​: Adds the item to the collection (with a value 1), or increments the value if it already exists in the collection.

2. remove(item)​: Removes the item from the collection. Returns true if and only if the item

was found and removed.

3. getValue(item) : ​Returns the current value of a given item.

4. getMaxValues() : ​Returns the set of items having the maximum value.

Example:

Assuming the following sequence of calls (on string items in this case):

add(“a”)

add(”b”)

add(”b”)

add(”c”)

add(”a”)

A subsequent call to getMaxValues() should return {“a”,”b”}, since both “a” and “b” have a value of 2, which is maximal.



The simulator allows running a sequence of random add(..) actions, and then calls getMaxValues().

Important notes:

1. The simulator able to run any implementation of the data structure specified above.

2. The simulation starts when calling start(), and ends when calling stop().

3. The start() method should run the add(..) sequence in a background thread.

4. The sequence should use random items selected from a pool of items supplied at construction time.

5. The stop() method should terminate the background loop, and return the items having

maximum values at the moment of the termination.
