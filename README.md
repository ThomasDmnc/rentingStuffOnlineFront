

# Renting Stuff Online
[Click here to see the deployed app](https://rentingstuffonline.netlify.app/)
Project was made by Maximimiliano Wullbrand-Naddeo, Halil Aydin and Thomas Demoncy.

## Project Description

Renting Stuff Online is a MERN application which is helping people to rent sport equipment from the community.
The community can create  ads to rent their equipments, send requests to the equipment's owner to rent it.
The owner can accept or decline the requests.
The community can always leave comments about the owner, which are shared on every equipment ads of the owner.

## MVP (Minimum Viable Product)

The MVP of this project includes the following users features (some of them are only accessible after creating an account): 

For the `requester`:
1. **Equipments Lists and search**: The user can check a list of equipments available for rent. The user can search and/or filter the equipments list. 

2. **Equipment Details / Comments**: The user can check the information details of each equipment and check out the comments left by the community.

3. **Add / Update  / Delete Comments**: The user can also add / modify / delete comments on each equipment details page if he wants.

For the `owner`:

4. **Add / Update  / Delete Equipments**: The user can add / modify / delete equipments to rent into the platform.
	
5. **Equipment dashboard**: The user has his own dashboard to manage all of his equipments. 

For both persona:

6. **User can create / update an account**: The user can create his account and edit it later.

7. **User can log-in and log-out of the app**: The user can log in and log out of the app.


## Backlog:

- [x] `requester` can create/update/delete a request to rent equipment
- [x] `owner` receives the requests in his requests dashboard and can answer the requests.
- [x] Equipment availability management and base filtering. 
- [ ] Add a map to see where the equipments are located near the user.
- [ ] User order page (Long-term management of the requests)
- [ ] Add-on: Automated availability management (if an equipment is rented, is not available.)
- [ ] Add-on: User receives an email to confirm the reservation (both owner and the requester)
- [ ] Add-on: User can pay directly into the platform
- [ ] Add-on: User can decide the delivery option of rental equipments and can follow the tracking numbers



## Project File Structure
In the project we used [Mantine](https://mantine.dev/) for components ready material, hooks. We also added some inline styline when we had to.

`Pages`: 
- `comments`
	- `createCommentPage.jsx`
	- `updateCommentPage.jsx`
- `equipments`
	- `CreateEquipmentPage.jsx`
	- `UpdateEquipmentPage.jsx` 
	- `DetailsEquipmentPage.jsx`
- `requests`
	- `CreateRequestPage.jsx`
	- `UpdateRequestPage.jsx`
- `users`
	- `EditUserInformationPage.jsx`
	- `LogInPage.jsx`
	- `SignUpPage.jsx`
	- `UserInformationPage.jsx`
	- `UserListingsPage.jsx`
	- `UserRequestsPage.jsx`
- `Homepage.jsx`
- `NotFountPage.jsx`

`Contexts`:
- `AuthContext.jsx`

`Components`:
- `Card.jsx`
- `CardGrid.jsx`
- `Comment.jsx`
- `CommentGrid.jsx`
- `Footer.jsx`
- `Navbar.jsx`
- `PrivateRoute.jsx`
- `ReceivedRequestsGrid.jsx`
- `RequestOwnerForm.jsx`
- `SentRequestsGrid.jsx`
- `UserBadge.jsx`

## Links

- [Github repository Link for React app](https://github.com/ThomasDmnc/rentingStuffOnlineFront)
- [Github repository Link for Server app](https://github.com/mwnCoding/renting-stuff-online-backend)
- [Deployment Link](rentingstuffonline.netlify.app)
