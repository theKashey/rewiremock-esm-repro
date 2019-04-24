import assert from 'assert';
import rewiremock from 'rewiremock';

//resolveExtensions(['.js', '.mjs']);

describe('rewiremock with esm in mocha', () => {
  let index;

  if (0) {
    // use `.module` to mock foo
    before(async () => {
      index = (await rewiremock.module(() => import('./index'), (r) => ({
        './foo': r.withDefault(() => 'fake-foo'),
      }))).default;
      // foo would be not mocked later
    });
  } else if (1) {
    before(async () => {
      // use mockery interface to mock foo
      rewiremock('./foo').withDefault(() => 'fake-foo');
      rewiremock.enable();

      index = (await import('./index')).default;
    });

    after(() => {
      rewiremock.disable();
    })
  }

  it('should mock foo in index', () => {
    assert.equal(index(), 'fake-foo');
  });

  it('should mock foo', async () => {
    const foo = await import('./foo');
    assert.equal(foo.default(), 'fake-foo');
  })

});
