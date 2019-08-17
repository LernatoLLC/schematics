import { EMPTY, of } from 'rxjs';
import { RouterActionTypes } from './router.store.actions';
import { RouterEffects } from './router.store.effects';

const actions: any = EMPTY;

const router: any = {
  events: EMPTY,
  navigate: () => undefined,
};

const location: any = {
  back: () => undefined,
  forward: () => undefined,
};

const routerStoreService: any = {
  dispatchRouteChangeAction: () => undefined,
};

let effects: RouterEffects;
function init() {
  effects = new RouterEffects(actions, router, location, routerStoreService);
}

describe('RouterEffects', () => {

  describe('constructor', () => {
    beforeEach(() => {
      init();
    });

    it('constructs', () => {
      expect(effects).toBeDefined();
    });
  });

  describe('listenToRouter()', () => {
    beforeEach(() => {
      init();
    });

    it('has a function named listenToRouter', () => {
      expect(typeof effects.listenToRouter).toEqual('function');
    });
  });

  describe('changeRoute()', () => {
    beforeEach(() => {
      init();
    });

    it('has a function named changeRoute', () => {
      expect(typeof effects.changeRoute).toEqual('function');
    });

    it('calls routerStoreService.dispatchRouteChangeAction()', () => {
      spyOn(routerStoreService, 'dispatchRouteChangeAction').and.returnValue(null);
      effects.changeRoute(<any>{snapshot: {params: [], routeConfig: {path: 'test-url'}}});
      expect(routerStoreService.dispatchRouteChangeAction).toHaveBeenCalled();
    });
  });

  /* describe('logTransition(action: any)', () => {
    beforeEach(() => {
      init();
    });

    it('has a function named logTransition', () => {
      expect(typeof effects.logTransition).toEqual('function');
    });

    it('calls console.info()', () => {
      spyOn(console, 'info').and.returnValue(null);
      effects.logTransition(<any>{routerState: {url: 'test-url'}});
      expect(console.info).toHaveBeenCalled();
    });
  }); */

  describe('navigate(action: GoAction)', () => {
    beforeEach(() => {
      init();
    });

    it('has a function named navigate', () => {
      expect(typeof effects.navigate).toEqual('function');
    });

    it('calls router.navigate()', () => {
      spyOn(router, 'navigate').and.returnValue(null);
      effects.navigate(<any>{path: '', queryParams: '', extras: []});
      expect(router.navigate).toHaveBeenCalled();
    });
  });

  describe('navigateBack(action: GoAction)', () => {
    beforeEach(() => {
      init();
    });

    it('has a function named navigateBack', () => {
      expect(typeof effects.navigateBack).toEqual('function');
    });

    it('calls location.back()', () => {
      spyOn(location, 'back').and.returnValue(null);
      effects.navigateBack();
      expect(location.back).toHaveBeenCalled();
    });
  });

  describe('navigateForward(action: GoAction)', () => {
    beforeEach(() => {
      init();
    });

    it('has a function named navigateForward', () => {
      expect(typeof effects.navigateForward).toEqual('function');
    });

    it('calls location.forward()', () => {
      spyOn(location, 'forward').and.returnValue(null);
      effects.navigateForward();
      expect(location.forward).toHaveBeenCalled();
    });
  });

  describe('ofRoute(route: string | string[])', () => {
    beforeEach(() => {
      init();
    });

    it('has a function named ofRoute', () => {
      expect(typeof effects.ofRoute).toEqual('function');
    });

    it('returns the action if the route matches the payload path', function (done) {
      const action = {type: RouterActionTypes.ROUTE_CHANGE, payload: {path: 'test'}};
      of(action)
        .pipe(effects.ofRoute('test'))
        .subscribe(result => {
          expect(result).toEqual(action);
          done();
        });
    });

    it('returns the action if the payload path is in the route array', function (done) {
      const action = {type: RouterActionTypes.ROUTE_CHANGE, payload: {path: 'test'}};
      of(action)
        .pipe(effects.ofRoute(['test']))
        .subscribe(result => {
          expect(result).toEqual(action);
          done();
        });
    });
  });
});
