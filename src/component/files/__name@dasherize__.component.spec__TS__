import { <%= classify(name) %>Component } from './<%= dasherize(name) %>.component';

let component: any;
function init() {
  component = new <%= classify(name) %>Component();
}

describe('<%= classify(name) %>Component', () => {
  describe('constructor()', () => {
    beforeEach(() => {
      init();
    });

    it('should create the component', () => {
      expect(component).toBeDefined();
    });
  });
});
