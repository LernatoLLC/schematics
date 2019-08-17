import { of } from 'rxjs';
import { <%= classify(name) %>StoreState } from 'src/app/models';
import { LoadAction } from './<%= dasherize(name) %>.store.actions';
import { <%= classify(name) %>StoreService } from './<%= dasherize(name) %>.store.service';

const value = 'test value';
const store: any = of({
  [<%= classify(name) %>StoreService.storeName]: new <%= classify(name) %>StoreState({
    value
  })
});

let service: any;
function init() {
  service = new <%= classify(name) %>StoreService(store);
}

describe('<%= classify(name) %>StoreService', () => {
  describe('constructor', () => {
    beforeEach(() => {
      init();
    });

    it('constructs', () => {
      expect(service).toBeDefined();
    });
  });

  describe('getValue()', () => {
    beforeEach(() => {
      init();
    });

    it('has a function named getValue', () => {
      expect(typeof service.getValue).toEqual('function');
    });

    it('gets the value from the store', (done) => {
      service.getValue().subscribe((result: string) => {
        expect(result).toEqual(value);
        done();
      });
    });
  });

  describe('dispatchLoadAction()', () => {
    beforeEach(() => {
      init();
    });

    it('has a function named dispatchLoadAction', () => {
      expect(typeof service.dispatchLoadAction).toEqual('function');
    });

    it('calls dispatchAction()', () => {
      const spy = spyOn(service, 'dispatchAction').and.returnValue(null);
      service.dispatchLoadAction();
      expect(spy).toHaveBeenCalledWith(new LoadAction());
    });
  });
});
