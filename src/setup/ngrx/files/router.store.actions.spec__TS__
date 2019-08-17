import { BackAction, ForwardAction, GoAction, RouteChangeAction, RouterActionTypes } from './router.store.actions';

describe('RouterStoreActions', () => {
  describe('RouterActionTypes', () => {
    it('BACK', () => {
      expect(RouterActionTypes.BACK).toEqual('[Router] Back');
    });

    it('FORWARD', () => {
      expect(RouterActionTypes.FORWARD).toEqual('[Router] Forward');
    });

    it('GO', () => {
      expect(RouterActionTypes.GO).toEqual('[Router] Go');
    });

    it('ROUTE_CHANGE', () => {
      expect(RouterActionTypes.ROUTE_CHANGE).toEqual('[Router] Route Change');
    });
  });

  describe('BackAction', () => {
    it('sets the correct action.type', () => {
      const expected: any = RouterActionTypes.BACK;
      const result: any = new BackAction().type;
      expect(result).toEqual(expected);
    });
  });

  describe('ForwardAction', () => {
    it('sets the correct action.type', () => {
      const expected: any = RouterActionTypes.FORWARD;
      const result: any = new ForwardAction().type;
      expect(result).toEqual(expected);
    });
  });

  describe('GoAction', () => {
    it('sets the correct action.type', () => {
      const payload: any = 'test-payload';
      const expected: any = RouterActionTypes.GO;
      const result: any = new GoAction(payload).type;
      expect(result).toEqual(expected);
    });

    it('sets action.payload to the given payload', () => {
      const payload: any = 'test-payload';
      const expected: any = payload;
      const result: any = new GoAction(payload).payload;
      expect(result).toEqual(expected);
    });
  });

  describe('RouteChangeAction', () => {
    it('sets the correct action.type', () => {
      const payload: any = 'test-payload';
      const expected: any = RouterActionTypes.ROUTE_CHANGE;
      const result: any = new RouteChangeAction(payload).type;
      expect(result).toEqual(expected);
    });

    it('sets action.payload to the given payload', () => {
      const payload: any = 'test-payload';
      const expected: any = payload;
      const result: any = new RouteChangeAction(payload).payload;
      expect(result).toEqual(expected);
    });
  });
});
