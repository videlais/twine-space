const AFrameProxy = require('../src/AFrameProxy.js');
const $ = require('jquery');

describe('AFrameProxy', () => {
  describe('createScene()', () => {
    beforeEach(() => {
      // Wipe any HTML each time.
      $(document.body).html('');
    });

    it('Should create <a-scene>', () => {
      AFrameProxy.createScene();
      expect($('a-scene').length).toBe(1);
    });

    it('Should return current <a-scene> if it already exists', () => {
      $(document.body).append($('<a-scene />'));
      $('a-scene').attr('test', 'test');
      const rootParent = AFrameProxy.createScene();
      expect(rootParent.attr('test')).toBe('test');
    });
  });

  describe('add()', () => {
    beforeEach(() => {
      // Wipe any HTML each time.
      $(document.body).html('');
    });

    it('Should throw error if parent does not exist', () => {
      expect(() => AFrameProxy.add('nope', 'nope', 'nope')).toThrow();
    });

    it('Should add entity to <a-scene>', () => {
      const rootParent = AFrameProxy.createScene();
      AFrameProxy.add(rootParent, 'box', 'color="#4CC3D9"');
      expect($('a-scene > a-box').length).toBe(1);
    });
  });

  describe('remove()', () => {
    beforeEach(() => {
      // Wipe any HTML each time.
      $(document.body).html('');
    });

    it('Should remove <a-scene>', () => {
      AFrameProxy.createScene();
      AFrameProxy.removeScene();
      expect($('a-scene').length).toBe(0);
    });
  });
});
