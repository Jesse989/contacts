const ContactAPI = require('../contact');

const mockStore = {
  User: {
    findOrCreate: jest.fn()
  },
  Contact: {
    findOrCreate: jest.fn(),
    destroy: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn()
  },
};
module.exports.mockStore = mockStore;

const ds = new ContactAPI({ store: mockStore });
ds.initialize({ context: { user: { id: 1, email: 'a@a.a' } } });

describe('[ContactAPI.findOrCreateUser]', () => {
  it('returns null for invalid emails', async () => {
    const res = await ds.findOrCreateUser({ email: 'boo!' });
    expect(res).toEqual(null);
  });

  it('looks up/creates user in store', async () => {
    mockStore.User.findOrCreate.mockReturnValueOnce([{ id: 1 }]);

    // check the result of the fn
    const res = await ds.findOrCreateUser({ email: 'a@a.a' });
    expect(res).toEqual({ id: 1 });

    // make sure store is called properly
    expect(mockStore.User.findOrCreate).toBeCalledWith({
      where: { email: 'a@a.a' },
    });
  });

  it('returns null if no user found/created', async () => {
    // store lookup is not mocked to return anything, so this
    // simulates a failed lookup

    const res = await ds.findOrCreateUser({ email: 'a@a.a' });
    expect(res).toEqual(null);
  });
});

describe('[ContactAPI.addContact]', () => {
  it('adds contact owned by user', async () => {
    mockStore.Contact.findOrCreate.mockReturnValueOnce([{ get: () => 'heya' }]);

    const contact = {
      email: "jest@a.a",
      phone: 0,
      first: "je",
      last: "st"
    }

    const res = await ds.addContact(contact);

    expect(res).toBeTruthy();
    // make sure store is called properly
    expect(mockStore.Contact.findOrCreate).toBeCalledWith({
      where: { owner: 1, email: "jest@a.a", phone: 0, first: "je", last: "st" },
    });

  });

  it('succeeds without all fields present', async () => {
    mockStore.Contact.findOrCreate.mockReturnValueOnce([{ get: () => 'heya' }]);

    const contact = {
      email: "",
      phone: null,
      first: "",
      last: ""
    }

    const res = await ds.addContact(contact);

    expect(res).toBeTruthy();

    expect(mockStore.Contact.findOrCreate).toBeCalledWith({
      where: { owner: 1, email: "", phone: null, first: "", last: ""}
    })
  })
});

describe('[ContactAPI.editContact]', () => {
  it('calls update with correct properties', async () => {
    mockStore.Contact.update.mockReturnValueOnce([1]);

    const contact = {
      id: 1,
      email: "a@a.a",
      phone: 10000,
      first: "a",
      last: "b"
    }

    const res = await ds.editContact(contact);
    expect(res).toBeTruthy();

    expect(mockStore.Contact.update).toBeCalledWith({
      email: "a@a.a",
      phone: 10000,
      first: "a",
      last: "b"
    }, {
      where: { id: 1, owner: 1 }
    });
  });

});

describe('[ContactAPI.removeContact]', () => {
  it('removes one of users contacts, by id', async () => {
    mockStore.Contact.destroy.mockReturnValueOnce('heya');

    const res = await ds.removeContact({ contactId: 1 });

    expect(res).toBeTruthy();
    expect(mockStore.Contact.destroy).toBeCalledWith({
      where: { owner: 1, id: 1 }
    });
  });

  it('returns null if no matching id provided', async () => {

    const res = await ds.removeContact({ contactId: null });
    expect(res).toBeFalsy();

    expect(mockStore.Contact.destroy).toBeCalledWith({
      where: { owner: 1, id: null }
    });

  });
});

describe('[ContactAPI.getContacts]', () => {
  it('looks up all the users contacts', async () => {
    mockStore.Contact.findAll.mockReturnValueOnce([ { contact: "hi" }, { contact: "hi" } ]);

    const res = await ds.getContacts();
    expect(res).toEqual([ { contact: "hi" }, { contact: "hi" } ]);

    expect(mockStore.Contact.findAll).toBeCalledWith({
      where: { owner: 1 },
    });
  });

  it('returns empty array if no contacts', async () => {
    const res = await ds.getContacts();
    expect(res).toEqual([])

    expect(mockStore.Contact.findAll).toBeCalledWith({
      where: { owner: 1 },
    });
  });
});

describe('[ContactAPI.getContactById]', () => {
  it('looks up one of users contacts by id', async () => {

    mockStore.Contact.findOne.mockReturnValueOnce({ get: () => 'heya' });

    const res = await ds.getContactById({ id: 1 });

    expect(res).toBeTruthy();
    expect(mockStore.Contact.findOne).toBeCalledWith({
      where: { owner: 1, id: 1 },
    });
  });

  it('returns null if unsuccesful', async () => {
    const res = await ds.getContactById({ id: null });

    expect(res).toBeFalsy();
    expect(mockStore.Contact.findOne).toBeCalledWith({
      where: { owner: 1, id: null },
    });
  });
});
