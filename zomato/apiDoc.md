////Home
> List of City
# http://localhost:9870/location
> List of restaurants
# http://localhost:9870/restaurants
> Restaurants wrt city
# http://localhost:9870/restaurants?stateId=3
> List of MealType
# http://localhost:9870/mealtype

/////Listing
> Restaurants wrt mealType
# http://localhost:9870/restaurants?mealId=3
# http://localhost:9870/restaurants?stateId=2&mealId=1
> Search on basis of cuisine
# http://localhost:9870/filters/1?cuisineId=3
> Search on basis of cost
# http://localhost:9870/filters/1?lcost=200&hcost=600
> Sort on basis of price
# http://localhost:9870/filters/1?sort=-1
> Pagination
# http://localhost:9870/filters/1?skip=15&limit=5

////Details
> Restaurants details
> (Post) menu wrt to restaurants

///Orders
> All Selected menu details
> (Post) Place order

//// View Orders
> View all the orders
> Orders wrt to user id

> (Put) Update Order Status
> (Delete) Remove Order