# Prism
## Project Setup
1. Local machine must have Git and Node version 12 or higher
2. Clone the project **git clone https://github.com/prismglobal/prism-web-react.git**
3. Install the dependencies **npm install –legacy-peer-deps**
4. Create an **.env** file with the content **REACT_APP_PRISM_API=http://prod-web-alb-630380334.ap-southeast-2.elb.amazonaws.com** to setup the link to the API
5. To run the project in your local, use **npm start**

## Pushing Code
1. Checkout to develop **git checkout develop**
2. Pull the latest updates from the branch **git pull**
3. Create your own branch for example **git checkout -b “feature/pm-101-sample-branch”**
4. Create a pull request in github from your own branch to the develop branch
5. Wait for the pull request to be approved by the other developers.
6. Merge the pull request
7. Create a pull request from the develop branch to the staging branch to push the updates to the staging site
8. Create a pull request from the staging branch to the production branch to push the updates to the live site. Wait for the client to approve the pull request before merging.


## Code Directory
1. **assets** - Images, videos, and fonts
2. **common** - Reusable interfaces, types, and functions
3. **context** - Website contexts
4. **components** - Project components
    * **core** - Core components such as header and footer
    * **fragments** - Page fragment components
        * **IntroLightbox** - The lightbox being shown in the home page after the user has logged in
        * **LoginModal** - The temporary login for the website with password **Prism@123**. It will show once the hexagon in the home page is clicked (if the user is not logged in)
        * **ETAShowcase** - Components used mainly in the Perspective Page
        * **Markets** - Components used in the Markets view. It is where the markets are listed in tabular form. Can be accessed from the Perspective, Custom Share, and Optimiser pages
        * **Public Page** - Components used for the public pages (pages that don't need the user to login)
    * **layouts** - Page layouts
    * **snippets** - Component snippets
    * **primitives** - Reusable components
    * **NewCubeMode** - The cube used in the Perspective page
5. **context** - React contexts
6. **pages** - Main page components
    * **Contact** (/contact) - Contact Us page
    * **Cookies** (/cookies)- Cookies page
    * **CustomShare** (/custom-share) - Custom Share page - The user can create a custom last price and yield
    * **Disclaimer** (/disclaimer) - Disclaimer page
    * **Email** (/email-disclaimer) - Email Disclaimer page
    * **Equity Optimiser** (/optimiser) - Optimiser page. More detailed and more customizations than the Perspective Page regarding the data being shown.
    * **Login** (/login) - Login page
    * **NotFound** - 404 page
    * **Perspective** (/home and /perspective) - The Home and Perspective page -The user can select securities provided by the API and visualize the growth and yields of the ETA types depending on the value of the slider
    * **Privacy** (/privacy-policy) - Privacy Policy page

7. **services** - API configurations
8. **PrismRoutes** - Page routes

## ETA Types
### Red
* GrowthGuard
* MaxDiv
### Blue
* MaxGrowth
* DivGuard
### Green
* PureGrowth
* PureDiv
### Purple
* UltraGrowth
* UltraDiv