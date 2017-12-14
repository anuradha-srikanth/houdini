# reservation-system


My application basically implements a ticket booking system. Currently the process of ticket booking is used in many different industries-movies, concerts, award ceremonies, wedding seating, etc. there is currently no unified application that can handle real time ticket booking without a manual component. This project is my attempt to fix this problem.

The following shows the different capabilities of the web application: 

1.	Login functionality – uses passport to carry out authorization and authentication on users that have created accounts on this web application
2.	This is the home page of the application. This is where you can temporarily reserve tickets and book tickets. 
3.	The following shows you the realtime nature of the application. It uses sessions and sockets to temporarily reserve tickets. As you can see below, the green squares show the tickets that have been reserved from that account. Those tickets are immediately unavailable to the other user (as demonstrated by the red square). 
4.	The  following popups confirm that you want to reserve or cancel your reservations. Both of these are session based. If you refresh the page or log out, these seats will no longer be reserved. They are only to allow you to reserve all the seats that you want and then book the tickets permanently later, instead of one by one. 
5.	The tickets that you temporarily reserved are booked when you click on the book tickets button. These tickets are associated with your account and are saved to the account. You will be able to view them in your cart. 
6.	If you click on the view cart functionality, it will show you all of the tickets that are associated with your account. 


Features to add in the future releases: 
1.	There would be functionality to create your own seats and spaces. 
2.	You could connect it to other frameworks and apis to specialize it. For example, it could be connected with a theatre’s movie showtimes api in order to book tickets for each of these shows. 
3.	You could attach a 3rd party bank transaction handling software such as square or stripe in order to pay for the tickets in your cart. You could also handle transactions inhouse with node modules that deal with credit card information and added models. 

