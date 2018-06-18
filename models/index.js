const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/wikistack');

// module.exports = {
//   db
// }

const Page = db.define('page', {
  title: {
    type: Sequelize.STRING, allowNull: false
  },
  slug: {
    type: Sequelize.STRING, allowNull: false
  },
  content: {
    type: Sequelize.TEXT, allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  }
});

function generateSlug (title) {
  // Removes all non-alphanumeric characters from title
  // And make whitespace underscore
  return title.replace(/\s+/g, '_').replace(/\W/g, '');
}
Page.beforeValidate((page) => {
  if (!page.slug){
    page.slug = generateSlug(page.title);
  }
});


const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

Page.belongsTo(User, { as: 'author' });
User.hasMany(Page, {foreignKey: 'authorId'});

module.exports = { Page, User, db };
