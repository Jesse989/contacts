module.exports = {
  Query: {
    me: async (_, __, { dataSources }) => {
      // id, email, contacts
      const user = await dataSources.contactAPI.findOrCreateUser();

      if (!user) return false;

      const id = user.id;
      const email = user.email;
      const contacts = await dataSources.contactAPI.getContacts();
      return {
        id,
        email,
        contacts
      }
    },
    contacts: async (_, __, { dataSources }) =>
      dataSources.contactAPI.getContacts(),
  },
  Mutation: {

    login: async (_, { email }, { dataSources }) => {
      const user = await dataSources.contactAPI.findOrCreateUser({ email });
      if (user) return new Buffer(email).toString('base64');

    },
    addContact: async (_, { email, phone, first, last }, { dataSources }) => {

      const result = await dataSources.contactAPI.addContact({ email, phone, first, last });

      if (!result) {
        return {
          success: false,
          message: 'failed adding contact'
        }
      }

      return {
        success: true,
        message: 'added contact',
        contact: result
      }
    },
    editContact: async (_, { id, email, phone, first, last }, { dataSources }) => {

      const result = await dataSources.contactAPI.editContact({ id, email, phone, first, last });

      if (!result) {
        return {
          success: false,
          message: 'failed edit of contact',
        }
      }

      const contact = await dataSources.contactAPI.getContactById({ id });

      return {
        success: true,
        message: 'edited contact',
        contact
      }
    },
    removeContact: async (_, { contactId }, { dataSources }) => {

      const result = await dataSources.contactAPI.removeContact({ contactId });

      if (!result) {
        return {
          success: false,
          message: 'failed to remove contact'
        }
      }

      return {
        success: true,
        message: 'removed contact',
      }
    },
  }
}
