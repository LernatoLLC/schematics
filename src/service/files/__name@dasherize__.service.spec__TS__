import { EMPTY } from 'rxjs';
import { <%= classify(name) %>Service } from './<%= dasherize(name) %>.service';

const api: any = {
  get: () => EMPTY
};

let service: any;
function init() {
  service = new <%= classify(name) %>Service(api);
}

describe('<%= classify(name) %>Service', () => {
  describe('constructor', () => {
    beforeEach(() => {
      init();
    });

    it('constructs', () => {
      expect(service).toBeDefined();
    });
  });

  describe('get', () => {
    beforeEach(() => {
      init();
    });

    it('has a function named get', () => {
      expect(typeof service.get).toEqual('function');
    });

    it('calls api.get()', () => {
      const spy = spyOn(api, 'get').and.callThrough();
      service.get();
      expect(spy).toHaveBeenCalled();
    });
  });
});
