import type { Mapping } from '../../types';
import { MappingCallbacksClassId, MappingClassId } from '../../types';
import { afterMapArray } from '../after-map-array';

describe(afterMapArray.name, () => {
    it('should update mapping configuration with afterMapArray', () => {
        const mapping = [] as unknown as Mapping;
        const cb = jest.fn();
        afterMapArray(cb)(mapping);
        expect(
            mapping[MappingClassId.callbacks]![MappingCallbacksClassId.afterMapArray]
        ).toBe(cb);
    });
});
