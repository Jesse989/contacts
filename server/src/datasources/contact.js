const { DataSource } = require('apollo-datasource');
const isEmail = require('isemail');

class ContactAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    this.context = config.context;
  }

  /**
   * User can be called with an argument that includes email, but it doesn't
   * have to be. If the user is already on the context, it will use that user
   * instead
   */
  async findOrCreateUser({ email: emailArg } = {}) {
    const email =
      this.context && this.context.user ? this.context.user.email : emailArg;
    if (!email || !isEmail.validate(email)) return null;

    const users = await this.store.User.findOrCreate({ where: { email } });
    return users && users[0] ? users[0] : null;
  }

  async addContact({ email, phone, first, last }) {
    const userId = this.context.user.id;
    const res = await this.store.Contact.findOrCreate({
      where: { owner: userId, email, phone, first, last },
    });

    return res && res.length ? res[0].get() : false;
  }

  async editContact({ id, email, phone, first, last }) {
    const userId = this.context.user.id;
    const res = await this.store.Contact.update({ email, phone, first, last }, {
      where: { id, owner: userId},
    });

    return res && res[0] ? res[0] : false;

  }

  async removeContact({ contactId }) {
    const userId = this.context.user.id;
    const res =  !!await this.store.Contact.destroy({ where: { owner: userId, id: contactId } });
    return res;
  }

  async getContacts() {
    const userId = this.context.user.id;
    const found = await this.store.Contact.findAll({
      where: { owner: userId },
    });
    return found && found.length
      ? found
      : [];
  }

  async getContactById({ id }) {
    const userId = this.context.user.id;
    const found = await this.store.Contact.findOne({
      where: { owner: userId, id },
    });

    return found && found.get();
  }
}

module.exports = ContactAPI;
