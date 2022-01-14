# Spellingapp

An imaginatively title app to help people memorize spellings.

![image alt](https://media.giphy.com/media/zjpavCjur4eEH42TPm/giphy.gif)

It's not remotely ready to use yet but if you'd like to try it you can find it here: https://roger-heathcote.github.io/spellingapp/

Latest CI version here: https://affectionate-hawking-cc412b.netlify.app/

To deploy to github pages

- Bump the version in package.json
- Push your changes to main
- create a matching tag with format version-X.Y.Z
- push it


To deploy your own version on github pages...

- Fork the repo
- Modify the PUBLIC_URL field in cd.yml to point to your fork's deployment URL OR set the environment variable PUBLIC_URL to override it.
- Then either
  - Push a tag beginning with "release" to your repo on github pages.
  - Or run the **Build and deploy to production on github pages** action directly from your fork's actions tab.


## Basic idea

### An app to teach people how to spell

App contains multiple word lists at different difficulty levels
System displays words on screen, says them out loud, then hides them
The user then trys to spell the word (on real or virtual keyboard)
The system repeats words til the answer is correct

### Stretch goals
Users can add their own custom word lists
The words are displayed with attractive animation and sound
There is a special animation / sound if the user aces the test

### Main user journey
A user who wants to improve their spelling visits the site
They are asked to select a difficulty level
They are presented with a selection of word lists
They choose a list to practice
The system displays random words from that list and waits for the user to spell them correctly before moving on
Once the user has correctly answered a number of questions they return to the word list selection page and can play again if they like
Hoepfully the user's spelling has improved and they will come back again

## Technology
Mobile and desktop friendly web app
HTML5 + CSS3 + ES2020 + ReactJS


