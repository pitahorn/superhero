# Superhero Simulator 🦸🏼 
Hello There!! This is a small (but fun) simulation of superhero fights. It's powered by React ([CRA](https://create-react-app.dev/) + [MUI](https://mui.com/)) and a tiny [Express.js](https://expressjs.com/) server. Superhero information is kindly provided by [The Superhero API](https://superheroapi.com/).
This small webapp was created for education and fun purposes only. Feel free to look around!

## Development
[Node.js](https://nodejs.org/en/) is required to run this app, since we use [NPM](https://www.npmjs.com/) to install our dependencies.

This is a static web app, which means you'll need to run our tiny backend service for it to work properly. You'll need to run the server and client independently (Yeah, sorry about that. Time was of the essence). The server will be hosted on http://localhost:3030/  and your web app can be used on http://localhost:3000/ .

To install and serve the app just run:
```
cd server
npm install # Install dependencies
npm start # Start backend server
```
Then, head over to our client and do the same:
```
cd client
npm install # Install dependencies
npm start # Start web app
```
That's it! Nothing fancy, really 🤭 .

## Running the simulation
After you've finished the previous steps, you can use the Superhero Simulator! Simply head over to http://localhost:3000/ and click on the `CALL YOUR SUPER TEAMS` button. This will trigger the API call and fetch both hero teams for the fight. Then, Click on `START FIGHT!!`. This will trigger the first attack! Continue attacking and watch heroes fall. Their cards will show fallen heroes accordingly 💀 .  When all the heroes (or villains) of a team have fallen, the other team will be declared the winner.

#### DEMO 📹 :
 

https://user-images.githubusercontent.com/26127375/178410800-835d88a8-2c8d-4c1c-88ab-d158e642510c.mov


## Frontend
The Frontend is in charge of fetching the API data (which is ready to go), and presenting it to the users! It is also in charge of the simulation (attacks and HP changes) between characters. The client directory is built as follows:

```
/src
  /api
    - index.ts --> A single endpoint for `/teams`.
    - heroInterface.ts --> the interfaces for the API response
  / components
    - AttackAlert.tsx
    - HealthPoints.tsx
    - HeroCard.tsx
    - TeamGrid.tsx
  / hooks
    - useHeroFight.tsx --> where the logic for the simulation is managed.
```

## Backend
The backend is in charge of fetching heroes to the Superhero API. It later runs all the necessary calculations to prepare the hero powerstats and attacks for the Frontend.
The following assumptions were made:
1. AS is a vector, which maps to the original powerstats
2. For the HP calculation, the AS is needed as a scalar. Therefore, the function **uses the AS average**.
3. Sometimes, the API provides `null` powerstats. In this cases, the `null` value will be replaced with a random integer between 0 and 50.

The backend API response follows this schema (also found in `/client/src/api/heroInterface.ts`):
```
response = {
  teamA: {
      alignment: string,
      members: HeroInterface[],
  },
  teamB: {
      alignment: string,
      members: HeroInterface[],
  },
}
```

##  Wishlist
This first version of the Superhero Simulator was released in a bit of a _hurry_. So, here's a wishlist of some things that are missing, that I'd like to implement in the future:
- [ ] Better UI for cards
- [ ] Persist the simulation state on localStorage.
- [ ] Clean up unused code from CRA.
- [ ] Unit tests for util functions in the backend (to make sure the hero stats calculations are ok)
- [ ] Small Cypress test on the Frontend (to make sure that data is fetched and displayed properly)
- [ ] Heroku deploy ✨ 
- [ ] Github PR templates

Finally, a parting analysis:
> The fighting simulation was done on the Frontend. This is, entirely, due to the fact that I personally prefer coding Frontend logic. Frontend is way more fun (not opinionated at all). Nevertheless, there are many other ways to implement this. Some issues that come with a Frontend implementation of the simulation are:
> - Data is not persisted. If you refresh, you lose it all 💔 .
> - Using React for this is not super comfortable. The `useHeroFight` custom hook was starting to get out of hand.
> 
> Nevertheless, it allowed me to show the live simulation data on the UI without using webhooks or a database, which was quite nice. 
