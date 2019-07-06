<h1 align="center">
  <a href="#" target="_blank"><img src="#" alt="FamilyHub Logo"/></a>
</h1>
<h2 align="center">
<a href="#" target="_blank"><img src="#" alt="Family events and activities for kids in Haaelemmmermeer" ></a>
</h2>

<div align="center"> 

Intro to page

[View the FamilyHub Page!](https://)

</div>

## Table of Contents
1. [**UX**](#ux)
    - [**Project Goals**](#project-goals)
    - [**Player goals**](#player-goals)
    - [**Parental goals**](#parental-goals)
    - [**Developer and Business Goals**](#developer-and-Business-Goals)
    - [**User Stories**](#user-stories)
    - [**Design choices**](#design-choices)
    - [**Wireframes**](#wireframes)

2. [**Features**](#features)
    - [**Existing Features**](#existing-features)
    - [**Features Left to Implement**](#features-left-to-implement)

3. [**Technologies used**](#technologies-used)

4. [**Testing**](#testing)

5. [**Deployment**](#deployment)
    - [**How to run this project locally**](#how-to-run-this-project-locally)

6. [**Credits**](#credits)
    - [**Content**](#content)
    - [**Media**](#media)
    - [**Code**](#code)
    - [**Acknowledgements**](#acknowledgements)

7. [**Disclaimer**](#disclaimer)

## UX

### Project Goals

#### User goals

The central target audience for this page is...

User goals are:
- list items here

Parents of pre-school children have a large amount of say about what games their children are exposed to, 
therefore parental needs must also be at the forefront of any project designed for children in this age group. 

FamilyHub is a great way to meet these user needs because:
- list items here

#### Developer and Business Goals

- list items here

#### User Stories

As a visitor to FamilyHub I want:
1. list items here

### Design Choices

The overall feel of this site is ... The following design choices were made with this in mind:

**Fonts**

- The primary font **x** was chosen because...
- The secondary font **Y** was chosen for...
- The tertiroy font **Z** was chosen for...

**Icons**

- list items here

**Colours**

- list colours and reasons here

**Styling**

- list items here

**Backgrounds**

- list items here

### Wireframes

These wireframes were created using [Balsamiq](https://balsamiq.com/) during the Scope Plane part of the design and planning process for this project. 

- [Home](https://ibb.co/52Z3P4r)
- [Search](https://ibb.co/Wcgbtqs)
- [Activity search](https://ibb.co/Nm8FYbd)
- [Activity listing](https://ibb.co/PMb9jCm)
- [Event search](https://ibb.co/MR8BFC3)
- [Event listing](https://ibb.co/njnP5C5)
- [Create or Edit account](https://ibb.co/1TyV9sN)
- [Log in](https://ibb.co/yhbBSV0)
- [My account](https://ibb.co/nr2s9cw)
- [Create or Edit Activity page](https://ibb.co/Wv349RB)
- [Create or Edit Event page](https://ibb.co/sqj60xb)

## Features
 
### Existing Features

1. **Password hash**
    - list details of feature here  
2. search filters
3. account page
4. carousels

<div align="center">
<img src="#" alt="feature 1 screenshot" >
</div>

### Features Left to Implement

1. **Email authentication**
    - Implementation of email authentication of user account before registration complete
2. **Full text search**
    - Attempted this for several days but was unable to get it to work. Rather than dragging out time on this feature when this project is already very large, I made the decision to remove the relevant code to return to at a future date when my understanding is more advanced. 
    - When returning to this feature, the text search related code I was working on  is in the branch `textSearchFix`. 
    - [Research this link](https://docs.mongodb.com/manual/core/index-text/#wildcard-text-indexes)
3. Wire up contact form
4. Admin account 
- Can edit/delete any listing from database
- Can add/remove "recommended" field on any listing from database
5. Expired listings not visible on the site 
- Data filtered by date and only show entries on todays date and later
6. Expired listings still visible in users account page so they can be edited and updated with new dates.
7. Filter by date on activities page
8. Sections on users account page - Published, Saved and Expired.
9. Slug friendly URLs

## Technologies Used

- This project uses HTML, CSS and JavaScript programming languages.
- [JQuery](https://jquery.com)
    - The project uses **JQuery** to simplify DOM manipulation.
- [Cloud9](https://c9.io) 
    - Developer used **Cloud9** for their IDE while building the website.
- [Bootstrap](https://www.bootstrapcdn.com/)
    - The project uses **Bootstrap** to simplify the structure of the website and make the website responsive easily.
    - The project also uses Bootstrap to provide icons from [FontAwesome](https://www.bootstrapcdn.com/fontawesome/)
- [Google Fonts](https://fonts.google.com/)
    - The project uses **Google fonts** to style the website fonts.
- [Imgbb](https://imgbb.com)
    - All external images for this project are stored on **Imgbb.com**.
- [Jasmine](https://jasmine.github.io/)
    - This project used **Jasmine** to automatically test all JavaScript and jQuery code.
- [Jasmine-jQuery](https://github.com/velesin/jasmine-jquery)
    - This project used **Jasmine-jQuery** CDN to make it possible to test jQuery code using Jasmine.
- [GitHub](https://github.com/)
    - This project uses **GitHub** to store and share all project code remotely. 
    - The new GitHub Projects planner was utilised to plan and keep track of this project. This project plan can be viewed [here](https://github.com/AJGreaves/picflip/projects/1).
- [Photoshop](www.adobe.com/Photoshop)
    - This project used tools in **Photohshop** to edit, crop and save images as well as ulitising the colour picker to ensure color consistency over the entire project.
- [Browserstack](https://www.browserstack.com/)
    - The project used **Browserstack** to test functionality on all browsers and devices.
- [AutoPrefixer](https://autoprefixer.github.io/)
    - The project used **AutoPrefixer** to make sure all css prefixes were the most up to date versions. 
- https://gijgo.com/ date and time pickers
- pylint-flask to fix pylint issues in vscode

## Testing 

Testing information can be found in separate [testing.md](testing.md) file

## Deployment

This project was developed using the [Cloud9 IDE](https://c9.io), committed to git and pushed to GitHub and Heroku using the built in function within cloud9.

- more deployment info here for heroku

### How to run this project locally

To clone this project from GitHub:
1. Follow this link to the [FamilyHub GitHub repository](https://github.com/AJGreaves/familyhub).
2. Under the repository name, click "Clone or download".
3. In the Clone with HTTPs section, copy the clone URL for the repository. 
4. In your local IDE open Git Bash.
5. Change the current working directory to the location where you want the cloned directory to be made.
6. Type ```git clone```, and then paste the URL you copied in Step 3.
```console
git clone https://github.com/USERNAME/REPOSITORY
```
7. Press Enter. Your local clone will be created.

Further reading and troubleshooting on cloning a repository from GitHub [here](https://help.github.com/en/articles/cloning-a-repository).

## Credits

### Content

- text in this project was written by...

### Media
#### Animations
- Spinner https://icons8.com/preloaders/en/circular
- Hide and seek bot for 404 page: https://dribbble.com/shots/3480375-Stealth-Bot

#### Images
- The FamilyHub logo was created using [Hatchful](https://hatchful.shopify.com).
- The photographs for the hero images were sourced from [Pexels](https://www.pexels.com/)


### Code
- Template code for multi-card carousel using bootstrap classes taken from [MDBootstrap](https://mdbootstrap.com/docs/jquery/javascript/carousel/) and heavily modified to suit the sites needs.
- Text shadow generated using [CSS3 Text Shadow Generator](https://css3gen.com/text-shadow/)
- Code for floating buttons taken from this [W3Schools post](https://www.w3schools.com/howto/howto_js_scroll_to_top.asp)
- Box shadow codes were taken from [Material Design Box Shadows](https://codepen.io/sdthornton/pen/wBZdXq).
- Code for adding the correct prefixes to css was created using [AutoPrefixer](https://autoprefixer.github.io/).
- Hex to RGBA colour converter: http://hex2rgba.devoth.com/
- function to capitalize first letter of username: https://paulund.co.uk/how-to-capitalize-the-first-letter-of-a-string-in-javascript
- code to make sticky footer: https://css-tricks.com/couple-takes-sticky-footer/
- Code for animated side-nav taken from https://www.w3schools.com/howto/howto_js_sidenav.asp
- Code to generate slug-friendly-urls: http://flask.pocoo.org/snippets/5/

### Acknowledgements

Special thanks to: 
- list items here

#### Disclaimer
The content of this website is educational purposes only.
