import Director from '../src/Director.js';

describe('Director', () => {
  describe('createScene', () => {
    it('should create a scene', () => {
      Director.createScene();
      expect(Director.scene).not.toBeNull();
    });
  });
});
