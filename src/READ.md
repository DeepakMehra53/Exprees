# POST Request
# const newUser = { id: students[students.length - 1].id + 1, ...body }
# students.push(newUser)


Detailed Breakdown of Each Step
Accessing and Incrementing the Last Student's id:

students[students.length - 1]: Get the last student object.
.id: Access its id property.
students[students.length - 1].id + 1: Increment this id by 1 to create a unique identifier for the new user.
Using the Spread Operator:

...body: Include all properties from the body object into the new newUser object.
Creating the newUser Object:

The newUser object is constructed with the properties { id: students[students.length - 1].id + 1, ...body }.
For example, if students[students.length - 1].id is 5 and body is {name: "Alice", age: 21}, then newUser will be { id: 6, name: "Alice", age: 21 }.
Adding newUser to students Array:

students.push(newUser): Adds the newUser object to the end of the students array.
This operation modifies the students array in place, increasing its length by one and adding the new object as the last element.
<When and Why to Use This Pattern>
Assigning Unique IDs: When adding new items to a collection, it's often necessary to ensure each item has a unique identifier. Incrementing the last item's id is a simple way to achieve this.
Merging Data: Using the spread operator to merge data from an existing object (body) into a new object (newUser) is efficient and keeps the code clean.
Modifying Arrays: The push method is a straightforward way to add new elements to an array, making it a common choice when dealing with lists of items.