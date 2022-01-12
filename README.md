An app to help people memorize spellings.

Try it at: https://roger-heathcote.github.io/spellingapp/

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