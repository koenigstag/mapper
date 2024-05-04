import type { Mapping } from '../../types';
import { MappingCallbacksClassId, MappingClassId } from '../../types';
import { beforeMapArray } from '../before-map-array';

describe(beforeMapArray.name, () => {
    it('should update mapping configuration with beforeMapArray', () => {
        const mapping = [] as unknown as Mapping;
        const cb = jest.fn();
        beforeMapArray(cb)(mapping);
        expect(
            mapping[MappingClassId.callbacks]![MappingCallbacksClassId.beforeMapArray]
        ).toBe(cb);
    });
});
