import { RouterStoreService } from './router.store.service';

const store: any = {
  select: () => undefined
};

let service: RouterStoreService;
function init() {
  service = new RouterStoreService(store);
}

describe('RouterStoreService', () => {
  describe('constructor', () => {
    beforeEach(() => {
      init();
    });

    it('constructs', () => {
      expect(service).toBeDefined();
    });
  });

  describe('getPath()', () => {
    beforeEach(() => {
      init();
    });

    it('has a function named getPath', () => {
      expect(typeof service.getPath).toEqual('function');
    });

    it('calls store.select() with the routerPathSelector', () => {
      spyOn(store, 'select').and.returnValue(null);
      service.getPath();
      expect(store.select).toHaveBeenCalledWith(service.routerPathSelector);
    });
  });

  describe('dispatchBackAction()', () => {
    beforeEach(() => {
      init();
      service.dispatchAction = () => undefined;
    });

    it('has a function named dispatchBackAction', () => {
      expect(typeof service.dispatchBackAction).toEqual('function');
    });

    it('calls dispatchAction()', () => {
      spyOn(service, 'dispatchAction').and.returnValue(null);
      service.dispatchBackAction();
      expect(service.dispatchAction).toHaveBeenCalled();
    });
  });

  describe('dispatchForwardAction()', () => {
    beforeEach(() => {
      init();
      service.dispatchAction = () => undefined;
    });

    it('has a function named dispatchForwardAction', () => {
      expect(typeof service.dispatchForwardAction).toEqual('function');
    });

    it('calls dispatchAction()', () => {
      spyOn(service, 'dispatchAction').and.returnValue(null);
      service.dispatchForwardAction();
      expect(service.dispatchAction).toHaveBeenCalled();
    });
  });

  describe('dispatchGoAction()', () => {
    beforeEach(() => {
      init();
      service.dispatchAction = () => undefined;
    });

    it('has a function named dispatchGoAction', () => {
      expect(typeof service.dispatchGoAction).toEqual('function');
    });

    it('calls dispatchAction()', () => {
      spyOn(service, 'dispatchAction').and.returnValue(null);
      service.dispatchGoAction({} as any);
      expect(service.dispatchAction).toHaveBeenCalled();
    });
  });

  describe('dispatchRouteChangeAction()', () => {
    beforeEach(() => {
      init();
      service.dispatchAction = () => undefined;
    });

    it('has a function named dispatchRouteChangeAction', () => {
      expect(typeof service.dispatchRouteChangeAction).toEqual('function');
    });

    it('calls dispatchAction()', () => {
      spyOn(service, 'dispatchAction').and.returnValue(null);
      service.dispatchRouteChangeAction({} as any);
      expect(service.dispatchAction).toHaveBeenCalled();
    });
  });
});
