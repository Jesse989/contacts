const resolvers = require('../resolvers');

describe('[Query.contacts]', () => {
  const mockContext = {
    dataSources: {
      contactAPI: { getContacts: jest.fn() },
    },
  };

  it('looks up contacts belonging to context user', async () => {
    const getContacts = mockContext.dataSources.contactAPI.getContacts;
    getContacts.mockReturnValueOnce( { id: 1 } );

    // check the resolver response
    const res = await resolvers.Query.contacts(null, null, mockContext);
    expect(res).toEqual({ id: 1 });

  });
});

describe('[Query.me]', () => {
  const mockContext = {
    dataSources: {
      contactAPI: {
        findOrCreateUser: jest.fn(),
        getContacts: jest.fn()
      },
    },
    user: {},
  };

  it('returns null if no user in context', async () => {
    expect(await resolvers.Query.me(null, null, mockContext)).toBeFalsy();
  });

  it('returns user from userAPI', async () => {
    const findOrCreateUser = mockContext.dataSources.contactAPI.findOrCreateUser;
    findOrCreateUser.mockReturnValueOnce({ id: 999, email: 'a@a.a' });

    const getContacts = mockContext.dataSources.contactAPI.getContacts;
    getContacts.mockReturnValue([ { contact: 'hi' }, { contact: 'hi' }]);

    // check return value of resolver
    const res = await resolvers.Query.me(null, null, mockContext);
    expect(res).toEqual({
      id: 999,
      email: 'a@a.a',
      contacts: [ { contact: 'hi' }, { contact: 'hi', }]
    });
  });
});
