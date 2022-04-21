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
# http://localhost:9870/details/618776b162a1816f885956bc
> menu wrt to restaurants
# http://localhost:9870/menu/9

///Orders
> (Post) All Selected menu details
# http://localhost:9870/menuItem
# body > [1,2,3]
> (Post) Place order
# http://localhost:9870/placeOrder
{
    "name": "Nikita",
    "email": "nikita@gmail.com",
    "address": "Hno 23,Sector 1",
    "phone": 768768686,
    "cost": 387,
    "menuItem": [
      13,
      15,
      21
    ],
    "status": "Pending"
}

//// View Orders
> View all the orders
# http://localhost:9870/viewOrders
> Orders wrt to email id
# http://localhost:9870/viewOrders?email=aakash@gmail.com

> (Put) Update Order Status
# http://localhost:9870/updateOrder
{
	"_id":"626163e0fd90046630dab867",
	"status":"In_Transit",
	"tax_status":"Completed",
	"bank_name":"SBI"
	
}
> (Delete) Remove Order
# http://localhost:9870/removeData
{
	"_id":"625af3a6bcfc70635f673d99"
}