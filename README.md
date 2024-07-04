# Netflix UI Clone (React)

This is a very basic UI clone of the NETFLIX web app using `React` and [The MovieDB API](https://www.themoviedb.org/documentation/api). 

> Deployed App 👉 <https://abhishek-netflix-clone.vercel.app/> 🚀

🔥 This is a **PWA** ([`Progressive Web App`](https://medium.com/swlh/converting-existing-react-app-to-pwa-3c7e4e773db3)), which can be installed natively on mobile and desktop devices.

## Working Demo 👇

https://user-images.githubusercontent.com/66935206/180422680-f1112889-67e0-459a-bd93-58cad9df4a48.mp4
> At first, all images won't load due to [`Too many requests error`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/429). To fix this, keep refreshing the app till all the placeholder images disappear.

## Tools Used 🛠️

- [Axios](https://www.npmjs.com/package/axios)
- [React](https://reactjs.org/) 
- [Redux Toolkit](https://redux.js.org/tutorials/quick-start)
- [Sass](https://sass-lang.com/) 
- [Bootstrap5](https://getbootstrap.com/)
- [Movie-Trailer](https://www.npmjs.com/package/movie-trailer) 

## Steps to Run Project Locally 💻

- Install dependencies: run `yarn install` in root project
- Get API key from [here](https://www.themoviedb.org/documentation/api)
- Create **.env** file in root project and add: `VITE_TMDB_API_KEY=YOUR_API_KEY_HERE`
- Run project in development mode: `yarn dev`
- Build project for production: `yarn build`

## User Stories

- User can the see upcoming and trending movies. Data updates weekly
- User can click on a movie and a modal should pop up displaying the movie trailer.
- The webpage adapts to any screen size.

