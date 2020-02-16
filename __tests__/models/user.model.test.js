import User from '../../models/user.model';

describe('User model', () => {
  test('email, name and password must be required', async () => {
    expect.assertions(1);
    try {
      await User.create({
        gender: 'male',
        phone: '07019703051'
      });
    } catch (e) {
      expect(e).toBeTruthy();
    }
  });
});
