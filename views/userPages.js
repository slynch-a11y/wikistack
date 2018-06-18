const html = require("html-template-tag");
const layout = require("./layout");

module.exports = (user, pages) => layout(html`
  <h1>Pages written by ${user.name}</h1>
  <hr>
  <form method="GET" action="/wiki/search">
    <input type="text" name="search" />
    <button type="submit">Search</button>
  </form>
  <hr>
  <ul class="list-unstyled">
    <ul>
      ${pages.map(page => html`<li><a href="/wiki/${page.slug}">${page.title}</a></li>`)}
    </ul>
  </ul>
`);
